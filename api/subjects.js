import { SUBJECTS } from '../backend/services/sheetService.js';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      subjects: SUBJECTS,
    });
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
