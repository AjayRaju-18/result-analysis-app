import { getGoogleSheetsClient, getSpreadsheetId } from '../config/googleSheets.js';

// Define subjects with their codes and names
export const SUBJECTS = [
  { code: '22MPC618', name: 'METROLOGY AND QUALITY CONTROL' },
  { code: '22MPC619', name: 'FINITE ELEMENT ANALYSIS' },
  { code: '22MPC620', name: 'DESIGN OF TRANSMISSION SYSTEMS' },
  { code: '22MPC621', name: 'MECHATRONICS' },
  { code: '22MPE637', name: 'TOTAL QUALITY MANAGEMENT' },
  { code: '22MEE602', name: 'SKILL DEVELOPMENT LAB' },
  { code: '22MEE603', name: 'MODELING AND SIMULATION LABORATORY' },
  { code: '22MPE640', name: 'ENTREPRENEURIAL DEVELOPMENT' }
];

/**
 * Initialize the sheet with headers if it's empty
 */
export const initializeSheet = async () => {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    // Check if sheet has data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1:Z1',
    });

    // If no headers exist, create them
    if (!response.data.values || response.data.values.length === 0) {
      const headers = [
        'S.No',
        'REG NO',
        'NAME',
        ...SUBJECTS.map(subject => `${subject.code} (${subject.name})`)
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        resource: {
          values: [headers],
        },
      });

      console.log('Sheet initialized with headers');
    }
  } catch (error) {
    console.error('Error initializing sheet:', error.message);
    throw error;
  }
};

/**
 * Check if a register number already exists in the sheet
 * @param {string} regNo - Register number to check
 * @returns {boolean} True if exists, false otherwise
 */
export const checkDuplicateRegNo = async (regNo) => {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    // Get all register numbers (column B, starting from row 2)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!B2:B',
    });

    if (!response.data.values) {
      return false;
    }

    // Check if register number exists (case-insensitive)
    const existingRegNos = response.data.values.flat().map(r => r.toUpperCase());
    return existingRegNos.includes(regNo.toUpperCase());
  } catch (error) {
    console.error('Error checking duplicate:', error.message);
    throw error;
  }
};

/**
 * Get the next serial number
 * @returns {number} Next S.No
 */
const getNextSerialNumber = async () => {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    // Get all rows in column A (S.No)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:A',
    });

    if (!response.data.values || response.data.values.length <= 1) {
      return 1; // First entry after header
    }

    // Return the count of rows (excluding header)
    return response.data.values.length;
  } catch (error) {
    console.error('Error getting serial number:', error.message);
    throw error;
  }
};

/**
 * Submit form data to Google Sheet
 * @param {Object} formData - Form submission data
 * @returns {Object} Success response
 */
export const submitToSheet = async (formData) => {
  try {
    const sheets = getGoogleSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    // Initialize sheet if needed
    await initializeSheet();

    // Check for duplicate
    const isDuplicate = await checkDuplicateRegNo(formData.regNo);
    if (isDuplicate) {
      throw new Error('DUPLICATE_REG_NO');
    }

    // Get next serial number
    const serialNo = await getNextSerialNumber();

    // Prepare row data
    const rowData = [
      serialNo,
      formData.regNo,
      formData.name,
      ...SUBJECTS.map(subject => formData.subjects[subject.code] || '')
    ];

    // Append the row
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:Z',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [rowData],
      },
    });

    return {
      success: true,
      serialNo,
      message: 'Data submitted successfully',
    };
  } catch (error) {
    console.error('Error submitting to sheet:', error.message);
    throw error;
  }
};
