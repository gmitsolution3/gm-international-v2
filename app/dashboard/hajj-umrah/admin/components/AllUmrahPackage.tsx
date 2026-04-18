// components/AllUmrahPackage.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users,
  Tag,
  X,
  Check,
  AlertCircle,
  MapPin,
  Clock,
  DollarSign,
  CalendarDays,
  Info,
  List,
  FileText,
  Image as ImageIcon,
  Package,
  Ticket,
} from "lucide-react";

// Types based on your data structure
interface IncludeExcludeItem {
  value: string;
}

export interface UmrahPackage {
  _id?: string;
  createdAt: string;
  updatedAt?: string;
  title: string;
  slug: string;
  thumbnail: string;
  gallery_image: string[];
  price: number;
  discount_price: number;
  departure_date: string;
  return_date: string;
  seats: number;
  includes: IncludeExcludeItem[];
  excludes: IncludeExcludeItem[];
  package_status: "active" | "inactive" | "upcoming";
  description: string;
  __v?: number;
}

export interface AllUmrahPackageProps {
  packages: UmrahPackage[];
}

const AllUmrahPackage = ({ packages }: AllUmrahPackageProps) => {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<UmrahPackage | null>(
    null,
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<UmrahPackage | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "inactive":
        return "Inactive";
      case "upcoming":
        return "Upcoming";
      default:
        return status;
    }
  };

  const handleView = (pkg: UmrahPackage) => {
    setSelectedPackage(pkg);
    setIsViewModalOpen(true);
  };

  const handleEdit = (pkg: UmrahPackage) => {
    router.push(
      `/dashboard/hajj-umrah/admin/umrah-packages/edit-package/${pkg._id}`,
    );
  };

  const handleDeleteClick = (pkg: UmrahPackage) => {
    setPackageToDelete(pkg);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!packageToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/delete/umrah-package/${packageToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error("Failed to delete package");
      }
    } catch (error) {
      console.error("Error deleting package:", error);
      alert("Failed to delete package. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setPackageToDelete(null);
    }
  };

  const calculateDuration = (departure: string, returnDate: string) => {
    const start = new Date(departure);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDiscountPercentage = (price: number, discountPrice: number) => {
    if (!discountPrice || discountPrice >= price) return null;
    const percentage = ((price - discountPrice) / price) * 100;
    return Math.round(percentage);
  };

  return (
    <div className="w-full bg-gray-50">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-red-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Package Info
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Dates
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Seats
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {packages.map((pkg) => {
              const discountPercentage = getDiscountPercentage(
                pkg.price,
                pkg.discount_price,
              );
              return (
                <tr
                  key={pkg._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={pkg.thumbnail}
                          alt={pkg.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 line-clamp-1">
                          {pkg.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          ID: {pkg._id && pkg._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      {pkg.discount_price ? (
                        <>
                          <p className="text-lg font-bold text-red-600">
                            {formatPrice(pkg.discount_price)}
                          </p>
                          <p className="text-sm text-gray-400 line-through">
                            {formatPrice(pkg.price)}
                          </p>
                          {discountPercentage && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                              Save {discountPercentage}%
                            </span>
                          )}
                        </>
                      ) : (
                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice(pkg.price)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>From: {formatDate(pkg.departure_date)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>To: {formatDate(pkg.return_date)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{pkg.seats}</span>
                      <span className="text-sm text-gray-500">seats</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(pkg.package_status)}`}
                    >
                      {getStatusText(pkg.package_status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(pkg)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Package"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(pkg)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Package"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tablet & Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {packages.map((pkg) => {
          const discountPercentage = getDiscountPercentage(
            pkg.price,
            pkg.discount_price,
          );
          return (
            <div
              key={pkg._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={pkg.thumbnail}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      ID: {pkg._id && pkg._id.slice(-6)}
                    </p>
                    <div className="mt-2">
                      {pkg.discount_price ? (
                        <>
                          <p className="text-lg font-bold text-red-600">
                            {formatPrice(pkg.discount_price)}
                          </p>
                          <p className="text-sm text-gray-400 line-through">
                            {formatPrice(pkg.price)}
                          </p>
                          {discountPercentage && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                              Save {discountPercentage}%
                            </span>
                          )}
                        </>
                      ) : (
                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice(pkg.price)}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(pkg.package_status)}`}
                  >
                    {getStatusText(pkg.package_status)}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span>{formatDate(pkg.departure_date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span>{pkg.seats} seats</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleView(pkg)}
                    className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="px-3 py-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors text-sm font-medium flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(pkg)}
                    className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Package Modal */}
      {isViewModalOpen && selectedPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-start justify-center min-h-screen px-4 py-8">
            <div
              className="fixed inset-0 bg-white/10 backdrop-blur-2xl bg-opacity-50"
              onClick={() => setIsViewModalOpen(false)}
            />

            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl">
              {/* Header */}
              <div className="bg-red-700 px-6 py-4 rounded-t-xl flex items-center justify-between">
                <h2 className="text-white font-semibold text-lg">
                  Package Details
                </h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                {/* Top: Thumbnail + Title */}
                <div className="flex items-start gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                    <Image
                      src={selectedPackage.thumbnail}
                      alt={selectedPackage.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                      {selectedPackage.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      ID: {selectedPackage._id && selectedPackage._id.slice(-6)}{" "}
                      &nbsp;·&nbsp; Created:{" "}
                      {formatDateTime(selectedPackage.createdAt)}
                    </p>
                    <p className="text-xs text-gray-400">
                      Slug:{" "}
                      <span className="font-mono">{selectedPackage.slug}</span>
                    </p>
                    <span
                      className={`inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(selectedPackage.package_status)}`}
                    >
                      {getStatusText(selectedPackage.package_status)}
                    </span>
                  </div>
                </div>

                {/* Price & Seats & Duration */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" /> Price
                    </p>
                    {selectedPackage.discount_price ? (
                      <>
                        <p className="text-base font-bold text-red-600">
                          {formatPrice(selectedPackage.discount_price)}
                        </p>
                        <p className="text-xs text-gray-400 line-through">
                          {formatPrice(selectedPackage.price)}
                        </p>
                        {getDiscountPercentage(
                          selectedPackage.price,
                          selectedPackage.discount_price,
                        ) && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                            Save{" "}
                            {getDiscountPercentage(
                              selectedPackage.price,
                              selectedPackage.discount_price,
                            )}
                            %
                          </span>
                        )}
                      </>
                    ) : (
                      <p className="text-base font-bold text-gray-900">
                        {formatPrice(selectedPackage.price)}
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Seats
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      {selectedPackage.seats}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 col-span-2 sm:col-span-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Duration
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      {calculateDuration(
                        selectedPackage.departure_date,
                        selectedPackage.return_date,
                      )}{" "}
                      days
                    </p>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" /> Departure
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(selectedPackage.departure_date)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" /> Return
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(selectedPackage.return_date)}
                    </p>
                  </div>
                </div>

                {/* Includes */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1 border-b border-gray-100 pb-1">
                    <Check className="w-4 h-4 text-green-600" /> Includes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPackage.includes.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-green-50 text-green-800 text-xs rounded-full border border-green-200"
                      >
                        {item.value}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Excludes */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1 border-b border-gray-100 pb-1">
                    <X className="w-4 h-4 text-red-500" /> Excludes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPackage.excludes.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-red-50 text-red-800 text-xs rounded-full border border-red-200"
                      >
                        {item.value}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gallery */}
                {selectedPackage.gallery_image.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1 border-b border-gray-100 pb-1">
                      <ImageIcon className="w-4 h-4 text-gray-500" /> Gallery
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {selectedPackage.gallery_image.map((img, i) => (
                        <div
                          key={i}
                          className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
                        >
                          <Image
                            src={img}
                            alt={`gallery-${i}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1 border-b border-gray-100 pb-1">
                    <FileText className="w-4 h-4 text-gray-500" /> Description
                  </p>
                  <div
                    className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-3 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: selectedPackage.description,
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleEdit(selectedPackage);
                  }}
                  className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" /> Edit Package
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && packageToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setIsDeleteModalOpen(false)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-red-50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Delete Package
                  </h3>
                </div>
              </div>

              <div className="bg-white px-6 py-4">
                <p className="text-gray-700">
                  Are you sure you want to delete{" "}
                  <strong className="text-red-600">
                    {packageToDelete.title}
                  </strong>
                  ?
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  This action cannot be undone.
                </p>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" /> Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {packages.length === 0 && (
        <div className="text-center py-16 px-4">
          <div className="bg-red-50 rounded-lg p-8 max-w-md mx-auto">
            <Package className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-800 mb-2">
              No Packages Found
            </h3>
            <p className="text-red-600">
              No Umrah packages are available at the moment.
            </p>
            <Link href="/dashboard/hajj-umrah/admin/umrah-packages/create-package">
              <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Create First Package
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUmrahPackage;
