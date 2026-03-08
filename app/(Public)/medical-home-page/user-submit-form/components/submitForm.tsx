"use client";

import { useState, ChangeEvent, useMemo } from "react";
import {
  Building2,
  Stethoscope,
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  Upload,
  CreditCard,
  TextSelect,
  Hospital,
  ShieldPlus,
  Church,
  FileText,
  Camera,
  X,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { MedicalFormData } from "@/app/dashboard/medical/admin/manage-application-package/components/type/type";
import { BiSolidCity } from "react-icons/bi";
import { FaDisease, FaHospitalSymbol, FaPassport } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { GiDuration } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
  // appointmentDate: string;
  // appointmentTime: string;
  medical_report: string[];
  recent_photo: string | null;
  passport_copy: string | null;
  destinationCountry: string;
  destinationCity: string;
  payment: string;
  createdBy: string | null | undefined;
  createdAt: string | Date;
  paymentStatus: string;
  appointmentStatus: string;
  package_id: string | undefined;
  b2bId?: string | undefined 
}

interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

interface UploadStatus {
  medical_report: boolean;
  recent_photo: boolean;
  passport_copy: boolean;
}

export default function AppointmentForm({
  hospitals,
  b2bId,
}: {
  hospitals: MedicalFormData;
  b2bId?: string ;
}) {
  const { data: session } = useSession();

  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    medical_report: false,
    recent_photo: false,
    passport_copy: false,
  });

  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    country: "",
    hospital_name: hospitals.hospital_name,
    department: "",
    patientName: "",
    patient_age: "",
    patient_gender: "",
    patient_disease: "",
    disease_duration: "",
    contactNumber: "",
    email: "",
    // appointmentDate: "",
    // appointmentTime: "",
    medical_report: [],
    recent_photo: null,
    passport_copy: null,
    payment: "",
    destinationCountry: hospitals.country_name,
    destinationCity: hospitals.city_name,
    createdBy: session?.user?.email,
    createdAt: new Date(),
    paymentStatus: "pending",
    appointmentStatus: "pending",
    package_id: hospitals._id,
    b2bId: b2bId,
  });

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const router = useRouter();

  const paymentMethods: string[] = ["bKash", "Nagad", "Bank"];

  const timeSlots: string[] = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "13:00",
    "14:30",
    "15:00",
    "16:30",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const files = e.target.files;
    if (!files) return;

    // Medical report multiple upload
    if (fieldName === "medical_report") {
      if (files.length > 5) {
        Swal.fire({
          title: "Maximum 5 files allowed",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }

      setUploadingFor(fieldName);

      const uploadedUrls: string[] = [];

      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "application/pdf",
          ];

          if (!allowedTypes.includes(file.type)) continue;
          if (file.size > 5 * 1024 * 1024) continue;

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

          if (result.secure_url) {
            uploadedUrls.push(result.secure_url);
          }
        }

        setFormData((prev) => ({
          ...prev,
          medical_report: uploadedUrls,
        }));

        setUploadStatus((prev) => ({
          ...prev,
          medical_report: true,
        }));

        toast.success("File uploaded successfully", {
          style: {
            backgroundColor: "#22c55e", // green
            color: "white",
          },
        });
      } catch (error) {
        toast.error("file uploaded failed!!");
      } finally {
        setUploadingFor(null);
      }

      return;
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(files[0].type)) {
      toast.error("Invalid file Type!!Allow only JPG,PNG, Or PDF!!");
      return;
    }

    // Validate file size (max 5MB)
    if (files[0].size > 5 * 1024 * 1024) {
      toast.error("File too large!! Please upload file less than 5MB");
      return;
    }

    setUploadingFor(fieldName);

    // Reset upload status for this field
    setUploadStatus((prev) => ({
      ...prev,
      [fieldName]: false,
    }));

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "pcakge_img_uploade");
    data.append("cloud_name", "dqyfwfeed");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
        {
          method: "POST",
          body: data,
        },
      );

      const result = await res.json();

      if (!result.secure_url) {
        return toast.error("File not uploaded yet! Try again");
      }

      setFormData((prev) => ({
        ...prev,
        [fieldName]: result.secure_url,
      }));

      setUploadStatus((prev) => ({
        ...prev,
        [fieldName]: true,
      }));

      toast.success("File uploaded successfully", {
        style: {
          backgroundColor: "#22c55e", // green
          color: "white",
        },
      });
    } catch (err) {
      console.error("Upload failed:", err);
      Swal.fire({
        title: "Upload failed",
        text: "Please try again",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setUploadingFor(null);
    }
  };

  // const handleFileUpload = async (
  //   e: ChangeEvent<HTMLInputElement>,
  //   fieldName: string,
  // ) => {
  //   const file = e.target.files?.[0];

  //   if (!file) return;

  // };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = [
      "department",
      "patientName",
      "patient_age",
      "patient_gender",
      "patient_disease",
      "disease_duration",
      "contactNumber",

      "payment",
      "medical_report",
      "recent_photo",
      "passport_copy",
    ];

    const missingFields = requiredFields.filter((field) => {
      if (field === "medical_report") {
        return formData?.medical_report?.length === 0;
      }
      return !formData[field as keyof FormData];
    });

    if (missingFields.length > 0) {
      setSubmitStatus({
        type: "error",
        message: "Please fill all required fields and upload all documents",
      });

      toast.error(
        "Please complete all required fields and upload all documents",
      );
      return;
    }

    // Phone validation
    if (!validatePhone(formData.contactNumber)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid contact number",
      });
      return;
    }

    // Email validation if provided
    if (formData.email && !validateEmail(formData.email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    try {
      const submitData = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical_appointment_form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const isSubmitSuccess = await submitData.json();

      if (!isSubmitSuccess || !isSubmitSuccess.insertedId) {
        Swal.fire({
          title: isSubmitSuccess.message,
          text: "Please try again",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }

      setSubmitStatus({
        type: "success",
        message: "Appointment booked successfully!",
      });

      setUploadStatus({
        medical_report: false,
        recent_photo: false,
        passport_copy: false,
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          country: "",
          hospital_name: hospitals.hospital_name,
          department: "",
          patientName: "",
          patient_age: "",
          patient_gender: "",
          patient_disease: "",
          disease_duration: "",
          contactNumber: "",
          email: "",
          // appointmentDate: "",
          // appointmentTime: "",
          medical_report: [],
          recent_photo: null,
          passport_copy: null,
          payment: "",
          destinationCountry: hospitals.country_name,
          destinationCity: hospitals.city_name,
          createdBy: session?.user?.email,
          createdAt: new Date(),
          paymentStatus: "pending",
          appointmentStatus: "pending",
          package_id: hospitals._id,
        });
        setSubmitStatus(null);
        router.push(
          `/medical-home-page/payment?id=${isSubmitSuccess.insertedId}`,
        );
      }, 1000);
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to submit form. Please try again.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const getMinDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getFileIcon = (fieldName: string) => {
    switch (fieldName) {
      case "medical_report":
        return <FileText className="w-5 h-5" />;
      case "recent_photo":
        return <Camera className="w-5 h-5" />;
      case "passport_copy":
        return <FaPassport className="w-5 h-5" />;
      default:
        return <Upload className="w-5 h-5" />;
    }
  };

  const getFileLabel = (fieldName: string) => {
    switch (fieldName) {
      case "medical_report":
        return "Medical Report";
      case "recent_photo":
        return "Recent Photo";
      case "passport_copy":
        return "Passport Copy";
      default:
        return "Document";
    }
  };

  const UploadComponent = ({
    fieldName,
  }: {
    fieldName: keyof UploadStatus;
  }) => (
    <div>
      <div className="mb-2">
        <label className="text-md font-medium">
          {getFileLabel(fieldName)} <span className="text-red-700">*</span>
        </label>
      </div>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110 z-10 text-white">
          {getFileIcon(fieldName)}
        </div>
        <div className="relative">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            multiple={fieldName === "medical_report"}
            onChange={(e) => handleFileUpload(e, fieldName)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            disabled={uploadingFor !== null}
          />
          <div
            className={`w-full pl-20 pr-12 py-3 rounded-full border-2 
            ${
              fieldName === "medical_report"
                ? formData.medical_report && formData.medical_report.length > 0
                  ? "border-green-500 bg-green-50"
                  : "border-red-300"
                : formData[fieldName]
                  ? "border-green-500 bg-green-50"
                  : "border-red-300"
            } 
            focus:border-red-600 placeholder-gray-400 text-slate-700 
            transition-all duration-300 hover:border-red-400 bg-white 
            flex items-center justify-between`}
          >
            <span
              className={
                formData[fieldName]
                  ? "text-slate-700 truncate"
                  : "text-gray-400"
              }
            >
              {fieldName === "medical_report"
                ? formData.medical_report && formData.medical_report.length > 0
                  ? "File uploaded successfully"
                  : `Upload ${getFileLabel(fieldName)}`
                : formData[fieldName]
                  ? "File uploaded successfully"
                  : `Upload ${getFileLabel(fieldName)}`}
            </span>

            {uploadingFor === fieldName && (
              <Loader2 className="w-5 h-5 animate-spin text-red-600" />
            )}

            {uploadStatus[fieldName] && uploadingFor !== fieldName && (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
          </div>
        </div>
      </div>
      <div className="px-10">
        {fieldName === "medical_report" &&
          formData.medical_report!.length > 0 &&
          `${formData.medical_report!.length} files uploaded`}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 px-4 md:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-red-600 mb-8 animate-fade-in drop-shadow-lg">
          Invitation Form (Only 5000BDT)
        </h1>

        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl animate-slide-up border border-red-100">
          <div className="space-y-6">
            {/* Package Info Section */}
            <div className="bg-red-50/50 rounded-2xl p-6">
              <label className="text-2xl font-bold text-red-800 mb-4 block">
                Package Information <span className="text-red-700">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                    <Church className="w-6 h-6 text-white" />
                  </div>
                  <input
                    name="destinationCountry"
                    placeholder="Country Name"
                    readOnly
                    value={hospitals.country_name || ""}
                    className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 bg-white/80 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                    <FaHospitalSymbol className="w-6 h-6 text-white" />
                  </div>
                  <input
                    name="hospitalName"
                    placeholder="Enter Hospital Name"
                    value={hospitals.hospital_name || ""}
                    readOnly
                    className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 bg-white/80 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm"
                  />
                </div>
                <div className="relative group md:col-span-2">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                    <BiSolidCity className="w-6 h-6 text-white" />
                  </div>
                  <input
                    name="selectedCity"
                    placeholder="Selected City"
                    value={hospitals.city_name || ""}
                    readOnly
                    className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 bg-white/80 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* User Info Section */}
            <div className="space-y-4">
              <div className="mb-6">
                <label className="text-2xl font-bold text-red-800">
                  Patient Information <span className="text-red-700">*</span>
                </label>
              </div>

              {/* Department & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <div className="mb-2">
                    <label className="text-md font-medium">
                      Select Your Country{" "}
                      <span className="text-red-700">*</span>
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <TextSelect className="w-6 h-6 text-white" />
                    </div>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={(e) => {
                        handleInputChange(e);
                        setFormData((prev) => ({
                          ...prev,

                          department: "",
                        }));
                      }}
                      className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 focus:border-red-600 focus:outline-none text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm appearance-none bg-white"
                    >
                      <option value="">Select country</option>
                      <option value={hospitals.country_name}>
                        {hospitals.country_name}
                      </option>
                      <option value="bangladesh">Bangladesh</option>
                      <option value="malaysia">Malaysia</option>
                    </select>
                  </div>
                </div>

                {/* Department */}
                <div>
                  <div className="mb-2">
                    <label className="text-md font-medium">
                      Select Department <span className="text-red-700">*</span>
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <ShieldPlus className="w-6 h-6 text-white" />
                    </div>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={(e) => {
                        handleInputChange(e);
                        setFormData((prev) => ({
                          ...prev,
                        }));
                      }}
                      className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 focus:border-red-600 focus:outline-none text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm appearance-none bg-white"
                    >
                      <option value="">Select Department</option>
                      {hospitals.department?.map((d, i) => (
                        <option key={i} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Patient Name */}
              <div>
                <div className="mb-2">
                  <label className="text-md font-medium">
                    Patient Full Name <span className="text-red-700">*</span>
                  </label>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <input
                    type="text"
                    name="patientName"
                    placeholder="Enter patient's full name"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm"
                  />
                </div>
              </div>

              {/* Age, Gender, Disease, Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <div className="mb-2">
                    <label className="text-md font-medium">
                      Patient Age <span className="text-red-700">*</span>
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <MdManageAccounts className="w-6 h-6 text-white" />
                    </div>
                    <input
                      type="number"
                      name="patient_age"
                      placeholder="Enter age"
                      min="0"
                      max="150"
                      value={formData.patient_age}
                      onChange={handleInputChange}
                      className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2">
                    <label className="text-md font-medium">
                      Patient Gender <span className="text-red-700">*</span>
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <MdManageAccounts className="w-6 h-6 text-white" />
                    </div>
                    <select
                      name="patient_gender"
                      value={formData.patient_gender}
                      onChange={handleInputChange}
                      className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 focus:border-red-600 focus:outline-none text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm appearance-none bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="mb-2">
                    <label className="text-md font-medium">
                      Patient Disease <span className="text-red-700">*</span>
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <FaDisease className="w-6 h-6 text-white" />
                    </div>
                    <input
                      type="text"
                      name="patient_disease"
                      placeholder="Enter disease name"
                      value={formData.patient_disease}
                      onChange={handleInputChange}
                      className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2">
                    <label className="text-md font-medium">
                      Duration of Disease{" "}
                      <span className="text-red-700">*</span>
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <GiDuration className="w-6 h-6 text-white" />
                    </div>
                    <select
                      name="disease_duration"
                      value={formData.disease_duration}
                      onChange={handleInputChange}
                      className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 focus:border-red-600 focus:outline-none text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm appearance-none bg-white"
                    >
                      <option value="">Select Duration</option>
                      <option value="1_3_month">1-3 Months</option>
                      <option value="3_6_month">3-6 Months</option>
                      <option value="1_year">1 year</option>
                      <option value="1_year_plus">More than 1 year</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Number & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <div className="mb-2">
                    <label className="text-md font-medium">
                      Contact Number <span className="text-red-700">*</span>
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <input
                      type="tel"
                      name="contactNumber"
                      placeholder="+880 1XXX-XXXXXX"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2">
                    <label className="text-md font-medium">
                      Email Address{" "}
                      <span className="text-red-400">(Optional)</span>
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <div className="mb-2">
                    <label className="text-md font-medium">
                      Appointment Date <span className="text-red-700">*</span>
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 focus:border-red-600 focus:outline-none text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2">
                    <label className="text-md font-medium">
                      Appointment Time <span className="text-red-700">*</span>
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <select
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleInputChange}
                      className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 focus:border-red-600 focus:outline-none text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm appearance-none bg-white"
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map((time: string) => {
                        const hour = parseInt(time.split(":")[0]);
                        const period = hour >= 12 ? "PM" : "AM";
                        const displayHour = hour > 12 ? hour - 12 : hour;
                        return (
                          <option key={time} value={time}>
                            {displayHour}:{time.split(":")[1]} {period}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div> */}

              {/* Document Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <UploadComponent fieldName="medical_report" />
                <UploadComponent fieldName="recent_photo" />
                <UploadComponent fieldName="passport_copy" />

                {/* Payment Method */}
                <div>
                  <div className="mb-2">
                    <label className="text-md font-medium">
                      Payment Method <span className="text-red-700">*</span>
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <select
                      name="payment"
                      value={formData.payment}
                      onChange={handleInputChange}
                      className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-200 focus:border-red-600 focus:outline-none text-slate-700 transition-all duration-300 hover:border-red-400 shadow-sm appearance-none bg-white"
                    >
                      <option value="">Select Payment Method</option>
                      {paymentMethods.map((method: string) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Message */}
            {submitStatus && (
              <div
                className={`p-4 rounded-xl text-center font-semibold animate-slide-up ${
                  submitStatus.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-6 animate-fade-in">
              <button
                onClick={handleSubmit}
                disabled={uploadingFor !== null}
                className="px-12 py-3 bg-linear-to-r from-red-600 to-red-500 text-white font-bold rounded-full text-lg transition-all duration-300 hover:from-red-700 hover:to-red-600 hover:shadow-xl active:scale-95 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {uploadingFor ? "Uploading..." : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
      `}</style>
    </div>
  );
}
