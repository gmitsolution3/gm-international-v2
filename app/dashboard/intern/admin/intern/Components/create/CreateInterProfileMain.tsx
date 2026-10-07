"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Save, UserPlus, X } from "lucide-react";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import PersonalInfoSection from "./sections/PersonalInfoSection";
import { IInternBatch } from "@/app/dashboard/intern/types/validations/batch";
import {
  IInternProfile,
  InternProfileFormValues,
  internProfileSchema,
} from "../types/validations/intern";
import ContactInfoSection from "./sections/ContactInfoSection";
import AcademicSection from "./sections/AcademicSection";
import BatchAssignmentSection from "./sections/BatchAssignmentSection";
import { createInternProfile, updateInternProfile } from "../intern";

interface CreateInterProfileMainProps {
  batches: IInternBatch[];
  /** If provided, form runs in EDIT mode and is prefilled */
  initialData?: IInternProfile | null;
  internId?: string;
  redirectTo?: string;
  /** Mode override (auto-detected from initialData if not set) */
  mode?: "create" | "edit";
  /** Called with valid data on submit */
  onSubmit?: (values: InternProfileFormValues) => Promise<void> | void;
}

const defaultValues: InternProfileFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "MALE",
  dateOfBirth: new Date(),
  address: "",
  university: "",
  degree: "",
  major: "",
  graduationYear: new Date().getFullYear() + 1,
  cgpa: 0,
  batchId: "",
  startDate: new Date(),
  endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  status: "ACTIVE",
  notes: "",
  imageUrl: "",
};

export default function CreateInterProfileMain({
  batches,
  initialData,
  internId,
  mode,
  redirectTo,
  onSubmit,
}: CreateInterProfileMainProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isEdit = mode ? mode === "edit" : !!initialData;
  const resolvedId = internId ?? initialData?._id;

  // Build form defaults — merge incoming data into schema defaults
  const buildDefaults = (): InternProfileFormValues => {
    if (!initialData) return defaultValues;
    return {
      ...defaultValues,
      ...initialData,
      dateOfBirth: initialData.dateOfBirth
        ? new Date(initialData.dateOfBirth)
        : defaultValues.dateOfBirth,
      startDate: initialData.startDate
        ? new Date(initialData.startDate)
        : defaultValues.startDate,
      endDate: initialData.endDate
        ? new Date(initialData.endDate)
        : defaultValues.endDate,
      // Avoid undefined for optional strings
      notes: initialData.notes ?? "",
      imageUrl: initialData.imageUrl ?? "",
    } as InternProfileFormValues;
  };

  const form = useForm<InternProfileFormValues>({
    resolver: zodResolver(internProfileSchema),
    defaultValues: buildDefaults(),
    mode: "onBlur",
  });

  const handleSubmit = async (values: InternProfileFormValues) => {
    try {
      setIsSubmitting(true);

      // Allow callers to fully override behavior
      if (onSubmit) {
        await onSubmit(values);
      } else if (isEdit) {
        if (!resolvedId) throw new Error("Missing intern id for update");
        await updateInternProfile(resolvedId, values);
      } else {
        await createInternProfile(values);
      }

      setIsSuccess(true);
      toast.success(
        isEdit
          ? "Intern profile updated successfully"
          : "Intern profile created",
      );

      // Reset form for create mode (so user can add another)
      if (!isEdit) form.reset(defaultValues);

      // Redirect after success
      const target = redirectTo ?? "/dashboard/intern/admin/intern";
      setTimeout(() => {
        setIsSuccess(false);
        router.push(target);
        router.refresh();
      }, 700);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      console.error("Intern profile submit failed:", err);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    form.reset(buildDefaults());
    toast.info("Form reset");
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {isEdit ? (
                <Save className="h-5 w-5" />
              ) : (
                <UserPlus className="h-5 w-5" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                {isEdit ? "Edit Intern Profile" : "Create Intern Profile"}
              </h1>
              <p className="text-xs text-muted-foreground sm:text-sm">
                {isEdit
                  ? "Update the intern's details below and save your changes."
                  : "Fill in the intern's information to register them into a batch."}
              </p>
            </div>
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting}
              className="flex-1 gap-2 sm:flex-initial"
            >
              <X className="h-4 w-4" />
              Reset
            </Button>
            <Button
              type="submit"
              form="intern-profile-form"
              disabled={isSubmitting || isSuccess}
              className="flex-1 gap-2 sm:flex-initial"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isSubmitting ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </motion.span>
                ) : isSuccess ? (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Saved
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {isEdit ? "Update Profile" : "Create Profile"}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </motion.div>

        {/* Form */}
        <Form {...form}>
          <form
            id="intern-profile-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left main column */}
              <div className="space-y-6 lg:col-span-2">
                <PersonalInfoSection control={form.control} />
                <ContactInfoSection control={form.control} />
                <AcademicSection control={form.control} />
              </div>

              {/* Right sidebar */}
              <div className="space-y-6">
                <BatchAssignmentSection
                  control={form.control}
                  batches={batches}
                />

                {/* Sticky submit for desktop */}
                <Card className="hidden border-border/60 bg-muted/30 shadow-sm lg:block">
                  <CardContent className="space-y-3 p-4">
                    <p className="text-xs text-muted-foreground">
                      {isEdit
                        ? "Changes apply immediately once you save."
                        : "You can edit this profile later."}
                    </p>
                    <Button
                      type="submit"
                      disabled={isSubmitting || isSuccess}
                      className="w-full gap-2"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          {isEdit ? "Update Profile" : "Create Profile"}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
