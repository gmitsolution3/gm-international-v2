"use client";

import type React from "react";
import { useEffect, useState } from "react";
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
import Swal from "sweetalert2";

const DescriptionEditorRHF = dynamic(
  () => import("./description-editor").then((mod) => mod.DescriptionEditorRHF),
  { ssr: false }
);

export default function AddPackagePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const form = useForm({
    defaultValues: {
      isInternationalStudent: false,
      universityName: "",
      country: "",
      city: "",
      universityURL: "",
      thumbnail: null as File | null,
      startingDate: "",
      deadline: "",
      duration: "",
      language: "",
      applicationFee: "",
      serviceFee: "",
      description: "",
      programs: [] as string[],
      universityDescription: "",
      status: "active",
    },
  });

  const {
    control,
    register,
    watch,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = form;

  const isInternationalStudent = watch("isInternationalStudent");
  const onSubmit = async (data: any) => {
    const { programInput,program, ...submitData } = data;
    try {
      const addPackage = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/admin/scholarship-package-management`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        },
      );

      const result = await addPackage.json();

      if (!result) {
        Swal.fire({
          title: "Scholarship Package Added successfully",
          icon: "error",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      if (result.insertedId) {
        Swal.fire({
          title: "Scholarship Package Added successfully",
          icon: "success",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
        //  onClose();
        //  setPackageFormData(null);
      }
    } catch (error) {
      console.error("Error while adding package:", error);
    }
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* University Section */}
          <UniversitySection form={form} />

          {/* Package Details Section */}
          <PackageDetailsSection form={form} />
          {/* Description Editor * */}
          <DescriptionEditorRHF form={form} name="description" />
          <DescriptionEditorRHF
            form={form}
            name="universityDescription"
            from="forUniversityDescription"
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
                {errors.isInternationalStudent && (
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
                reset();
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
