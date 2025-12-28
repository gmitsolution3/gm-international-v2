interface Step {
  id: number
  label: string
}

interface StepTrackerProps {
  steps: Step[]
  currentStep: number
}

export default function StepTracker({ steps, currentStep }: StepTrackerProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 sm:gap-4 mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Circle indicator */}
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${
                step.id === currentStep
                  ? 'bg-[#CA2328]'
                  : step.id < currentStep
                    ? 'bg-slate-800'  
                    : 'bg-slate-800'
              }`}
            >
              <span className="text-white text-xs sm:text-sm font-semibold">
                {step.id === currentStep ? '●' : step.id}
              </span>
            </div>

            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div className="w-8 sm:w-12 h-1 bg-slate-300 mx-1 sm:mx-2" />
            )}
          </div>
        ))}
      </div>

      {/* Step label */}
      <p className="text-center text-sm sm:text-base font-semibold text-slate-800">
        {steps.find(s => s.id === currentStep)?.label}
      </p>
    </div>
  )
}
