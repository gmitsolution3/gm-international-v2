"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Plane,
  Utensils,
  Car,
  Hotel,
  Users,
  Globe,
  Upload,
  X,
  Save,
  ArrowLeft,
  Image,
  FileText,
  Check,
  AlertCircle,
} from "lucide-react";
import { ApplicationData } from "./ViewApplication";
import { UploadToCloudinary } from "@/app/components/uploadPdf/uploadToCloudinary";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EditApplicationFormProps {
  data: ApplicationData;
}

const foodPlanOptions = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "All Inclusive",
  "Half Board",
  "Full Board",
];
const transportationOptions = [
  "Private Car",
  "Bus",
  "Train",
  "Flight",
  "Cruise",
  "SUV",
  "Van",
];
const hotelCategoryOptions = [
  "3 Star",
  "4 Star",
  "5 Star",
  "Budget",
  "Luxury",
  "Boutique",
];
const visaStatusOptions = [
  "already-have",
  "need-to-apply",
  "not-required",
  "in-process",
];
const airTicketOptions = [
  "economy",
  "premium-economy",
  "business",
  "first-class",
];
const genderOptions = ["male", "female", "other"];
const paymentMethodOptions = [
  "bkash",
  "nagad",
  "rocket",
  "bank-transfer",
  "credit-card",
];

const EditApplicationForm: React.FC<EditApplicationFormProps> = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(
    data.passportVisaImage,
  );
  const [packagePreviewImage, setPackagePreviewImage] = useState<string>(
    data.packageInfo.thumbnail,
  );
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      passportNumber: data.passportNumber,
      visaStatus: data.visaStatus,
      gender: data.gender,
      guests: {
        adults: data.guests.adults,
        children: data.guests.children,
        infants: data.guests.infants,
      },
      airTicket: data.airTicket,
      foodPlan: data.foodPlan,
      transportation: data.transportation,
      hotelCategory: data.hotelCategory,
      paymentMethod: data.paymentMethod,
      passportVisaImage: data.passportVisaImage,
      createdBy: data.createdBy,
      packageInfo: {
        title: data.packageInfo.title,
        thumbnail: data.packageInfo.thumbnail,
        packageName: data.packageInfo.packageName,
      },
      location: {
        country: data.location.country,
        destinationPlace: data.location.destinationPlace,
        subDestination: data.location.subDestination || "",
      },
      durationAndDates: {
        duration: data.durationAndDates.duration,
        dateFrom: new Date(data.durationAndDates.dateFrom)
          .toISOString()
          .slice(0, 16),
        startForm: data.durationAndDates.startForm,
      },
      totalCost: data.totalCost,
      isInternationalPackage: data.isInternationalPackage,
      includesAndExcludes: {
        includes: data.includesAndExcludes.includes,
        excludes: data.includesAndExcludes.excludes,
      },
      client: {
        b2bId: data.client?.b2bId || "",
        form: data.client?.form || "",
      },
    },
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "passport" | "package",
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const result = await UploadToCloudinary(file);
        if (type === "passport") {
          setValue("passportVisaImage", result.secure_url);
          setPreviewImage(result.secure_url);
        } else {
          setValue("packageInfo.thumbnail", result.secure_url);
          setPackagePreviewImage(result.secure_url);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeImage = (type: "passport" | "package") => {
    if (type === "passport") {
      setValue("passportVisaImage", "");
      setPreviewImage("");
    } else {
      setValue("packageInfo.thumbnail", "");
      setPackagePreviewImage("");
    }
  };

  const onSubmit = async (formData: any) => {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);
    const payload = { ...formData };
    if (!payload.client?.b2bId && !payload.client?.form) {
      delete payload.client;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-application/api/v1/update-single-application/${data._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update application");
      }

      setSubmitSuccess(true);
      toast.success("Application updated successfully");
      window.scrollTo({ top: 0, behavior: "smooth" });
      router.push("/dashboard/tourist/admin/manage-application");
      // Scroll to top to show success message
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => setSubmitSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  const InputField = ({ label, icon: Icon, error, ...props }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <span className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-gray-400" />}
          {label}
        </span>
      </label>
      <input
        {...props}
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );

  const CheckboxGroup = ({ label, options, value, onChange, error }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {options.map((option: string) => (
          <label
            key={option}
            className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={value?.includes(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...value, option]);
                } else {
                  onChange(value.filter((item: string) => item !== option));
                }
              }}
              className="rounded text-red-600 focus:ring-red-500"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Edit Application
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Application ID: {data._id}
              </p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>

          {/* Success/Error Messages */}
          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-4">
              <Check size={20} />
              <span>Application updated successfully!</span>
            </div>
          )}
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-4">
              <AlertCircle size={20} />
              <span>{submitError}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User size={20} className="text-red-600" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                label="Full Name"
                icon={User}
                {...register("fullName", { required: "Full name is required" })}
                error={errors.fullName?.message}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="flex items-center gap-2">
                    <Users size={16} className="text-gray-400" />
                    Gender
                  </span>
                </label>
                <select
                  {...register("gender")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <InputField
                label="Passport Number"
                icon={FileText}
                {...register("passportNumber", {
                  required: "Passport number is required",
                })}
                error={errors.passportNumber?.message}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="flex items-center gap-2">
                    <Globe size={16} className="text-gray-400" />
                    Visa Status
                  </span>
                </label>
                <select
                  {...register("visaStatus")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {visaStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                    </option>
                  ))}
                </select>
              </div>
              <InputField
                label="Phone Number"
                icon={Phone}
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
                error={errors.phoneNumber?.message}
              />
              <InputField
                label="Email"
                icon={Mail}
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email?.message}
              />
              <InputField
                label="Created By"
                icon={User}
                {...register("createdBy")}
              />
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-red-600" />
              Location Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                label="Country"
                icon={Globe}
                {...register("location.country", {
                  required: "Country is required",
                })}
                error={errors.location?.country?.message}
              />
              <InputField
                label="Destination Place"
                icon={MapPin}
                {...register("location.destinationPlace", {
                  required: "Destination is required",
                })}
                error={errors.location?.destinationPlace?.message}
              />
              <InputField
                label="Sub Destination (Optional)"
                icon={MapPin}
                {...register("location.subDestination")}
              />
              <InputField
                label="Starting From"
                icon={MapPin}
                {...register("durationAndDates.startForm", {
                  required: "Starting point is required",
                })}
                error={errors.durationAndDates?.startForm?.message}
              />
            </div>
          </div>

          {/* Travel Details Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-red-600" />
              Travel Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                label="Duration"
                icon={Calendar}
                placeholder="e.g., 5 Night 6 Days"
                {...register("durationAndDates.duration", {
                  required: "Duration is required",
                })}
                error={errors.durationAndDates?.duration?.message}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    Travel Date From
                  </span>
                </label>
                <input
                  type="datetime-local"
                  {...register("durationAndDates.dateFrom")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="flex items-center gap-2">
                    <Plane size={16} className="text-gray-400" />
                    Air Ticket Class
                  </span>
                </label>
                <select
                  {...register("airTicket")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {airTicketOptions.map((option) => (
                    <option key={option} value={option}>
                      {option
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                    </option>
                  ))}
                </select>
              </div>
              <InputField
                label="Total Cost (BDT)"
                icon={CreditCard}
                type="number"
                {...register("totalCost", {
                  required: "Total cost is required",
                })}
                error={errors.totalCost?.message}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="flex items-center gap-2">
                    <CreditCard size={16} className="text-gray-400" />
                    Payment Method
                  </span>
                </label>
                <select
                  {...register("paymentMethod")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {paymentMethodOptions.map((option) => (
                    <option key={option} value={option}>
                      {option
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("isInternationalPackage")}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    International Package
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Guests Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users size={20} className="text-red-600" />
              Guest Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Adults"
                icon={Users}
                type="number"
                {...register("guests.adults", {
                  required: "Required",
                  min: { value: 1, message: "At least 1 adult required" },
                })}
                error={errors.guests?.adults?.message}
              />
              <InputField
                label="Children"
                icon={Users}
                type="number"
                {...register("guests.children", { min: 0 })}
              />
              <InputField
                label="Infants"
                icon={Users}
                type="number"
                {...register("guests.infants", { min: 0 })}
              />
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Hotel size={20} className="text-red-600" />
              Preferences
            </h2>
            <div className="space-y-6">
              <Controller
                name="foodPlan"
                control={control}
                rules={{ required: "Select at least one meal plan" }}
                render={({ field }) => (
                  <CheckboxGroup
                    label="Food Plan"
                    options={foodPlanOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.foodPlan?.message}
                  />
                )}
              />
              <Controller
                name="transportation"
                control={control}
                rules={{ required: "Select at least one transportation" }}
                render={({ field }) => (
                  <CheckboxGroup
                    label="Transportation"
                    options={transportationOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.transportation?.message}
                  />
                )}
              />
              <Controller
                name="hotelCategory"
                control={control}
                rules={{ required: "Select at least one hotel category" }}
                render={({ field }) => (
                  <CheckboxGroup
                    label="Hotel Category"
                    options={hotelCategoryOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.hotelCategory?.message}
                  />
                )}
              />
            </div>
          </div>

          {/* Package Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Image size={20} className="text-red-600" />
              Package Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Package Title"
                icon={FileText}
                {...register("packageInfo.title", {
                  required: "Package title is required",
                })}
                error={errors.packageInfo?.title?.message}
              />
              <InputField
                label="Package Name"
                icon={FileText}
                {...register("packageInfo.packageName", {
                  required: "Package name is required",
                })}
                error={errors.packageInfo?.packageName?.message}
              />
            </div>
          </div>

          {/* Images Upload Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Image size={20} className="text-red-600" />
              Images
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Passport/Visa Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passport/Visa Image
                </label>
                <div className="space-y-3">
                  {previewImage ? (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Passport/Visa"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage("passport")}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <Upload
                          size={32}
                          className="mx-auto text-gray-400 mb-2"
                        />
                        <p className="text-sm text-gray-500">
                          No image uploaded
                        </p>
                      </div>
                    </div>
                  )}
                  <label className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer text-sm">
                    <Upload size={16} />
                    <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, "passport")}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>

              {/* Package Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Thumbnail
                </label>
                <div className="space-y-3">
                  {packagePreviewImage ? (
                    <div className="relative">
                      <img
                        src={packagePreviewImage}
                        alt="Package Thumbnail"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage("package")}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <Upload
                          size={32}
                          className="mx-auto text-gray-400 mb-2"
                        />
                        <p className="text-sm text-gray-500">
                          No image uploaded
                        </p>
                      </div>
                    </div>
                  )}
                  <label className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer text-sm">
                    <Upload size={16} />
                    <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, "package")}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Includes & Excludes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Check size={20} className="text-red-600" />
              Includes & Excludes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">
                  ✓ Includes
                </label>
                <textarea
                  {...register("includesAndExcludes.includes")}
                  placeholder="Enter includes (one per line)"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  onChange={(e) => {
                    const values = e.target.value
                      .split("\n")
                      .filter((v) => v.trim());
                    setValue("includesAndExcludes.includes", values);
                  }}
                  defaultValue={data.includesAndExcludes.includes.join("\n")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-red-700 mb-2">
                  ✗ Excludes
                </label>
                <textarea
                  {...register("includesAndExcludes.excludes")}
                  placeholder="Enter excludes (one per line)"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  onChange={(e) => {
                    const values = e.target.value
                      .split("\n")
                      .filter((v) => v.trim());
                    setValue("includesAndExcludes.excludes", values);
                  }}
                  defaultValue={data.includesAndExcludes.excludes.join("\n")}
                />
              </div>
            </div>
          </div>

          {/* Client Information (Optional) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Globe size={20} className="text-red-600" />
              Client Information{" "}
              <span className="text-sm font-normal text-gray-500">
                (Optional)
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="B2B ID"
                icon={User}
                {...register("client.b2bId")}
              />
              <InputField
                label="Form"
                icon={FileText}
                {...register("client.form")}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-sm text-gray-500">
              Last updated: {new Date(data.updatedAt).toLocaleString()}
            </p>
            <div className="flex gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApplicationForm;
