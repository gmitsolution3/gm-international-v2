"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  X,
  Upload,
  Image as ImageIcon,
  FileText,
  User,
  Phone,
  Mail,
  Calendar,
  Globe,
  MapPin,
  Building2,
  Stethoscope,
  CreditCard,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Camera,
  FileCheck,
  ChevronDown,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { MedicalApplication } from "../../admin/manage-application-package/components/mediApp/MediAppli";
import { UploadToCloudinary } from "@/app/components/uploadPdf/uploadToCloudinary";

interface EditApplicationProps {
  data: MedicalApplication;
}

interface FormData {
  country: string;
  hospital_name: string;
  department: string;
  patientName: string;
  patient_age: string;
  patient_gender: string;
  patient_disease: string;
  disease_duration: string;
  contactNumber: string;
  email: string;
  destinationCountry: string;
  destinationCity: string;
  paymentStatus: string;
  appointmentStatus: string;
  paymentMethod: string;
  package_id: string;
}

const EditApplication: React.FC<EditApplicationProps> = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [medicalReports, setMedicalReports] = useState<string[]>(
    data?.medical_report || [],
  );
  const [recentPhoto, setRecentPhoto] = useState<string>(
    data?.recent_photo || "",
  );
  const [passportCopy, setPassportCopy] = useState<string>(
    data?.passport_copy || "",
  );
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      country: data?.country || "",
      hospital_name: data?.hospital_name || "",
      department: data?.department || "",
      patientName: data?.patientName || "",
      patient_age: data?.patient_age || "",
      patient_gender: data?.patient_gender || "male",
      patient_disease: data?.patient_disease || "",
      disease_duration: data?.disease_duration || "1_3_month",
      contactNumber: data?.contactNumber || "",
      email: data?.email || "",
      destinationCountry: data?.destinationCountry || "",
      destinationCity: data?.destinationCity || "",
      paymentStatus: data?.paymentStatus || "Delivered",
      appointmentStatus: data?.appointmentStatus || "pending",
      paymentMethod: data?.paymentMethod || "Bank",
      package_id: data?.package_id || "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        country: data.country || "",
        hospital_name: data.hospital_name || "",
        department: data.department || "",
        patientName: data.patientName || "",
        patient_age: data.patient_age || "",
        patient_gender: data.patient_gender || "male",
        patient_disease: data.patient_disease || "",
        disease_duration: data.disease_duration || "1_3_month",
        contactNumber: data.contactNumber || "",
        email: data.email || "",
        destinationCountry: data.destinationCountry || "",
        destinationCity: data.destinationCity || "",
        paymentStatus: data.paymentStatus || "Delivered",
        appointmentStatus: data.appointmentStatus || "pending",
        paymentMethod: data.paymentMethod || "Bank",
        package_id: data.package_id || "",
      });
      setMedicalReports(data.medical_report || []);
      setRecentPhoto(data.recent_photo || "");
      setPassportCopy(data.passport_copy || "");
    }
  }, [data, reset]);

  // Handle file upload
  const handleFileUpload = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const imageUrl = await UploadToCloudinary(file);

      clearInterval(progressInterval);
      setUploadProgress(100);
      return imageUrl;
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed");
      setIsUploading(false);
      setUploadProgress(0);
      return null;
    }
  };

  // Handle medical report upload
  const handleMedicalReportUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Uploading medical report...");
    const url = await handleFileUpload(file);

    if (url) {
      setMedicalReports([...medicalReports, url]);
      toast.success("Medical report uploaded successfully", { id: toastId });
    } else {
      toast.error("Failed to upload medical report", { id: toastId });
    }
  };

  // Handle recent photo upload
  const handleRecentPhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Uploading photo...");
    const url = await handleFileUpload(file);

    if (url) {
      setRecentPhoto(url);
      toast.success("Photo uploaded successfully", { id: toastId });
    } else {
      toast.error("Failed to upload photo", { id: toastId });
    }
  };

  // Handle passport copy upload
  const handlePassportUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Uploading passport copy...");
    const url = await handleFileUpload(file);

    if (url) {
      setPassportCopy(url);
      toast.success("Passport copy uploaded successfully", { id: toastId });
    } else {
      toast.error("Failed to upload passport copy", { id: toastId });
    }
  };

  // Remove medical report
  const removeMedicalReport = (index: number) => {
    const newReports = medicalReports.filter((_, i) => i !== index);
    setMedicalReports(newReports);
    toast.success("Report removed");
  };

  // Form submission
  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Updating application...");

    try {
      const applicationData = {
        ...formData,
        medical_report: medicalReports,
        recent_photo: recentPhoto,
        passport_copy: passportCopy,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-application/api/v1/upd-application/${data._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(applicationData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update application");
      }

      const result = await response.json();
      toast.success("Application updated successfully!", { id: toastId });

      // Optional: Trigger refresh or navigation
      console.log("Updated:", result);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update application. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm text-gray-800 placeholder-gray-400 hover:border-gray-300";
  const labelClassName = "block text-sm font-semibold text-gray-700 mb-2";
  const errorClassName = "text-red-500 text-xs mt-1 flex items-center gap-1";

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-red-50 p-4 md:p-6 lg:p-8">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "12px",
          },
        }}
      />

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Edit Medical Application
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Update the medical application details below
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Information */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-4 md:p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <User className="w-5 h-5 text-red-600" />
                </div>
                Patient Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className={labelClassName}>
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("patientName", {
                      required: "Patient name is required",
                    })}
                    className={`${inputClassName} ${errors.patientName ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="Enter patient name"
                  />
                  {errors.patientName && (
                    <p className={errorClassName}>
                      <AlertCircle className="w-3 h-3" />
                      {errors.patientName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClassName}>
                    Patient Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("patient_age", {
                      required: "Age is required",
                    })}
                    type="number"
                    className={`${inputClassName} ${errors.patient_age ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="Enter age"
                  />
                  {errors.patient_age && (
                    <p className={errorClassName}>
                      <AlertCircle className="w-3 h-3" />
                      {errors.patient_age.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClassName}>
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("patient_gender", {
                      required: "Gender is required",
                    })}
                    className={`${inputClassName} cursor-pointer ${errors.patient_gender ? "border-red-500 focus:ring-red-500" : ""}`}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={labelClassName}>
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register("contactNumber", {
                        required: "Contact number is required",
                        pattern: {
                          value: /^\+?[\d\s-]+$/,
                          message: "Invalid phone number",
                        },
                      })}
                      className={`${inputClassName} pl-12 ${errors.contactNumber ? "border-red-500 focus:ring-red-500" : ""}`}
                      placeholder="+8801XXXXXXXXX"
                    />
                  </div>
                  {errors.contactNumber && (
                    <p className={errorClassName}>
                      <AlertCircle className="w-3 h-3" />
                      {errors.contactNumber.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className={labelClassName}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      className={`${inputClassName} pl-12 ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                      placeholder="patient@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className={errorClassName}>
                      <AlertCircle className="w-3 h-3" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-4 md:p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Stethoscope className="w-5 h-5 text-emerald-600" />
                </div>
                Medical Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className={labelClassName}>
                    Disease <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("patient_disease", {
                      required: "Disease is required",
                    })}
                    className={`${inputClassName} ${errors.patient_disease ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="Enter disease name"
                  />
                  {errors.patient_disease && (
                    <p className={errorClassName}>
                      <AlertCircle className="w-3 h-3" />
                      {errors.patient_disease.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClassName}>
                    Disease Duration <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("disease_duration", {
                      required: "Duration is required",
                    })}
                    className={`${inputClassName} cursor-pointer ${errors.disease_duration ? "border-red-500 focus:ring-red-500" : ""}`}
                  >
                    <option value="less_than_1_month">Less than 1 month</option>
                    <option value="1_3_month">1-3 months</option>
                    <option value="3_6_month">3-6 months</option>
                    <option value="6_12_month">6-12 months</option>
                    <option value="more_than_1_year">More than 1 year</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className={labelClassName}>
                    Hospital Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register("hospital_name", {
                        required: "Hospital name is required",
                      })}
                      className={`${inputClassName} pl-12 ${errors.hospital_name ? "border-red-500 focus:ring-red-500" : ""}`}
                      placeholder="Enter hospital name"
                    />
                  </div>
                  {errors.hospital_name && (
                    <p className={errorClassName}>
                      <AlertCircle className="w-3 h-3" />
                      {errors.hospital_name.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className={labelClassName}>
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("department", {
                      required: "Department is required",
                    })}
                    className={`${inputClassName} ${errors.department ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="Enter department name"
                  />
                  {errors.department && (
                    <p className={errorClassName}>
                      <AlertCircle className="w-3 h-3" />
                      {errors.department.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-4 md:p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
                Location Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className={labelClassName}>
                    Country <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register("country", {
                        required: "Country is required",
                      })}
                      className={`${inputClassName} pl-12 ${errors.country ? "border-red-500 focus:ring-red-500" : ""}`}
                      placeholder="Enter country"
                    />
                  </div>
                  {errors.country && (
                    <p className={errorClassName}>
                      <AlertCircle className="w-3 h-3" />
                      {errors.country.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClassName}>
                    Destination Country <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register("destinationCountry", {
                        required: "Destination country is required",
                      })}
                      className={`${inputClassName} pl-12 ${errors.destinationCountry ? "border-red-500 focus:ring-red-500" : ""}`}
                      placeholder="Enter destination country"
                    />
                  </div>
                  {errors.destinationCountry && (
                    <p className={errorClassName}>
                      <AlertCircle className="w-3 h-3" />
                      {errors.destinationCountry.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className={labelClassName}>
                    Destination City <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register("destinationCity", {
                        required: "Destination city is required",
                      })}
                      className={`${inputClassName} pl-12 ${errors.destinationCity ? "border-red-500 focus:ring-red-500" : ""}`}
                      placeholder="Enter destination city"
                    />
                  </div>
                  {errors.destinationCity && (
                    <p className={errorClassName}>
                      <AlertCircle className="w-3 h-3" />
                      {errors.destinationCity.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Document Uploads */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-4 md:p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                Documents Upload
              </h2>

              <div className="space-y-6">
                {/* Medical Reports */}
                <div>
                  <label className={labelClassName}>Medical Reports</label>
                  <div className="space-y-3">
                    {medicalReports.map((report, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <FileCheck className="w-5 h-5 text-green-600 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-700 truncate">
                            Medical Report {index + 1}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {report}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeMedicalReport(index)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" />
                        </button>
                      </div>
                    ))}

                    <div className="relative">
                      <input
                        type="file"
                        onChange={handleMedicalReportUpload}
                        accept="image/*,.pdf"
                        className="hidden"
                        id="medical-report-upload"
                      />
                      <label
                        htmlFor="medical-report-upload"
                        className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-red-400 hover:bg-red-50/50 transition-all duration-300 cursor-pointer group"
                      >
                        <Upload className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                        <span className="text-sm text-gray-600 group-hover:text-red-600 transition-colors">
                          Upload Medical Report
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Recent Photo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClassName}>Recent Photo</label>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={handleRecentPhotoUpload}
                        accept="image/*"
                        className="hidden"
                        id="recent-photo-upload"
                      />
                      <label htmlFor="recent-photo-upload" className="block">
                        {recentPhoto ? (
                          <div className="relative group cursor-pointer">
                            <img
                              src={recentPhoto}
                              alt="Recent"
                              className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                            />
                            <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Camera className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-red-400 hover:bg-red-50/50 transition-all duration-300 cursor-pointer group">
                            <Camera className="w-8 h-8 text-gray-400 group-hover:text-red-600 transition-colors" />
                            <span className="text-sm text-gray-600 group-hover:text-red-600 transition-colors">
                              Upload Photo
                            </span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Passport Copy */}
                  <div>
                    <label className={labelClassName}>Passport Copy</label>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={handlePassportUpload}
                        accept="image/*,.pdf"
                        className="hidden"
                        id="passport-copy-upload"
                      />
                      <label htmlFor="passport-copy-upload" className="block">
                        {passportCopy ? (
                          <div className="relative group cursor-pointer">
                            <img
                              src={passportCopy}
                              alt="Passport"
                              className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                            />
                            <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <FileText className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-red-400 hover:bg-red-50/50 transition-all duration-300 cursor-pointer group">
                            <FileText className="w-8 h-8 text-gray-400 group-hover:text-red-600 transition-colors" />
                            <span className="text-sm text-gray-600 group-hover:text-red-600 transition-colors">
                              Upload Passport
                            </span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Upload Progress Bar */}
                {isUploading && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Uploading...
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-linear-to-r from-red-600 to-red-700 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Status & Payment */}
          <div className="space-y-6">
            {/* Status Information */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-4 md:p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-red-700" />
                </div>
                Status Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className={labelClassName}>Appointment Status</label>
                  <select
                    {...register("appointmentStatus")}
                    className={`${inputClassName} cursor-pointer`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className={labelClassName}>Payment Status</label>
                  <select
                    {...register("paymentStatus")}
                    className={`${inputClassName} cursor-pointer`}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="Delivered">Delivered</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>

                <div>
                  <label className={labelClassName}>Payment Method</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      {...register("paymentMethod")}
                      className={`${inputClassName} pl-12 cursor-pointer`}
                    >
                      <option value="Bank">Bank Transfer</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Cash">Cash</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClassName}>Package ID</label>
                  <input
                    {...register("package_id")}
                    className={inputClassName}
                    placeholder="Package ID"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-linear-to-br from-red-600 to-red-700 rounded-2xl shadow-xl shadow-red-500/25 p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Ready to Update?</h3>
              <p className="text-red-100 text-sm mb-6">
                Review all changes before submitting the update.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-red-600 py-3 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Application
                  </>
                )}
              </button>
            </div>

            {/* Application Info */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-4 md:p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Application Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Created</span>
                  <span className="text-gray-700 font-medium">
                    {new Date(data?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated</span>
                  <span className="text-gray-700 font-medium">
                    {new Date(data?.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created By</span>
                  <span className="text-gray-700 font-medium truncate max-w-37.5">
                    {data?.createdBy}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditApplication;
