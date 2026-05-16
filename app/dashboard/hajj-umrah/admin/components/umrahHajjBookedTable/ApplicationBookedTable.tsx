// import React from "react";

// const ApplicationBookedTable = ({ bookedData }: { bookedData: any }) => {
//   return <div>ApplicationBookedTable</div>;
// };

// export default ApplicationBookedTable;

// components/umrahHajjBookedTable/ApplicationBookedTable.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Edit,
  Trash2,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  User,
  Plane,
  Hotel,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Users,
  Check,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";
import DeleteConfirmModal from "./DeleteConfirmModal";
import PaymentUpdateModal from "./PaymentUpdateModal";
import { toast } from "sonner"; // or use your preferred toast library
import { ApplicationBookedTableProps, ApplicationData } from "@/app/types/umrahHajj";



const ApplicationBookedTable: React.FC<ApplicationBookedTableProps> = ({
  bookedData,
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    appId: string | null;
  }>({ isOpen: false, appId: null });
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    app: ApplicationData | null;
  }>({ isOpen: false, app: null });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  const applications = bookedData?.data || [];

  // Filter and sort applications
  const filteredApplications = useMemo(() => {
    let filtered = [...applications];

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.applicantInfo.fullName.toLowerCase().includes(search) ||
          app.applicantInfo.email.toLowerCase().includes(search) ||
          app.applicantInfo.phone.includes(search) ||
          app.applicantInfo.nidNumber.includes(search) ||
          app.pkgInfo.pkgName.toLowerCase().includes(search) ||
          app.payment.trxId.toLowerCase().includes(search),
      );
    }

    // Package type filter
    if (filterType !== "all") {
      filtered = filtered.filter(
        (app) => app.travelInfo.packageType === filterType,
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (app) => app.applicationStatus === filterStatus,
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case "fullName":
          aValue = a.applicantInfo.fullName;
          bValue = b.applicantInfo.fullName;
          break;
        case "packageType":
          aValue = a.travelInfo.packageType;
          bValue = b.travelInfo.packageType;
          break;
        case "price":
          aValue = a.pkgInfo.pkgPrice;
          bValue = b.pkgInfo.pkgPrice;
          break;
        case "status":
          aValue = a.applicationStatus;
          bValue = b.applicationStatus;
          break;
        case "paymentStatus":
          aValue = a.payment.paymentStatus;
          bValue = b.payment.paymentStatus;
          break;
        default:
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [
    applications,
    searchTerm,
    filterType,
    filterStatus,
    sortField,
    sortDirection,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleView = (appId: string) => {
    router.push(`/dashboard/hajj-umrah/view/${appId}`);
  };

  const handleEdit = (appId: string) => {
    router.push(`/dashboard/hajj-umrah/edit/${appId}`);
  };

  const handleDelete = async (appId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/v1/delete-umrah-application/${appId}`,
        { method: "DELETE" },
      );

      if (!response.ok) throw new Error("Failed to delete application");

      toast.success("Application deleted successfully");
      setDeleteModal({ isOpen: false, appId: null });
      // Refresh data - you might want to use router.refresh() or re-fetch
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete application");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationStatusChange = async (
    appId: string,
    newStatus: string,
  ) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/v1/update-application-status/${appId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ applicationStatus: newStatus }),
        },
      );
      const result = await response.json();

      if (!result.success)
        throw new Error("Failed to update application status");

      toast.success("Application status updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update application status");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentUpdate = async (paymentData: {
    paymentMethod: string;
    trxId: string;
    paymentStatus: string;
    image?: string | File | null;
    paymentPay?: number;
    paymentDue?: number;
  }) => {
    try {
      setLoading(true);
  

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/v1/update-payment/${paymentModal.app?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        },
      );
      const result = await response.json();


      if (!result.success) throw new Error("Failed to update payment");

      toast.success("Payment updated successfully");
      setPaymentModal({ isOpen: false, app: null });
      router.refresh();
    } catch (error) {
      toast.error("Failed to update payment");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "partial":
        return "bg-orange-100 text-orange-800";
      case "unpaid":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 inline-block ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline-block ml-1" />
    );
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-white rounded-t-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Umrah & Hajj Applications
            </h2>
            <p className="text-gray-500 mt-1">Manage all booked applications</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              <Filter className="w-4 h-4" />
              Filters
              {showFilters ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => {
                // Export functionality
                const csv = convertToCSV(filteredApplications);
                downloadCSV(csv, "umrah-hajj-applications.csv");
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, phone, NID, package..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            />
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Type:
                </label>
                <select
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                >
                  <option value="all">All Packages</option>
                  <option value="umrah">Umrah</option>
                  <option value="hajj">Hajj</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Status:
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {(searchTerm ||
                filterType !== "all" ||
                filterStatus !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("all");
                    setFilterStatus("all");
                    setCurrentPage(1);
                  }}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                >
                  <X className="w-4 h-4" />
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Table for Desktop */}
      <div className="hidden lg:block bg-white border-x border-b border-gray-200 rounded-b-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-gray-900"
                  onClick={() => handleSort("fullName")}
                >
                  Applicant <SortIcon field="fullName" />
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-gray-900"
                  onClick={() => handleSort("packageType")}
                >
                  Package <SortIcon field="packageType" />
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-gray-900"
                  onClick={() => handleSort("price")}
                >
                  Price <SortIcon field="price" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Travel Info
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-gray-900"
                  onClick={() => handleSort("paymentStatus")}
                >
                  Payment <SortIcon field="paymentStatus" />
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-gray-900"
                  onClick={() => handleSort("status")}
                >
                  Status <SortIcon field="status" />
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedApplications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <User className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-gray-500 text-lg">
                        No applications found
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedApplications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                          <User className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {app.applicantInfo.fullName}
                          </p>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Mail className="w-3 h-3" />
                            <span className="truncate">
                              {app.applicantInfo.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Phone className="w-3 h-3" />
                            <span>{app.applicantInfo.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            app.travelInfo.packageType === "hajj"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {app.travelInfo.packageType.toUpperCase()}
                        </span>
                        <p className="text-sm text-gray-900 mt-1 font-medium">
                          {app.pkgInfo.pkgName}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(app.pkgInfo.pkgPrice)}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {formatDate(app.pkgInfo.pkgDepartureDate)} -{" "}
                            {formatDate(app.pkgInfo.pkgReturnDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Hotel className="w-3 h-3" />
                          <span>
                            {app.travelInfo.makkahHotelCategory} /{" "}
                            {app.travelInfo.madinahHotelCategory}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Users className="w-3 h-3" />
                          <span>{app.travelInfo.roomSharing}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                            app.payment.paymentStatus,
                          )}`}
                        >
                          {app.payment.paymentStatus.toUpperCase()}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          {app.payment.paymentMethod}
                        </p>
                        {app.payment.paymentStatus === "partial" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPaymentModal({ isOpen: true, app });
                            }}
                            className="mt-2 flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium"
                          >
                            <CreditCard className="w-3 h-3" />
                            Update Payment
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={app.applicationStatus}
                        onChange={(e) => {
                          handleApplicationStatusChange(
                            app._id,
                            e.target.value,
                          );
                        }}
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          app.applicationStatus,
                        )} cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                      >
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleView(app._id)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(app._id)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Application"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setDeleteModal({ isOpen: true, appId: app._id })
                          }
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card View for Mobile/Tablet */}
      <div className="lg:hidden bg-white border-x border-b border-gray-200 rounded-b-xl">
        {paginatedApplications.length === 0 ? (
          <div className="p-12 text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 text-lg">No applications found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {paginatedApplications.map((app) => (
              <div
                key={app._id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {app.applicantInfo.fullName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {app.applicantInfo.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        {app.applicantInfo.phone}
                      </p>
                    </div>
                  </div>
                  <select
                    value={app.applicationStatus}
                    onChange={(e) => {
                      handleApplicationStatusChange(app._id, e.target.value);
                    }}
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      app.applicationStatus,
                    )} cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                  >
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <span className="text-xs text-gray-500">Package Type</span>
                    <p className="text-sm font-medium">
                      {app.travelInfo.packageType.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Price</span>
                    <p className="text-sm font-medium text-red-600">
                      {formatCurrency(app.pkgInfo.pkgPrice)}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Package</span>
                    <p className="text-sm">{app.pkgInfo.pkgName}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Payment</span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getPaymentStatusColor(
                        app.payment.paymentStatus,
                      )}`}
                    >
                      {app.payment.paymentStatus}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-gray-500">Travel Dates</span>
                    <p className="text-sm">
                      {formatDate(app.pkgInfo.pkgDepartureDate)} -{" "}
                      {formatDate(app.pkgInfo.pkgReturnDate)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(app._id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                    <button
                      onClick={() => handleEdit(app._id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <Edit className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() =>
                        setDeleteModal({ isOpen: true, appId: app._id })
                      }
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                  {app.payment.paymentStatus === "partial" && (
                    <button
                      onClick={() => setPaymentModal({ isOpen: true, app })}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <CreditCard className="w-3 h-3" /> Update Payment
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredApplications.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-b-xl p-4 -mt-px">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredApplications.length,
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium">{filteredApplications.length}</span>{" "}
              results
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === pageNumber
                          ? "bg-red-600 text-white"
                          : "border border-gray-300 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, appId: null })}
        onConfirm={() => deleteModal.appId && handleDelete(deleteModal.appId)}
        loading={loading}
      />

      {/* Payment Update Modal */}
      <PaymentUpdateModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, app: null })}
        onSubmit={handlePaymentUpdate}
        application={paymentModal.app}
        loading={loading}
      />
    </div>
  );
};

// Utility functions for CSV export
const convertToCSV = (data: ApplicationData[]) => {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Package Type",
    "Package Name",
    "Price",
    "Departure",
    "Return",
    "Payment Status",
    "Application Status",
    "Date Applied",
  ];

  const rows = data.map((app) => [
    app.applicantInfo.fullName,
    app.applicantInfo.email,
    app.applicantInfo.phone,
    app.travelInfo.packageType,
    app.pkgInfo.pkgName,
    app.pkgInfo.pkgPrice,
    new Date(app.pkgInfo.pkgDepartureDate).toLocaleDateString(),
    new Date(app.pkgInfo.pkgReturnDate).toLocaleDateString(),
    app.payment.paymentStatus,
    app.applicationStatus,
    new Date(app.createdAt).toLocaleDateString(),
  ]);

  return [headers, ...rows].map((row) => row.join(",")).join("\n");
};

const downloadCSV = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

export default ApplicationBookedTable;
