import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

/**
 * Custom hook to use Form Context
 */
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};

/**
 * Form Provider Component
 * Manages form state across multiple steps
 */
export const FormProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    regNo: '',
    name: '',
    subjects: {},
  });

  /**
   * Update student details (step 1)
   */
  const updateStudentDetails = (regNo, name) => {
    setFormData((prev) => ({
      ...prev,
      regNo,
      name,
    }));
  };

  /**
   * Update subject result
   */
  const updateSubjectResult = (subjectCode, result) => {
    setFormData((prev) => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [subjectCode]: result,
      },
    }));
  };

  /**
   * Reset form data
   */
  const resetForm = () => {
    setFormData({
      regNo: '',
      name: '',
      subjects: {},
    });
    setCurrentStep(1);
  };

  /**
   * Navigate to next step
   */
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  /**
   * Navigate to previous step
   */
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const value = {
    currentStep,
    formData,
    updateStudentDetails,
    updateSubjectResult,
    resetForm,
    nextStep,
    prevStep,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
