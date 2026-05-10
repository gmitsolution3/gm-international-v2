// components/steps/CompanionsStep.tsx
import React from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import FormField from "../ui/FormField";
import { FormData } from "@/app/types/UmrahHazz-form-types";
import { UploadToCloudinary } from "@/app/components/uploadPdf/uploadToCloudinary";
import FileUpload from "../ui/FileUpload";

const CompanionsStep = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "companions",
  });

  const [uploadingFields, setUploadingFields] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleFileUpload = async (
    file: File,
    fieldName: string,
    index: number,
  ) => {
    const key = `companions.${index}.${fieldName}`;
    setUploadingFields((prev) => ({ ...prev, [key]: true }));
    try {
      const url = await UploadToCloudinary(file);
      const fieldPath = `companions.${index}.${fieldName}` as const;
      // Use setValue from useFormContext - we need to get it from the context
      return url;
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploadingFields((prev) => ({ ...prev, [key]: false }));
    }
  };

  const addCompanion = () => {
    append({
      fullName: "",
      relation: "",
      passportNumber: "",
      passportImage: "",
      phone: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">
          Companions Information
        </h3>
        <button
          type="button"
          onClick={addCompanion}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Companion
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No companions
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Click the button above to add companion details.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200 relative"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  Companion {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700 transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Full Name *"
                  name={`companions.${index}.fullName`}
                  register={register}
                  error={errors.companions?.[index]?.fullName?.message}
                  placeholder="Enter companion's full name"
                />

                <FormField
                  label="Relation *"
                  name={`companions.${index}.relation`}
                  register={register}
                  error={errors.companions?.[index]?.relation?.message}
                  placeholder="e.g., Spouse, Parent, Sibling"
                />

                <FormField
                  label="Passport Number"
                  name={`companions.${index}.passportNumber`}
                  register={register}
                  error={errors.companions?.[index]?.passportNumber?.message}
                  placeholder="Enter passport number"
                />

                <FormField
                  label="Phone"
                  name={`companions.${index}.phone`}
                  register={register}
                  error={errors.companions?.[index]?.phone?.message}
                  placeholder="01XXXXXXXXX"
                />

                <div className="md:col-span-2">
                  <Controller
                    name={`companions.${index}.passportImage`}
                    control={control}
                    render={({ field }) => (
                      <FileUpload
                        label="Passport Image *"
                        accept="image/*"
                        value={field.value!}
                        onChange={async (file) => {
                          const url = await handleFileUpload(
                            file,
                            "passportImage",
                            index,
                          );
                          field.onChange(url);
                        }}
                        error={
                          errors.companions?.[index]?.passportImage?.message
                        }
                        uploading={
                          uploadingFields[`companions.${index}.passportImage`]
                        }
                        placeholder="Upload companion's passport"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanionsStep;
