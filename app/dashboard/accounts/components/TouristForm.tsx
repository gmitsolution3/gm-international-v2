"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TouristFormData {
  clientName: string;
  destinationCountry: string;
  coverageAreas: { value: string }[];
  clientPhone: string;
  passportNumber: string;
  gender: string;
  numberOfGuests: number;
  duration: string;
  flyingDate: string;
  totalAmount: number;
  advance: number;
}

// ─── Shared Classes ───────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl border border-red-200 bg-red-50/40 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 hover:border-red-300";

const selectCls =
  "w-full rounded-xl border border-red-200 bg-red-50/40 px-4 py-3 pr-10 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 hover:border-red-300 appearance-none cursor-pointer";

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

export default function TouristForm({
  email,
}: {
  email: string | undefined | null;
}) {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success"
  >("idle");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<TouristFormData>({
    mode: "onBlur",
    defaultValues: {
      coverageAreas: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "coverageAreas",
  });

  const totalAmount = watch("totalAmount") ?? 0;
  const advance = watch("advance") ?? 0;
  const due = Math.max(0, Number(totalAmount) - Number(advance));

  const onSubmit = async (data: TouristFormData) => {
    setSubmitStatus("loading");
    const payload = {
      ...data,
      coverageAreas: data.coverageAreas.map((a) => a.value).filter(Boolean),
      due,
      submittedBy: email,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/account-tourist/api/v1/accounts/tourist-application`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      const result = await response.json();

      if (result.success) {
        toast.success(
          result.message || "Patient record submitted successfully!",
        );
        setSubmitStatus("success");
        setSubmitStatus("idle");
        reset();
        router.push("/dashboard/accounts/tourist");
        return;
      }

      toast.error(result.message || "Failed to submit medical application.");
    } catch (err) {
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

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              {/* Plane icon */}
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-red-200 bg-white/10 px-3 py-1 rounded-full">
              Tourist Section
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            Tourist Registration Form
          </h1>
          <p className="text-red-200 text-sm mt-1.5">
            Fill in client and trip details to complete the booking process.
          </p>
        </div>

        {/* ── Form Card ── */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-xl shadow-red-900/5 px-6 md:px-10 py-8 mt-4">
          {/* Success Banner */}
          {submitStatus === "success" && (
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
                  Tourist booking has been recorded.
                </p>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* ── Client Info ── */}
            <SectionDivider label="Client Information" />

            {/* Client Name */}
            <FormField
              label="Client Name"
              required
              error={errors.clientName?.message}
            >
              <input
                {...register("clientName", {
                  required: "Client name is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                })}
                type="text"
                placeholder="e.g. Arif Rahman"
                className={inputCls}
              />
            </FormField>

            {/* Gender + Number of Guests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Gender */}
              <FormField label="Gender" required error={errors.gender?.message}>
                <div className="relative">
                  <select
                    {...register("gender", {
                      required: "Please select gender",
                    })}
                    className={selectCls}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="w-4 h-4 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </FormField>

              {/* Number of Guests */}
              <FormField
                label="Number of Guests"
                required
                error={errors.numberOfGuests?.message}
              >
                <input
                  {...register("numberOfGuests", {
                    required: "Number of guests is required",
                    min: { value: 1, message: "At least 1 guest" },
                    max: { value: 100, message: "Max 100 guests" },
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="e.g. 4"
                  min={1}
                  max={100}
                  className={inputCls}
                />
              </FormField>
            </div>

            {/* Phone + Passport */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="Client Phone"
                required
                error={errors.clientPhone?.message}
              >
                <input
                  {...register("clientPhone", {
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

              <FormField
                label="Passport Number"
                error={errors.passportNumber?.message}
                hint="Optional — fill if available"
              >
                <input
                  {...register("passportNumber", {
                    pattern: {
                      value: /^[A-Z0-9]{6,12}$/i,
                      message: "Enter a valid passport number",
                    },
                  })}
                  type="text"
                  placeholder="e.g. AB1234567"
                  className={inputCls}
                />
              </FormField>
            </div>

            {/* ── Trip Details ── */}
            <SectionDivider label="Trip Details" />

            {/* Destination Country */}
            <FormField
              label="Destination Country"
              required
              error={errors.destinationCountry?.message}
            >
              <input
                {...register("destinationCountry", {
                  required: "Destination is required",
                })}
                type="text"
                placeholder="e.g. Thailand, Malaysia, Turkey"
                className={inputCls}
              />
            </FormField>

            {/* Coverage Areas — dynamic string[] */}
            <FormField
              label="Coverage Areas"
              required
              error={
                errors.coverageAreas
                  ? ((errors.coverageAreas as { message?: string }).message ??
                    "Fix coverage area errors")
                  : undefined
              }
              hint="Add all cities/spots this tour will cover"
            >
              <div className="flex flex-col gap-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <input
                      {...register(`coverageAreas.${index}.value`, {
                        required: "Area name is required",
                      })}
                      type="text"
                      placeholder={`e.g. ${["Bangkok", "Phuket", "Chiang Mai", "Pattaya"][index % 4]}`}
                      className={inputCls}
                    />
                    {/* Remove button — always show if more than 1 */}
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors duration-150"
                        aria-label="Remove area"
                      >
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                    {/* Error per field */}
                  </div>
                ))}

                {/* Per-field error messages */}
                {errors.coverageAreas &&
                  Array.isArray(errors.coverageAreas) &&
                  errors.coverageAreas.map((err, i) =>
                    err?.value ? (
                      <p
                        key={i}
                        className="text-xs text-red-500 flex items-center gap-1"
                      >
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
                        Area {i + 1}: {err.value.message}
                      </p>
                    ) : null,
                  )}

                {/* Add Area Button */}
                <button
                  type="button"
                  onClick={() => append({ value: "" })}
                  className="mt-1 self-start flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-xl transition-colors duration-150"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Area
                </button>
              </div>
            </FormField>

            {/* Duration + Flying Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="Duration"
                required
                error={errors.duration?.message}
              >
                <input
                  {...register("duration", {
                    required: "Duration is required",
                  })}
                  type="text"
                  placeholder="e.g. 7 Days / 6 Nights"
                  className={inputCls}
                />
              </FormField>

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
            </div>

            {/* ── Payment ── */}
            <SectionDivider label="Payment Details" />

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

            {/* Submit */}
            <button
              type="submit"
              disabled={
                submitStatus === "loading" || submitStatus === "success"
              }
              className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-300 disabled:to-red-400 text-white font-semibold text-sm py-4 rounded-xl transition-all duration-200 shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {submitStatus === "loading" ? (
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
              ) : submitStatus === "success" ? (
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
                  Submit Booking
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
