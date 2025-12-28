"use client";

import React, { useState } from "react";
import {
  Trash2,
  Eye,
  X,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Building,
  Briefcase,
  Hotel,
  CheckCircle,
} from "lucide-react";
import Swal from "sweetalert2";

// Types
interface PhaseItem {
  phaseNumber: number;
  startDate: string;
  endDate: string;
  returnCity: string;
}

interface IncludeItem {
  id: string;
  title: string;
}

interface TourPackage {
  _id: string;
  packageName: string;
  eventName: string;
  duration: string;
  country: string;
  phases: PhaseItem[];
  includes: IncludeItem[];
  hotelName: string;
  hotelRating: string;
  customerPrice: number;
  paxPrice: number;
  minimumPax: number;
  description: string;
  createdAt: string;
  createdBy: string;
  packageStatus?: "active" | "inactive" | "pending";
}

interface TourPackageProps {
  initialData: TourPackage[];
}

const ShowAllTourPackages = ({ initialData }: TourPackageProps) => {
  const [packages, setPackages] = useState<TourPackage[]>(initialData);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDelete = (id: string): void => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setPackages(packages.filter((pkg) => pkg._id !== id));
        Swal.fire("Deleted!", "Package has been deleted.", "success");
      }
    });
  };

  const handleView = (pkg: TourPackage): void => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };



  const handleToggleStatus = async (id: string): Promise<void> => {
    try {
      const pkg = packages.find((p) => p._id === id);
      if (!pkg) return;

      Swal.fire({
        title: "Are you sure?",
        text: `Do you want to ${
          pkg.packageStatus === "active" ? "Deactivate" : "Activate"
        } this package?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, continue!",
      }).then(async (result) => {
        if (!result.isConfirmed) return;

        // Call Backend API
        const res = await fetch(
          `https://gm-international-server-gamma.vercel.app/toggle-business-package-status/${id}`,
          {
            method: "PATCH",
          }
        );

        const data = await res.json();

        if (res.status !== 200) {
          Swal.fire({
            icon: "error",
            title: data.message || "Something went wrong",
            timer: 1500,
            showConfirmButton: false,
          });
          return;
        }

        const newStatus = data.newStatus;

        // Update frontend state
        setPackages((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, packageStatus: newStatus } : item
          )
        );

        if (selectedPackage && selectedPackage._id === id) {
          setSelectedPackage({
            ...selectedPackage,
            packageStatus: newStatus,
          });
        }

        Swal.fire({
          icon: "success",
          title: `Package ${
            newStatus === "active" ? "Activated" : "Deactivated"
          }!`,
          timer: 1500,
          showConfirmButton: false,
        });
      });
    } catch (error) {
      
      Swal.fire({
        icon: "error",
        title: "Unexpected error occurred",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Table for Desktop */}
        <div className="hidden md:block bg-white rounded-lg shadow-2xl overflow-hidden border-t-4 border-red-600">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-red-600 to-red-700 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Package Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Event
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Price (BDT)
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Min Pax
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Hotel
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
                {packages.map((pkg) => (
                  <tr
                    key={pkg._id}
                    className="hover:bg-red-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-black">
                      {pkg.packageName}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {pkg.eventName}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {pkg.duration}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-red-600">
                      ৳{pkg.paxPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {pkg.minimumPax}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {pkg.hotelName}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          pkg.packageStatus || "active"
                        )}`}
                      >
                        {(pkg.packageStatus || "active")
                          .charAt(0)
                          .toUpperCase() +
                          (pkg.packageStatus || "active").slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleView(pkg)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors shadow-md hover:shadow-lg"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg._id)}
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
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-lg shadow-lg p-5 border-t-4 border-red-600 hover:shadow-xl transition-shadow"
            >
              <h3 className="font-bold text-red-900 mb-3 text-base line-clamp-2">
                {pkg.packageName}
              </h3>

              <div className="space-y-2 mb-4 text-sm text-black">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-red-600" />
                  <span>{pkg.eventName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-red-600" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-red-600" />
                  <span className="font-bold">
                    ৳{pkg.paxPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-red-600" />
                  <span>Min {pkg.minimumPax} Pax</span>
                </div>
                <div className="mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      pkg.packageStatus || "active"
                    )}`}
                  >
                    {(pkg.packageStatus || "active").charAt(0).toUpperCase() +
                      (pkg.packageStatus || "active").slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleView(pkg)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Eye size={16} />
                  View
                </button>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {packages.length === 0 && (
          <div className="bg-white rounded-lg shadow-xl p-12 text-center border-t-4 border-red-600">
            <p className="text-red-700 text-lg">No tour packages found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedPackage && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border-t-4 border-red-600">
            {/* Modal Header */}
            <div className="bg-linear-to-r from-red-600 to-red-700 text-white p-6 flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedPackage.packageName}
                </h2>
                <p className="text-red-100 text-sm mt-1">
                  {selectedPackage.eventName}
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
              {/* Package Status */}
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600 flex justify-between items-center">
                <div>
                  <p className="text-sm text-red-700 font-medium mb-2">
                    Package Status
                  </p>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                      selectedPackage.packageStatus || "active"
                    )}`}
                  >
                    {(selectedPackage.packageStatus || "active")
                      .charAt(0)
                      .toUpperCase() +
                      (selectedPackage.packageStatus || "active").slice(1)}
                  </span>
                </div>
                <button
                  onClick={() => handleToggleStatus(selectedPackage._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Toggle Status
                </button>
              </div>

              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <Briefcase size={20} className="text-red-600" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Package Name</p>
                    <p className="text-black font-semibold">
                      {selectedPackage.packageName}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Event Name</p>
                    <p className="text-black font-semibold">
                      {selectedPackage.eventName}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Duration</p>
                    <p className="text-black font-semibold">
                      {selectedPackage.duration}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Country</p>
                    <p className="text-black font-semibold">
                      {selectedPackage.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tour Phases */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-red-600" />
                  Tour Phases
                </h3>
                <div className="space-y-3">
                  {selectedPackage.phases.map((phase, index) => (
                    <div
                      key={index}
                      className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600"
                    >
                      <p className="font-semibold text-blue-900 mb-2">
                        Phase {phase.phaseNumber}
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-sm text-black">
                        <div>
                          <p className="text-blue-700 font-medium">Start</p>
                          <p>{phase.startDate}</p>
                        </div>
                        <div>
                          <p className="text-blue-700 font-medium">End</p>
                          <p>{phase.endDate}</p>
                        </div>
                        <div>
                          <p className="text-blue-700 font-medium">Return</p>
                          <p>{phase.returnCity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hotel Information */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <Hotel size={20} className="text-red-600" />
                  Hotel Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Hotel Name</p>
                    <p className="text-black font-semibold">
                      {selectedPackage.hotelName}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">Rating</p>
                    <p className="text-black font-semibold">
                      {selectedPackage.hotelRating}
                    </p>
                  </div>
                </div>
              </div>

              {/* Package Includes */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <CheckCircle size={20} className="text-red-600" />
                  Package Includes
                </h3>
                <div className="space-y-2">
                  {selectedPackage.includes.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-green-50 rounded-lg border-l-4 border-green-600 flex items-center gap-2"
                    >
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="text-black font-medium">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Information */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                  <DollarSign size={20} className="text-red-600" />
                  Pricing Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-yellow-700 font-medium">
                      Customer Price
                    </p>
                    <p className="text-black font-bold text-lg">
                      ৳{selectedPackage.customerPrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-yellow-700 font-medium">Pax Price</p>
                    <p className="text-black font-bold text-lg">
                      ৳{selectedPackage.paxPrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-yellow-700 font-medium">Minimum Pax</p>
                    <p className="text-black font-bold text-lg">
                      {selectedPackage.minimumPax}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedPackage.description && (
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-3">
                    Description
                  </h3>
                  <p className="text-black text-sm leading-relaxed p-4 bg-gray-50 rounded-lg border-l-4 border-gray-600">
                    {selectedPackage.description}
                  </p>
                </div>
              )}

              {/* Meta Information */}
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-4">
                  Meta Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 font-medium">Created By</p>
                    <p className="text-black font-semibold">
                      {selectedPackage.createdBy}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 font-medium">Created At</p>
                    <p className="text-black font-semibold">
                      {formatDate(selectedPackage.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowAllTourPackages;
