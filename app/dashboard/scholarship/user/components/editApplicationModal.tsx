"use client";

import Dropdown from "@/app/(Public)/student-home-page/student-package-offer/user_application_form/components/dropDown";
import { Loader2, Upload } from "lucide-react";
import { useEffect, useState } from "react";

interface FormData {
  _id: string;
  applicantId: string;
  country: string;
  university: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  admissionSemester: string;
  language: string;
  courseName: string;
  coverage: string;
  email: string;
  category: string;
  paymentMethod: string;
}

const initialData = {
  _id: "",
  applicantId: "",
  country: "",
  university: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  gender: "Male",
  dateOfBirth: "",
  admissionSemester: "",
  language: "English",
  courseName: "BBA",
  coverage: "Tuition",
  email: "",
  category: "Full",
  paymentMethod: "Bkash",
};

export const EditApplicationModal = ({
  filteredApplications,
  selectedId,
}: {
  filteredApplications: any[];
  selectedId?: string | null;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [imgFormData, setImgFormData] = useState<{ secure_url: string }>({
    secure_url: "",
  });

  const [formData, setFormData] = useState<FormData>(initialData);
  const [originalData, setOriginalData] = useState(initialData);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = async (e: any) => {
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
      if (result.secure_url) {
        setImgFormData({ secure_url: result.secure_url });
        setUploaded(true);
      } else {
        console.error("Image upload failed: URL not found");
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  // Auto-fill selected application
  useEffect(() => {
    if (!selectedId) return;
    const selectedApp = filteredApplications.find((a) => a._id === selectedId);

    if (selectedApp) {
      setFormData({
        _id: selectedApp._id || "",
        applicantId: selectedApp.applicantId || "",
        country: selectedApp.country || "",
        university: selectedApp.university || "",
        firstName: selectedApp.firstName || "",
        lastName: selectedApp.lastName || "",
        phoneNumber: selectedApp.phoneNumber || "",
        gender: selectedApp.gender || "Male",
        dateOfBirth: selectedApp.dateOfBirth || "",
        admissionSemester: selectedApp.admissionSemester || "",
        language: selectedApp.language || "English",
        courseName: selectedApp.courseName || "BBA",
        coverage: selectedApp.coverage || "Tuition",
        email: selectedApp.email || "",
        category: selectedApp.category || "Full",
        paymentMethod: selectedApp.paymentMethod || "Bkash",
      });
      setImgFormData({ secure_url: selectedApp.imgUrl || "" });
    }
  }, [selectedId, filteredApplications]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Combine form data with uploaded image (if any)
    const updatedForm = {
      ...formData,
      imgUrl: imgFormData?.secure_url,
    };

    // Find only changed fields (difference from original data)
    const changedFields: Record<string, any> = {};
    Object.keys(updatedForm).forEach((key) => {
      if (
        updatedForm[key as keyof typeof updatedForm] !==
        originalData[key as keyof typeof originalData]
      ) {
        changedFields[key] = updatedForm[key as keyof typeof updatedForm];
      }
    });

    if (Object.keys(changedFields).length === 0) {
      return;
    }

    // 🔥 Ensure _id is never sent to the backend
    const { _id, ...payload } = changedFields;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/user/update-application/${formData._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Application updated successfully!");
      } else {
        console.error("❌ Update failed:", data);
        alert(`Update failed: ${data.message || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("❌ Error updating data:", err);
      alert("An unexpected error occurred while updating application.");
    }
  };

  return (
    <div>
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="mb-8 bg-[#F3F3F3] p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg">
          <p className="text-gray-700 font-semibold text-sm sm:text-base mb-4">
            * Fill up the form to update
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="text-start block text-sm font-medium text-gray-600 mb-2">
                Country
              </label>
              {/* <Dropdown
                options={["USA", "UK", "Canada", "Australia", "Germany"]}
                value={formData.country}
                onChange={(v) => handleInputChange("country", v)}
              /> */}

              <input
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all duration-300 text-sm sm:text-base"
                readOnly
              />
            </div>

            <div>
              <label className="text-start block text-sm font-medium text-gray-600 mb-2">
                University
              </label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) =>
                  handleInputChange("university", e.target.value)
                }
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 transition"
              />
            </div>

            <div>
              <label className="block text-start text-sm font-medium text-gray-600 mb-2">
                Photo of the Student
              </label>
              <label
                htmlFor="fileUpload"
                className={`cursor-pointer w-full py-3 px-4 border-2 bg-white ${
                  uploaded
                    ? "border-green-600 text-green-600 bg-green-50"
                    : "border-gray-400 text-gray-600"
                } rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </>
                )}
              </label>

              <input
                id="fileUpload"
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />
              {uploaded && (
                <span className="text-sm text-green-500">
                  Image uploaded successfully
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Row 2 and onwards */}
        <div className="mb-8 bg-[#F3F3F3] p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="text-start block text-sm font-medium text-gray-600 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full bg-white px-4 py-3 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 transition"
              />
            </div>

            <div>
              <label className="text-start block text-sm font-medium text-gray-600 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 transition"
              />
            </div>

            <div>
              <label className="text-start block text-sm font-medium text-gray-600 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className="w-full bg-white px-4 py-3 rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 transition"
              />
            </div>
          </div>

          {/* More fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="text-start block text-sm font-medium text-gray-600 mb-2">
                Gender
              </label>
              <Dropdown
                options={["Male", "Female", "Other"]}
                value={formData.gender}
                onChange={(v) => handleInputChange("gender", v)}
              />
            </div>

            <div>
              <label className=" text-start block text-sm font-medium text-gray-600 mb-2">
                Date of Birth
              </label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                className="px-4 py-3 bg-white rounded-lg border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 transition"
              />
            </div>

            <div>
              <label className="text-start block text-sm font-medium text-gray-600 mb-2">
                Admission Semester
              </label>
              <Dropdown
                options={["Fall", "Spring", "Summer"]}
                value={formData.admissionSemester}
                onChange={(v) => handleInputChange("admissionSemester", v)}
              />
            </div>
          </div>

          {/* Row 4: Language, Course Name, Coverage */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div
              className="animate-fade-in"
              style={{ animationDelay: "550ms" }}
            >
              <label className="text-start block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                Language
              </label>
              <Dropdown
                options={["English", "Spanish", "French", "German", "Arabic"]}
                value={formData.language}
                onChange={(value) => handleInputChange("language", value)}
              />
            </div>

            <div
              className="animate-fade-in"
              style={{ animationDelay: "600ms" }}
            >
              <label className="text-start block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                Course name
              </label>
              <Dropdown
                options={["BBA", "Engineering", "Medicine", "Law", "Science"]}
                value={formData.courseName}
                onChange={(value) => handleInputChange("courseName", value)}
              />
            </div>

            <div
              className="animate-fade-in"
              style={{ animationDelay: "650ms" }}
            >
              <label className="text-start block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                Coverage
              </label>
              <Dropdown
                options={["Tuition", "Full Scholarship", "Partial Scholarship"]}
                value={formData.coverage}
                onChange={(value) => handleInputChange("coverage", value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div
              className="animate-fade-in"
              style={{ animationDelay: "700ms" }}
            >
              <label className="text-start block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Example@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all duration-300 text-sm sm:text-base"
                readOnly
              />
            </div>
            <div
              className="animate-fade-in"
              style={{ animationDelay: "750ms" }}
            >
              <label className="text-start block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                Category
              </label>
              <Dropdown
                options={["Full", "Partial", "Merit"]}
                value={formData.category}
                onChange={(value) => handleInputChange("category", value)}
              />
            </div>
            <div
              className="animate-fade-in"
              style={{ animationDelay: "800ms" }}
            >
              <label className="text-start block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                Payment method
              </label>
              <input
                type="email"
                placeholder="Example@gmail.com"
                value={formData.paymentMethod}
                onChange={(e) =>
                  handleInputChange("paymentMethod", e.target.value)
                }
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all duration-300 text-sm sm:text-base"
                readOnly
              />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex justify-between flex-wrap gap-4 pt-6">
            <button
              type="submit"
              className="py-3 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              Update Application
            </button>

            <button
              type="button"
              className="py-3 px-6 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
            >
              Scan Passport
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
