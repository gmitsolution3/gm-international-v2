"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Plus,
  X,
  Upload,
  Calendar,
  Users,
  DollarSign,
  Plane,
  Globe,
  ChevronDown,
  Save,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DescriptionEditor = dynamic(
  () =>
    import("@/app/dashboard/medical/admin/manage-application-package/components/DescriptionEditor"),
  {
    ssr: false,
  },
);

// Types
interface TourPlan {
  destination: string;
  sub_destination: string[];
}

export interface TourPackageFormData {
  _id?: string;
  p_title: string;
  p_price: number;
  number_of_member: number;
  duration: string;
  is_with_air_ticket: boolean;
  start_form: string;
  includes: string[];
  excludes: string[];
  country: string[];
  thumbnail: string;
  gallery: string[];
  tour_plan: TourPlan[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isB2B: boolean;
  b2b_price: number;
  isInternationalPackage: boolean;
  international_package_price: number;
  description: string;
}

// Array Input Component
const ArrayInput = ({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}) => {
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    if (inputValue.trim()) {
      onChange([...values, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeItem = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-red-800">{label}</label>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" && (e.preventDefault(), addItem())
          }
          placeholder={placeholder}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={addItem}
          className="w-10 px-2 py-1 bg-red-700 text-white rounded-lg hover:bg-red-900 transition flex items-center justify-center gap-2"
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((item, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-red-50 text-red-800 rounded-full text-sm flex items-center gap-2 border border-red-200"
          >
            {item}
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-red-600 hover:text-red-800"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

// Main Form Component
const TourPackageForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TourPackageFormData>({
    defaultValues: {
      p_title: "",
      p_price: 0,
      number_of_member: 1,
      duration: "",
      is_with_air_ticket: false,
      start_form: "",
      includes: [],
      excludes: [],
      country: [],
      thumbnail: "",
      gallery: [],
      tour_plan: [{ destination: "", sub_destination: [""] }],
      createdBy: "",
      isB2B: false,
      b2b_price: 0,
      isInternationalPackage: false,
      international_package_price: 0,
      description: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tour_plan",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isBulkUploading, setIsBulkUploading] = useState(false);

  const router = useRouter();

  const isB2B = watch("isB2B");
  const isInternational = watch("isInternationalPackage");

  const uploadToCloudinary = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pcakge_img_uploade");
    data.append("cloud_name", "dqyfwfeed");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
      {
        method: "POST",
        body: data,
      },
    );

    const result = await res.json();
    return result.secure_url;
  };

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const imageUrl = await uploadToCloudinary(file);

  
      // react-hook-form value set
      setValue("thumbnail", imageUrl);
    } catch (error) {
      console.error("Thumbnail upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    try {
      setIsBulkUploading(true);
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadToCloudinary(file)),
      );
      const currentGallery = watch("gallery") || [];
  
      setValue("gallery", [...currentGallery, ...uploadedUrls]);
    } catch (error) {
      console.error("Gallery upload failed:", error);
    } finally {
      setIsBulkUploading(false);
    }
  };

  const onSubmit = async (data: TourPackageFormData) => {
    data.createdAt = new Date();
    data.updatedAt = new Date();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-package`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const result =await res.json();
      if (!res.ok) {
        return toast.error("Data not inserted yet!! try again");
      }
      toast.success("Data inserted successfully");
      router.push("/dashboard/tourist/admin/manage-package");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Create New Tour Package
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Fill in the details below to create an amazing tour package
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-red-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-red-50/50 rounded-xl p-6 space-y-4 border border-red-100">
                <h2 className="text-xl font-semibold text-red-800 flex items-center gap-2">
                  <DollarSign size={20} /> Basic Information
                </h2>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-red-800 mb-2">
                    Package Title *
                  </label>
                  <input
                    type="text"
                    {...register("p_title", {
                      required: "Package title is required",
                      minLength: {
                        value: 5,
                        message: "Title must be at least 5 characters",
                      },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., Summer Paradise Tour"
                  />
                  {errors.p_title && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.p_title.message}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-red-800 mb-2">
                    Regular Price ($) *
                  </label>
                  <input
                    type="number"
                    {...register("p_price", {
                      required: "Price is required",
                      min: { value: 0, message: "Price must be positive" },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                  {errors.p_price && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.p_price.message}
                    </p>
                  )}
                </div>

                {/* Number of Members */}
                <div>
                  <label className="block text-sm font-medium text-red-800 mb-2">
                    Number of Members
                  </label>
                  <div className="flex items-center gap-2">
                    <Users className="text-red-600" size={20} />
                    <input
                      type="number"
                      {...register("number_of_member", {
                        min: { value: 1, message: "Minimum 1 member required" },
                      })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      min="1"
                    />
                  </div>
                  {errors.number_of_member && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.number_of_member.message}
                    </p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-red-800 mb-2">
                    Duration *
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-red-600" size={20} />
                    <input
                      type="text"
                      {...register("duration", {
                        required: "Duration is required",
                      })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="e.g., 7 Days / 6 Nights"
                    />
                  </div>
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.duration.message}
                    </p>
                  )}
                </div>

                {/* Start Form */}
                <div>
                  <label className="block text-sm font-medium text-red-800 mb-2">
                    Start From
                  </label>
                  <input
                    type="text"
                    {...register("start_form")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., Dhaka"
                  />
                </div>
              </div>

              {/* Pricing Options */}
              <div className="bg-red-50/50 rounded-xl p-6 space-y-4 border border-red-100">
                <h2 className="text-xl font-semibold text-red-800">
                  Pricing Options
                </h2>

                {/* B2B Option */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("isB2B")}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      B2B Package
                    </span>
                  </label>

                  {isB2B && (
                    <div>
                      <label className="block text-sm font-medium text-red-800 mb-2">
                        B2B Price ($)
                      </label>
                      <input
                        type="number"
                        {...register("b2b_price", {
                          required: isB2B ? "B2B price is required" : false,
                          min: { value: 0, message: "Price must be positive" },
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  )}
                </div>

                {/* International Package Option */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("isInternationalPackage")}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      International Package
                    </span>
                  </label>

                  {isInternational && (
                    <div>
                      <label className="block text-sm font-medium text-red-800 mb-2">
                        International Package Price ($)
                      </label>
                      <input
                        type="number"
                        {...register("international_package_price", {
                          required: isInternational
                            ? "International price is required"
                            : false,
                          min: { value: 0, message: "Price must be positive" },
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  )}
                </div>

                {/* Air Ticket Option */}
                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    {...register("is_with_air_ticket")}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Plane size={18} className="text-red-600" /> Include Air
                    Ticket
                  </span>
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Countries */}
              <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                <h2 className="text-xl font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <Globe size={20} /> Destination Countries
                </h2>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "At least one country is required" }}
                  render={({ field }) => (
                    <ArrayInput
                      label="Countries"
                      values={field.value}
                      onChange={field.onChange}
                      placeholder="Enter country name"
                    />
                  )}
                />
                {errors.country && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Includes & Excludes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                  <Controller
                    name="includes"
                    control={control}
                    render={({ field }) => (
                      <ArrayInput
                        label="What's Included"
                        values={field.value}
                        onChange={field.onChange}
                        placeholder="Add included items"
                      />
                    )}
                  />
                </div>

                <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                  <Controller
                    name="excludes"
                    control={control}
                    render={({ field }) => (
                      <ArrayInput
                        label="What's Excluded"
                        values={field.value}
                        onChange={field.onChange}
                        placeholder="Add excluded items"
                      />
                    )}
                  />
                </div>
              </div>

              {/* Tour Plan */}
              <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-red-800">
                    Tour Plan
                  </h2>
                  <button
                    type="button"
                    onClick={() =>
                      append({ destination: "", sub_destination: [""] })
                    }
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-2"
                  >
                    <Plus size={16} /> Add Destination
                  </button>
                </div>

                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="mb-6 p-4 bg-white rounded-lg border border-red-200"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-red-800">
                        Destination {index + 1}
                      </h3>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        {...register(`tour_plan.${index}.destination`)}
                        placeholder="Destination name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />

                      <Controller
                        name={`tour_plan.${index}.sub_destination`}
                        control={control}
                        render={({ field }) => (
                          <ArrayInput
                            label="Sub Destinations"
                            values={field.value}
                            onChange={field.onChange}
                            placeholder="Add sub destination"
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description - Quill Editor */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-red-800 mb-2">
              Description *
            </label>
            <Controller
              name="description"
              control={control}
              rules={{
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <DescriptionEditor value={value} onChange={onChange} />
              )}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image Upload Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-sm font-medium text-red-800 mb-2">
                Thumbnail Image
              </label>

              <div className="relative border-2 border-dashed border-red-300 rounded-xl p-6 text-center hover:border-red-500 transition bg-red-50/40">
                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  disabled={isUploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {/* If No Thumbnail Yet */}
                {!watch("thumbnail") && !isUploading && (
                  <div className="flex flex-col items-center gap-3 pointer-events-none">
                    <Upload size={36} className="text-red-600" />
                    <p className="text-sm font-medium text-gray-700">
                      Click or drag thumbnail to upload
                    </p>
                    <p className="text-xs text-gray-500">
                      Recommended size: 800x600px
                    </p>
                  </div>
                )}

                {/* Loader */}
                {isUploading && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
                    <p className="text-sm text-red-600 font-medium">
                      Uploading thumbnail...
                    </p>
                  </div>
                )}

                {/* Preview */}
                {watch("thumbnail") && !isUploading && (
                  <div className="relative group">
                    <img
                      src={watch("thumbnail")}
                      alt="Thumbnail Preview"
                      className="mx-auto rounded-lg max-h-56 object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center gap-4">
                      <span className="text-white text-sm font-medium">
                        Change Image
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setValue("thumbnail", "");
                        }}
                        className="bg-white text-red-600 px-3 py-1 rounded-md text-xs font-medium hover:bg-red-600 hover:text-white transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-red-800 mb-2">
                Gallery Images
              </label>

              <div
                className={`relative border-2 border-dashed ${watch("gallery")?.length > 0 ? "border-green-300 bg-green-50/40" : "border-red-300 bg-red-50/40"}  rounded-xl p-6 text-center hover:border-red-500 transition `}
              >
                {/* Hidden Input */}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  disabled={isBulkUploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {/* Content */}
                <div className="flex flex-col items-center justify-center gap-3 pointer-events-none">
                  {/* Icon */}
                  <Upload
                    size={36}
                    className={`${watch("gallery")?.length > 0 ? "text-green-700" : "text-red-700"}`}
                  />

                  {!isBulkUploading ? (
                    <>
                      <p className="text-sm text-gray-700 font-medium">
                        Click or drag images to upload
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG supported
                      </p>
                    </>
                  ) : (
                    <>
                      {/* Loader */}
                      <div className="w-8 h-8 border-4 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
                      <p className="text-sm text-red-600 font-medium">
                        Uploading images...
                      </p>
                    </>
                  )}
                </div>
              </div>

              {watch("gallery")?.length > 0 && (
                <p className="mt-2 text-sm text-green-600">
                  {watch("gallery").length} image(s) uploaded
                </p>
              )}
            </div>
          </div>

          {/* Created By */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-red-800 mb-2">
              Created By
            </label>
            <input
              type="text"
              {...register("createdBy")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Your name or ID"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              onClick={() => console.log("clicked")}
              className="px-8 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition transform hover:scale-105 flex items-center gap-2 shadow-lg"
            >
              <Save size={20} />
              Save Tour Package
            </button>
          </div>
        </form>
      </div>

      {/* Custom Quill Editor Styles */}
      <style jsx global>{`
        .quill-editor-wrapper .ql-container {
          min-height: 200px;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
        .quill-editor-wrapper .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          background-color: #f8f8f8;
        }
        .quill-editor-wrapper .ql-editor {
          min-height: 200px;
        }
      `}</style>
    </div>
  );
};

export default TourPackageForm;
