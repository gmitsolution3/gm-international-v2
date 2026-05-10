// components/steps/DocumentsStep.tsx
import { UploadToCloudinary } from "@/app/components/uploadPdf/uploadToCloudinary";
import { FormData } from "@/app/types/UmrahHazz-form-types";
import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import FormField from "../ui/FormField";
import FileUpload from "../ui/FileUpload";


const DocumentsStep = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext<FormData>();

  const [uploadingFields, setUploadingFields] = useState<{
    [key: string]: boolean;
  }>({});

  const handleFileUpload = async (file: File, fieldName: string) => {
    setUploadingFields((prev) => ({ ...prev, [fieldName]: true }));
    try {
      const url = await UploadToCloudinary(file);
      setValue(fieldName as any, url, { shouldValidate: true });
      return url;
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploadingFields((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">
        Document Upload
      </h3>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <p className="text-sm text-yellow-700">
          Please upload clear copies of all required documents. Maximum file
          size: 5MB. Supported formats: JPG, PNG, PDF
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Passport Information */}
        <div className="md:col-span-2">
          <h4 className="font-semibold text-gray-700 mb-3">
            Passport Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Passport Number *"
              name="documents.passportNumber"
              register={register}
              error={errors.documents?.passportNumber?.message}
              placeholder="Enter passport number"
            />
            <FormField
              label="Issue Date *"
              name="documents.passportIssueDate"
              type="date"
              register={register}
              error={errors.documents?.passportIssueDate?.message}
            />
            <FormField
              label="Expiry Date *"
              name="documents.passportExpiryDate"
              type="date"
              register={register}
              error={errors.documents?.passportExpiryDate?.message}
            />
          </div>
        </div>

        {/* Passport Image */}
        <div className="md:col-span-2">
          <Controller
            name="documents.passportImage"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="Passport Image *"
                accept="image/*"
                value={field.value}
                onChange={async (file) => {
                  const url = await handleFileUpload(
                    file,
                    "documents.passportImage",
                  );
                  field.onChange(url);
                }}
                error={errors.documents?.passportImage?.message}
                uploading={uploadingFields["documents.passportImage"]}
                placeholder="Upload passport copy"
              />
            )}
          />
        </div>

        {/* NID Images (Optional) */}
        <div>
          <Controller
            name="documents.nid.frontSide"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="NID Front Side"
                accept="image/*"
                value={field.value || ""}
                onChange={async (file) => {
                  const url = await handleFileUpload(
                    file,
                    "documents.nid.frontSide",
                  );
                  field.onChange(url);
                }}
                uploading={uploadingFields["documents.nid.frontSide"]}
                placeholder="Upload NID front side"
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="documents.nid.backSide"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="NID Back Side"
                accept="image/*"
                value={field.value || ""}
                onChange={async (file) => {
                  const url = await handleFileUpload(
                    file,
                    "documents.nid.backSide",
                  );
                  field.onChange(url);
                }}
                uploading={uploadingFields["documents.nid.backSide"]}
                placeholder="Upload NID back side"
              />
            )}
          />
        </div>

        {/* Passport Size Photos */}
        <div className="md:col-span-2">
          <h4 className="font-semibold text-gray-700 mb-3">
            Passport Size Photos (Minimum 2) *
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1].map((index) => (
              <Controller
                key={index}
                name={`documents.passportSizePhoto.${index}`}
                control={control}
                render={({ field }) => (
                  <FileUpload
                    label={`Passport Photo ${index + 1} *`}
                    accept="image/*"
                    value={field.value || ""}
                    onChange={async (file) => {
                      const url = await handleFileUpload(
                        file,
                        `documents.passportSizePhoto.${index}`,
                      );
                      field.onChange(url);
                    }}
                    error={
                      errors.documents?.passportSizePhoto?.[index]?.message
                    }
                    uploading={
                      uploadingFields[`documents.passportSizePhoto.${index}`]
                    }
                    placeholder="Upload passport size photo"
                  />
                )}
              />
            ))}
          </div>
        </div>

        {/* Additional Documents */}
        <div>
          <Controller
            name="documents.visaImage"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="Visa Image (Optional)"
                accept="image/*"
                value={field.value || ""}
                onChange={async (file) => {
                  const url = await handleFileUpload(
                    file,
                    "documents.visaImage",
                  );
                  field.onChange(url);
                }}
                uploading={uploadingFields["documents.visaImage"]}
                placeholder="Upload visa copy if available"
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="documents.vaccinationCertificate"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="Vaccination Certificate (Optional)"
                accept="image/*,.pdf"
                value={field.value || ""}
                onChange={async (file) => {
                  const url = await handleFileUpload(
                    file,
                    "documents.vaccinationCertificate",
                  );
                  field.onChange(url);
                }}
                uploading={uploadingFields["documents.vaccinationCertificate"]}
                placeholder="Upload vaccination certificate"
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="documents.covidCertificate"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="COVID Certificate (Optional)"
                accept="image/*,.pdf"
                value={field.value || ""}
                onChange={async (file) => {
                  const url = await handleFileUpload(
                    file,
                    "documents.covidCertificate",
                  );
                  field.onChange(url);
                }}
                uploading={uploadingFields["documents.covidCertificate"]}
                placeholder="Upload COVID certificate"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentsStep;
