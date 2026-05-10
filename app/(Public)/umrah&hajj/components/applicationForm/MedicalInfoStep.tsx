// components/steps/MedicalInfoStep.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import FormField from "../ui/FormField";

import { FormData } from "@/app/types/UmrahHazz-form-types";
import FormSelect from "../ui/FormSelect";
import FormCheckbox from "../ui/FormCheckbox";

const MedicalInfoStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">
        Medical Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Blood Group"
          name="medicalInfo.bloodGroup"
          register={register}
          error={errors.medicalInfo?.bloodGroup?.message}
          options={[
            { value: "", label: "Select Blood Group" },
            { value: "A+", label: "A+" },
            { value: "A-", label: "A-" },
            { value: "B+", label: "B+" },
            { value: "B-", label: "B-" },
            { value: "AB+", label: "AB+" },
            { value: "AB-", label: "AB-" },
            { value: "O+", label: "O+" },
            { value: "O-", label: "O-" },
          ]}
        />

        <div className="space-y-4 md:col-span-2">
          <h4 className="font-semibold text-gray-700">Medical Conditions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormCheckbox
              label="Diabetes"
              name="medicalInfo.hasDiabetes"
              register={register}
            />
            <FormCheckbox
              label="High Blood Pressure"
              name="medicalInfo.hasHighBloodPressure"
              register={register}
            />
            <FormCheckbox
              label="Heart Disease"
              name="medicalInfo.hasHeartDisease"
              register={register}
            />
            <FormCheckbox
              label="Uses Wheelchair"
              name="medicalInfo.usesWheelchair"
              register={register}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <FormField
            label="Allergies"
            name="medicalInfo.allergies"
            register={register}
            error={errors.medicalInfo?.allergies?.message}
            placeholder="List any allergies (if any)"
          />
        </div>

        <div className="md:col-span-2">
          <FormField
            label="Other Medical Issues"
            name="medicalInfo.otherMedicalIssues"
            register={register}
            error={errors.medicalInfo?.otherMedicalIssues?.message}
            placeholder="Describe any other medical conditions"
          />
        </div>
      </div>
    </div>
  );
};

export default MedicalInfoStep;
