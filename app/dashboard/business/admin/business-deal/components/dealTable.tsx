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
  FileText,
} from "lucide-react";
import Swal from "sweetalert2";
import useUserRole from "@/app/useContext/useUserRole";
import Loader from "@/components/ui/loader";

// Types
interface CompanyLocation {
  city: string;
  area: string;
  country: string;
}

interface BdAddress {
  city: string;
  area: string;
  country: string;
}

interface PersonalInfo {
  name: string;
  year: string;
  phone: string;
  email: string;
  photo: string;
  passport: string;
}

interface Documents {
  tinCertificate: string;
  binCertificate: string;
  tradeLicense: string;
}

interface Applicant {
  _id: string;
  companyName: string;
  companyLocation: CompanyLocation;
  bdAddress: BdAddress;
  personalInfo: PersonalInfo;
  documents: Documents;
  createdAt: string;
  createdBy: string;
  applicationStatus?: "pending" | "approved" | "rejected";
  paymentStatus?: "pending" | "completed" | "failed";
}

interface BusinessApplicationProps {
  initialData: Applicant[];
}

const DealTable = ({ initialData }: BusinessApplicationProps) => {
  const { userRole, loading } = useUserRole();
  const [applicants, setApplicants] = useState<Applicant[]>(initialData);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDelete = (id: string): void => {
    const target = applicants.find((a) => a._id === id);

    if (!target) return;

    if (target.applicationStatus !== "rejected") {
      Swal.fire({
        title: "Cannot delete!",
        text: "Only rejected deals can be deleted.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

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
        const res = await fetch(
          `https://gm-international-server-gamma.vercel.app/delete-deal/${id}`,
          {
            method: "DELETE",
          }
        );

        const data = await res.json();

        if (res.status !== 200) {
          Swal.fire({
            title: data.message || "Something went wrong",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
          return;
        }

        Swal.fire({
          title: "Deleted Successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        setApplicants(applicants.filter((applicant) => applicant._id !== id));
      }
    });
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
        `https://gm-international-server-gamma.vercel.app/approve-business-deal/${id}`,
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

      setApplicants((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, applicationStatus: "approved" } : item
        )
      );

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
      
    }
  };

  const handleReject = async (id: string): Promise<void> => {
    try {
      const res = await fetch(
        `https://gm-international-server-gamma.vercel.app/reject-business-deal/${id}`,
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

      setApplicants((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, applicationStatus: "rejected" } : item
        )
      );

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

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Business Applications
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
                    Contact Person
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Company Country
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    BD City
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Phone
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
                      {applicant.personalInfo.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {applicant.companyLocation.country}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {applicant.bdAddress.city}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {applicant.personalInfo.phone}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          applicant.applicationStatus || "pending"
                        )}`}
                      >
                        {(applicant.applicationStatus || "pending")
                          .charAt(0)
                          .toUpperCase() +
                          (applicant.applicationStatus || "pending").slice(1)}
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
                  <span>{applicant.personalInfo.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-black" />
                  <span>{applicant.companyLocation.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-black" />
                  <span>{applicant.personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-black" />
                  <span>{applicant.bdAddress.city}</span>
                </div>
                <div className="mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      applicant.applicationStatus || "pending"
                    )}`}
                  >
                    {(applicant.applicationStatus || "pending")
                      .charAt(0)
                      .toUpperCase() +
                      (applicant.applicationStatus || "pending").slice(1)}
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
                  {selectedApplicant.personalInfo.name}
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
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                    selectedApplicant.applicationStatus || "pending"
                  )}`}
                >
                  {(selectedApplicant.applicationStatus || "pending")
                    .charAt(0)
                    .toUpperCase() +
                    (selectedApplicant.applicationStatus || "pending").slice(1)}
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
                    <p className="text-red-700 font-medium">Name</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.personalInfo.name}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Year</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.personalInfo.year}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Email</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.personalInfo.email}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Phone</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.personalInfo.phone}
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
                    <p className="text-red-700 font-medium">Company Country</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.companyLocation.country}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Company City</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.companyLocation.city}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Company Area</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.companyLocation.area}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bangladesh Address */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-red-600" />
                  Bangladesh Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">City</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.bdAddress.city}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Area</p>
                    <p className="text-black font-semibold">
                      {selectedApplicant.bdAddress.area}
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-red-600" />
                  Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium text-sm mb-2">
                      TIN Certificate
                    </p>
                    <img
                      src={selectedApplicant.documents.tinCertificate}
                      alt="TIN Certificate"
                      className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-75"
                      onClick={() =>
                        window.open(
                          selectedApplicant.documents.tinCertificate,
                          "_blank"
                        )
                      }
                    />
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium text-sm mb-2">
                      BIN Certificate
                    </p>
                    <img
                      src={selectedApplicant.documents.binCertificate}
                      alt="BIN Certificate"
                      className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-75"
                      onClick={() =>
                        window.open(
                          selectedApplicant.documents.binCertificate,
                          "_blank"
                        )
                      }
                    />
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium text-sm mb-2">
                      Trade License
                    </p>
                    <img
                      src={selectedApplicant.documents.tradeLicense}
                      alt="Trade License"
                      className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-75"
                      onClick={() =>
                        window.open(
                          selectedApplicant.documents.tradeLicense,
                          "_blank"
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Personal Photo & Passport */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-4">
                  Personal Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium text-sm mb-2">
                      Photo
                    </p>
                    <img
                      src={selectedApplicant.personalInfo.photo}
                      alt="Photo"
                      className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-75"
                      onClick={() =>
                        window.open(
                          selectedApplicant.personalInfo.photo,
                          "_blank"
                        )
                      }
                    />
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium text-sm mb-2">
                      Passport
                    </p>
                    <img
                      src={selectedApplicant.personalInfo.passport}
                      alt="Passport"
                      className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-75"
                      onClick={() =>
                        window.open(
                          selectedApplicant.personalInfo.passport,
                          "_blank"
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              {userRole === "admin" && (
                <div>
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
              )}

              {/* Action Buttons */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealTable;
