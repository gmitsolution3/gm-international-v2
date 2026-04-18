"use client";

// components/PackageForm.tsx
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UploadToCloudinary } from "@/app/components/uploadPdf/uploadToCloudinary";
import dynamic from "next/dynamic";

const DescriptionEditor = dynamic(
  () =>
    import("@/app/dashboard/medical/admin/manage-application-package/components/DescriptionEditor"),
  {
    ssr: false,
  },
);

// Form validation schema
const packageSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  thumbnail: z.string().url("Thumbnail is required"),
  gallery_image: z.array(z.string().url()),
  price: z.number().positive("Price must be positive"),
  discount_price: z.number().optional(),
  departure_date: z.date(),
  return_date: z.date(),
  seats: z.number().int().positive("Seats must be positive"),
  includes: z.array(
    z.object({
      value: z.string().min(1, "Include item required"),
    }),
  ),

  excludes: z.array(
    z.object({
      value: z.string().min(1, "Exclude item required"),
    }),
  ),
  package_status: z.enum(["active", "inactive", "upcoming"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type PackageFormData = z.infer<typeof packageSchema>;

interface PackageFormProps {
  onSubmit: (data: PackageFormData) => Promise<void>;
  defaultValues?: Partial<PackageFormData>;
}

export const PackageForm: React.FC<PackageFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PackageFormData>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      gallery_image: [],
      includes: [{ value: "" }],
      excludes: [{ value: "" }],
      package_status: "active",
      ...defaultValues,
    },
  });

  const {
    fields: includeFields,
    append: appendInclude,
    remove: removeInclude,
  } = useFieldArray({
    control,
    name: "includes",
  });

  const {
    fields: excludeFields,
    append: appendExclude,
    remove: removeExclude,
  } = useFieldArray({
    control,
    name: "excludes",
  });

  const titleValue = watch("title");

  // Auto-generate slug from title
  useEffect(() => {
    if (titleValue) {
      const slug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setValue("slug", slug);
    }
  }, [titleValue, setValue]);

  const handleImageUpload = async (
    file: File,
    fieldName: "thumbnail" | "gallery_image",
    index?: number,
  ) => {
    setUploadingImage(true);
    try {
      const imageUrl = await UploadToCloudinary(file);
      if (fieldName === "thumbnail") {
        setValue("thumbnail", imageUrl);
      } else if (fieldName === "gallery_image" && index !== undefined) {
        const currentGallery = watch("gallery_image");
        currentGallery[index] = imageUrl;
        setValue("gallery_image", currentGallery);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const addGalleryImage = () => {
    const currentGallery = watch("gallery_image");
    setValue("gallery_image", [...currentGallery, ""]);
  };

  const removeGalleryImage = (index: number) => {
    const currentGallery = watch("gallery_image");
    currentGallery.splice(index, 1);
    setValue("gallery_image", currentGallery);
  };

  const onFormSubmit = async (data: PackageFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
    >
      {/* Header */}
      <div className="border-b border-red-200 pb-4">
        <h2 className="text-2xl font-bold text-red-700">Package Information</h2>
        <p className="text-red-600 mt-1">
          Create and manage your travel package
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-red-800">
            Title *
          </label>
          <input
            {...register("title")}
            className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            placeholder="Enter package title"
          />
          {errors.title && (
            <p className="text-red-600 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-red-800">
            Slug *
          </label>
          <input
            {...register("slug")}
            className="w-full px-4 py-2 bg-red-50 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            placeholder="auto-generated slug"
            readOnly
          />
          {errors.slug && (
            <p className="text-red-600 text-sm">{errors.slug.message}</p>
          )}
        </div>

        {/* Thumbnail */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-red-800">
            Thumbnail *
          </label>
          <Controller
            name="thumbnail"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, "thumbnail");
                  }}
                  className="w-full px-4 py-2 border border-red-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
                {uploadingImage && (
                  <p className="text-red-600 text-sm mt-1">Uploading...</p>
                )}
                {field.value && (
                  <div className="mt-2">
                    <img
                      src={field.value}
                      alt="Thumbnail"
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            )}
          />
          {errors.thumbnail && (
            <p className="text-red-600 text-sm">{errors.thumbnail.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-red-800">
            Price *
          </label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-red-600 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Discount Price */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-red-800">
            Discount Price
          </label>
          <input
            type="number"
            {...register("discount_price", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            placeholder="Enter discount price"
          />
        </div>

        {/* Seats */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-red-800">
            Available Seats *
          </label>
          <input
            type="number"
            {...register("seats", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            placeholder="Enter number of seats"
          />
          {errors.seats && (
            <p className="text-red-600 text-sm">{errors.seats.message}</p>
          )}
        </div>

        {/* Departure Date */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-red-800">
            Departure Date *
          </label>
          <Controller
            name="departure_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date: Date | null) => field.onChange(date)}
                className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                dateFormat="yyyy-MM-dd"
                placeholderText="Select departure date"
              />
            )}
          />
          {errors.departure_date && (
            <p className="text-red-600 text-sm">
              {errors.departure_date.message}
            </p>
          )}
        </div>

        {/* Return Date */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-red-800">
            Return Date *
          </label>
          <Controller
            name="return_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date: Date | null) => field.onChange(date)}
                className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                dateFormat="yyyy-MM-dd"
                placeholderText="Select return date"
              />
            )}
          />
          {errors.return_date && (
            <p className="text-red-600 text-sm">{errors.return_date.message}</p>
          )}
        </div>

        {/* Package Status */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-red-800">
            Package Status *
          </label>
          <select
            {...register("package_status")}
            className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      </div>

      {/* Gallery Images */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-red-800">
          Gallery Images
        </label>
        {watch("gallery_image").map((_, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Controller
              name={`gallery_image.${index}`}
              control={control}
              render={({ field }) => (
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, "gallery_image", index);
                    }}
                    className="w-full px-4 py-2 border border-red-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  />
                  {field.value && (
                    <div className="mt-2">
                      <img
                        src={field.value}
                        alt={`Gallery ${index}`}
                        className="h-16 w-16 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}
            />
            <button
              type="button"
              onClick={() => removeGalleryImage(index)}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addGalleryImage}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
        >
          + Add Gallery Image
        </button>
      </div>

      {/* Includes */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-red-800">
          What's Included
        </label>
        {includeFields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-3">
            <input
              {...register(`includes.${index}.value`)}
              className="flex-1 px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
              placeholder="e.g., Airport Transfer"
            />
            <button
              type="button"
              onClick={() => removeInclude(index)}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendInclude({ value: "" })}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
        >
          + Add Include Item
        </button>
      </div>

      {/* Excludes */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-red-800">
          What's Excluded
        </label>
        {excludeFields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-3">
            <input
              {...register(`excludes.${index}.value`)}
              className="flex-1 px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
              placeholder="e.g., Insurance"
            />
            <button
              type="button"
              onClick={() => removeExclude(index)}
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendExclude({ value: "" })}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
        >
          + Add Exclude Item
        </button>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-red-800">
          Description *
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <DescriptionEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t border-red-200">
        <button
          type="submit"
          disabled={isSubmitting || uploadingImage}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Create Package"}
        </button>
      </div>
    </form>
  );
};
