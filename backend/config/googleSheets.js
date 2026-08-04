import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Initialize Google Sheets API client
 * @returns {Object} Sheets API client instance
 */
export const getGoogleSheetsClient = () => {
  try {
    // Load service account credentials
    const credentialsPath = path.join(__dirname, '..', 'credentials.json');
    
    if (!fs.existsSync(credentialsPath)) {
      throw new Error('credentials.json file not found. Please add your Google Service Account credentials.');
    }

    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Create sheets client
    const sheets = google.sheets({ version: 'v4', auth });

    return sheets;
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error.message);
    throw error;
  }
};

/**
 * Get the spreadsheet ID from environment variables
 * @returns {string} Spreadsheet ID
 */
export const getSpreadsheetId = () => {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID environment variable is not set');
  }
  
  return spreadsheetId;
};
