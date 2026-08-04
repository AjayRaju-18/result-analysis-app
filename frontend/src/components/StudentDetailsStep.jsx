import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from '../context/FormContext';

/**
 * Step 1: Student Details Form
 * Collects Register Number and Name
 */
const StudentDetailsStep = () => {
  const { formData, updateStudentDetails, nextStep } = useFormContext();
  
  const [regNo, setRegNo] = useState(formData.regNo);
  const [name, setName] = useState(formData.name);
  const [errors, setErrors] = useState({ regNo: '', name: '' });
  const [touched, setTouched] = useState({ regNo: false, name: false });

  /**
   * Validate register number (alphanumeric only)
   */
  const validateRegNo = (value) => {
    if (!value.trim()) {
      return 'Register number is required';
    }
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return 'Register number must be alphanumeric only';
    }
    return '';
  };

  /**
   * Validate name (letters and spaces only)
   */
  const validateName = (value) => {
    if (!value.trim()) {
      return 'Name is required';
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      return 'Name must contain only letters and spaces';
    }
    return '';
  };

  /**
   * Handle input changes with validation
   */
  const handleRegNoChange = (e) => {
    const value = e.target.value;
    setRegNo(value);
    if (touched.regNo) {
      setErrors((prev) => ({ ...prev, regNo: validateRegNo(value) }));
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (touched.name) {
      setErrors((prev) => ({ ...prev, name: validateName(value) }));
    }
  };

  /**
   * Handle blur events to mark fields as touched
   */
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'regNo') {
      setErrors((prev) => ({ ...prev, regNo: validateRegNo(regNo) }));
    } else if (field === 'name') {
      setErrors((prev) => ({ ...prev, name: validateName(name) }));
    }
  };

  /**
   * Check if form is valid
   */
  const isFormValid = () => {
    const regNoError = validateRegNo(regNo);
    const nameError = validateName(name);
    return !regNoError && !nameError;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ regNo: true, name: true });

    // Validate all fields
    const regNoError = validateRegNo(regNo);
    const nameError = validateName(name);
    
    setErrors({ regNo: regNoError, name: nameError });

    // If valid, update context and move to next step
    if (!regNoError && !nameError) {
      updateStudentDetails(regNo.trim(), name.trim());
      nextStep();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <p className="text-sm text-gray-600 mb-2">Department of Mechanical Engineering</p>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          6th Semester Result Analysis
        </h2>
        <p className="text-gray-600">
          Enter your details to begin
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Register Number Field */}
        <div>
          <label
            htmlFor="regNo"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Register Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="regNo"
            value={regNo}
            onChange={handleRegNoChange}
            onBlur={() => handleBlur('regNo')}
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${
                touched.regNo && errors.regNo
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }
            `}
            placeholder="e.g., 2303717711421006"
            aria-invalid={touched.regNo && !!errors.regNo}
            aria-describedby={errors.regNo ? 'regNo-error' : undefined}
          />
          {touched.regNo && errors.regNo && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              id="regNo-error"
              className="text-red-500 text-sm mt-1 flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.regNo}
            </motion.p>
          )}
        </div>

        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            onBlur={() => handleBlur('name')}
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${
                touched.name && errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }
            `}
            placeholder="e.g., Ajay Raju MJ"
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {touched.name && errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              id="name-error"
              className="text-red-500 text-sm mt-1 flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.name}
            </motion.p>
          )}
        </div>

        {/* Next Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`
              w-full py-3 px-6 rounded-lg font-semibold text-white
              transition-all duration-200 transform
              ${
                isFormValid()
                  ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-105 active:scale-95'
                  : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            Next →
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default StudentDetailsStep;
