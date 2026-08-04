import api from '../config/api';

/**
 * Get list of subjects from the backend
 */
export const getSubjects = async () => {
  try {
    const response = await api.get('/subjects');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Check if register number already exists
 * @param {string} regNo - Register number to check
 */
export const checkDuplicate = async (regNo) => {
  try {
    const response = await api.post('/check-duplicate', { regNo });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Submit form data
 * @param {Object} formData - Form data to submit
 */
export const submitForm = async (formData) => {
  try {
    const response = await api.post('/submit', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
