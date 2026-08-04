import { checkDuplicateRegNo } from '../backend/services/sheetService.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { regNo } = req.body;

    if (!regNo) {
      return res.status(400).json({
        success: false,
        message: 'Register number is required',
      });
    }

    const isDuplicate = await checkDuplicateRegNo(regNo);

    res.status(200).json({
      success: true,
      isDuplicate,
    });
  } catch (error) {
    console.error('Check duplicate error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking duplicate register number',
    });
  }
}
