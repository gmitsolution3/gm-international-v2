"use client";

import { useEffect, useState } from "react";
import { Scan, Asterisk, CheckCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import Loader from "@/components/ui/loader";
import { UploadToCloudinary } from "@/app/components/uploadPdf/uploadToCloudinary";

interface FormField {
  name: string;
  type: string;
  label: string;
  required: boolean;
}

interface FormSection {
  section: string;
  fields: FormField[];
}

export default function VisaForm() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const country = watch("country");
  const visaType = watch("visaType");

  const files = watch("files") || {};
  const formValues = watch();

  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<FormSection[]>([]);

  useEffect(() => {
    if (!country || !visaType) {
      setLoading(false);
      return;
    }

    const fetchFormStructure = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/form-data/get-form-data?country=${country}&visaType=${visaType}`
        );
        const result = await res.json();
        console.log({result})

        setSections(result.data || []);
      } catch (err) {
        console.error("Failed to load form", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormStructure();
  }, [country, visaType]);

  // File upload handler
  const handleFileChange = async (fieldName: string, file: File | null) => {
    if (file) {
      const data = await UploadToCloudinary(file);

      if (!!data) {
        setValue(`files.${fieldName}`, data, { shouldValidate: true });
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (sections.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No form fields for this visa type.
      </p>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          {sections.map((section, sectionIdx) => {
            const isRequiredSection = section.section.startsWith("*");
            const sectionTitle = isRequiredSection
              ? section.section.substring(1).trim()
              : section.section;

            return (
              <Card
                key={sectionIdx}
                className="overflow-hidden shadow-lg border"
              >
                <div className="bg-linear-to-r from-red-50 to-red-100 px-6 py-4 border-b">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-red-700">
                    {isRequiredSection && <Asterisk className="w-5 h-5" />}
                    {sectionTitle}
                  </h2>
                </div>

                <div className="p-6 bg-white">
                  {section.fields.length === 1 ? (
                    <div className="grid grid-cols-1 gap-6">
                      {section.fields.map((field) =>
                        renderField(
                          field,
                          files,
                          handleFileChange,
                          register,
                          formValues
                        )
                      )}
                    </div>
                  ) : section.fields.length <= 3 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {section.fields.map((field) => (
                        <div key={field.name} className="md:col-span-1">
                          {renderField(
                            field,
                            files,
                            handleFileChange,
                            register,
                            formValues
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {section.fields.map((field) => (
                        <div key={field.name}>
                          {renderField(
                            field,
                            files,
                            handleFileChange,
                            register,
                            formValues
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Separate render function for cleanliness
function renderField(
  field: FormField,
  files: any,
  handleFileChange: (name: string, file: File | null) => void,
  register: any,
  formValues: any
) {
  const isFile = field.type === "file";
  const isUploaded = !!files[field.name];
  const file: File = files[field.name];

  if (isFile) {
    return (
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-base font-medium">
          {field.label}
          {field.required && <span className="text-red-500">*</span>}
        </Label>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input
            type="file"
            accept="image/*,.pdf"
            id={field.name}
            className="hidden"
            required
            onChange={(e) =>
              handleFileChange(field.name, e.target.files?.[0] || null)
            }
          />

          <Button
            type="button"
            variant="outline"
            size="lg"
            className={cn(
              "border-2 border-dashed transition-all duration-300 flex items-center gap-3 min-w-48",
              isUploaded
                ? "border-green-500 bg-green-50 hover:bg-green-100 text-green-700"
                : "border-red-300 text-red-600 hover:bg-red-50"
            )}
            onClick={() => document.getElementById(field.name)?.click()}
          >
            {isUploaded ? (
              <>
                <CheckCircle2 className="w-6 h-6 animate-pulse" />
                <span className="font-semibold">Uploaded</span>
              </>
            ) : (
              <>
                <Scan className="w-5 h-5 animate-pulse" />
                <Upload className="w-5 h-5" />
                <span>Scan / Upload</span>
              </>
            )}
          </Button>

          {isUploaded && (
            <div className="text-sm font-medium text-green-700 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5" />
              <span className="truncate max-w-xs">{file.name}</span>
              <span className="text-gray-500">
                ({(file.size / 1024 / 1024).toFixed(1)} MB)
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Text / Email / Number fields
  return (
    <div className="space-y-2">
      <Label htmlFor={field.name} className="flex items-center gap-1">
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        {...register(field.name, { required: field.required })}
        type={
          field.type === "email"
            ? "email"
            : field.type === "number"
            ? "number"
            : "text"
        }
        placeholder={`Enter ${field.label.toLowerCase()}`}
        className="w-full h-12"
      />
    </div>
  );
}
