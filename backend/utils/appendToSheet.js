import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const sheets = google.sheets('v4');

// Create JWT authentication
const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export const appendToSheet = async (data) => {
    try {
        if (!process.env.GOOGLE_SHEET_ID) {
            console.warn('Google Sheets ID not configured, skipping');
            return;
        }

        const response = await sheets.spreadsheets.values.append({
            auth,
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Responses!A:E',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    [
                        data.timestamp,
                        data.name,
                        data.email,
                        data.subject,
                        data.message,
                    ],
                ],
            },
        });

        console.log(`✓ Data appended to Google Sheets (${response.updates.updatedRows} row)`);
        return response;
    } catch (error) {
        console.error('Google Sheets error:', error.message);
        // Don't throw - let the email submission succeed even if sheet update fails
    }
};
