"use client";

import StepTracker from "@/app/visa/visa_apply/components/stepTracker";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import B2BStep1 from "./b2bstep1";
import B2BStep2 from "./b2bStep2";

const STEPS = [
  { id: 1, label: "Step 1" },
  { id: 2, label: "Step 2" },
];

export const B2BApplyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      fatherName: "",
      motherName: "",
      dob: "",
      nid: "",
      passport: "",
      mobile: "",
      address: "",
      qualification: "",
      presentAddress: "",
    },
  });

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
        <div className="sticky top-18 z-5 bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <StepTracker steps={STEPS} currentStep={currentStep} />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {currentStep === 1 && <B2BStep1 onNext={handleNext} />}
          {currentStep === 2 && <B2BStep2 onPrevious={handlePrevious} />}
        </div>
      </main>
    </FormProvider>
  );
};
