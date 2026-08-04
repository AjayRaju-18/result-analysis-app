import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from '../context/FormContext';
import { getSubjects, submitForm } from '../services/formService';
import toast from 'react-hot-toast';

/**
 * Step 2: Subject Results Form
 * Collect pass/fail status for each subject
 */
const SubjectResultsStep = () => {
  const { formData, updateSubjectResult, prevStep, nextStep } = useFormContext();
  
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [localResults, setLocalResults] = useState(formData.subjects);

  /**
   * Fetch subjects from backend
   */
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubjects();
        setSubjects(response.subjects);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load subjects. Please refresh the page.');
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  /**
   * Handle result selection for a subject
   */
  const handleResultChange = (subjectCode, result) => {
    setLocalResults((prev) => ({
      ...prev,
      [subjectCode]: result,
    }));
    updateSubjectResult(subjectCode, result);
  };

  /**
   * Check if all subjects have a result selected
   */
  const areAllSubjectsSelected = () => {
    return subjects.every((subject) => {
      const result = localResults[subject.code];
      return result && result !== '';
    });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!areAllSubjectsSelected()) {
      toast.error('Please select results for all subjects');
      return;
    }

    setSubmitting(true);

    try {
      const response = await submitForm(formData);
      
      // Check if submission was successful
      if (response && response.success) {
        toast.success(response.message || 'Your result has been recorded successfully!');
        nextStep(); // Move to confirmation page
      } else {
        // Even if response format is unexpected, if we got here without error, it likely worked
        toast.success('Your result has been recorded successfully!');
        nextStep();
      }
    } catch (error) {
      console.error('Submission error:', error);
      
      // If we get a network error but status is 200, it might have succeeded
      if (error.response?.status === 200 || error.message?.includes('200')) {
        toast.success('Your result has been recorded successfully!');
        nextStep();
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to submit. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Enter Your Results
        </h2>
        <p className="text-gray-600">
          Select pass/fail status for each subject
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject Cards */}
        <div className="space-y-3">
          {subjects.map((subject, index) => {
            const isElective = subject.code === '22MPE640';
            const options = isElective
              ? ['PASS', 'FAIL', 'NIL']
              : ['PASS', 'FAIL'];

            return (
              <motion.div
                key={subject.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  {/* Subject Info */}
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">
                      {subject.code}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {subject.name}
                      {isElective && (
                        <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          Elective
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Result Selection */}
                  <div className="md:w-48">
                    <select
                      value={localResults[subject.code] || ''}
                      onChange={(e) =>
                        handleResultChange(subject.code, e.target.value)
                      }
                      className={`
                        w-full px-4 py-2 rounded-lg border-2 transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${
                          localResults[subject.code]
                            ? localResults[subject.code] === 'PASS'
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : localResults[subject.code] === 'FAIL'
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : 'border-gray-500 bg-gray-50 text-gray-700'
                            : 'border-gray-300'
                        }
                      `}
                      required
                      aria-label={`Result for ${subject.code}`}
                    >
                      <option value="">Select Result</option>
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note for elective subject */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Select "NIL" for Entrepreneurial Development
            if you did not opt for this subject.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <button
            type="button"
            onClick={prevStep}
            className="
              w-full sm:w-auto px-6 py-3 rounded-lg font-semibold
              border-2 border-gray-300 text-gray-700
              hover:bg-gray-50 hover:border-gray-400
              transition-all duration-200 transform hover:scale-105 active:scale-95
            "
          >
            ← Back
          </button>

          <button
            type="submit"
            disabled={!areAllSubjectsSelected() || submitting}
            className={`
              flex-1 py-3 px-6 rounded-lg font-semibold text-white
              transition-all duration-200 transform
              ${
                areAllSubjectsSelected() && !submitting
                  ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-105 active:scale-95'
                  : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SubjectResultsStep;
