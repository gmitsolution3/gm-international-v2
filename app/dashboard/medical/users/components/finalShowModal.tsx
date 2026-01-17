"use client";

import { useState, ChangeEvent, useMemo, useEffect } from "react";
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
  Edit,
  Save,
  X,
} from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import {
  HospitalList,
  HospitalListProps,
} from "@/app/(Public)/medical-home-page/medical-list/components/type";
import { Appointment } from "./appointmentForm";
import { ApplicationForm } from "@/app/dashboard/business/components/type";

export interface FormData {
  _id?: string;
  country: string;
  hospital: string;
  department: string;
  doctor: string;
  patientName: string;
  contactNumber: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  document: string | undefined;
  payment: string;
  createdBy: string | null | undefined;
  createdAt: string | Date;
  paymentStatus: string;
  appointmentStatus: string;
}

interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

interface HospitalProps {
  hospitals: HospitalList[] | undefined;
  initialData: FormData | Appointment;
}

export default function FinalShowModal({
  hospitals,
  initialData,
}: HospitalProps) {
  const { data: session } = useSession();

  const [isEditMode, setIsEditMode] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const [formData, setFormData] = useState<FormData | Appointment>(
    initialData || {
      country: "",
      hospital: "",
      department: "",
      doctor: "",
      patientName: "",
      contactNumber: "",
      email: "",
      appointmentDate: "",
      appointmentTime: "",
      document: null,
      payment: "",
      createdBy: session?.user?.email,
      createdAt: new Date(),
      paymentStatus: "pending",
      appointmentStatus: "pending",
    }
  );

  const [originalData, setOriginalData] = useState<FormData | Appointment>(
    formData
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [initialData]);

  // ===== Unique Country List =====
  const countries = useMemo(() => {
    const setData = new Set();
    hospitals?.forEach((item) => setData.add(item.country));
    return [...setData];
  }, [hospitals]);

  // ===== Filter Hospitals By Country =====
  const filteredHospitals = useMemo(() => {
    return formData.country
      ? hospitals?.filter((item) => item.country === formData.country)
      : [];
  }, [formData.country, hospitals]);

  // ===== Unique Departments from Selected Hospital =====
  const departments = useMemo(() => {
    if (!formData.hospital) return [];

    const hospitalObj = filteredHospitals?.find(
      (h) => h.hospitalName === formData.hospital
    );
    if (!hospitalObj) return [];

    const deptSet = new Set(hospitalObj.doctors.map((doc) => doc.expertise));
    return [...deptSet];
  }, [formData.hospital, filteredHospitals]);

  // ===== Doctors by Selected Department =====
  const filteredDoctors = useMemo(() => {
    if (!formData.hospital || !formData.department) return [];

    const hospitalObj = filteredHospitals?.find(
      (h) => h.hospitalName === formData.hospital
    );
    if (!hospitalObj) return [];

    return hospitalObj.doctors.filter(
      (doc) => doc.expertise === formData.department
    );
  }, [formData.department, formData.hospital, filteredHospitals]);

  const paymentMethods: string[] = [
    "Card",
    "Bkash",
    "Nagad",
    "SSL Commerce",
    "Cash at Hospital",
  ];

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
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e: any) => {
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
        document: result.secure_url,
      }));
      setIsUploading(false);
      setUploaded(true);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditMode(false);
    setSubmitStatus(null);
  };

  const handleSubmit = async () => {
    if (
      !formData.department ||
      !formData.doctor ||
      !formData.patientName ||
      !formData.contactNumber ||
      !formData.appointmentDate ||
      !formData.appointmentTime ||
      !formData.payment ||
      !formData.document
    ) {
      setSubmitStatus({
        type: "error",
        message: "Please fill all required fields",
      });
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/update_medical_appointment_form/${formData._id}`;

      const method = "PATCH";

      const submitData = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const isSubmitSuccess = await submitData.json();

      if (!isSubmitSuccess) {
        Swal.fire({
          title: "Something was wrong!! try again",
          icon: "error",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      Swal.fire({
        title: formData._id
          ? "Your Form has been updated"
          : "Your Form has been submitted",
        icon: "success",
        draggable: false,
        showConfirmButton: false,
        timer: 2000,
      });

      setOriginalData(formData);
      setIsEditMode(false);
      setUploaded(false);
      setSubmitStatus({
        type: "success",
        message: formData._id
          ? "Appointment updated successfully!"
          : "Appointment booked successfully!",
      });

      setTimeout(() => {
        setSubmitStatus(null);
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    }
  };

  const getMinDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const renderField = (
    icon: React.ReactNode,
    name: string,
    type: string,
    value: any,
    options?: any[]
  ) => {
    return (
      <div className="relative group">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110 z-10">
          {icon}
        </div>
        {isEditMode ? (
          type === "select" ? (
            <select
              name={name}
              value={value}
              onChange={handleInputChange}
              className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400"
            >
              <option value="">{`Select ${name}`}</option>
              {options?.map((opt: any, i: number) => (
                <option key={i} value={opt.value || opt}>
                  {opt.label || opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleInputChange}
              min={type === "date" ? getMinDate() : undefined}
              className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400"
            />
          )
        ) : (
          <div className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 bg-gray-50 text-slate-700 flex items-center">
            <span className="truncate">{value || "Not set"}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="py-8 px-4 md:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-red-600 mb-8 animate-fade-in">
          {isEditMode ? "Edit Appointment" : "Appointment Details"}
        </h1>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl animate-slide-up">
          <div className="space-y-6">
            {/* Row 1: Country, Hospital, Department, Doctor */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              {renderField(
                <TextSelect className="w-6 h-6 text-white" />,
                "country",
                "select",
                formData.country,
                countries.map((c: any) => ({ value: c, label: c }))
              )}
              {renderField(
                <Hospital className="w-6 h-6 text-white" />,
                "hospital",
                "select",
                formData.hospital,
                filteredHospitals?.map((h) => ({
                  value: h.hospitalName,
                  label: h.hospitalName,
                }))
              )}
              {renderField(
                <ShieldPlus className="w-6 h-6 text-white" />,
                "department",
                "select",
                formData.department,
                departments.map((d: any) => ({ value: d, label: d }))
              )}
              {renderField(
                <Stethoscope className="w-6 h-6 text-white" />,
                "doctor",
                "select",
                formData.doctor,
                filteredDoctors.map((doc) => ({
                  value: doc.name,
                  label: doc.name,
                }))
              )}
            </div>

            {/* Row 2: Patient Name */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {renderField(
                <User className="w-6 h-6 text-white" />,
                "patientName",
                "text",
                formData.patientName
              )}
            </div>

            {/* Row 3: Contact & Email */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              {renderField(
                <Phone className="w-6 h-6 text-white" />,
                "contactNumber",
                "tel",
                formData.contactNumber
              )}
              {renderField(
                <Mail className="w-6 h-6 text-white" />,
                "email",
                "email",
                formData.email
              )}
            </div>

            {/* Row 4: Date & Time */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              {renderField(
                <Calendar className="w-6 h-6 text-white" />,
                "appointmentDate",
                "date",
                formData.appointmentDate
              )}
              {renderField(
                <Clock className="w-6 h-6 text-white" />,
                "appointmentTime",
                "select",
                formData.appointmentTime,
                timeSlots.map((time) => {
                  const hour = parseInt(time.split(":")[0]);
                  const period = hour >= 12 ? "PM" : "AM";
                  const displayHour = hour > 12 ? hour - 12 : hour;
                  return {
                    value: time,
                    label: `${displayHour}:${time.split(":")[1]} ${period}`,
                  };
                })
              )}
            </div>

            {/* Row 5: Document & Payment */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              {/* Document Upload */}
              {isEditMode ? (
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110 z-10">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  />
                  <div className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400 bg-white cursor-pointer flex items-center">
                    <span
                      className={
                        formData.document
                          ? "text-slate-700 truncate"
                          : "text-gray-400"
                      }
                    >
                      {formData.document
                        ? formData.document.split("/").pop()
                        : "Upload Document"}
                    </span>
                  </div>
                  {uploaded && (
                    <span className="text-sm text-green-500">
                      Image uploaded successfully
                    </span>
                  )}
                </div>
              ) : (
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110 z-10">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 bg-gray-50 text-slate-700 flex items-center">
                    {formData.document ? (
                      <a
                        href={formData.document}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate"
                      >
                        View Document
                      </a>
                    ) : (
                      <span>No document</span>
                    )}
                  </div>
                </div>
              )}

              {renderField(
                <CreditCard className="w-6 h-6 text-white" />,
                "payment",
                "select",
                formData.payment,
                paymentMethods.map((m) => ({ value: m, label: m }))
              )}
            </div>

            {/* Status Message */}
            {submitStatus && (
              <div
                className={`p-4 rounded-xl text-center font-semibold animate-slide-up ${
                  submitStatus.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Buttons */}
            <div
              className="flex justify-center gap-4 pt-4 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              {isEditMode ? (
                <>
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-green-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:bg-green-700 hover:shadow-lg active:scale-95 transform hover:scale-105 flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-8 py-3 bg-gray-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:bg-gray-700 hover:shadow-lg active:scale-95 transform hover:scale-105 flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="px-12 py-3 bg-red-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:bg-red-700 hover:shadow-lg active:scale-95 transform hover:scale-105 flex items-center gap-2"
                >
                  <Edit className="w-5 h-5" />
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
      `}</style>
    </div>
  );
}
