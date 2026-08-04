import { useFormContext } from './context/FormContext';
import StepIndicator from './components/StepIndicator';
import StudentDetailsStep from './components/StudentDetailsStep';
import SubjectResultsStep from './components/SubjectResultsStep';
import ConfirmationStep from './components/ConfirmationStep';

/**
 * Main App Component
 * Orchestrates the multi-step form
 */
function App() {
  const { currentStep } = useFormContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          {/* Step Indicator - Hide on confirmation page */}
          {currentStep !== 3 && (
            <StepIndicator currentStep={currentStep} totalSteps={2} />
          )}

          {/* Step Content */}
          <div className="mt-6">
            {currentStep === 1 && <StudentDetailsStep />}
            {currentStep === 2 && <SubjectResultsStep />}
            {currentStep === 3 && <ConfirmationStep />}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>6th Semester Result Analysis Form</p>
          <p className="mt-1">Created by Ajay Raju MJ</p>
          <p className="mt-1">© 2026 All rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default App;
