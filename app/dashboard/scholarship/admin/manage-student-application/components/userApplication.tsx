"use client";

import React, { useEffect, useState } from "react";
import {
  Eye,
  X,
  FileText,
  ImageIcon,
  Check,
  XCircle,
  Trash2,
  Mail,
  MapPin,
  GraduationCap,
  DollarSign,
  Download,
  Edit2,
  Save,
  X as XIcon,
} from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import { zipSync } from "fflate";

// Types
interface Documents {
  profilePicture: string;
  passport: string;
  nidFront: string;
  nidBack: string;
  studentSignature: string;
  ssc: string;
  hsc: string;
  diploma: string;
  honours: string;
  transcript: string;
  testimonial: string;
  englishProfficiency: string;
  extraSkills: string;
  jobLetter: string;
  cv: string;
}

interface Application {
  _id: string;
  applicantId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  nidNumber: string;
  country: string;
  university: string;
  admissionSemester: string;
  courseName: string;
  language: string;
  category: string;
  coverage: string;
  paymentMethod: string;
  paymentStatus: string;
  applicationStatus: string;
  workExperience: string;
  jobLetterAvailable: boolean;
  studyPurpose: string;
  additionalInfo: string;
  highestQualification: string;
  passingYear: string;
  instituteName: string;
  gradeOrGPA: string;
  majorSubject: string;
  createdAt: string;
  createdBy: string;
  documents: Documents;
  submittedAt: string;
  source: string;
}


const EditableField = ({
  label,
  value,
  field,
  type = "text",
  disabled = false,
  isEditing,
  editedApplication,
  handleInputChange,
}: any) => {
  if (isEditing && !disabled) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <label className="text-xs text-gray-500 mb-1 block">{label}</label>

        {field === "studyPurpose" || field === "additionalInfo" ? (
          <textarea
            value={editedApplication?.[field] ?? value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        ) : (
          <input
            type={type}
            value={editedApplication?.[field] ?? value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-700">{value}</p>
    </div>
  );
};

const UserApplication: React.FC<{
  applicationData: Application[];
}> = ({ applicationData }) => {
  const [applications, setApplications] =
    useState<Application[]>(applicationData);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [documentDownloading, setDocumentDownloading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editedApplication, setEditedApplication] =
    useState<Application | null>(null);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/application-status-update/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ applicationStatus: newStatus }),
        },
      );

      const resOfData = await response.json();

      if (!resOfData) {
        return Swal.fire({
          title: "Sorry! Something was wrong try again!!",
          icon: "error",
          draggable: false,
        });
      }

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, applicationStatus: newStatus } : app,
        ),
      );
      setSelectedApp((prev) =>
        prev ? { ...prev, applicationStatus: newStatus } : null,
      );
      setEditedApplication((prev) =>
        prev ? { ...prev, applicationStatus: newStatus } : null,
      );
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const handleDelete = (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/delete-application/${id}`,
            { method: "DELETE" },
          );

          const resultOfRes = await response.json();

          if (!resultOfRes.message) {
            return Swal.fire({
              title: "Sorry! Something was wrong try again!!",
              icon: "error",
              draggable: false,
            });
          }
          setApplications((prev) => prev.filter((app) => app._id !== id));
          setSelectedApp(null);
          toast.success("Application deleted successfully");
        }
      });
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const downloadAllDocuments = async () => {
    const files: Record<string, Uint8Array> = {};
    setDocumentDownloading(true);
    if (!selectedApp?.documents) return;
    try {
      const entries = Object.entries(selectedApp!.documents) as [
        keyof Documents,
        string,
      ][];
      for (const [key, url] of entries) {
        const res = await fetch(url);
        const blob = await res.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const ext = url.split(".").pop() ?? "bin";
        files[`${documentLabels[key]}.${ext}`] = new Uint8Array(arrayBuffer);
      }

      const zipped = zipSync(files);
      const arrayBuffer = zipped.slice().buffer;
      const blob = new Blob([arrayBuffer], { type: "application/zip" });
      saveAs(blob, "documents.zip");
    } catch (err: any) {
      toast.error("Something was wrong try again");
    } finally {
      setDocumentDownloading(false);
    }
  };

  const documentLabels: Record<keyof Documents, string> = {
    profilePicture: "Profile Picture",
    passport: "Passport",
    nidFront: "NID Front",
    nidBack: "NID Back",
    studentSignature: "Student Signature",
    ssc: "SSC Certificate",
    hsc: "HSC Certificate",
    diploma: "Diploma Certificate",
    honours: "Honours Certificate",
    transcript: "Transcript",
    testimonial: "Testimonial",
    englishProfficiency: "English Proficiency",
    extraSkills: "Extra Skills Certificate",
    jobLetter: "Job Letter",
    cv: "CV/Resume",
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedApplication({ ...selectedApp! });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedApplication(null);
  };

  const handleSaveEdit = async () => {
    if (!editedApplication) return toast.error("Nothing to save");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/user/update-application/${editedApplication?._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedApplication),
        },
      );


      const result = await response.json();

      

      if (result.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === editedApplication?._id ? editedApplication : app,
          ),
        );
        setSelectedApp(editedApplication);
        setIsEditing(false);
        setEditedApplication(null);
        toast.success("Application updated successfully");
      } else {
        toast.error("Failed to update application");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("Failed to update application");
    }
  };

  const handleInputChange = (field: keyof Application, value: any) => {
    setEditedApplication((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  useEffect(() => {
    if (isEditing && selectedApp) {
      setEditedApplication({ ...selectedApp });
    }
  }, [isEditing, selectedApp]);

  const EditableSelect = ({
    label,
    value,
    field,
    options,
    disabled = false,
  }: {
    label: string;
    value: string;
    field: keyof Application;
    options: { value: string; label: string }[];
    disabled?: boolean;
  }) => {
    if (isEditing && !disabled) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="text-xs text-gray-500 mb-1 block">{label}</label>
          <select
            value={(editedApplication?.[field] as string) ?? value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="font-medium text-gray-700">{value}</p>
      </div>
    );
  };

  const EditableStatus = ({
    label,
    value,
    field,
    statusType = "application",
  }: {
    label: string;
    value: string;
    field: keyof Application;
    statusType?: "application" | "payment";
  }) => {
    if (isEditing && statusType === "payment") {
      const paymentOptions = [
        { value: "Pending", label: "Pending" },
        { value: "Paid", label: "Paid" },
        { value: "Failed", label: "Failed" },
      ];

      return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="text-xs text-gray-500 mb-1 block">{label}</label>
          <select
            value={(editedApplication?.[field] as string) ?? value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            {paymentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (isEditing) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="text-xs text-gray-500 mb-1 block">{label}</label>
          <p className="font-medium text-gray-700">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(value)}`}
            >
              {value}
            </span>
          </p>
        </div>
      );
    }

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(value)}`}
        >
          {value}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-red-100 animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-rose-500 to-red-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Applicant Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    University
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Country
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Application Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Payment Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Submitted By
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-rose-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {app.firstName} {app.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {app.applicantId}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {app.university}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-gray-700">{app.country}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          app.applicationStatus,
                        )}`}
                      >
                        {app.applicationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          app.paymentStatus,
                        )}`}
                      >
                        {app.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          app.paymentStatus,
                        )}`}
                      >
                        {app.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-r from-rose-500 to-red-500 text-white hover:shadow-lg hover:scale-110 transition-all duration-200"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            <div className="sticky top-0 bg-linear-to-r from-rose-500 to-red-500 text-white p-6 flex justify-between items-center z-10">
              <div>
                <h2 className="text-2xl font-bold">
                  {isEditing ? "Edit Application" : "Application Details"}
                </h2>
                <p className="text-rose-100 text-sm mt-1">
                  {selectedApp.applicantId}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <button
                    onClick={handleEditClick}
                    className="p-2 hover:bg-white hover:text-black hover:bg-opacity-20 rounded-full transition-colors"
                    title="Edit Application"
                  >
                    <Edit2 className="w-6 h-6" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="p-2 hover:bg-white hover:text-black hover:bg-opacity-20 rounded-full transition-colors"
                      title="Save Changes"
                    >
                      <Save className="w-6 h-6" />
                    </button>
                    {/* <button
                      onClick={handleCancelEdit}
                      className="p-2 hover:bg-white hover:text-black hover:bg-opacity-20 rounded-full transition-colors"
                      title="Cancel Edit"
                    >
                      <XIcon className="w-6 h-6" />
                    </button> */}
                  </>
                )}
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 hover:bg-white hover:text-black hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <section className="bg-linear-to-r from-rose-50 to-red-50 rounded-xl p-6 border border-red-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <EditableField
                    label="First Name"
                    value={selectedApp.firstName}
                    field="firstName"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableField
                    label="Last Name"
                    value={selectedApp.lastName}
                    field="lastName"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableField
                    label="Email"
                    value={selectedApp.email}
                    field="email"
                    type="email"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableField
                    label="Phone"
                    value={selectedApp.phoneNumber}
                    field="phoneNumber"
                    type="tel"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableSelect
                    label="Gender"
                    value={selectedApp.gender}
                    field="gender"
                    options={[
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                      { value: "Other", label: "Other" },
                    ]}
                  />
                  <EditableField
                    label="Date of Birth"
                    value={new Date(
                      selectedApp.dateOfBirth,
                    ).toLocaleDateString()}
                    field="dateOfBirth"
                    type="date"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableField
                    label="NID Number"
                    value={selectedApp.nidNumber}
                    field="nidNumber"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                </div>
              </section>

              {/* Academic Information */}
              <section className="bg-linear-to-r from-rose-50 to-red-50 rounded-xl p-6 border border-red-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <EditableField
                    label="University"
                    value={selectedApp.university}
                    field="university"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableField
                    label="Country"
                    value={selectedApp.country}
                    field="country"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableField
                    label="Course Name"
                    value={selectedApp.courseName}
                    field="courseName"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableField
                    label="Admission Semester"
                    value={selectedApp.admissionSemester}
                    field="admissionSemester"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableSelect
                    label="Language"
                    value={selectedApp.language}
                    field="language"
                    options={[
                      { value: "English", label: "English" },
                      { value: "French", label: "French" },
                      { value: "German", label: "German" },
                      { value: "Spanish", label: "Spanish" },
                    ]}
                  />
                  <EditableSelect
                    label="Category"
                    value={selectedApp.category}
                    field="category"
                    options={[
                      { value: "Undergraduate", label: "Undergraduate" },
                      { value: "Postgraduate", label: "Postgraduate" },
                      { value: "Diploma", label: "Diploma" },
                      { value: "PhD", label: "PhD" },
                    ]}
                  />
                  <EditableField
                    label="Highest Qualification"
                    value={selectedApp.highestQualification}
                    field="highestQualification"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableField
                    label="Institute Name"
                    value={selectedApp.instituteName}
                    field="instituteName"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableField
                    label="Grade/GPA"
                    value={selectedApp.gradeOrGPA}
                    field="gradeOrGPA"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableField
                    label="Major Subject"
                    value={selectedApp.majorSubject}
                    field="majorSubject"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableField
                    label="Passing Year"
                    value={new Date(selectedApp.passingYear)
                      .getFullYear()
                      .toString()}
                    field="passingYear"
                    type="number"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                </div>
              </section>

              {/* Financial & Work Information */}
              <section className="bg-linear-to-r from-rose-50 to-red-50 rounded-xl p-6 border border-red-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  Financial & Work Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <EditableSelect
                    label="Coverage"
                    value={selectedApp.coverage}
                    field="coverage"
                    options={[
                      { value: "Full", label: "Full" },
                      { value: "Partial", label: "Partial" },
                      { value: "Self-funded", label: "Self-funded" },
                    ]}
                  />
                  <EditableSelect
                    label="Payment Method"
                    value={selectedApp.paymentMethod}
                    field="paymentMethod"
                    options={[
                      { value: "Credit Card", label: "Credit Card" },
                      { value: "Bank Transfer", label: "Bank Transfer" },
                      { value: "PayPal", label: "PayPal" },
                      { value: "Cash", label: "Cash" },
                    ]}
                  />
                  <EditableStatus
                    label="Payment Status"
                    value={selectedApp.paymentStatus}
                    field="paymentStatus"
                    statusType="payment"
                  />
                  <EditableField
                    label="Work Experience (years)"
                    value={selectedApp.workExperience}
                    field="workExperience"
                    type="number"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableSelect
                    label="Job Letter Available"
                    value={selectedApp.jobLetterAvailable ? "Yes" : "No"}
                    field="jobLetterAvailable"
                    options={[
                      { value: "true", label: "Yes" },
                      { value: "false", label: "No" },
                    ]}
                  />
                </div>
              </section>

              {/* Additional Information */}
              <section className="bg-linear-to-r from-rose-50 to-red-50 rounded-xl p-6 border border-red-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Additional Information
                </h3>
                <div className="space-y-4">
                  <EditableField
                    label="Study Purpose/Motivation"
                    value={selectedApp.studyPurpose}
                    field="studyPurpose"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableField
                    label="Additional Info"
                    value={selectedApp.additionalInfo}
                    field="additionalInfo"
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableField
                    label="Created By"
                    value={selectedApp.createdBy}
                    field="createdBy"
                    disabled={true}
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                  <EditableField
                    label="Submitted At"
                    value={new Date(selectedApp.submittedAt).toLocaleString()}
                    field="submittedAt"
                    disabled={true}
                    isEditing={isEditing}
                    editedApplication={editedApplication}
                    handleInputChange={handleInputChange}
                  />
                </div>
              </section>

              {/* Documents - Not Editable */}
              <section className="bg-linear-to-r from-rose-50 to-red-50 rounded-xl p-6 border border-red-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  Documents
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {(
                    Object.entries(selectedApp.documents) as [
                      keyof Documents,
                      string,
                    ][]
                  ).map(([key, url]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedDoc(url)}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 border border-red-100 hover:border-red-300 group"
                      disabled={isEditing}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {key.toLowerCase().includes("cv") ? (
                          <FileText className="w-8 h-8 text-rose-500 group-hover:text-red-600 transition-colors" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-rose-500 group-hover:text-red-600 transition-colors" />
                        )}
                        <p className="text-xs text-center text-gray-700 font-medium">
                          {documentLabels[key]}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-end pt-4 border-t border-gray-200">
                {!isEditing && (
                  <>
                    {selectedApp.applicationStatus !== "Approved" && (
                      <button
                        onClick={() =>
                          handleStatusChange(selectedApp._id, "Approved")
                        }
                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                      >
                        <Check size={20} />
                        Approve
                      </button>
                    )}

                    {selectedApp.applicationStatus !== "Rejected" && (
                      <button
                        onClick={() =>
                          handleStatusChange(selectedApp._id, "Rejected")
                        }
                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                      >
                        <XCircle size={20} />
                        Reject
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(selectedApp._id)}
                      className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      <Trash2 size={20} />
                      Delete
                    </button>

                    <button
                      onClick={downloadAllDocuments}
                      disabled={documentDownloading}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed"
                    >
                      {documentDownloading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download size={20} />
                          <span>Download all</span>
                        </>
                      )}
                    </button>
                  </>
                )}

                {isEditing && (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      <Save size={20} />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-gray-500 to-gray-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      <XIcon size={20} />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {selectedDoc && (
        <div
          className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute -top-12 right-0 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>
            {selectedDoc.endsWith(".pdf") ? (
              <iframe
                src={selectedDoc}
                className="w-full h-[80vh] rounded-lg shadow-2xl bg-white"
              />
            ) : (
              <img
                src={selectedDoc}
                alt="Document"
                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserApplication;
