"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Scan, Upload, FileText, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { UploadToCloudinary } from "@/app/components/uploadPdf/uploadToCloudinary";
// import PaymentForm from "./peymentCard";

interface Step3Props {
  onNext: () => void;
  onPrevious: () => void;
}

export default function Step3({ onNext, onPrevious }: Step3Props) {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useFormContext();

  const country = watch("country");
  const visaType = watch("visaType");
  const uploadedFiles = watch("files") || {};
  const [isLoading, setIsLoading] = useState(true);
  const [requiredFiles, setRequiredFiles] = useState<any[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const watchedValues = useWatch();

  useEffect(() => {
    const validateForm = async () => {
      const isFormValid = await trigger();
      setIsFormValid(isFormValid);
    };

    validateForm();
  }, [watchedValues]);

  function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    const fetchRequirements = async () => {
      if (!country || !visaType) return;

      setIsLoading(true);
      try {
        const res = await fetch(
          `https://gm-international-server-gamma.vercel.app/get-file-data?country=${country}&visaType=${visaType}`,
          { cache: "no-store" }
        );
        const data = await res.json();

        
        setRequiredFiles(data.data || []);
      } catch (err) {
        console.error("Failed to fetch file requirements");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequirements();
  }, [country, visaType]);

  const uploadToCloudinary = async (file: File) => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "pdf_upload");
      formData.append("cloud_name", "dijzbql87");
      formData.append("folder", "pdfs");

      if (file.type === "application/pdf") {
        formData.append("resource_type", "raw");
      } else {
        formData.append("resource_type", "image");
      }

      const cloudinaryUrl =
        "https://api.cloudinary.com/v1_1/dijzbql87/image/upload";

      const uploadRes = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const data = await uploadRes.json();

      if (data.secure_url) {
        
        return data.secure_url;
      } else {
        console.error("Cloudinary API Response Error:", data);
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return null;
    }
  };

  const handleFileSelect = async (fieldName: string, file: File | null) => {
    if (!file) return;
    const uploadedUrl = await uploadToCloudinary(file);
    if (uploadedUrl) {
      // setValue(`files.${fieldName}`, file, { shouldValidate: true });
      setValue(`files.${fieldName}`, uploadedUrl, { shouldValidate: true });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500"></div>
      </div>
    );
  }

  if (requiredFiles.length === 0) {
    return (
      <p className="text-center text-red-500">
        No documents required for this visa.
      </p>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 md:text-center sm:text-left">
        Upload <span className="text-red-600">docs</span> as required
      </h1>
      {/* Documents List */}
      <div className="space-y-6 mb-12 grid grid-cols-2 md:grid-cols-3">
        {requiredFiles.map((doc: any) => {
          const isUploaded = !!uploadedFiles[doc.name];
          const file: File = uploadedFiles[doc.name];

          return (
            <div key={doc.name} className="space-y-2">
              <div className="flex items-center gap-4 justify-center">
                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  id={doc.name}
                  onChange={(e) =>
                    handleFileSelect(doc.name, e.target.files?.[0] || null)
                  }
                />

                {/* Scan Button with Animation */}
                <Button
                  variant="outline"
                  className={cn(
                    "border-2 border-dashed transition-all duration-300 flex items-center gap-3",
                    isUploaded
                      ? "border-green-500 bg-green-50 hover:bg-green-100"
                      : "border-red-200 text-red-600 hover:bg-red-50"
                  )}
                  onClick={() => document.getElementById(doc.name)?.click()}
                >
                  {isUploaded ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-600 animate-pulse" />
                      <span className="font-medium">Uploaded</span>
                    </>
                  ) : (
                    <>
                      <Scan className="w-5 h-5 animate-pulse" />
                      <Upload className="w-4 h-4" />
                      <span>{doc.label}</span>
                    </>
                  )}
                </Button>

                {/* File Name + Preview */}
                {isUploaded && (
                  <div className="flex items-center gap-2 text-sm text-green-700 font-medium animate-fade-in">
                    <FileText className="w-4 h-4" />
                    <span className="truncate max-w-48">{file.name}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* <div>
        <PaymentForm />
      </div> */}
      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="w-full sm:w-auto px-8 py-6 rounded-full font-semibold text-base"
        >
          ← Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={requiredFiles.some(
            (doc: any) => doc.required && !uploadedFiles[doc.name]
          )}
          className="w-full sm:w-auto bg-[#CA2328] hover:bg-red-600 text-white px-8 py-6 rounded-full font-semibold text-base disabled:opacity-50"
        >
          Next →
        </Button>
      </div>
      {/* Optional: Progress indicator */}
      <div className="mt-6 text-center text-sm text-gray-600">
        {Object.keys(uploadedFiles).length} /{" "}
        {requiredFiles.filter((d: any) => d.required).length} required documents
        uploaded
      </div>
      {!isFormValid && Object.keys(errors).length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-semibold mb-2">
            Please fix the following errors:
          </p>
          <ul className="text-red-600 text-sm space-y-1">
            {Object.entries(errors).map(([fieldName, error]: any) => (
              <li key={fieldName}>• {error.message}</li>
            ))}
          </ul>
        </div>
      )}
      ;
    </div>
  );
}
