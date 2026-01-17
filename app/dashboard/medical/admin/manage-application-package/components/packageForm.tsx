import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  DollarSign,
  Stethoscope,
  Globe,
  FileText,
  Upload,
  Loader2,
  ImagePlus,
  ListPlus,
} from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

interface onCloseProps {
  onClose: () => void;
  email: string | null | undefined;
}

export default function ManagePackageForm({ onClose, email }: onCloseProps) {
  const [uploaded, setUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: "",
    appointmentDate: "",
    appointmentFree: "",
    treatmentDescription: "",
    hospitalWebLink: "",
    treatmentDetails: "",
    doctorExpertise: "",
    photo: "",
    country: "",
    createdAt: new Date().toLocaleString(),
    createdBy: email,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      formData.hospitalName &&
      formData.appointmentDate &&
      formData.appointmentFree &&
      formData.treatmentDescription &&
      formData.treatmentDetails &&
      formData.photo &&
      formData.country
    ) {
      const submitData = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-package`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const isSubmit = await submitData.json();

      if (!isSubmit) {
        Swal.fire({
          title: "Something was wrong!! try again",
          icon: "error",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      if (isSubmit.insertedId) {
        Swal.fire({
          title: "Your Form has been submitted",
          icon: "success",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
        onClose();
      }

      setSubmitted(true);
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleReset = () => {
    setFormData({
      hospitalName: "",
      appointmentDate: "",
      appointmentFree: "",
      treatmentDescription: "",
      hospitalWebLink: "",
      treatmentDetails: "",
      doctorExpertise: "",
      photo: "",
      country: "",
      createdAt: new Date().toLocaleString(),
      createdBy: email,
    });
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

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Hospital Appointment
          </h1>
          <p className="text-gray-600">
            Fill in your appointment details below
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
          {/* Basic Info Section */}
          <div className="border-b pb-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-red-500" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Hospital Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-1 text-red-500" />
                  Hospital Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  placeholder="Enter hospital name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Appointment Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-1 text-red-500" />
                  Appointment Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Appointment Free */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign size={16} className="inline mr-1 text-red-500" />
                  Appointment Fee <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="appointmentFree"
                  value={formData.appointmentFree}
                  onChange={handleChange}
                  placeholder="e.g., Free or ৳500"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div
                className="animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                  <ImagePlus size={16} className="inline mr-1 text-red-500" />
                  Photo of passport & visa
                  <span className="text-red-500">*</span>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ListPlus size={16} className="inline mr-1 text-red-500" />
                  Select Country <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-lg hover:cursor-pointer"
                >
                  <option value="">Select a country</option>
                  <option value="china">China</option>
                  <option value="malaysia">Malaysia</option>
                  <option value="australia">Australia</option>
                </select>
              </div>
            </div>
          </div>

          {/* Treatment Section */}
          <div className="border-b pb-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Stethoscope size={20} className="text-red-600" />
              Treatment Information <span className="text-red-500">*</span>
            </h2>

            <div className="space-y-4">
              {/* Treatment Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Treatment Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="treatmentDescription"
                  value={formData.treatmentDescription}
                  onChange={handleChange}
                  placeholder="Describe the treatment type..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>

              {/* Treatment Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Treatment Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="treatmentDetails"
                  value={formData.treatmentDetails}
                  onChange={handleChange}
                  placeholder="Provide more details about the treatment..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Doctor & Web Section */}
          <div className="pb-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Globe size={20} className="text-red-600" />
              Additional Information <span className="text-red-500">*</span>
            </h2>

            <div className="space-y-4">
              {/* Hospital Web Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Web Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="hospitalWebLink"
                  value={formData.hospitalWebLink}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Doctor Expertise */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Expertise <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="doctorExpertise"
                  value={formData.doctorExpertise}
                  onChange={handleChange}
                  placeholder="e.g., Cardiology, Surgery, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-[#CA2328] hover:bg-[#e21219] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 hover:cursor-pointer"
            >
              Submit Appointment
            </button>
            <button
              onClick={handleReset}
              className="flex-1 border-2 border-[#CA2328] hover:bg-[#CA2328] hover:text-white hover:cursor-pointer text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200 active:scale-95"
            >
              Clear Form
            </button>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-pulse text-center font-medium">
              ✓ Appointment details saved successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
