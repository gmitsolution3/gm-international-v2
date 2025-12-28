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
} from "lucide-react";
import { HospitalListProps } from "../../medical-list/components/type";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

interface FormData {
  country: string;
  hospital: string;
  department: string;
  doctor: string;
  patientName: string;
  contactNumber: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  document: string | null;
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

interface Option {
  value: string;
  label: string;
}

export default function AppointmentForm({ hospitals }: HospitalListProps) {
  const { data: session } = useSession();

  

  const [uploaded, setUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
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
  });

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  // ===== Unique Country List =====
  const countries = useMemo(() => {
    const setData = new Set();
    hospitals.forEach((item) => setData.add(item.country));
    return [...setData];
  }, [hospitals]);

  // ===== Filter Hospitals By Country =====
  const filteredHospitals = useMemo(() => {
    return formData.country
      ? hospitals.filter((item) => item.country === formData.country)
      : [];
  }, [formData.country, hospitals]);

  // ===== Unique Departments from Selected Hospital =====
  const departments = useMemo(() => {
    if (!formData.hospital) return [];

    const hospitalObj = filteredHospitals.find(
      (h) => h.hospitalName === formData.hospital
    );
    if (!hospitalObj) return [];

    const deptSet = new Set(hospitalObj.doctors.map((doc) => doc.expertise));
    return [...deptSet];
  }, [formData.hospital, filteredHospitals]);

  // ===== Doctors by Selected Department =====
  const filteredDoctors = useMemo(() => {
    if (!formData.hospital || !formData.department) return [];

    const hospitalObj = filteredHospitals.find(
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
        console.error("Image upload failed: No URL returned");
        return;
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

    // Email validation if provided
    if (formData.email && !validateEmail(formData.email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    const submitData = await fetch(
      "https://gm-international-server-gamma.vercel.app/medical_appointment_form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

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

    if (isSubmitSuccess.insertedId) {
      Swal.fire({
        title: "Your Form has been submitted",
        icon: "success",
        draggable: false,
        showConfirmButton: false,
        timer: 2000,
      });
    }

    setSubmitStatus({
      type: "success",
      message: "Appointment booked successfully!",
    });

    setUploaded(false);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        country: "",
        hospital: "",
        department: "",
        doctor: "",
        patientName: "",
        contactNumber: "",
        email: "",
        appointmentDate: "",
        appointmentTime: "",
        document: "",
        payment: "",
        createdBy: session?.user?.email,
        createdAt: new Date(),
        appointmentStatus: "pending",
        paymentStatus: "pending",
      });

      setSubmitStatus(null);
    }, 2000);
  };

  const getMinDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-red-600 mb-8 animate-fade-in">
          Appointment Form
        </h1>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl animate-slide-up">
          <div className="space-y-6">
            {/* Row 1: Department & Doctor */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              {/* country */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                  <TextSelect className="w-6 h-6 text-white" />
                </div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={(e) => {
                    handleInputChange(e);
                    setFormData((prev) => ({
                      ...prev,
                      hospital: "",
                      department: "",
                      doctor: "",
                    }));
                  }}
                  className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400"
                >
                  <option value="">Select country</option>
                  {countries.map((dept: any) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* hospital */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                  <Hospital className="w-6 h-6 text-white" />
                </div>
                <select
                  name="hospital"
                  value={formData.hospital}
                  onChange={(e) => {
                    handleInputChange(e);
                    setFormData((prev) => ({
                      ...prev,
                      department: "",
                      doctor: "",
                    }));
                  }}
                  className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400"
                >
                  <option value="">Select Hospital</option>
                  {filteredHospitals.map((h, i) => (
                    <option key={i} value={h.hospitalName}>
                      {h.hospitalName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                  <ShieldPlus className="w-6 h-6 text-white" />
                </div>
                <select
                  name="department"
                  value={formData.department}
                  onChange={(e) => {
                    handleInputChange(e);
                    setFormData((prev) => ({
                      ...prev,
                      doctor: "",
                    }));
                  }}
                  className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400"
                >
                  <option>Select Department</option>
                  {departments.map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400"
                >
                  <option>Select Doctor</option>
                  {filteredDoctors.map((doc, i) => (
                    <option key={i} value={doc.name}>
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Patient Name (Full Width) */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                  <User className="w-6 h-6 text-white" />
                </div>
                <input
                  type="text"
                  name="patientName"
                  placeholder="Patient Name"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400"
                />
              </div>
            </div>

            {/* Row 3: Contact Number & Email */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              {/* Contact Number */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400"
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address (Optional)"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400"
                />
              </div>
            </div>

            {/* Row 4: Date & Time */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              {/* Date */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  min={getMinDate()}
                  className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400"
                />
              </div>

              {/* Time */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <select
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400"
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

            {/* Row 5: Upload Document & Payment */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              {/* Upload Document */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110 z-10">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  />
                  <div className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400 bg-white cursor-pointer flex items-center">
                    <span
                      className={
                        formData.document
                          ? "text-slate-700 truncate"
                          : "text-gray-400"
                      }
                    >
                      {formData.document
                        ? formData.document
                        : "Upload Document"}
                    </span>
                  </div>
                </div>
                {uploaded && (
                  <span className="text-sm text-green-500">
                    Image uploaded successfully
                  </span>
                )}
              </div>

              {/* Payment */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <select
                  name="payment"
                  value={formData.payment}
                  onChange={handleInputChange}
                  className="w-full pl-20 pr-4 py-3 rounded-full border-2 border-red-300 focus:border-red-600 focus:outline-none placeholder-gray-400 text-slate-700 transition-all duration-300 hover:border-red-400"
                >
                  <option value="">Payment</option>
                  {paymentMethods.map((method: string) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>
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

            {/* Submit Button */}
            <div
              className="flex justify-center pt-4 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <button
                onClick={handleSubmit}
                className="px-12 py-3 bg-red-600 text-white font-bold rounded-full text-lg transition-all duration-300 hover:bg-red-700 hover:shadow-lg active:scale-95 transform hover:scale-105"
              >
                Submit
              </button>
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
