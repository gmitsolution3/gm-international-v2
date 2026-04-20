// app/components/TeamMemberForm.tsx
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { UploadToCloudinary } from "@/app/components/uploadPdf/uploadToCloudinary";


// Define the Zod schema for validation
const teamMemberSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().min(5, "Bio must be at least 5 characters"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

interface TeamMemberFormProps {
  initialData?: TeamMemberFormData & { id?: number };
  onSubmit: (data: TeamMemberFormData) => void | Promise<void>;
  submitButtonText?: string;
}

export default function TeamMemberForm({
  initialData,
  onSubmit,
  submitButtonText = "Save Member",
}: TeamMemberFormProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: initialData || {
      name: "",
      role: "",
      bio: "",
      image: "",
    },
  });

  const currentImage = watch("image");

  // Set preview when image URL changes
  useEffect(() => {
    if (currentImage && typeof currentImage === "string") {
      setPreviewUrl(currentImage);
    } else {
      setPreviewUrl(null);
    }
  }, [currentImage]);

  // Reset form when initialData changes (e.g., editing)
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      if (initialData.image) {
        setPreviewUrl(initialData.image);
      }
    } else {
      reset({
        name: "",
        role: "",
        bio: "",
        image: "",
      });
      setPreviewUrl(null);
    }
  }, [initialData, reset]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Please upload a valid image (JPEG, PNG, WEBP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size must be less than 5MB");
      return;
    }

    setUploading(true);
    setUploadError(null);

    // Create local preview
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    try {
      // Upload to Cloudinary
      const uploadedUrl = await UploadToCloudinary(file);
      setValue("image", uploadedUrl);
      setUploadError(null);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload image. Please try again.");
      setPreviewUrl(currentImage || null);
    } finally {
      setUploading(false);
      // Clean up local preview URL
      URL.revokeObjectURL(localPreview);
    }
  };

  const handleFormSubmit: SubmitHandler<TeamMemberFormData> = async (data) => {
    await onSubmit(data);
    if (!initialData) {
      reset();
      setPreviewUrl(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-6 bg-white rounded-xl shadow-md border border-red-100 p-4 sm:p-6 md:p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-red-500 pb-2 inline-block">
          Team Member Information
        </h2>

        {/* Image Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>

          {/* Image Preview */}
          {previewUrl && (
            <div className="relative w-32 h-32 mb-3 rounded-full overflow-hidden border-2 border-red-200">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Upload Button */}
          <div className="flex items-center gap-4">
            <label
              className={`relative cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span>{uploading ? "Uploading..." : "Upload Image"}</span>
              <input
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </label>
            {currentImage && !uploading && (
              <button
                type="button"
                onClick={() => {
                  setValue("image", "");
                  setPreviewUrl(null);
                }}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>

          {/* Upload Error */}
          {uploadError && (
            <p className="text-sm text-red-600 mt-1">{uploadError}</p>
          )}

          {/* Image URL field (hidden, managed by form) */}
          <input type="hidden" {...register("image")} />
          {errors.image && (
            <p className="text-sm text-red-600 mt-1">{errors.image.message}</p>
          )}

          <p className="text-xs text-gray-500 mt-1">
            Upload JPEG, PNG, or WEBP (max 5MB)
          </p>
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors`}
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Role Field */}
        <div className="space-y-2">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role <span className="text-red-500">*</span>
          </label>
          <input
            id="role"
            type="text"
            {...register("role")}
            className={`w-full px-3 py-2 border ${errors.role ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors`}
            placeholder="e.g., Founder & CEO"
          />
          {errors.role && (
            <p className="text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        {/* Bio Field */}
        <div className="space-y-2">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio <span className="text-red-500">*</span>
          </label>
          <textarea
            id="bio"
            rows={4}
            {...register("bio")}
            className={`w-full px-3 py-2 border ${errors.bio ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none`}
            placeholder="Enter professional bio..."
          />
          {errors.bio && (
            <p className="text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || uploading}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || uploading ? "Processing..." : submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}
