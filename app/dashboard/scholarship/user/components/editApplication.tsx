"use client";

import React, { useEffect, useState } from "react";
import { Eye, Edit2, X, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import Swal from "sweetalert2";

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

export interface Application {
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
}

interface StudentApplicationManagerProps {
  edit?: string;
}

const StudentApplicationManager = ({
  edit,
}: StudentApplicationManagerProps) => {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);

  const [viewModal, setViewModal] = useState<Application | null>(null);
  const [editModal, setEditModal] = useState<Application | null>(null);
  const [editData, setEditData] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);

  const email = session?.user?.email;

  const safeApps = Array.isArray(applications) ? applications : [];

  useEffect(() => {
    // Fetch applications from API and set to state
    const applicationData = async () => {
      if (!email) return;
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/user/application-status?email=${email}`,
          {
            cache: "no-cache",
          }
        );
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    applicationData();
  }, [email, setApplications]);

  const handleView = (app: Application) => {
    setViewModal(app);
  };

  const handleEdit = (app: Application) => {
    setEditModal(app);
    setEditData({ ...app });
  };

  const handleSave = async () => {
    if (!editData) return;

    try {
      setLoading(true);

      // Backend API call (PUT or PATCH — যেটা তোর backend এ আছে)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/user/update-application/${editData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      const result = await response.json();

      if (result.ok) {
        // UI state update
        setApplications(
          applications.map((app) => (app._id === editData._id ? editData : app))
        );

        setEditModal(null);
        setEditData(null);

        Swal.fire({
          title: "Application Submitted!",
          text: "Your application has been successfully submitted.",
          icon: "success",
          confirmButtonColor: "#dc2626",
          timer: 2000,
        });
      } else {
        Swal.fire({
          title: "Something was wrong!! try again",
          icon: "error",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating application:", error);
      alert("Something went wrong while updating!");
    } finally {
      setLoading(false);
    }
  };

  const formatLabel = (key: string): string => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (safeApps.length === 0) {
    return (
      <div className="max-w-7xl mx-auto w-full">
        <div className="my-4">
          <h1 className="text-xl font-bold lg:text-3xl">Application</h1>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">No applications found.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-rose-900 mb-6">
          Student Applications
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-rose-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-rose-900">
                    Applicant ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-rose-900">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-rose-900">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-rose-900">
                    University
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-rose-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-rose-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100">
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-rose-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {app.applicantId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {app.firstName} {app.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {app.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {app.university}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          app.applicationStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {app.applicationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleView(app)}
                          className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>

                        {edit === "edit" && (
                          <button
                            onClick={() => handleEdit(app)}
                            className="p-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-rose-600 px-6 py-4 flex justify-between items-center border-b border-rose-200">
              <h2 className="text-2xl font-bold text-white">
                Application Details
              </h2>
              <button
                onClick={() => setViewModal(null)}
                className="p-2 hover:bg-rose-200 rounded-lg transition-colors"
              >
                <X size={24} className="text-white hover:text-black" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-rose-900 mb-3 border-b border-rose-200 pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">
                      Applicant ID:
                    </span>{" "}
                    <span className="text-gray-600">
                      {viewModal.applicantId}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Name:</span>{" "}
                    <span className="text-gray-600">
                      {viewModal.firstName} {viewModal.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    <span className="text-gray-600">{viewModal.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Phone:</span>{" "}
                    <span className="text-gray-600">
                      {viewModal.phoneNumber}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Gender:</span>{" "}
                    <span className="text-gray-600">{viewModal.gender}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Date of Birth:
                    </span>{" "}
                    <span className="text-gray-600">
                      {viewModal.dateOfBirth}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      NID Number:
                    </span>{" "}
                    <span className="text-gray-600">{viewModal.nidNumber}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Country:</span>{" "}
                    <span className="text-gray-600">{viewModal.country}</span>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-lg font-semibold text-rose-900 mb-3 border-b border-rose-200 pb-2">
                  Academic Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">
                      University:
                    </span>{" "}
                    <span className="text-gray-600">
                      {viewModal.university}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Course:</span>{" "}
                    <span className="text-gray-600">
                      {viewModal.courseName}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Admission Semester:
                    </span>{" "}
                    <span className="text-gray-600">
                      {viewModal.admissionSemester}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Language:</span>{" "}
                    <span className="text-gray-600">{viewModal.language}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Highest Qualification:
                    </span>{" "}
                    <span className="text-gray-600">
                      {viewModal.highestQualification}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Institute:
                    </span>{" "}
                    <span className="text-gray-600">
                      {viewModal.instituteName}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">GPA:</span>{" "}
                    <span className="text-gray-600">
                      {viewModal.gradeOrGPA}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Major:</span>{" "}
                    <span className="text-gray-600">
                      {viewModal.majorSubject}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Passing Year:
                    </span>{" "}
                    <span className="text-gray-600">
                      {viewModal.passingYear}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scholarship & Payment */}
              <div>
                <h3 className="text-lg font-semibold text-rose-900 mb-3 border-b border-rose-200 pb-2">
                  Scholarship & Payment
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Category:</span>{" "}
                    <span className="text-gray-600">{viewModal.category}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Coverage:</span>{" "}
                    <span className="text-gray-600">{viewModal.coverage}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Payment Method:
                    </span>{" "}
                    <span className="text-gray-600">
                      {viewModal.paymentMethod}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Payment Status:
                    </span>{" "}
                    <span className="text-gray-600">
                      {viewModal.paymentStatus}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Application Status:
                    </span>{" "}
                    <span className="text-gray-600">
                      {viewModal.applicationStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <h3 className="text-lg font-semibold text-rose-900 mb-3 border-b border-rose-200 pb-2">
                  Work Experience
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">
                      Years of Experience:
                    </span>{" "}
                    <span className="text-gray-600">
                      {viewModal.workExperience} years
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Job Letter Available:
                    </span>{" "}
                    <span className="text-gray-600">
                      {viewModal.jobLetterAvailable ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-rose-900 mb-3 border-b border-rose-200 pb-2">
                  Additional Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-700">
                      Study Purpose:
                    </span>{" "}
                    <p className="text-gray-600 mt-1">
                      {viewModal.studyPurpose}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Additional Info:
                    </span>{" "}
                    <p className="text-gray-600 mt-1">
                      {viewModal.additionalInfo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-semibold text-rose-900 mb-3 border-b border-rose-200 pb-2">
                  Documents
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(viewModal.documents).map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-sm transition-colors text-center"
                    >
                      {formatLabel(key)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && editData && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-red-700 px-6 py-4 flex justify-between items-center border-b border-pink-200">
              <h2 className="text-2xl font-bold text-white">
                Edit Application
              </h2>
              <button
                onClick={() => {
                  setEditModal(null);
                  setEditData(null);
                }}
                className="p-2 hover:bg-pink-200 rounded-lg transition-colors"
              >
                <X size={24} className="text-white hover:text-black" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-rose-900 mb-3">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={editData.firstName}
                      onChange={(e) =>
                        setEditData({ ...editData, firstName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={editData.lastName}
                      onChange={(e) =>
                        setEditData({ ...editData, lastName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={editData.phoneNumber}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          phoneNumber: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={editData.gender}
                      onChange={(e) =>
                        setEditData({ ...editData, gender: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={editData.dateOfBirth}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          dateOfBirth: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NID Number
                    </label>
                    <input
                      type="text"
                      value={editData.nidNumber}
                      onChange={(e) =>
                        setEditData({ ...editData, nidNumber: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={editData.country}
                      onChange={(e) =>
                        setEditData({ ...editData, country: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-lg font-semibold text-rose-900 mb-3">
                  Academic Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      University
                    </label>
                    <input
                      type="text"
                      value={editData.university}
                      onChange={(e) =>
                        setEditData({ ...editData, university: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course Name
                    </label>
                    <input
                      type="text"
                      value={editData.courseName}
                      onChange={(e) =>
                        setEditData({ ...editData, courseName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admission Semester
                    </label>
                    <input
                      type="text"
                      value={editData.admissionSemester}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          admissionSemester: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <input
                      type="text"
                      value={editData.language}
                      onChange={(e) =>
                        setEditData({ ...editData, language: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GPA
                    </label>
                    <input
                      type="text"
                      value={editData.gradeOrGPA}
                      onChange={(e) =>
                        setEditData({ ...editData, gradeOrGPA: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Major Subject
                    </label>
                    <input
                      type="text"
                      value={editData.majorSubject}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          majorSubject: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-lg font-semibold text-rose-900 mb-3">
                  Status
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Status
                    </label>
                    <select
                      value={editData.paymentStatus}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          paymentStatus: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Application Status
                    </label>
                    <input
                      value={editData.applicationStatus}
                      readOnly
                      className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-3 pt-4 border-t border-rose-200">
                <button
                  onClick={() => {
                    setEditModal(null);
                    setEditData(null);
                  }}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentApplicationManager;
