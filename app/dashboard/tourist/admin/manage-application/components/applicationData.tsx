// components/TouristApplicationTable.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { ITouristBooking } from "@/app/types/touristBooking";
import { toast } from "sonner";

interface TouristApplicationTableProps {
  initialPackages: ITouristBooking[];
}

type SortKey = keyof ITouristBooking | "packageInfo.title" | "location.country";

const TouristApplicationTable: React.FC<TouristApplicationTableProps> = ({
  initialPackages,
}) => {
  const router = useRouter();

  // State management
  const [packages, setPackages] = useState<ITouristBooking[]>(initialPackages);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [deleteModal, setDeleteModal] = useState<{
    show: boolean;
    id: string | null;
    name: string;
  }>({
    show: false,
    id: null,
    name: "",
  });
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "warning";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  // Show notification helper
  const showNotification = (
    message: string,
    type: "success" | "error" | "warning",
  ) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Sorting function
  const handleSort = (key: SortKey) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = [...packages];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.fullName.toLowerCase().includes(searchLower) ||
          item.email.toLowerCase().includes(searchLower) ||
          item.phoneNumber.includes(searchTerm) ||
          item.packageInfo.title.toLowerCase().includes(searchLower) ||
          item.location.country.toLowerCase().includes(searchLower) ||
          item._id.toLowerCase().includes(searchLower),
      );
    }

    // Sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        let aValue: string | number = "";
        let bValue: string | number = "";

        if (sortConfig.key === "packageInfo.title") {
          aValue = a.packageInfo.title.toLowerCase();
          bValue = b.packageInfo.title.toLowerCase();
        } else if (sortConfig.key === "location.country") {
          aValue = a.location.country.toLowerCase();
          bValue = b.location.country.toLowerCase();
        } else {
          const key = sortConfig.key as keyof ITouristBooking;
          aValue = String(a[key] ?? "").toLowerCase();
          bValue = String(b[key] ?? "").toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [packages, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handle delete
  const handleDeleteClick = (id: string, name: string) => {
    setDeleteModal({ show: true, id, name });
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-application/api/v1/delete/${deleteModal.id}`,
        {
          method: "DELETE",
        },
      );
      const data = await response.json();

      if (data.success) {
        setPackages((prev) => prev.filter((pkg) => pkg._id !== deleteModal.id));
        // showNotification("Application deleted successfully!", "success");
        setDeleteModal({ show: false, id: null, name: "" });
        toast.success("Application deleted successfully")
      } else {
        throw new Error(data.message || "Failed to delete");
      }
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to delete application",
        "error",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle actions
  const handleView = (id: string) => {
    router.push(`/dashboard/tourist/${id}/view`);
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/tourist/${id}/edit`);
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Sort icon component
  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortConfig?.key !== column) {
      return <ArrowUpDown size={14} className="text-red-300" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={14} className="text-red-600" />
    ) : (
      <ChevronDown size={14} className="text-red-600" />
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
            notification.type === "success"
              ? "bg-red-50 text-red-800 border border-red-200"
              : notification.type === "error"
                ? "bg-red-100 text-red-900 border border-red-300"
                : "bg-amber-50 text-amber-800 border border-amber-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 size={20} className="text-red-600" />
          ) : notification.type === "error" ? (
            <XCircle size={20} className="text-red-700" />
          ) : (
            <AlertTriangle size={20} className="text-amber-600" />
          )}
          <span className="text-sm font-medium">{notification.message}</span>
          <button
            onClick={() =>
              setNotification({ show: false, message: "", type: "success" })
            }
            className="ml-4 text-current opacity-50 hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, email, package..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-red-200 rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
              placeholder:text-red-300 text-gray-700 bg-white transition-all"
          />
        </div>
        <div className="text-sm text-red-600 font-medium bg-red-50 px-4 py-2 rounded-lg">
          Total: {filteredAndSortedData.length} applications
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-md border border-red-100 overflow-hidden">
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="hidden md:table w-full">
            <thead>
              <tr className="bg-linear-to-r from-red-600 to-red-700">
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  #
                </th>
                <th
                  className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-red-800/50 transition-colors"
                  onClick={() => handleSort("fullName")}
                >
                  <div className="flex items-center gap-1">
                    Applicant
                    <SortIcon column="fullName" />
                  </div>
                </th>
                <th
                  className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-red-800/50 transition-colors"
                  onClick={() => handleSort("packageInfo.title")}
                >
                  <div className="flex items-center gap-1">
                    Package
                    <SortIcon column="packageInfo.title" />
                  </div>
                </th>
                <th
                  className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-red-800/50 transition-colors"
                  onClick={() => handleSort("location.country")}
                >
                  <div className="flex items-center gap-1">
                    Destination
                    <SortIcon column="location.country" />
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Cost
                </th>
                <th
                  className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-red-800/50 transition-colors"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center gap-1">
                    Date
                    <SortIcon column="createdAt" />
                  </div>
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-red-50/50 transition-colors duration-150"
                  >
                    <td className="px-4 py-4 text-sm text-gray-500 font-medium">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {item.fullName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {item.fullName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {item.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {item.packageInfo.thumbnail && (
                          <Image
                            src={item.packageInfo.thumbnail}
                            alt={item.packageInfo.title}
                            width={40}
                            height={40}
                            className="rounded-md object-cover shrink-0"
                          />
                        )}
                        <span className="text-sm text-gray-700 truncate max-w-37.5">
                          {item.packageInfo.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.location.country}
                        </p>
                        <p className="text-xs text-gray-500 truncate max-w-30">
                          {item.location.destinationPlace}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-red-50 text-red-700 rounded-full">
                        {item.durationAndDates.duration}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-semibold text-red-600">
                        {item.totalCost} BDT
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs text-gray-500">
                        {formatDate(item.createdAt)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* View Button */}
                        <button
                          onClick={() => handleView(item._id)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 
                            transition-colors duration-200 group relative"
                          title="View Details"
                        >
                          <Eye size={16} />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            View
                          </span>
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(item._id)}
                          className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 
                            transition-colors duration-200 group relative"
                          title="Edit Application"
                        >
                          <Edit size={16} />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Edit
                          </span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() =>
                            handleDeleteClick(item._id, item.fullName)
                          }
                          className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 
                            transition-colors duration-200 group relative"
                          title="Delete Application"
                        >
                          <Trash2 size={16} />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Search size={40} className="text-red-300" />
                      <p className="text-gray-500 font-medium">
                        No applications found
                      </p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your search criteria
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Mobile/Tablet Cards */}
          <div className="md:hidden divide-y divide-red-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <div
                  key={item._id}
                  className="p-4 space-y-3 hover:bg-red-50/30 transition-colors"
                >
                  {/* Header with index and actions */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-red-400">
                      #{(currentPage - 1) * itemsPerPage + index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleView(item._id)}
                        className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="p-1.5 rounded bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteClick(item._id, item.fullName)
                        }
                        className="p-1.5 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Applicant Info */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {item.fullName.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {item.fullName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {item.email}
                      </p>
                    </div>
                  </div>

                  {/* Package & Destination */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Package:</span>
                      <p className="font-medium text-gray-700 truncate">
                        {item.packageInfo.title}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Destination:</span>
                      <p className="font-medium text-gray-700">
                        {item.location.country}
                      </p>
                    </div>
                  </div>

                  {/* Duration & Cost & Date */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-full font-medium">
                      {item.durationAndDates.duration}
                    </span>
                    <span className="font-semibold text-red-600">
                      {item.totalCost} BDT
                    </span>
                    <span className="text-gray-400">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <Search size={40} className="text-red-300 mx-auto mb-2" />
                <p className="text-gray-500 font-medium">
                  No applications found
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-red-100 bg-red-50/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredAndSortedData.length,
                )}{" "}
                of {filteredAndSortedData.length} results
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-red-200 bg-white text-red-600 
                    hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        currentPage === page
                          ? "bg-red-600 text-white shadow-md"
                          : "bg-white text-gray-700 border border-red-200 hover:bg-red-50"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-red-200 bg-white text-red-600 
                    hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Confirm Delete
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete application for{" "}
                <span className="font-semibold text-red-600">
                  {deleteModal.name}
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() =>
                    setDeleteModal({ show: false, id: null, name: "" })
                  }
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 
                    rounded-lg hover:bg-gray-200 transition-colors"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 
                    rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 
                    disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristApplicationTable;
