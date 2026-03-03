"use client";

import { useState } from "react";
import {
  Eye,
  Edit2,
  Trash2,
  X,
  MapPin,
  Calendar,
  DollarSign,
  SaveAll,
} from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import { TourPackageFormData } from "./TourPackageForm";
import { TbCoinTakaFilled } from "react-icons/tb";
import { PackageDescriptionView } from "@/app/dashboard/scholarship/admin/manage-student-packages/components/PackageDescriptionView";
import dynamic from "next/dynamic";

const DescriptionEditor = dynamic(
  () =>
    import("@/app/dashboard/medical/admin/manage-application-package/components/DescriptionEditor"),
  {
    ssr: false,
  },
);

const formatDate = (dateString: Date) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function TourPackagesAdmin({
  initialPackages,
}: {
  initialPackages: TourPackageFormData[];
}) {
  const [packages, setPackages] =
    useState<TourPackageFormData[]>(initialPackages);
  const [selectedPackage, setSelectedPackage] =
    useState<TourPackageFormData | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [editedData, setEditedData] = useState<Partial<TourPackageFormData>>(
    {},
  );

  const handleEditStart = (fieldName: string, value: string) => {
    setEditingField(fieldName);
    setEditValue(value);
  };

  const handleEditSave = (id: string, fieldName: string) => {
    if (selectedPackage && selectedPackage._id === id) {
      setPackages((prev) =>
        prev.map((pkg) =>
          pkg._id === id ? { ...pkg, [fieldName]: editValue } : pkg,
        ),
      );
      setSelectedPackage((prev) =>
        prev ? { ...prev, [fieldName]: editValue } : null,
      );

      setEditedData((prev) => ({
        ...prev,
        [fieldName]: editValue,
      }));
    }
    setEditingField(null);
  };

  const handleUpdatePackage = async () => {
    if (!selectedPackage) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/update-tourist-package/${selectedPackage._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert("Update failed: " + result.message);
        return;
      }

      Swal.fire("Updated!", "Package has been updated.", "success");

      // Clear editedData
      setEditedData({});

      // Close modal
      setSelectedPackage(null);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong while updating.");
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
            `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/delete-tourist-package/${id}`,
            {
              method: "DELETE",
            },
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

  const subDest = selectedPackage?.tour_plan.map((t) => t.sub_destination);

  const EditableField = ({
    label,
    value,
    fieldName,
    id,
    isReadOnly = false,
  }: {
    label: string;
    value: string;
    fieldName: string;
    id: string;
    isReadOnly?: boolean;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-600">{label}</p>
        {!isReadOnly && editingField !== fieldName && (
          <button
            onClick={() => handleEditStart(fieldName, value)}
            className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>
      {editingField === fieldName && !isReadOnly ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={() => handleEditSave(id, fieldName)}
              className="px-3 py-2 bg-green-500 text-white rounded-lg font-semibold text-xs hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setEditingField(null)}
              className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold text-xs hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-900 font-semibold text-sm bg-rose-50 p-3 rounded-lg border border-rose-200 wrap-break-word">
          {value}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen p-3 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Mobile View - Stacked Cards */}
        <div className="lg:hidden space-y-4">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-lg shadow-md border border-red-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Package Image */}
              {pkg.thumbnail && (
                <div className="relative w-full h-60 bg-gray-200">
                  <Image
                    src={pkg.thumbnail || "/placeholder.svg"}
                    alt={pkg.p_title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="bg-linear-to-r from-rose-500 to-red-500 text-white p-3">
                <h3 className="font-bold text-base">{pkg.p_title}</h3>
                <p className="text-rose-100 text-xs mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {pkg.start_form}, {pkg.country}
                </p>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs font-semibold">
                      Created At
                    </p>
                    <p className="text-gray-800 font-medium">
                      {formatDate(pkg.createdAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-xs font-semibold">Price</p>
                    <p className="text-gray-800 font-bold">
                      <TbCoinTakaFilled />
                      {pkg.p_price}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold">
                      Duration
                    </p>
                    <p className="text-gray-800 font-medium">{pkg.duration}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className="w-full py-2 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold text-xs hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(pkg._id!)}
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg font-semibold text-xs hover:shadow-lg transition-all flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet & Desktop View - Table */}
       
        <div className="hidden lg:block bg-white rounded-lg sm:rounded-2xl shadow-md sm:shadow-xl border border-red-100 overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="w-full min-w-200 lg:min-w-full table-auto">
              <thead className="bg-linear-to-r from-rose-500 to-red-500 text-white">
                <tr>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                    Package
                  </th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                    Dest.
                  </th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                    Country
                  </th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                    Created
                  </th>
                  <th className="hidden lg:table-cell px-4 py-4 text-left font-semibold text-sm">
                    International
                  </th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                    Price
                  </th>
                  <th className="hidden xl:table-cell px-4 py-4 text-left font-semibold text-sm">
                    Duration
                  </th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {packages.map((pkg) => (
                  <tr
                    key={pkg._id}
                    className="hover:bg-rose-50 transition-colors"
                  >
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <div className="flex items-center gap-2 max-w-50">
                        {pkg.thumbnail && (
                          <div className="relative w-8 h-8 shrink-0 hidden sm:block">
                            <Image
                              src={pkg.thumbnail || "/placeholder.svg"}
                              alt={pkg.p_title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 text-xs sm:text-sm truncate">
                            {pkg.p_title}
                          </p>
                          <p className="text-gray-500 text-xs truncate">
                            {pkg._id?.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <p className="text-gray-700 text-xs sm:text-sm truncate max-w-25">
                        {pkg.tour_plan[0]?.destination || "N/A"}
                      </p>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <p className="text-gray-700 text-xs sm:text-sm truncate max-w-25">
                        {pkg.country}
                      </p>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <p className="text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                        {formatDate(pkg.createdAt)}
                      </p>
                    </td>
                    <td className="hidden lg:table-cell px-4 py-4">
                      <span
                        className={`text-xs sm:text-sm px-2 py-1 rounded-full ${
                          pkg.isInternationalPackage
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {pkg.isInternationalPackage ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <p className="text-gray-800 font-bold text-xs sm:text-sm flex items-center gap-1 whitespace-nowrap">
                        <DollarSign className="w-3 h-3 text-rose-500 shrink-0" />
                        <span className="truncate">{pkg.p_price}</span>
                      </p>
                    </td>
                    <td className="hidden xl:table-cell px-4 py-4">
                      <p className="text-gray-700 text-sm flex items-center gap-1 whitespace-nowrap">
                        <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
                        <span className="truncate">{pkg.duration}</span>
                      </p>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedPackage(pkg)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(pkg._id!)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
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

        {/* Details Modal with Editable Fields */}

        {selectedPackage && (
          <div className="fixed inset-0 backdrop-blur-xl bg-gray-900/10 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-linear-to-r from-rose-500 to-red-500 text-white p-4 sm:p-6 flex justify-between items-center z-10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Package Details
                  </h2>
                  <p className="text-rose-100 text-xs sm:text-sm mt-1">
                    {selectedPackage.p_title}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="p-2 hover:bg-white text-black hover:cursor-pointer hover:bg-opacity-20 rounded-full transition-colors shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              <div className="p-4 sm:p-6 space-y-6">
                {/* Package Image Gallery */}
                {selectedPackage.gallery.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-600">
                      Package Photos
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedPackage.gallery.map((photo, idx) => (
                        <div
                          key={idx}
                          className="relative w-full h-24 sm:h-32 bg-gray-200 rounded-lg overflow-hidden"
                        >
                          <Image
                            src={photo || "/placeholder.svg"}
                            alt={`${selectedPackage.p_title} ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800 text-base">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <EditableField
                      label="Package Name"
                      value={selectedPackage.p_title}
                      fieldName="p_title"
                      id={selectedPackage._id as string}
                    />
                    <EditableField
                      label="Package ID"
                      value={selectedPackage._id as string}
                      fieldName="_id"
                      id={selectedPackage._id as string}
                      isReadOnly={true} // You might want to make ID read-only
                    />
                    <EditableField
                      label="Price"
                      value={String(selectedPackage.p_price)}
                      fieldName="p_price"
                      id={selectedPackage._id as string}
                    />
                    <EditableField
                      label="Duration"
                      value={selectedPackage.duration}
                      fieldName="duration"
                      id={selectedPackage._id as string}
                    />
                    <EditableField
                      label="Start From"
                      value={selectedPackage.start_form}
                      fieldName="start_form"
                      id={selectedPackage._id as string}
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800 text-base">
                    Location Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-600">
                        Country
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedPackage.country.map((c, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-2 bg-rose-50 text-gray-900 font-semibold text-sm rounded-lg border border-rose-200"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-600">
                        International Package
                      </p>
                      <span className="inline-block px-3 py-2 bg-rose-50 text-gray-900 font-semibold text-sm rounded-lg border border-rose-200">
                        {selectedPackage.isInternationalPackage ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tour Plan */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-800 text-base">
                    Tour Plan
                  </h3>
                  <div className="space-y-4">
                    {selectedPackage.tour_plan.map((plan, idx) => (
                      <div
                        key={idx}
                        className="bg-blue-50 border border-blue-200 p-4 rounded-lg"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs font-semibold text-gray-600">
                              Sub Destination
                            </p>
                            <p className="text-gray-900">
                              {plan.sub_destination}
                            </p>
                          </div>
                        </div>
                        {/* <div>
                      <p className="text-xs font-semibold text-gray-600 mb-1">
                        Description
                      </p>
                      <p className="text-gray-700 text-sm">
                        {plan.description}
                      </p>
                    </div> */}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Package Description */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-800 text-base">
                      Package Description
                    </h3>
                    {editingField !== "description" && (
                      <button
                        onClick={() =>
                          handleEditStart(
                            "description",
                            selectedPackage.description || "",
                          )
                        }
                        className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                        title="Edit Description"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {editingField === "description" ? (
                    <div className="space-y-3">
                      <div className="border border-rose-300 rounded-lg overflow-hidden">
                        <DescriptionEditor
                          value={editValue}
                          onChange={setEditValue}
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() =>
                            handleEditSave(
                              selectedPackage._id as string,
                              "description",
                            )
                          }
                          className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition-colors"
                        >
                          Save Description
                        </button>
                        <button
                          onClick={() => setEditingField(null)}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-sm sm:prose-lg max-w-none bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <PackageDescriptionView
                        html={selectedPackage.description || ""}
                      />
                    </div>
                  )}
                </div>

                {/* Package Inclusions */}
                <div className="space-y-3 bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                  <p className="font-bold text-gray-800">What's Included</p>
                  <ul className="space-y-2">
                    {selectedPackage.includes.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-700 flex gap-2"
                      >
                        <span className="text-emerald-600 font-bold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Package Exclusions */}
                <div className="space-y-3 bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="font-bold text-gray-800">What's Excluded</p>
                  <ul className="space-y-2">
                    {selectedPackage.excludes.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-700 flex gap-2"
                      >
                        <span className="text-red-600 font-bold">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleUpdatePackage}
                    className="flex-1 py-2 sm:py-3 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <SaveAll className="w-4 h-4 sm:w-5 sm:h-5" />
                    Update Package
                  </button>
                  <button
                    onClick={() => setSelectedPackage(null)}
                    className="flex-1 py-2 sm:py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors text-sm sm:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 backdrop-blur-xl bg-gray-900/10 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-800">
                Confirm Delete
              </h3>
              <p className="text-gray-600">
                Are you sure you want to delete this package? This action cannot
                be undone.
              </p>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
