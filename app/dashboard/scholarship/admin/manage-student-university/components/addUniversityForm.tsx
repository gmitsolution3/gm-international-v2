"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Loader2, Plus, Upload } from "lucide-react";
import Dropdown from "@/app/(Public)/student-home-page/student-package/[id]/user-application-form/components/dropDown";
import Swal from "sweetalert2";

interface FormData {
  country: string;
  university: string;
  studyLevel: string;
  universityUrl: string;
  introduction: string;
  photo: File | null;
}

interface OnClose {
  onClose: () => void;
}

export default function AddUniversityForm({ onClose }: OnClose) {
  const [formData, setFormData] = useState<FormData>({
    country: "All",
    university: "Select University",
    studyLevel: "Study Level",
    universityUrl: "",
    introduction: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [uploaded, setUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    setUploaded(false);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pcakge_img_uploade");
    data.append("cloud_name", "dqyfwfeed");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (!result.secure_url) {
        throw new Error("Image upload failed");
      }
      setFormData((prev) => ({
        ...prev,
        photo: result.secure_url,
      }));
      setIsUploading(false);
      setUploaded(true);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleClearForm = () => {
    setFormData({
      country: "All",
      university: "",
      studyLevel: "Select Level",
      universityUrl: "Select University",
      introduction: "",
      photo: null,
    });
    setPhotoPreview("");
    onClose();
  };

  const handleUniversityForm = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/mange-university/admin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const resultOfRes = await res.json();

    if (!resultOfRes) {
      Swal.fire({
        title: "Something was wrong!! try again",
        icon: "error",
        draggable: false,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (resultOfRes.insertedId) {
      Swal.fire({
        title: "Your Form has been submitted",
        icon: "success",
        draggable: false,
        showConfirmButton: false,
        timer: 2000,
      });
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
          University Manage
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          * Fill up to add packages
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Row: Country, University, Photo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Country */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2 text-start">
              Country<span className="text-red-600">*</span>
            </label>
            <Dropdown
              options={["All", "Australia", "China", "Malaysia"]}
              value={formData.country}
              onChange={(value) => handleInputChange("country", value)}
            />
          </div>

          {/* University */}
          <div>
            <label className="block text-gray-600 text-sm text-start font-medium mb-2">
              University<span className="text-red-600">*</span>
            </label>
            <Dropdown
              options={[
                "Select University",
                "Harvard",
                "MIT",
                "Oxford",
                "Cambridge",
              ]}
              value={formData.university}
              onChange={(value) => handleInputChange("university", value)}
            />
          </div>

          {/* Photo Upload */}

          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
              Photo of the Student
            </label>
            <label
              htmlFor="fileUpload"
              className={`cursor-pointer w-full py-3 px-4 border-2 ${
                uploaded
                  ? "border-green-600 text-green-600"
                  : "border-red-600 text-red-600"
              } border-solid rounded-lg font-medium text-sm hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-md`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Upload PDF/Doc
                </>
              )}
            </label>

            <input
              id="fileUpload"
              type="file"
              onChange={(e) => handlePhotoChange(e)}
              className="hidden"
            />
            {uploaded && (
              <span className="text-sm text-green-500">
                Image uploaded successfully
              </span>
            )}
          </div>
        </div>

        {/* Photo Preview */}
        {photoPreview && (
          <div className="flex justify-center">
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
              <img
                src={photoPreview || "/placeholder.svg"}
                alt="University preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Second Row: Study Level, URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Study Level */}
          <div>
            <label className="text-start block text-gray-600 text-sm font-medium mb-2">
              Study Level
            </label>
            <Dropdown
              options={["Full", "Partial", "Merit"]}
              value={formData.studyLevel}
              onChange={(value) => handleInputChange("studyLevel", value)}
            />
          </div>

          {/* University URL */}
          <div>
            <label className="text-start block text-gray-600 text-sm font-medium mb-2">
              University URL
            </label>
            <input
              type="url"
              name="universityUrl"
              onChange={(e) =>
                handleInputChange("universityUrl", e.target.value)
              }
              value={formData.universityUrl}
              placeholder="Past URL"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Introduction Textarea */}
        <div>
          <label className="text-start block text-gray-600 text-sm font-medium mb-2">
            University Introduction
          </label>
          <textarea
            name="introduction"
            value={formData.introduction}
            onChange={(e) => handleInputChange("introduction", e.target.value)}
            placeholder="Enter university introduction..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            rows={4}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleUniversityForm}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
            >
              <Plus className="w-5 h-5" />
              <span>Add </span>
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              Save Edits
            </button>

            <button
              type="button"
              className="px-6 py-3 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800 transition"
            >
              Delete
            </button>
          </div>

          <button
            type="button"
            onClick={handleClearForm}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
          >
            Clear form
          </button>
        </div>
      </form>
    </div>
  );
}
