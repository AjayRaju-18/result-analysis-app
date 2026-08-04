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
    let credentials;

    // Check for Base64 encoded credentials (Vercel)
    if (process.env.GOOGLE_CREDENTIALS_BASE64) {
      const decoded = Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, 'base64').toString('utf-8');
      credentials = JSON.parse(decoded);
    }
    // Check for JSON string credentials (Vercel alternative)
    else if (process.env.GOOGLE_CREDENTIALS) {
      credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    }
    // Check for local credentials file (local development)
    else {
      const credentialsPath = path.join(__dirname, '..', 'credentials.json');
      
      if (!fs.existsSync(credentialsPath)) {
        throw new Error('credentials.json file not found and no GOOGLE_CREDENTIALS environment variable set.');
      }

      credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
    }

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
