import { submitToSheet, SUBJECTS } from '../backend/services/sheetService.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { regNo, name, subjects } = req.body;

    // Validation
    if (!regNo || !name || !subjects) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Validate register number format (alphanumeric)
    if (!/^[a-zA-Z0-9]+$/.test(regNo)) {
      return res.status(400).json({
        success: false,
        message: 'Register number must be alphanumeric',
      });
    }

    // Validate name format (letters and spaces only)
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return res.status(400).json({
        success: false,
        message: 'Name must contain only letters and spaces',
      });
    }

    // Validate all subjects are provided
    const requiredSubjects = SUBJECTS.map(s => s.code);
    const providedSubjects = Object.keys(subjects);
    
    const missingSubjects = requiredSubjects.filter(
      code => !providedSubjects.includes(code) || !subjects[code]
    );

    if (missingSubjects.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'All subject results are required',
        missingSubjects,
      });
    }

    // Validate result values
    for (const [code, result] of Object.entries(subjects)) {
      const validResults = code === '22MPE640' 
        ? ['PASS', 'FAIL', 'NIL'] 
        : ['PASS', 'FAIL'];
      
      if (!validResults.includes(result)) {
        return res.status(400).json({
          success: false,
          message: `Invalid result value for ${code}`,
        });
      }
    }

    // Submit to Google Sheets
    const result = await submitToSheet({ regNo, name, subjects });

    res.status(200).json({
      success: true,
      message: 'Your result has been recorded successfully!',
      data: result,
    });
  } catch (error) {
    console.error('Submit error:', error);

    if (error.message === 'DUPLICATE_REG_NO') {
      return res.status(409).json({
        success: false,
        message: 'A response for this Register Number already exists.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error submitting data. Please try again.',
    });
  }
}
