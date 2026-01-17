"use client";

import { useState } from "react";
import {
  Eye,
  Edit,
  Trash2,
  X,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import Swal from "sweetalert2";

interface TravelPackage {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  passportNumber: string;
  visaStatus: string;
  gender: string;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  travelCost: string;
  airTicket: string;
  destinationCountry: string;
  destinationPlace: string[];
  duration: {
    days: number;
    nights: number;
  };
  foodPlan: string[];
  transportation: string[];
  dateFrom: string;
  dateTo: string;
  hotelCategory: string[];
  paymentMethod: string;
  applicationStatus: "pending" | "approved" | "rejected";
  paymentStatus: "pending" | "completed" | "failed";
  createdAt?: string;
  createdBy?: string;
  source: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses =
    "inline-flex items-center gap-1 px-3 py-1.5 rounded-full font-semibold text-xs";

  switch (status) {
    case "pending":
      return (
        <span className={`${baseClasses} bg-amber-100 text-amber-700`}>
          <Clock className="w-3 h-3" /> Pending
        </span>
      );
    case "approved":
      return (
        <span className={`${baseClasses} bg-emerald-100 text-emerald-700`}>
          <CheckCircle className="w-3 h-3" /> Approved
        </span>
      );
    case "rejected":
      return (
        <span className={`${baseClasses} bg-red-100 text-red-700`}>
          <XCircle className="w-3 h-3" /> Rejected
        </span>
      );
    case "completed":
      return (
        <span className={`${baseClasses} bg-emerald-100 text-emerald-700`}>
          <CheckCircle className="w-3 h-3" /> Completed
        </span>
      );
    case "failed":
      return (
        <span className={`${baseClasses} bg-red-100 text-red-700`}>
          <XCircle className="w-3 h-3" /> Failed
        </span>
      );
    default:
      return null;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function TravelPackagesTable({
  initialPackages,
}: {
  initialPackages: TravelPackage[];
}) {
  const [packages, setPackages] = useState<TravelPackage[]>(initialPackages);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(
    null
  );
  const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(
    null
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  const handleStatusChange = async (
    id: string,
    newStatus: "pending" | "approved" | "rejected"
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/update-tourist-booking-status/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ applicationStatus: newStatus }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Status Updated",
          text: "The application status has been updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      setPackages((prev) =>
        prev.map((pkg) =>
          pkg._id === id ? { ...pkg, applicationStatus: newStatus } : pkg
        )
      );
      setEditingPackage(null);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/delete-tourist-booking/${id}`,
            {
              method: "DELETE",
            }
          );
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Delete failed");
          if (res.ok) {
            Swal.fire("Deleted!", "Package has been deleted.", "success");
            setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
            setShowDeleteConfirm(null);
          }
        }
      });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 rounded-2xl">
      {/* Mobile View - Stacked Cards */}
      <div className="md:hidden space-y-4">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white rounded-lg shadow-md border border-red-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="bg-linear-to-r from-rose-500 to-red-500 text-white p-3 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-base">{pkg.fullName}</h3>
                <p className="text-rose-100 text-xs mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {pkg.destinationCountry.toUpperCase()}
                </p>
              </div>
              <StatusBadge status={pkg.applicationStatus} />
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs font-semibold">
                    Destination
                  </p>
                  <p className="text-gray-800 font-medium truncate">
                    {pkg.destinationPlace.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-semibold">
                    Package ID
                  </p>
                  <p className="text-gray-800 font-medium truncate text-xs">
                    {pkg._id.slice(0, 8)}
                  </p>
                  <p className="text-gray-800 font-medium truncate text-xs">
                    {pkg.source}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-semibold">Price</p>
                  <p className="text-gray-800 font-medium">
                    {pkg.travelCost} BDT
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-semibold">
                    Duration
                  </p>
                  <p className="text-gray-800 font-medium">
                    {pkg.duration.days}D/{pkg.duration.nights}N
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs font-semibold">
                    Payment Status
                  </p>
                  <StatusBadge status={pkg.paymentStatus} />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className="flex-1 py-2 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold text-xs hover:shadow-lg transition-all flex items-center justify-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  View
                </button>
                <button
                  onClick={() => setEditingPackage(pkg)}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-semibold text-xs hover:shadow-lg transition-all flex items-center justify-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(pkg._id)}
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg font-semibold text-xs hover:shadow-lg transition-all flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet View - Compact Table */}
      <div className="hidden md:block lg:hidden bg-white rounded-lg shadow-md border border-red-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-linear-to-r from-rose-500 to-red-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">
                  Client Name
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Destination
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Package ID
                </th>
                <th className="px-4 py-3 text-left font-semibold">Price</th>
                <th className="px-4 py-3 text-left font-semibold">Payment</th>
                <th className="px-4 py-3 text-left font-semibold">Duration</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Submitted By
                </th>
                <th className="px-4 py-3 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {packages.map((pkg) => (
                <tr
                  key={pkg._id}
                  className="hover:bg-rose-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {pkg.fullName}
                  </td>
                  <td className="px-4 py-3 text-gray-700 truncate">
                    {pkg.destinationPlace.join(", ")}
                  </td>
                  <td className="px-4 py-3 text-gray-700 truncate text-xs">
                    {pkg._id.slice(0, 8)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {pkg.travelCost} BDT
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={pkg.paymentStatus} />
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-center">
                    {pkg.duration.days}D/{pkg.duration.nights}N
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-center">
                    {pkg.source}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => setSelectedPackage(pkg)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors inline-flex"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingPackage(pkg)}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors inline-flex"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(pkg._id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-flex"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Desktop View - Full Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-linear-to-r from-rose-500 to-red-500 text-white sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">No.</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Client Name
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Destination
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Package ID
                </th>
                <th className="px-6 py-4 text-left font-semibold">Price</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Payment Status
                </th>
                <th className="px-6 py-4 text-left font-semibold">Duration</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Submitted By
                </th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {packages.map((pkg, idx) => (
                <tr
                  key={pkg._id}
                  className="hover:bg-rose-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {pkg.fullName}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {pkg.destinationPlace.join(", ")}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-mono text-sm">
                    {pkg._id.slice(0, 12)}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-semibold flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-rose-500" />
                    {pkg.travelCost} BDT
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={pkg.paymentStatus} />
                  </td>
                  <td className="px-6 py-4 text-gray-700 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-rose-500" />
                    {pkg.duration.days}D/{pkg.duration.nights}N
                  </td>
                  <td className="px-6 py-4">{pkg.source}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => setSelectedPackage(pkg)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors inline-flex"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setEditingPackage(pkg)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors inline-flex"
                        title="Edit Status"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(pkg._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-flex"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 backdrop-blur-xl bg-white/10 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-linear-to-r from-rose-500 to-red-500 text-white p-4 sm:p-6 flex justify-between items-center z-10">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Package Details
                </h2>
                <div className="flex">
                  <p className="text-rose-100 text-xs sm:text-sm mt-1">
                    {selectedPackage.fullName}-
                  </p>
                  <p>{selectedPackage._id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPackage(null)}
                className="p-2 hover:bg-white hover:text-black hover:bg-opacity-20 rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-6">
              {/* Client Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-linear-to-br from-rose-50 to-red-50 p-4 rounded-lg border border-red-100">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    Client Name
                  </p>
                  <p className="text-gray-900 font-bold">
                    {selectedPackage.fullName}
                  </p>
                </div>
                <div className="bg-linear-to-br from-rose-50 to-red-50 p-4 rounded-lg border border-red-100">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    Email
                  </p>
                  <p className="text-gray-900 font-bold text-sm break-all">
                    {selectedPackage.email}
                  </p>
                </div>
                <div className="bg-linear-to-br from-rose-50 to-red-50 p-4 rounded-lg border border-red-100">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    Phone Number
                  </p>
                  <p className="text-gray-900 font-bold">
                    {selectedPackage.phoneNumber}
                  </p>
                </div>
                <div className="bg-linear-to-br from-rose-50 to-red-50 p-4 rounded-lg border border-red-100">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    Passport Number
                  </p>
                  <p className="text-gray-900 font-bold">
                    {selectedPackage.passportNumber}
                  </p>
                </div>
              </div>

              {/* Travel Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    Destination
                  </p>
                  <p className="text-gray-900 font-bold">
                    {selectedPackage.destinationCountry.toUpperCase()}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    Destinations Places
                  </p>
                  <p className="text-gray-900 font-bold text-sm">
                    {selectedPackage.destinationPlace.join(", ")}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    Air Ticket
                  </p>
                  <p className="text-gray-900 font-bold">
                    {selectedPackage.airTicket.toUpperCase()}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    Visa Status
                  </p>
                  <p className="text-gray-900 font-bold">
                    {selectedPackage.visaStatus}
                  </p>
                </div>
              </div>

              {/* Travel Dates & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-linear-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    From Date
                  </p>
                  <p className="text-gray-900 font-bold">
                    {formatDate(selectedPackage.dateFrom)}
                  </p>
                </div>
                <div className="bg-linear-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    To Date
                  </p>
                  <p className="text-gray-900 font-bold">
                    {formatDate(selectedPackage.dateTo)}
                  </p>
                </div>
                <div className="bg-linear-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    Duration
                  </p>
                  <p className="text-gray-900 font-bold">
                    {selectedPackage.duration.days} Days /{" "}
                    {selectedPackage.duration.nights} Nights
                  </p>
                </div>
                <div className="bg-linear-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    Total Cost
                  </p>
                  <p className="text-gray-900 font-bold text-lg">
                    {selectedPackage.travelCost} BDT
                  </p>
                </div>
              </div>

              {/* Guests & Accommodations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    Guests
                  </p>
                  <p className="text-gray-900 font-bold">
                    Adults: {selectedPackage.guests.adults}, Children:{" "}
                    {selectedPackage.guests.children}, Infants:{" "}
                    {selectedPackage.guests.infants}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    Hotel Category
                  </p>
                  <p className="text-gray-900 font-bold">
                    {selectedPackage.hotelCategory.join(", ")}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 sm:col-span-2">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    Food Plan
                  </p>
                  <p className="text-gray-900 font-bold text-sm">
                    {selectedPackage.foodPlan.join(", ")}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 sm:col-span-2">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    Transportation
                  </p>
                  <p className="text-gray-900 font-bold text-sm">
                    {selectedPackage.transportation.join(", ")}
                  </p>
                </div>
              </div>

              {/* Status Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Application Status
                  </p>
                  <StatusBadge status={selectedPackage.applicationStatus} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Payment Status
                  </p>
                  <StatusBadge status={selectedPackage.paymentStatus} />
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedPackage(null)}
                className="w-full py-3 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Status Modal */}
      {editingPackage && (
        <div className="fixed inset-0 backdrop-blur-xl bg-white/10 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-full max-w-md shadow-2xl">
            {/* Modal Header */}
            <div className="bg-linear-to-r from-rose-500 to-red-600 text-white p-4 sm:p-6 flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold">Update Status</h2>
              <button
                onClick={() => setEditingPackage(null)}
                className="p-2 hover:bg-white hover:text-black hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Application Status
                </p>
                <div className="space-y-2">
                  {(["pending", "approved", "rejected"] as const).map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() =>
                          handleStatusChange(editingPackage._id, status)
                        }
                        className={`w-full py-2 px-4 rounded-lg font-semibold transition-all text-sm ${
                          editingPackage.applicationStatus === status
                            ? status === "pending"
                              ? "bg-amber-500 text-white"
                              : status === "approved"
                              ? "bg-emerald-500 text-white"
                              : "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {status === "pending" && (
                          <Clock className="w-4 h-4 inline mr-2" />
                        )}
                        {status === "approved" && (
                          <CheckCircle className="w-4 h-4 inline mr-2" />
                        )}
                        {status === "rejected" && (
                          <XCircle className="w-4 h-4 inline mr-2" />
                        )}
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setEditingPackage(null)}
                className="w-full py-3 bg-linear-to-r from-gray-400 to-gray-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 backdrop-blur-xl bg-gray-900/10 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Delete Package?
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this travel package? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
