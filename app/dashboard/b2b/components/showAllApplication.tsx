"use client";

import { useState } from "react";
import { Eye, Trash2, X } from "lucide-react";
import Swal from "sweetalert2";

// TypeScript interfaces
export interface Application {
  _id: string;
  name: string;
  email: string;
  fatherName: string;
  motherName: string;
  dob: string;
  nid: string;
  passport: string;
  mobile: string;
  address: string;
  qualification: string;
  presentAddress: string;
  organizationName: string;
  officeAddress: string;
  tradeLicenseNumber: string;
  issueDate: string;
  businessStartDate: string;
  officeSize: string;
  tinNumber: string;
  mobileNumber: string;
  branchOfficeCount: string;
  website: string;
  facebookPage: string;
  createdBy: string;
  createdAt: string;
  applicationStatus: "pending" | "approved" | "rejected";
}

interface DataProps {
  data: Application[];
}

export default function ShowAllApplications({ data }: DataProps) {
  const [applications, setApplications] = useState<Application[]>(data);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${name}'s application?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      // API call here
      const deleteRes = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b-applications/api/v1/del/${id}`,
        {
          method: "DELETE",
        },
      );

      const isDeleteConfirm = await deleteRes.json();

      if (!isDeleteConfirm.success) {
        return Swal.fire({
          title: "Sorry!",
          text: "Application can't be deleted now! Try again!.",
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      }

      setApplications((prev) =>
        prev.filter((application) => application._id !== id)
      );

      Swal.fire({
        title: "Deleted!",
        text: "Application has been deleted.",
        icon: "success",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const handleStatusToggle = async (
    applicationId: string,
    currentStatus: Application["applicationStatus"]
  ) => {
    const { value: newStatus } = await Swal.fire({
      title: "Update Application Status",
      input: "select",
      inputOptions: {
        pending: "Pending",
        approved: "Approved",
        rejected: "Rejected",
      },
      inputValue: currentStatus,
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Update",
    });

    if (!newStatus || newStatus === currentStatus) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b-status/${applicationId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationStatus: newStatus }),
      }
    );

    const responseData = await res.json();

    if (!responseData) {
      const error = await res.json();
      return Swal.fire({
        title: "Error!",
        text: error?.message || "Application status not updated",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }

    setApplications((prev) =>
      prev.map((application) =>
        application._id === applicationId
          ? { ...application, applicationStatus: newStatus }
          : application
      )
    );

    Swal.fire({
      title: "Updated!",
      text: `Application status updated to ${newStatus}`,
      icon: "success",
      confirmButtonColor: "#dc2626",
    });
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
            Pending
          </span>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 rounded-lg border-t-4 border-red-600 bg-white p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-red-900">All Applications</h1>
          <p className="mt-2 text-red-700">
            Manage and review all submitted applications
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden overflow-hidden rounded-lg border border-red-200 bg-white shadow-lg lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-red-600 to-red-700 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Organization
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Office Address
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Office Size
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Branch Offices
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Website
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100">
                {applications.map((application, index) => (
                  <tr
                    key={application._id}
                    className={`transition-colors hover:bg-red-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-red-50/30"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-black">
                      {application.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {application.organizationName}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {application.officeAddress}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {application.officeSize}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {application.branchOfficeCount}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-600 hover:underline">
                      <a
                        href={`https://${application.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {application.website}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {getStatusBadge(application.applicationStatus)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewDetails(application)}
                          className="rounded-lg bg-red-600 p-2 text-white transition-colors hover:bg-red-700"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(application._id, application.name)
                          }
                          className="rounded-lg bg-red-600 p-2 text-white transition-colors hover:bg-red-700"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:hidden">
          {applications.map((application) => (
            <div
              key={application._id}
              className="overflow-hidden rounded-lg border-t-4 border-red-600 bg-white shadow-lg transition-shadow hover:shadow-2xl"
            >
              <div className="bg-linear-to-r from-red-600 to-red-700 p-4">
                <h3 className="text-xl font-bold text-white">
                  {application.name}
                </h3>
                <p className="text-sm text-red-100">{application.email}</p>
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <span className="text-xs font-semibold uppercase text-red-600">
                    Organization
                  </span>
                  <p className="text-sm font-medium text-black">
                    {application.organizationName}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-red-600">
                    Office Address
                  </span>
                  <p className="text-sm text-black">
                    {application.officeAddress}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs font-semibold uppercase text-red-600">
                      Office Size
                    </span>
                    <p className="text-sm text-black">
                      {application.officeSize}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase text-red-600">
                      Branches
                    </span>
                    <p className="text-sm text-black">
                      {application.branchOfficeCount}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-red-600">
                    Website
                  </span>
                  <p className="text-sm text-blue-600 hover:underline">
                    <a
                      href={`https://${application.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {application.website}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-red-600">
                    Status
                  </span>
                  <div className="mt-1">
                    {getStatusBadge(application.applicationStatus)}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 border-t border-red-100 bg-red-50 p-4">
                <button
                  onClick={() => handleViewDetails(application)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
                <button
                  onClick={() =>
                    handleDelete(application._id, application.name)
                  }
                  className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b-4 border-red-600 bg-linear-to-r from-red-600 to-red-700 p-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Application Details
                  </h2>
                  <p className="text-sm text-red-100">
                    {selectedApplication.email}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6 p-6">
                {/* Personal Information */}
                <div className="overflow-hidden rounded-lg border-l-4 border-green-600 bg-green-50 shadow-lg">
                  <div className="bg-green-600 px-4 py-3">
                    <h3 className="text-lg font-bold text-white">
                      Personal Information
                    </h3>
                  </div>
                  <div className="grid gap-4 p-4 sm:grid-cols-2">
                    <div>
                      <span className="text-xs font-semibold uppercase text-green-700">
                        Full Name
                      </span>
                      <p className="text-sm font-medium text-black">
                        {selectedApplication.name}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-green-700">
                        Email
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.email}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-green-700">
                        Father's Name
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.fatherName}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-green-700">
                        Mother's Name
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.motherName}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-green-700">
                        Date of Birth
                      </span>
                      <p className="text-sm text-black">
                        {formatDate(selectedApplication.dob)}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-green-700">
                        Mobile
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.mobile}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-green-700">
                        NID Number
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.nid}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-green-700">
                        Passport Number
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.passport}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-green-700">
                        Qualification
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.qualification}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-xs font-semibold uppercase text-green-700">
                        Permanent Address
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.address}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-xs font-semibold uppercase text-green-700">
                        Present Address
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.presentAddress}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Organization Information */}
                <div className="overflow-hidden rounded-lg border-l-4 border-purple-600 bg-purple-50 shadow-lg">
                  <div className="bg-purple-600 px-4 py-3">
                    <h3 className="text-lg font-bold text-white">
                      Organization Information
                    </h3>
                  </div>
                  <div className="grid gap-4 p-4 sm:grid-cols-2">
                    <div>
                      <span className="text-xs font-semibold uppercase text-purple-700">
                        Organization Name
                      </span>
                      <p className="text-sm font-medium text-black">
                        {selectedApplication.organizationName}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-purple-700">
                        Office Address
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.officeAddress}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-purple-700">
                        Office Size
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.officeSize}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-purple-700">
                        Branch Offices
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.branchOfficeCount}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-purple-700">
                        Trade License
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.tradeLicenseNumber}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-purple-700">
                        TIN Number
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.tinNumber}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-purple-700">
                        Issue Date
                      </span>
                      <p className="text-sm text-black">
                        {formatDate(selectedApplication.issueDate)}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-purple-700">
                        Business Start Date
                      </span>
                      <p className="text-sm text-black">
                        {formatDate(selectedApplication.businessStartDate)}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-purple-700">
                        Office Mobile
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.mobileNumber}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-purple-700">
                        Website
                      </span>
                      <p className="text-sm text-blue-600 hover:underline">
                        <a
                          href={`https://${selectedApplication.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedApplication.website}
                        </a>
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-purple-700">
                        Facebook Page
                      </span>
                      <p className="text-sm text-blue-600 hover:underline">
                        <a
                          href={`https://${selectedApplication.facebookPage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedApplication.facebookPage}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Application Status */}
                <div className="overflow-hidden rounded-lg border-l-4 border-yellow-600 bg-yellow-50 shadow-lg">
                  <div className="bg-yellow-600 px-4 py-3">
                    <h3 className="text-lg font-bold text-white">
                      Application Status
                    </h3>
                  </div>
                  <div className="grid gap-4 p-4 sm:grid-cols-2">
                    <div>
                      <span className="text-xs font-semibold uppercase text-yellow-700">
                        Current Status
                      </span>
                      <div className="mt-1">
                        {getStatusBadge(selectedApplication.applicationStatus)}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-yellow-700">
                        Created By
                      </span>
                      <p className="text-sm text-black">
                        {selectedApplication.createdBy}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-xs font-semibold uppercase text-yellow-700">
                        Submission Date
                      </span>
                      <p className="text-sm text-black">
                        {formatDate(selectedApplication.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() =>
                      handleStatusToggle(
                        selectedApplication._id,
                        selectedApplication.applicationStatus
                      )
                    }
                    className="flex-1 rounded-lg bg-linear-to-r from-red-600 to-red-700 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
                  >
                    Update Status
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      handleDelete(
                        selectedApplication._id,
                        selectedApplication.name
                      );
                    }}
                    className="flex-1 rounded-lg bg-linear-to-r from-red-600 to-red-700 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
                  >
                    Delete Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
