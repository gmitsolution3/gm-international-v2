"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MedicalFormData {
  name: string;
  hospitalName: string;
  countryName: string;
  patientAge: number;
  patientDisease: string;
  patientPhone: string;
  flyingDate: string;
  totalAmount: number;
  advance: number;
}

// ─── Shared class strings ─────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl border border-red-200 bg-red-50/40 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 hover:border-red-300";

// ─── Reusable Field Wrapper ───────────────────────────────────────────────────

function FormField({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-red-900 tracking-wide">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
      {hint && !error && <p className="text-xs text-red-400 mt-0.5">{hint}</p>}
    </div>
  );
}

// ─── Section Divider ──────────────────────────────────────────────────────────

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-red-100" />
      <span className="text-xs font-bold tracking-widest uppercase text-red-400 whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-red-100" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MedicalForm({ authEmail }: { authEmail?: string | null | undefined }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<MedicalFormData>({ mode: "onBlur" });

  const totalAmount = watch("totalAmount") ?? 0;
  const advance = watch("advance") ?? 0;
  const due = Math.max(0, Number(totalAmount) - Number(advance));

  const onSubmit = async (data: MedicalFormData) => {

    const payload = {
      ...data,
      due,
      submittedBy: authEmail,
      createdAt: new Date().toISOString(),
    };

    try{
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/accounts/medical-application`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if(result.success){
         
          toast.success(result.message || "Patient record submitted successfully!");
          return
        }

        toast.error(result.message || "Failed to submit medical application.");
    }catch(err){
      console.error("Submission error:", err);
      toast.error("Failed to submit medical application.");
    }

  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* ── Header ── */}
        <div className="bg-linear-to-r from-red-700 to-red-900 rounded-2xl px-7 py-8 relative overflow-hidden shadow-lg shadow-red-900/25">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-14 -left-6 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />

          {/* Icon + Badge */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-red-200 bg-white/10 px-3 py-1 rounded-full">
              Medical Section
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            Medical Patient Form
          </h1>
          <p className="text-red-200 text-sm mt-1.5">
            Enter patient details and travel/payment information accurately.
          </p>
        </div>

        {/* ── Form Card ── */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-xl shadow-red-900/5 px-6 md:px-10 py-8 mt-4">
          {/* Success Banner */}
          {isSubmitSuccessful && (
            <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">
                  Successfully Submitted!
                </p>
                <p className="text-xs text-green-600">
                  Patient record has been saved.
                </p>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* ── Patient Info Section ── */}
            <SectionDivider label="Patient Information" />

            {/* Name */}
            <FormField
              label="Patient Name"
              required
              error={errors.name?.message}
            >
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                })}
                type="text"
                placeholder="e.g. Karim Hossain"
                className={inputCls}
              />
            </FormField>

            {/* Hospital + Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="Hospital Name"
                required
                error={errors.hospitalName?.message}
              >
                <input
                  {...register("hospitalName", {
                    required: "Hospital name is required",
                  })}
                  type="text"
                  placeholder="e.g. Apollo Hospital"
                  className={inputCls}
                />
              </FormField>

              <FormField
                label="Country Name"
                required
                error={errors.countryName?.message}
              >
                <input
                  {...register("countryName", {
                    required: "Country name is required",
                  })}
                  type="text"
                  placeholder="e.g. India / Thailand"
                  className={inputCls}
                />
              </FormField>
            </div>

            {/* Age + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="Patient Age"
                required
                error={errors.patientAge?.message}
              >
                <input
                  {...register("patientAge", {
                    required: "Age is required",
                    min: { value: 1, message: "Age must be at least 1" },
                    max: { value: 120, message: "Enter a valid age" },
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="e.g. 45"
                  min={1}
                  max={120}
                  className={inputCls}
                />
              </FormField>

              <FormField
                label="Patient Phone Number"
                required
                error={errors.patientPhone?.message}
              >
                <input
                  {...register("patientPhone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+]?[0-9\s\-]{7,15}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                  type="tel"
                  placeholder="e.g. +8801XXXXXXXXX"
                  className={inputCls}
                />
              </FormField>
            </div>

            {/* Disease */}
            <FormField
              label="Patient Disease"
              required
              error={errors.patientDisease?.message}
            >
              <input
                {...register("patientDisease", {
                  required: "Disease/condition is required",
                })}
                type="text"
                placeholder="e.g. Cardiac Valve Replacement, Kidney Stone"
                className={inputCls}
              />
            </FormField>

            {/* ── Travel Section ── */}
            <SectionDivider label="Travel Information" />

            {/* Flying Date */}
            <FormField
              label="Flying Date"
              required
              error={errors.flyingDate?.message}
            >
              <input
                {...register("flyingDate", {
                  required: "Flying date is required",
                  validate: (val) =>
                    new Date(val) >= new Date(new Date().toDateString()) ||
                    "Flying date cannot be in the past",
                })}
                type="date"
                className={inputCls}
                min={new Date().toISOString().split("T")[0]}
              />
            </FormField>

            {/* ── Payment Section ── */}
            <SectionDivider label="Payment Details" />

            {/* Total + Advance + Due */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <FormField
                label="Total Amount (৳)"
                required
                error={errors.totalAmount?.message}
              >
                <input
                  {...register("totalAmount", {
                    required: "Total amount is required",
                    min: { value: 1, message: "Must be greater than 0" },
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="0"
                  min={0}
                  className={inputCls}
                />
              </FormField>

              <FormField
                label="Advance (৳)"
                required
                error={errors.advance?.message}
              >
                <input
                  {...register("advance", {
                    required: "Advance is required",
                    min: { value: 0, message: "Cannot be negative" },
                    validate: (val) =>
                      Number(val) <= Number(totalAmount) ||
                      "Advance cannot exceed total",
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="0"
                  min={0}
                  className={inputCls}
                />
              </FormField>

              <FormField label="Due (৳)" hint="Auto-calculated">
                <div className="relative">
                  <input
                    type="number"
                    value={due}
                    readOnly
                    className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 pr-10 text-sm font-semibold text-red-700 outline-none cursor-not-allowed"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-red-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              </FormField>
            </div>

            {/* Payment Summary */}
            {(Number(totalAmount) > 0 || Number(advance) > 0) && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-5 py-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">
                  Payment Summary
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="font-semibold text-gray-800">
                    ৳{Number(totalAmount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Advance Paid</span>
                  <span className="font-semibold text-green-600">
                    ৳{Number(advance).toLocaleString()}
                  </span>
                </div>
                <div className="h-px bg-red-100" />
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-700">
                    Due Balance
                  </span>
                  <span
                    className={`font-bold text-base ${due > 0 ? "text-red-600" : "text-green-600"}`}
                  >
                    ৳{due.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isSubmitSuccessful}
              className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-300 disabled:to-red-400 text-white font-semibold text-sm py-4 rounded-xl transition-all duration-200 shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : isSubmitSuccessful ? (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Submitted!
                </>
              ) : (
                <>
                  Submit Patient Record
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-red-300 mt-4">
          Fields marked with <span className="text-red-500 font-bold">*</span>{" "}
          are required
        </p>
      </div>
    </div>
  );
}
