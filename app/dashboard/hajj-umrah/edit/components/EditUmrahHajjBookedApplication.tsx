// components/EditUmrahHajjBookedApplication.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Plane,
  Hotel,
  Users,
  CreditCard,
  FileText,
  Image as ImageIcon,
  Shield,
  Syringe,
  UserPlus,
  ChevronLeft,
  Save,
  X,
  Upload,
  Plus,
  Minus,
  Check,
  AlertCircle,
  ArrowLeft,
  Building,
  Globe,
  Briefcase,
  Accessibility,
  BedDouble,
  Star,
  CalendarDays,
  PlaneTakeoff,
  PlaneLanding,
  Banknote,
  Receipt,
  FileCheck,
  FileBadge,
  Camera,
  Contact2,
  Siren,
  Info,
  Eye,
} from "lucide-react";
import { type FormData, formSchema } from "@/app/types/UmrahHazz-form-types";
import { UploadToCloudinary } from "@/app/components/uploadPdf/uploadToCloudinary";




interface EditUmrahHajjBookedApplicationProps {
  data: {
    success: boolean;
    message: string;
    data: FormData & { _id: string; pkgInfo?: any };
  };
}

const EditUmrahHajjBookedApplication: React.FC<
  EditUmrahHajjBookedApplicationProps
> = ({ data }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [showPreview, setShowPreview] = useState<string | null>(null);

  const applicationData = data?.data;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantInfo: applicationData?.applicantInfo || {
        fullName: "",
        fatherName: "",
        motherName: "",
        gender: "male",
        dateOfBirth: "",
        maritalStatus: "single",
        nationality: "",
        nidNumber: "",
        profession: "",
        phone: "",
        whatsapp: "",
        email: "",
        presentAddress: "",
        permanentAddress: "",
      },
      medicalInfo: applicationData?.medicalInfo || {
        bloodGroup: "",
        hasDiabetes: false,
        hasHighBloodPressure: false,
        hasHeartDisease: false,
        usesWheelchair: false,
        allergies: "",
        otherMedicalIssues: "",
      },
      travelInfo: applicationData?.travelInfo || {
        packageType: "umrah",
        travelMonth: "",
        departureDate: "",
        returnDate: "",
        departureAirport: "",
        makkahHotelCategory: "3-star",
        madinahHotelCategory: "3-star",
        roomSharing: "double",
        airTicketIncluded: false,
        transportationIncluded: false,
      },
      emergencyContact: applicationData?.emergencyContact || {
        name: "",
        relation: "",
        phone: "",
        address: "",
      },
      documents: applicationData?.documents || {
        passportNumber: "",
        passportIssueDate: "",
        passportExpiryDate: "",
        passportImage: "",
        nid: { frontSide: "", backSide: "" },
        visaImage: "",
        passportSizePhoto: ["", ""],
        vaccinationCertificate: "",
        covidCertificate: "",
      },
      companions: applicationData?.companions || [],
      payment: applicationData?.payment || {
        paymentMethod: "bkash",
        trxId: "",
        image: "",
        paymentStatus: "pending",
      },
      applicationStatus: applicationData?.applicationStatus || "pending",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "companions",
  });

  const handleFileUpload = async (file: File, fieldName: string) => {
    try {
      setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));

      // Simulate progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => ({
          ...prev,
          [fieldName]: Math.min((prev[fieldName] || 0) + 10, 90),
        }));
      }, 200);

      const result = await UploadToCloudinary(file);

      clearInterval(interval);
      setUploadProgress((prev) => ({ ...prev, [fieldName]: 100 }));

      return result.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));
      return null;
    }
  };

  const onSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/v1/update-umrah-application/${applicationData?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            updatedAt: new Date().toISOString(),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update application");
      }

      const result = await response.json();

      // Show success message
      alert("Application updated successfully!");

      // Redirect back to view page
      router.push(`/admin/umrah-hajj-applications/${applicationData?._id}`);
      router.refresh();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({
    label,
    name,
    type = "text",
    icon: Icon,
    required = false,
    ...props
  }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        {/* ${errors?.[name] ? "border-red-500" : ""} */}
        <input
          type={type}
          {...register(name)}
          className={`w-full ${Icon ? "pl-10" : "pl-3"} pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-sm`}
          {...props}
        />
      </div>
      {/* {errors?.[name] && (
        <p className="mt-1 text-xs text-red-600">{errors[name]?.message}</p>
      )} */}
    </div>
  );

  const SelectField = ({
    label,
    name,
    icon: Icon,
    options,
    required = false,
  }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        {/* ${errors?.[name] ? "border-red-500" : ""} */}
        <select
          {...register(name)}
          className={`w-full ${Icon ? "pl-10" : "pl-3"} pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-sm appearance-none bg-white`}
        >
          {options.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {/* {errors?.[name] && (
        <p className="mt-1 text-xs text-red-600">{errors[name]?.message}</p>
      )} */}
    </div>
  );

  const FileUpload = ({
    label,
    name,
    accept = "image/*",
    required = false,
  }: any) => {
    const [preview, setPreview] = useState<string | null>(watch(name) || null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      const url = await handleFileUpload(file, name);
      if (url) {
        setValue(name, url, { shouldDirty: true });
      }
    };

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-400 transition-colors">
          {preview ? (
            <div className="space-y-3">
              <img
                src={preview}
                alt={label}
                className="max-h-32 mx-auto rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setValue(name, "", { shouldDirty: true });
                }}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="cursor-pointer block">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload {label}</p>
              <input
                type="file"
                onChange={handleFileChange}
                accept={accept}
                className="hidden"
              />
            </label>
          )}
        </div>
        {uploadProgress[name] > 0 && uploadProgress[name] < 100 && (
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-red-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress[name]}%` }}
            />
          </div>
        )}
        <input type="hidden" {...register(name)} />
        {/* {errors!?.[name] && (
          <p className="mt-1 text-xs text-red-600">{errors[name]?.message}</p>
        )} */}
      </div>
    );
  };

  const SectionHeader = ({ icon: Icon, title, color = "red" }: any) => (
    <div className="flex items-center gap-3 mb-6">
      <div
        className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}
      >
        <Icon className={`w-5 h-5 text-${color}-600`} />
      </div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    </div>
  );

  if (!applicationData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Data Found
          </h2>
          <p className="text-gray-600 mb-4">
            The application data could not be loaded.
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Sticky Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  router.push(
                    `/admin/umrah-hajj-applications/${applicationData._id}`,
                  )
                }
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">View</span>
              </button>
              {isDirty && (
                <span className="text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                  Unsaved changes
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Application Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Edit Application
                  </h1>
                  <p className="text-gray-500 mt-1">
                    {applicationData.applicantInfo.fullName} -{" "}
                    {applicationData.travelInfo.packageType.toUpperCase()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    {...register("applicationStatus")}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <SectionHeader icon={User} title="Personal Information" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField
                  label="Full Name"
                  name="applicantInfo.fullName"
                  icon={User}
                  required
                />
                <InputField
                  label="Father's Name"
                  name="applicantInfo.fatherName"
                  icon={User}
                  required
                />
                <InputField
                  label="Mother's Name"
                  name="applicantInfo.motherName"
                  icon={User}
                  required
                />
                <SelectField
                  label="Gender"
                  name="applicantInfo.gender"
                  icon={Users}
                  required
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                />
                <InputField
                  label="Date of Birth"
                  name="applicantInfo.dateOfBirth"
                  type="date"
                  icon={Calendar}
                  required
                />
                <SelectField
                  label="Marital Status"
                  name="applicantInfo.maritalStatus"
                  icon={Users}
                  options={[
                    { value: "single", label: "Single" },
                    { value: "married", label: "Married" },
                    { value: "widowed", label: "Widowed" },
                  ]}
                />
                <InputField
                  label="Nationality"
                  name="applicantInfo.nationality"
                  icon={Globe}
                  required
                />
                <InputField
                  label="NID Number"
                  name="applicantInfo.nidNumber"
                  icon={FileText}
                />
                <InputField
                  label="Profession"
                  name="applicantInfo.profession"
                  icon={Briefcase}
                />
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <SectionHeader icon={Contact2} title="Contact Information" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Phone"
                  name="applicantInfo.phone"
                  type="tel"
                  icon={Phone}
                  required
                />
                <InputField
                  label="WhatsApp"
                  name="applicantInfo.whatsapp"
                  type="tel"
                  icon={Phone}
                />
                <InputField
                  label="Email"
                  name="applicantInfo.email"
                  type="email"
                  icon={Mail}
                  required
                />
                <div className="sm:col-span-2">
                  <InputField
                    label="Present Address"
                    name="applicantInfo.presentAddress"
                    icon={MapPin}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <InputField
                    label="Permanent Address"
                    name="applicantInfo.permanentAddress"
                    icon={MapPin}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <SectionHeader
                icon={Heart}
                title="Medical Information"
                color="rose"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <SelectField
                  label="Blood Group"
                  name="medicalInfo.bloodGroup"
                  icon={Heart}
                  options={[
                    { value: "", label: "Select Blood Group" },
                    { value: "A+", label: "A+" },
                    { value: "A-", label: "A-" },
                    { value: "B+", label: "B+" },
                    { value: "B-", label: "B-" },
                    { value: "AB+", label: "AB+" },
                    { value: "AB-", label: "AB-" },
                    { value: "O+", label: "O+" },
                    { value: "O-", label: "O-" },
                  ]}
                />

                <div className="flex items-center space-x-3 p-2">
                  <input
                    type="checkbox"
                    {...register("medicalInfo.hasDiabetes")}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="text-sm text-gray-700">Has Diabetes</label>
                </div>

                <div className="flex items-center space-x-3 p-2">
                  <input
                    type="checkbox"
                    {...register("medicalInfo.hasHighBloodPressure")}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="text-sm text-gray-700">
                    High Blood Pressure
                  </label>
                </div>

                <div className="flex items-center space-x-3 p-2">
                  <input
                    type="checkbox"
                    {...register("medicalInfo.hasHeartDisease")}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="text-sm text-gray-700">Heart Disease</label>
                </div>

                <div className="flex items-center space-x-3 p-2">
                  <input
                    type="checkbox"
                    {...register("medicalInfo.usesWheelchair")}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="text-sm text-gray-700">
                    Uses Wheelchair
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <InputField
                    label="Allergies"
                    name="medicalInfo.allergies"
                    icon={AlertCircle}
                  />
                </div>

                <div className="sm:col-span-2">
                  <InputField
                    label="Other Medical Issues"
                    name="medicalInfo.otherMedicalIssues"
                    icon={AlertCircle}
                  />
                </div>
              </div>
            </div>

            {/* Travel Information Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <SectionHeader
                icon={Plane}
                title="Travel Information"
                color="blue"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <SelectField
                  label="Package Type"
                  name="travelInfo.packageType"
                  icon={Plane}
                  required
                  options={[
                    { value: "umrah", label: "Umrah" },
                    { value: "hajj", label: "Hajj" },
                  ]}
                />
                <InputField
                  label="Travel Month"
                  name="travelInfo.travelMonth"
                  type="month"
                  icon={CalendarDays}
                  required
                />
                <InputField
                  label="Departure Date"
                  name="travelInfo.departureDate"
                  type="date"
                  icon={PlaneTakeoff}
                />
                <InputField
                  label="Return Date"
                  name="travelInfo.returnDate"
                  type="date"
                  icon={PlaneLanding}
                />
                <InputField
                  label="Departure Airport"
                  name="travelInfo.departureAirport"
                  icon={Building}
                  required
                />
                <SelectField
                  label="Room Sharing"
                  name="travelInfo.roomSharing"
                  icon={Users}
                  options={[
                    { value: "single", label: "Single" },
                    { value: "double", label: "Double" },
                    { value: "triple", label: "Triple" },
                    { value: "quad", label: "Quad" },
                  ]}
                />
                <SelectField
                  label="Makkah Hotel"
                  name="travelInfo.makkahHotelCategory"
                  icon={Hotel}
                  options={[
                    { value: "3-star", label: "3 Star" },
                    { value: "4-star", label: "4 Star" },
                    { value: "5-star", label: "5 Star" },
                  ]}
                />
                <SelectField
                  label="Madinah Hotel"
                  name="travelInfo.madinahHotelCategory"
                  icon={Hotel}
                  options={[
                    { value: "3-star", label: "3 Star" },
                    { value: "4-star", label: "4 Star" },
                    { value: "5-star", label: "5 Star" },
                  ]}
                />

                <div className="flex items-center space-x-3 p-2">
                  <input
                    type="checkbox"
                    {...register("travelInfo.airTicketIncluded")}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="text-sm text-gray-700">
                    Air Ticket Included
                  </label>
                </div>

                <div className="flex items-center space-x-3 p-2">
                  <input
                    type="checkbox"
                    {...register("travelInfo.transportationIncluded")}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="text-sm text-gray-700">
                    Transportation Included
                  </label>
                </div>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <SectionHeader
                icon={Siren}
                title="Emergency Contact"
                color="orange"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Contact Name"
                  name="emergencyContact.name"
                  icon={User}
                  required
                />
                <InputField
                  label="Relation"
                  name="emergencyContact.relation"
                  icon={Users}
                  required
                />
                <InputField
                  label="Phone"
                  name="emergencyContact.phone"
                  type="tel"
                  icon={Phone}
                  required
                />
                <div className="sm:col-span-2">
                  <InputField
                    label="Address"
                    name="emergencyContact.address"
                    icon={MapPin}
                  />
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <SectionHeader icon={FileCheck} title="Documents" color="green" />

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InputField
                    label="Passport Number"
                    name="documents.passportNumber"
                    icon={FileText}
                    required
                  />
                  <InputField
                    label="Passport Issue Date"
                    name="documents.passportIssueDate"
                    type="date"
                    icon={Calendar}
                    required
                  />
                  <InputField
                    label="Passport Expiry Date"
                    name="documents.passportExpiryDate"
                    type="date"
                    icon={Calendar}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FileUpload
                    label="Passport Image"
                    name="documents.passportImage"
                    required
                  />
                  <FileUpload label="Visa Image" name="documents.visaImage" />
                  <FileUpload
                    label="Vaccination Certificate"
                    name="documents.vaccinationCertificate"
                  />
                </div>

                {/* NID Images */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    National ID Card
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FileUpload
                      label="NID Front Side"
                      name="documents.nid.frontSide"
                    />
                    <FileUpload
                      label="NID Back Side"
                      name="documents.nid.backSide"
                    />
                  </div>
                </div>

                {/* Passport Size Photos */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">
                      Passport Size Photos
                    </h4>
                    <span className="text-sm text-gray-500">
                      Minimum 2 photos required
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[0, 1].map((index) => (
                      <FileUpload
                        key={index}
                        label={`Passport Photo ${index + 1}`}
                        name={`documents.passportSizePhoto.${index}`}
                        required={index < 2}
                      />
                    ))}
                  </div>
                </div>

                <FileUpload
                  label="COVID Certificate"
                  name="documents.covidCertificate"
                />
              </div>
            </div>

            {/* Companions Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <SectionHeader
                  icon={UserPlus}
                  title="Companions"
                  color="purple"
                />
                <button
                  type="button"
                  onClick={() =>
                    append({
                      fullName: "",
                      relation: "",
                      passportNumber: "",
                      passportImage: "",
                      phone: "",
                    })
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Companion
                </button>
              </div>

              {fields.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No companions added</p>
                  <button
                    type="button"
                    onClick={() =>
                      append({
                        fullName: "",
                        relation: "",
                        passportNumber: "",
                        passportImage: "",
                        phone: "",
                      })
                    }
                    className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    + Add your first companion
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">
                          Companion {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField
                          label="Full Name"
                          name={`companions.${index}.fullName`}
                          icon={User}
                          required
                        />
                        <InputField
                          label="Relation"
                          name={`companions.${index}.relation`}
                          icon={Users}
                          required
                        />
                        <InputField
                          label="Passport Number"
                          name={`companions.${index}.passportNumber`}
                          icon={FileText}
                        />
                        <InputField
                          label="Phone"
                          name={`companions.${index}.phone`}
                          type="tel"
                          icon={Phone}
                        />
                        <div className="sm:col-span-2">
                          <FileUpload
                            label="Passport Image"
                            name={`companions.${index}.passportImage`}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <SectionHeader
                icon={CreditCard}
                title="Payment Information"
                color="yellow"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <SelectField
                  label="Payment Method"
                  name="payment.paymentMethod"
                  icon={Banknote}
                  required
                  options={[
                    { value: "bkash", label: "bKash" },
                    { value: "nagad", label: "Nagad" },
                    { value: "bank", label: "Bank Transfer" },
                    { value: "cash", label: "Cash" },
                  ]}
                />
                <InputField
                  label="Transaction ID"
                  name="payment.trxId"
                  icon={Receipt}
                />
                <SelectField
                  label="Payment Status"
                  name="payment.paymentStatus"
                  icon={Check}
                  required
                  options={[
                    { value: "pending", label: "Pending" },
                    { value: "partial", label: "Partial" },
                    { value: "paid", label: "Paid" },
                  ]}
                />
                <div className="sm:col-span-2 lg:col-span-3">
                  <FileUpload label="Payment Screenshot" name="payment.image" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Image Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm"
          onClick={() => setShowPreview(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <button
              onClick={() => setShowPreview(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <img
              src={showPreview}
              alt="Preview"
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUmrahHajjBookedApplication;
