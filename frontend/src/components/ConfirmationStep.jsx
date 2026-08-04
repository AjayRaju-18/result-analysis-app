import { motion } from 'framer-motion';
import { useFormContext } from '../context/FormContext';

/**
 * Step 3: Confirmation Page
 * Shows success message and summary of submitted data
 */
const ConfirmationStep = () => {
  const { formData, resetForm } = useFormContext();

  /**
   * Handle submit another response
   */
  const handleSubmitAnother = () => {
    resetForm();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Success Icon */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.2, 
            type: 'spring', 
            stiffness: 200,
            damping: 10 
          }}
          className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4"
        >
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-800 mb-2"
        >
          Submission Successful!
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600"
        >
          Your result has been recorded successfully
        </motion.p>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm mb-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Submission Summary
        </h3>
        
        <div className="space-y-3">
          {/* Register Number */}
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Register Number:</span>
            <span className="text-gray-800 font-semibold">{formData.regNo}</span>
          </div>

          {/* Name */}
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium">Name:</span>
            <span className="text-gray-800 font-semibold">{formData.name}</span>
          </div>

          {/* Total Subjects */}
          <div className="flex justify-between py-2">
            <span className="text-gray-600 font-medium">Total Subjects:</span>
            <span className="text-gray-800 font-semibold">
              {Object.keys(formData.subjects).length}
            </span>
          </div>
        </div>

        {/* Results Breakdown */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Results Breakdown:
          </h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(formData.subjects).filter(r => r === 'PASS').length}
              </div>
              <div className="text-xs text-green-700 mt-1">Passed</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-red-600">
                {Object.values(formData.subjects).filter(r => r === 'FAIL').length}
              </div>
              <div className="text-xs text-red-700 mt-1">Failed</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-600">
                {Object.values(formData.subjects).filter(r => r === 'NIL').length}
              </div>
              <div className="text-xs text-gray-700 mt-1">N/A</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={handleSubmitAnother}
          className="
            w-full py-3 px-6 rounded-lg font-semibold text-white
            bg-blue-600 hover:bg-blue-700 hover:shadow-lg
            transition-all duration-200 transform hover:scale-105 active:scale-95
          "
        >
          Submit Another Response
        </button>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-gray-500">
          Your data has been securely saved to the database
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmationStep;
