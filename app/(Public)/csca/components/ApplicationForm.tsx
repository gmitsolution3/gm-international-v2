// components/ApplicationForm.tsx
"use client";

import React, { useState, useRef } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Calendar,
  BookOpen,
  Building,
  Image as ImageIcon,
  FileText,
  CreditCard,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Send,
} from "lucide-react";
import {
  handleFileUpload,
  UploadToCloudinary,
} from "@/app/components/uploadPdf/uploadToCloudinary";
import { FaPassport } from "react-icons/fa";
import { toast } from "sonner";

interface FormData {
  name: string;
  phone: string;
  email: string;
  presentAddress: string;
  permanentAddress: string;
  lastQualification: string;
  instituteName: string;
  passingYear: string;
  department: string;
  certificateUrl: string;
  photoUrl: string;
  passportUrl: string;
  nidUrl: string;
}

interface UploadingFile {
  field: string;
  progress: boolean;
}

const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    presentAddress: "",
    permanentAddress: "",
    lastQualification: "",
    instituteName: "",
    passingYear: "",
    department: "",
    certificateUrl: "",
    photoUrl: "",
    passportUrl: "",
    nidUrl: "",
  });

  const [uploading, setUploading] = useState<UploadingFile | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({ show: false, message: "", type: "info" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRefs = {
    certificate: useRef<HTMLInputElement>(null),
    photo: useRef<HTMLInputElement>(null),
    passport: useRef<HTMLInputElement>(null),
    nid: useRef<HTMLInputElement>(null),
  };

  const showNotification = (
    message: string,
    type: "success" | "error" | "info",
  ) => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "info" }),
      3000,
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompFileUpload = async (
    file: File,
    field: string,
    uploadType: "pdf" | "image",
  ) => {
    if (!file) return;

    setUploading({ field, progress: true });

    try {
      let url: string | null = null;

      if (uploadType === "pdf") {
        const url = await UploadToCloudinary(file);
        console.log(url);
      } else {
       const url = await handleFileUpload(file);
       console.log({ url });
      }

      if (url) {
        setFormData((prev) => ({ ...prev, [field]: url }));
        showNotification(`${field} uploaded successfully!`, "success");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      showNotification(`Failed to upload ${field}. Please try again.`, "error");
      console.error(error);
    } finally {
      setUploading(null);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    uploadType: "pdf" | "image",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotification("File size should be less than 5MB", "error");
        return;
      }

      // Validate file type
      if (uploadType === "pdf" && file.type !== "application/pdf") {
        showNotification("Please upload a PDF file", "error");
        return;
      }

      if (uploadType === "image" && !file.type.startsWith("image/")) {
        showNotification("Please upload an image file", "error");
        return;
      }

      handleCompFileUpload(file, field, uploadType);
    }
  };

  const removeFile = (field: string) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
    if (fileInputRefs[field as keyof typeof fileInputRefs]?.current) {
      fileInputRefs[field as keyof typeof fileInputRefs].current!.value = "";
    }
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      "name",
      "phone",
      "email",
      "presentAddress",
      "permanentAddress",
      "lastQualification",
      "instituteName",
      "passingYear",
      "department",
      "certificateUrl",
      "photoUrl",
      "passportUrl",
      "nidUrl",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        showNotification(
          `Please fill all required fields and upload all documents`,
          "error",
        );
        return false;
      }
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification("Please enter a valid email address", "error");
      return false;
    }

    // Validate phone (Bangladeshi format)
    const phoneRegex = /^(01[3-9]\d{8})$/;
    if (!phoneRegex.test(formData.phone)) {
      showNotification(
        "Please enter a valid Bangladeshi phone number",
        "error",
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Here you would send the data to your backend API
      console.log("Form Data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/csca-application`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await res.json();

      if (!result.success) {
        return toast.error(
          result.message || "Data not inserted yet! try again",
        );
      }

      toast.error(result.message || "Data inserted successfully!!");
      showNotification("Application submitted successfully!", "success");

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          presentAddress: "",
          permanentAddress: "",
          lastQualification: "",
          instituteName: "",
          passingYear: "",
          department: "",
          certificateUrl: "",
          photoUrl: "",
          passportUrl: "",
          nidUrl: "",
        });
      }, 1000);
    } catch (error) {
      showNotification(
        "Failed to submit application. Please try again.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 py-8 md:py-12">
      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-6 right-6 z-50 animate-slide-down">
          <div
            className={`${
              notification.type === "success"
                ? "bg-green-600"
                : notification.type === "error"
                  ? "bg-red-600"
                  : "bg-blue-600"
            } text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 min-w-70`}
          >
            {notification.type === "success" && (
              <CheckCircle className="w-5 h-5" />
            )}
            {notification.type === "error" && (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="text-center">
            <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
              <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-red-700" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              CSCA Application Form
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Please fill out all required information and upload the necessary
              documents
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-red-600" />
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="01XXXXXXXXX"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              Address Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Present Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="House #, Road #, Area, City"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permanent Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="House #, Road #, Area, City"
                  required
                />
              </div>
            </div>
          </div>

          {/* Academic Qualification */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-red-600" />
              Academic Qualification
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Qualification <span className="text-red-500">*</span>
                </label>
                <select
                  name="lastQualification"
                  value={formData.lastQualification}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                >
                  <option value="">Select</option>
                  <option value="SSC">SSC</option>
                  <option value="HSC">HSC</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institute Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="instituteName"
                    value={formData.instituteName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="Institute name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passing Year <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="passingYear"
                    value={formData.passingYear}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="YYYY"
                    min="1950"
                    max="2026"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="Department/Major"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Document Uploads */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Upload className="w-5 h-5 text-red-600" />
              Required Documents
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Last Passed Academic Certificate */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-red-400 transition-colors">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <FileText className="w-4 h-4 inline mr-1 text-red-600" />
                  Last Passed Academic Certificate{" "}
                  <span className="text-red-500">*</span>
                </label>

                {formData.certificateUrl ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700 truncate">
                        Certificate uploaded
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("certificateUrl")}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRefs.certificate.current?.click()}
                    className="cursor-pointer text-center py-6 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload PDF</p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF only, max 5MB
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRefs.certificate}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, "certificateUrl", "pdf")}
                  className="hidden"
                />

                {uploading?.field === "certificateUrl" && (
                  <div className="flex items-center justify-center gap-2 mt-2 text-red-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Uploading...</span>
                  </div>
                )}
              </div>

              {/* Recent Photo */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-red-400 transition-colors">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <ImageIcon className="w-4 h-4 inline mr-1 text-red-600" />
                  Recent Photo <span className="text-red-500">*</span>
                </label>

                {formData.photoUrl ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">
                        Photo uploaded
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("photoUrl")}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRefs.photo.current?.click()}
                    className="cursor-pointer text-center py-6 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload photo
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      JPG, PNG, max 5MB
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRefs.photo}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "photoUrl", "image")}
                  className="hidden"
                />

                {uploading?.field === "photoUrl" && (
                  <div className="flex items-center justify-center gap-2 mt-2 text-red-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Uploading...</span>
                  </div>
                )}
              </div>

              {/* Passport */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-red-400 transition-colors">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <FaPassport className="w-4 h-4 inline mr-1 text-red-600" />
                  Passport <span className="text-red-500">*</span>
                </label>

                {formData.passportUrl ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">
                        Passport uploaded
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("passportUrl")}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRefs.passport.current?.click()}
                    className="cursor-pointer text-center py-6 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FaPassport className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload passport
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Image or PDF, max 5MB
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRefs.passport}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, "passportUrl", "image")}
                  className="hidden"
                />

                {uploading?.field === "passportUrl" && (
                  <div className="flex items-center justify-center gap-2 mt-2 text-red-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Uploading...</span>
                  </div>
                )}
              </div>

              {/* NID */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-red-400 transition-colors">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <CreditCard className="w-4 h-4 inline mr-1 text-red-600" />
                  NID Card <span className="text-red-500">*</span>
                </label>

                {formData.nidUrl ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">
                        NID uploaded
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("nidUrl")}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRefs.nid.current?.click()}
                    className="cursor-pointer text-center py-6 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <CreditCard className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload NID</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Image or PDF, max 5MB
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRefs.nid}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, "nidUrl", "image")}
                  className="hidden"
                />

                {uploading?.field === "nidUrl" && (
                  <div className="flex items-center justify-center gap-2 mt-2 text-red-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Uploading...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-700 text-white font-semibold rounded-xl hover:bg-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
