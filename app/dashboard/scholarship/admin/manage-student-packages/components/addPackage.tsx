"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { UniversitySection } from "./university-section";
import { PackageDetailsSection } from "./package-details-section";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import dynamic from "next/dynamic";


const DescriptionEditor = dynamic(
  () =>
    import("./description-editor").then(
      (mod) => mod.DescriptionEditor
    ),
  { ssr: false } 
);

export default function AddPackagePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    control,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isInternationalStudent: false,
      b2bPrice: "",
    },
  });

  const isInternationalStudent = watch("isInternationalStudent");
  const from = "forUniversityDescription"

  const [formData, setFormData] = useState({
    universityName: "",
    country: "",
    city: "",
    worldRanking: "",
    thumbnail: null as File | null,
    startingDate: "",
    deadline: "",
    duration: "",
    language: "",
    applicationFee: "",
    serviceFee: "",
    description: "",
  });

  const handleUniversityChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePackageDetailsChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "universityName",
      "country",
      "city",
      "worldRanking",
      "startingDate",
      "deadline",
      "duration",
      "language",
      "applicationFee",
      "serviceFee",
      "description",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        return false;
      }
    }
    return true;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setMessage(null);

  //   if (!validateForm()) {
  //     setMessage({
  //       type: "error",
  //       text: "Please fill in all required fields",
  //     });
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 1500));

  //     setMessage({
  //       type: "success",
  //       text: "Package added successfully! The package is now available for students.",
  //     });

  //     // Reset form
  //     setFormData({
  //       universityName: "",
  //       country: "",
  //       city: "",
  //       worldRanking: "",
  //       thumbnail: null,
  //       startingDate: "",
  //       deadline: "",
  //       duration: "",
  //       language: "",
  //       applicationFee: "",
  //       serviceFee: "",
  //       description: "",
  //     });

  //     // Clear message after 3 seconds
  //     setTimeout(() => setMessage(null), 3000);
  //   } catch (error) {
  //     setMessage({
  //       type: "error",
  //       text: "Failed to add package. Please try again.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields",
      });
      return toast.error(message?.text);
    }

    const payload = {
      ...formData,
      isInternationalStudent,
    };

    console.log(payload);
  };

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Add New Package
          </h1>
          <p className="text-muted-foreground">
            Create a new study package for your university
          </p>
        </div>

        {/* Messages */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-medium">{message.text}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* University Section */}
          <UniversitySection
            data={formData}
            onChange={handleUniversityChange}
          />

          {/* Package Details Section */}
          <PackageDetailsSection
            data={{
              startingDate: formData.startingDate,
              deadline: formData.deadline,
              duration: formData.duration,
              language: formData.language,
              serviceFee: formData.serviceFee,
              applicationFee: formData.applicationFee,
            }}
            onChange={handlePackageDetailsChange}
          />

          {/* Description Editor * */}
          <DescriptionEditor
            value={formData.description}
            onChange={handleDescriptionChange}
          />
          <DescriptionEditor
            value={formData.description}
            onChange={handleDescriptionChange}
            from={from}
          />

          <div className="space-y-4">
            {/* International Student Checkbox */}
            <label className="flex items-center gap-3 text-sm cursor-pointer">
              <Controller
                name="isInternationalStudent"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              This package is for International Students
            </label>

            {/* Conditional B2B Price */}
            {isInternationalStudent && (
              <div className="space-y-2 max-w-xs">
                <Label htmlFor="b2bPrice">
                  International student package Price
                </Label>
                <Input
                  id="isInternationalStudent"
                  type="number"
                  placeholder="Enter International package price"
                  {...register("isInternationalStudent", {
                    required: isInternationalStudent,
                  })}
                />
                {errors.b2bPrice && (
                  <p className="text-sm text-red-500">
                    International student package price is required
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              className="border-border text-foreground hover:bg-[#CA2328] hover:text-white bg-transparent"
              onClick={() => {
                setFormData({
                  universityName: "",
                  country: "",
                  city: "",
                  worldRanking: "",
                  thumbnail: null,
                  startingDate: "",
                  deadline: "",
                  duration: "",
                  language: "",
                  applicationFee: "",
                  serviceFee: "",
                  description: "",
                });
                setMessage(null);
              }}
            >
              Clear Form
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#CA2328] hover:bg-[#a3181c] text-primary-foreground px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding Package...
                </>
              ) : (
                "Add Package"
              )}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
