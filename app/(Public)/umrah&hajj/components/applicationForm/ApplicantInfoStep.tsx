// components/steps/ApplicantInfoStep.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import FormField from "../ui/FormField";
import { FormData } from "@/app/types/UmrahHazz-form-types";
import FormSelect from "../ui/FormSelect";

const ApplicantInfoStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">
        Applicant Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Full Name *"
          name="applicantInfo.fullName"
          register={register}
          error={errors.applicantInfo?.fullName?.message}
          placeholder="Enter full name"
        />
        <FormField
          label="Father's Name *"
          name="applicantInfo.fatherName"
          register={register}
          error={errors.applicantInfo?.fatherName?.message}
          placeholder="Enter father's name"
        />
        <FormField
          label="Mother's Name *"
          name="applicantInfo.motherName"
          register={register}
          error={errors.applicantInfo?.motherName?.message}
          placeholder="Enter mother's name"
        />

        <FormSelect
          label="Gender *"
          name="applicantInfo.gender"
          register={register}
          error={errors.applicantInfo?.gender?.message}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />

        <FormField
          label="Date of Birth *"
          name="applicantInfo.dateOfBirth"
          type="date"
          register={register}
          error={errors.applicantInfo?.dateOfBirth?.message}
        />

        <FormSelect
          label="Marital Status *"
          name="applicantInfo.maritalStatus"
          register={register}
          error={errors.applicantInfo?.maritalStatus?.message}
          options={[
            { value: "single", label: "Single" },
            { value: "married", label: "Married" },
            { value: "widowed", label: "Widowed" },
          ]}
        />

        <FormField
          label="Nationality *"
          name="applicantInfo.nationality"
          register={register}
          error={errors.applicantInfo?.nationality?.message}
          placeholder="Enter nationality"
        />

        <FormField
          label="NID Number"
          name="applicantInfo.nidNumber"
          register={register}
          error={errors.applicantInfo?.nidNumber?.message}
          placeholder="Enter NID number"
        />

        <FormField
          label="Profession"
          name="applicantInfo.profession"
          register={register}
          error={errors.applicantInfo?.profession?.message}
          placeholder="Enter profession"
        />

        <FormField
          label="Phone *"
          name="applicantInfo.phone"
          register={register}
          error={errors.applicantInfo?.phone?.message}
          placeholder="01XXXXXXXXX"
        />

        <FormField
          label="WhatsApp"
          name="applicantInfo.whatsapp"
          register={register}
          error={errors.applicantInfo?.whatsapp?.message}
          placeholder="01XXXXXXXXX"
        />

        <FormField
          label="Email *"
          name="applicantInfo.email"
          type="email"
          register={register}
          error={errors.applicantInfo?.email?.message}
          placeholder="example@email.com"
        />

        <div className="md:col-span-2">
          <FormField
            label="Present Address *"
            name="applicantInfo.presentAddress"
            register={register}
            error={errors.applicantInfo?.presentAddress?.message}
            placeholder="Enter present address"
          />
        </div>

        <div className="md:col-span-2">
          <FormField
            label="Permanent Address *"
            name="applicantInfo.permanentAddress"
            register={register}
            error={errors.applicantInfo?.permanentAddress?.message}
            placeholder="Enter permanent address"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantInfoStep;
