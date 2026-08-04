import { motion } from 'framer-motion';

/**
 * Step Indicator Component
 * Shows current step progress (Step X of Y)
 */
const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  font-semibold text-sm transition-all duration-300
                  ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg scale-110'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`
                  text-xs mt-2 font-medium
                  ${isActive ? 'text-blue-600' : 'text-gray-500'}
                `}
              >
                Step {stepNumber}
              </span>
            </motion.div>

            {stepNumber < totalSteps && (
              <div
                className={`
                  w-12 h-1 mx-2 rounded transition-all duration-300
                  ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
