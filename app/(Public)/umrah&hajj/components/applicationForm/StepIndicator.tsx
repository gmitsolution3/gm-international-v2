// components/StepIndicator.tsx
import React from "react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="w-full">
      {/* Mobile View */}
      <div className="md:hidden bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-semibold text-red-600">
            {steps[currentStep]}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-red-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center flex-1">
                <button
                  onClick={() => onStepClick(index)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    index <= currentStep
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-500"
                  } ${index === currentStep ? "ring-4 ring-red-200" : ""}`}
                >
                  {index < currentStep ? "✓" : index + 1}
                </button>
                <span
                  className={`mt-2 text-xs font-medium text-center ${
                    index <= currentStep ? "text-red-600" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2">
                  <div
                    className={`h-full rounded transition-all duration-300 ${
                      index < currentStep ? "bg-red-600" : "bg-gray-200"
                    }`}
                  ></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
