"use client";

import React, { useState } from "react";
import {
  Trash2,
  Eye,
  X,
  Phone,
  MapPin,
  Building,
  Mail,
  Calendar,
  Briefcase,
} from "lucide-react";
import Swal from "sweetalert2";

// Types
interface Applicant {
  _id: string;
  country: string;
  companyName: string;
  passport: string;
  visitingCard: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  designation: string;
  companyType: string;
  officeLocation: string;
  travelPurpose: string;
  email: string;
  travelPlan: string;
  paymentMethod: string;
  createdAt: string;
  createdBy: string;
  paymentStatus: "pending" | "completed" | "failed";
  applicationStatus: "pending" | "approved" | "rejected";
}

interface BusinessApplicationProps {
  initialData: Applicant[];
}

const ShowAllBusinessApplications = ({
  initialData,
}: BusinessApplicationProps) => {
  const [applicants, setApplicants] = useState<Applicant[]>(initialData);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDelete = (id: string): void => {
    setApplicants(applicants.filter((applicant) => applicant._id !== id));
  };

  const handleView = (applicant: Applicant): void => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedApplicant(null);
  };

  const handleApprove = async (id: string): Promise<void> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/approve-business-application/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (res.status !== 200) {
        Swal.fire({
          icon: "error",
          title: data.message || "Approval failed!",
        });
        return;
      }

      // Update applicant list
      setApplicants((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, applicationStatus: "approved" } : item
        )
      );

      // Update modal data
      if (selectedApplicant && selectedApplicant._id === id) {
        setSelectedApplicant({
          ...selectedApplicant,
          applicationStatus: "approved",
        });
      }

      Swal.fire({
        icon: "success",
        title: "Application Approved!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id: string): Promise<void> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/reject-business-application/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (res.status !== 200) {
        Swal.fire({
          icon: "error",
          title: data.message || "Rejection failed!",
        });
        return;
      }

      // Update list UI immediately
      setApplicants((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, applicationStatus: "rejected" } : item
        )
      );

      // Update modal
      if (selectedApplicant && selectedApplicant._id === id) {
        setSelectedApplicant({
          ...selectedApplicant,
          applicationStatus: "rejected",
        });
      }

      Swal.fire({
        icon: "success",
        title: "Application Rejected!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getPaymentStatusColor = (status: string): string => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getApplicationStatusColor = (status: string): string => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Applications
          </h1>
          <p className="text-red-700">
            Manage applicant information and approvals
          </p>
        </div>

        {/* Table for Desktop */}
        <div className="hidden md:block bg-white rounded-lg shadow-2xl overflow-hidden border-t-4 border-red-600">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-red-600 to-red-700 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Company Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Company Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Country
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Office Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Payment Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Application Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100">
                {applicants.map((applicant) => (
                  <tr
                    key={applicant._id}
                    className="hover:bg-red-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-black">
                      {applicant.companyName}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {applicant.companyType}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {applicant.country}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {applicant.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {applicant.officeLocation}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                          applicant.paymentStatus
                        )}`}
                      >
                        {applicant.paymentStatus.charAt(0).toUpperCase() +
                          applicant.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                          applicant.applicationStatus
                        )}`}
                      >
                        {applicant.applicationStatus.charAt(0).toUpperCase() +
                          applicant.applicationStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleView(applicant)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors shadow-md hover:shadow-lg"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(applicant._id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors shadow-md hover:shadow-lg"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cards for Mobile & Tablet */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {applicants.map((applicant) => (
            <div
              key={applicant._id}
              className="bg-white rounded-lg shadow-lg p-5 border-t-4 border-red-600 hover:shadow-xl transition-shadow"
            >
              <h3 className="font-bold text-red-900 mb-3 text-base line-clamp-2">
                {applicant.companyName}
              </h3>

              <div className="space-y-2 mb-4 text-sm text-black">
                <div className="flex items-center gap-2">
                  <Building size={16} className="text-black" />
                  <span>{applicant.companyType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-black" />
                  <span>{applicant.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-black" />
                  <span>{applicant.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-black" />
                  <span>{applicant.officeLocation}</span>
                </div>
                <div className="mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                      applicant.paymentStatus
                    )}`}
                  >
                    {applicant.paymentStatus.charAt(0).toUpperCase() +
                      applicant.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleView(applicant)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Eye size={16} />
                  View
                </button>
                <button
                  onClick={() => handleDelete(applicant._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {applicants.length === 0 && (
          <div className="bg-white rounded-lg shadow-xl p-12 text-center border-t-4 border-red-600">
            <p className="text-red-700 text-lg">No applications found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedApplicant && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto border-t-4 border-red-600">
            {/* Modal Header */}
            <div className="bg-linear-to-r from-red-600 to-red-700 text-white p-6 flex justify-between items-center sticky top-0">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedApplicant.firstName} {selectedApplicant.lastName}
                </h2>
                <p className="text-red-100 text-sm mt-1">
                  {selectedApplicant.companyName}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-red-600 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Application Status */}
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
                <p className="text-sm text-red-700 font-medium mb-2">
                  Application Status
                </p>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getApplicationStatusColor(
                    selectedApplicant.applicationStatus
                  )}`}
                >
                  {selectedApplicant.applicationStatus.charAt(0).toUpperCase() +
                    selectedApplicant.applicationStatus.slice(1)}
                </span>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-red-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">First Name</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.firstName}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Last Name</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.lastName}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Gender</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.gender}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Date of Birth</p>
                    <p className="text-black font-semibold">
                      {new Date(
                        selectedApplicant.dateOfBirth
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Email</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.email}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Phone</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <Building size={20} className="text-red-600" />
                  Company Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Company Name</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.companyName}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Company Type</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.companyType}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Designation</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.designation}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Office Location</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.officeLocation}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Country</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Travel Information */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <Briefcase size={20} className="text-red-600" />
                  Travel Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Travel Purpose</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.travelPurpose}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Travel Plan</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.travelPlan}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-4">
                  Payment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Payment Method</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.paymentMethod}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Payment Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                        selectedApplicant.paymentStatus
                      )}`}
                    >
                      {selectedApplicant.paymentStatus.charAt(0).toUpperCase() +
                        selectedApplicant.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-4">
                  Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium text-sm mb-2">
                      Passport
                    </p>
                    <img
                      src={selectedApplicant.passport}
                      alt="Passport"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium text-sm mb-2">
                      Visiting Card
                    </p>
                    <img
                      src={selectedApplicant.visitingCard}
                      alt="Visiting Card"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}

              {selectedApplicant.applicationStatus === "approved" && (
                <div className="flex gap-3 pt-6 border-t-2 border-red-200">
                  <button
                    onClick={() => handleReject(selectedApplicant._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    ✕ Reject
                  </button>
                </div>
              )}

              {selectedApplicant.applicationStatus === "rejected" && (
                <div className="flex gap-3 pt-6 border-t-2 border-red-200">
                  <button
                    onClick={() => handleApprove(selectedApplicant._id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    ✓ Approve
                  </button>
                </div>
              )}

              {selectedApplicant.applicationStatus === "pending" && (
                <div className="flex gap-3 pt-6 border-t-2 border-red-200">
                  <button
                    onClick={() => handleApprove(selectedApplicant._id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedApplicant._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    ✕ Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowAllBusinessApplications;
