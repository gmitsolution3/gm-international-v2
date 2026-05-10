// components/steps/EmergencyContactStep.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import FormField from "../ui/FormField";
import { FormData } from "@/app/types/UmrahHazz-form-types";

const EmergencyContactStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">
        Emergency Contact Information
      </h3>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <p className="text-sm text-red-700">
          Please provide contact details of someone we can reach in case of
          emergency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Contact Name *"
          name="emergencyContact.name"
          register={register}
          error={errors.emergencyContact?.name?.message}
          placeholder="Enter emergency contact name"
        />

        <FormField
          label="Relation *"
          name="emergencyContact.relation"
          register={register}
          error={errors.emergencyContact?.relation?.message}
          placeholder="e.g., Father, Mother, Brother, Spouse"
        />

        <FormField
          label="Phone Number *"
          name="emergencyContact.phone"
          register={register}
          error={errors.emergencyContact?.phone?.message}
          placeholder="01XXXXXXXXX"
        />

        <div className="md:col-span-2">
          <FormField
            label="Address"
            name="emergencyContact.address"
            register={register}
            error={errors.emergencyContact?.address?.message}
            placeholder="Enter address (optional)"
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactStep;
