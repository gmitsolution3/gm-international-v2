"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import Swal from "sweetalert2";

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

const ApplicationInAdminDashboard: React.FC<{
  applicationData: Application[];
}> = ({ applicationData }) => {
  const [applications, setApplications] =
    useState<Application[]>(applicationData);

  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

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
      // TODO: Add your API call here
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/application-status-update/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ applicationStatus: newStatus }),
        }
      );

      const resOfData = await response.json();

      if (!resOfData) {
        return Swal.fire({
          title: "Sorry! Something was wrong try again!!",
          icon: "error",
          draggable: false,
        });
      }

      Swal.fire({
        title: "Status Updated Successfully",
        showClass: {
          popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
        },
        hideClass: {
          popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
        },
      });

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, applicationStatus: newStatus } : app
        )
      );
      setSelectedApp(null);
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
          // TODO: Add your API call here
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/delete-application/${id}`,
            { method: "DELETE" }
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
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error("Error deleting application:", error);
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
                {applications.map((app, idx) => (
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
                          app.applicationStatus
                        )}`}
                      >
                        {app.applicationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          app.paymentStatus
                        )}`}
                      >
                        {app.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          app.paymentStatus
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
                <h2 className="text-2xl font-bold">Application Details</h2>
                <p className="text-rose-100 text-sm mt-1">
                  {selectedApp.applicantId}
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 hover:bg-white hover:text-black hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
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
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Full Name</p>
                    <p className="font-semibold text-gray-800">
                      {selectedApp.firstName} {selectedApp.lastName}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-700 text-sm">
                      {selectedApp.email}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.phoneNumber}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Gender</p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.gender}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
                    <p className="font-medium text-gray-700">
                      {new Date(selectedApp.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">NID Number</p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.nidNumber}
                    </p>
                  </div>
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
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">University</p>
                    <p className="font-semibold text-gray-800">
                      {selectedApp.university}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Country</p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.country}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Course</p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.courseName}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">
                      Admission Semester
                    </p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.admissionSemester}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Language</p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.language}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Category</p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.category}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">
                      Highest Qualification
                    </p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.highestQualification}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Institute</p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.instituteName}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">GPA</p>
                    <p className="font-semibold text-gray-800">
                      {selectedApp.gradeOrGPA}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Major Subject</p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.majorSubject}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Passing Year</p>
                    <p className="font-medium text-gray-700">
                      {new Date(selectedApp.passingYear).getFullYear()}
                    </p>
                  </div>
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
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Coverage</p>
                    <p className="font-semibold text-gray-800">
                      {selectedApp.coverage}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.paymentMethod}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Payment Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        selectedApp.paymentStatus
                      )}`}
                    >
                      {selectedApp.paymentStatus}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">
                      Work Experience
                    </p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.workExperience} years
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">
                      Job Letter Available
                    </p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.jobLetterAvailable ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </section>

              {/* Additional Information */}
              <section className="bg-linear-to-r from-rose-50 to-red-50 rounded-xl p-6 border border-red-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Additional Information
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-2">
                      Study Purpose/Motivation
                    </p>
                    <p className="text-gray-700">{selectedApp.studyPurpose}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-2">
                      Additional Info
                    </p>
                    <p className="text-gray-700">
                      {selectedApp.additionalInfo}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Created By</p>
                    <p className="font-medium text-gray-700">
                      {selectedApp.createdBy}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">Submitted At</p>
                    <p className="font-medium text-gray-700">
                      {new Date(selectedApp.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </section>

              {/* Documents */}
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
                      string
                    ][]
                  ).map(([key, url]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedDoc(url)}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 border border-red-100 hover:border-red-300 group"
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
                <button
                  onClick={() =>
                    handleStatusChange(selectedApp._id, "Approved")
                  }
                  className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <Check className="w-5 h-5" />
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(selectedApp._id, "Rejected")
                  }
                  className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <XCircle className="w-5 h-5" />
                  Reject
                </button>
                <button
                  onClick={() => handleDelete(selectedApp._id)}
                  className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
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

export default ApplicationInAdminDashboard;
