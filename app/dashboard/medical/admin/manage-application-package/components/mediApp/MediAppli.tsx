"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  Heart,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  FileText,
  Image,
  CreditCard,
  Stethoscope,
  Building2,
  Globe,
  FileDown,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { AddMedicalPackage } from "../addMedicalPackage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export interface MedicalApplication {
  _id: string;
  country: string;
  hospital_name: string;
  department: string;
  patientName: string;
  patient_age: string;
  patient_gender: string;
  patient_disease: string;
  disease_duration: string;
  contactNumber: string;
  email: string;
  medical_report: string[];
  recent_photo: string;
  passport_copy: string;
  destinationCountry: string;
  destinationCity: string;
  createdBy: string;
  paymentStatus: string;
  appointmentStatus: string;
  package_id: string;
  paymentMethod: string;
  createdAt: string;
  paidAt: string;
  updatedAt: string;
}

interface MediAppliProps {
  application: MedicalApplication[];
}

const MediAppli: React.FC<MediAppliProps> = ({ application }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedApp, setSelectedApp] = useState<MedicalApplication | null>(
    null,
  );
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [openStatusDropdown, setOpenStatusDropdown] = useState<string | null>(
    null,
  );
  const [openPaymentDropdown, setOpenPaymentDropdown] = useState<string | null>(
    null,
  );
  const [openActionDropdown, setOpenActionDropdown] = useState<string | null>(
    null,
  );
  const router = useRouter();
  const itemsPerPage = 5;

  const value: string = "medicalPackage";

  console.log({ openStatusDropdown });

  // Status change handler
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // API call to update status
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-application/api/v1/upd-appointment/payment/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ appointmentStatus: newStatus }),
        },
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Status updated successfully");
        router.refresh();
        setOpenStatusDropdown(null);
        setOpenPaymentDropdown(null);
        setOpenActionDropdown(null);
        return;
      }
      toast.error("Status not updated!!");
    } catch (error) {
      console.error("Error updating status:", error);
    }
    setOpenStatusDropdown(null);
  };

  // Payment status change handler
  const handlePaymentStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-application/api/v1/upd-appointment/payment/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentStatus: newStatus }),
        },
      );

      const result = await response.json();
      console.log({ result });

      if (result.success) {
        toast.success("Payment status updated successfully");
        router.refresh();
        setOpenStatusDropdown(null);
        setOpenPaymentDropdown(null);
        setOpenActionDropdown(null);
        return;
      }
      toast.error("Payment status not updated!!");
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
    setOpenPaymentDropdown(null);
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Application ${id} deleted successfully`);
        // Refetch or update local state
      }
    } catch (error) {
      console.error("Error deleting application:", error);
    }
    setShowDeleteConfirm(null);
    setOpenActionDropdown(null);
  };

  // View details handler
  const handleView = (app: MedicalApplication) => {
    setSelectedApp(app);
    setShowDetails(true);
    setOpenActionDropdown(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "in-progress":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "delivered":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "refunded":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredApplications = application.filter((app) => {
    const matchesSearch =
      app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.contactNumber.includes(searchTerm) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || app.appointmentStatus === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || app.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (!sortField) return 0;

    let aValue: any = a[sortField as keyof MedicalApplication];
    let bValue: any = b[sortField as keyof MedicalApplication];

    if (
      sortField === "createdAt" ||
      sortField === "updatedAt" ||
      sortField === "paidAt"
    ) {
      aValue = new Date(aValue as string).getTime();
      bValue = new Date(bValue as string).getTime();
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const totalPages = Math.ceil(sortedApplications.length / itemsPerPage);
  const paginatedApplications = sortedApplications.slice(
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

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 inline-block ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline-block ml-1" />
    );
  };

  // Close dropdowns when clicking outside
  //   React.useEffect(() => {
  //     const handleClickOutside = () => {
  //       setOpenStatusDropdown(null);
  //       setOpenPaymentDropdown(null);
  //       setOpenActionDropdown(null);
  //     };

  //     document.addEventListener("click", handleClickOutside);
  //     return () => document.removeEventListener("click", handleClickOutside);
  //   }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-red-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Medical Applications
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Manage and track all medical applications
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-red-600 to-red-800 text-white rounded-xl hover:from-red-800 hover:to-red-600 transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transform hover:-translate-y-0.5">
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <div className="flex flex-col max-w-7xl mx-auto m-6 sm:flex-row sm:items-center sm:justify-between gap-4">
              <AddMedicalPackage value={value} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        {[
          {
            label: "Total",
            value: application.length,
            color: "from-red-500 to-red-600",
            icon: FileText,
          },
          {
            label: "Pending",
            value: application.filter((a) => a.appointmentStatus === "pending")
              .length,
            color: "from-yellow-500 to-orange-600",
            icon: Clock,
          },
          {
            label: "Confirmed",
            value: application.filter(
              (a) => a.appointmentStatus === "confirmed",
            ).length,
            color: "from-emerald-500 to-green-600",
            icon: CheckCircle2,
          },
          {
            label: "Completed",
            value: application.filter(
              (a) => a.appointmentStatus === "completed",
            ).length,
            color: "from-purple-500 to-red-800",
            icon: CheckCircle2,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs md:text-sm font-medium">
                {stat.label}
              </span>
              <div
                className={`p-2 rounded-xl bg-linear-to-br ${stat.color} text-white shadow-lg`}
              >
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl md:text-2xl font-bold text-gray-800">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by patient, hospital, country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm cursor-pointer hover:bg-gray-100"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm cursor-pointer hover:bg-gray-100"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100">
        {/* Desktop Table */}
        <div className="hidden lg:block">
          <table className="w-full">
            <thead>
              <tr className="bg-linear-to-r from-gray-50 to-red-50 border-b border-gray-200">
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-red-600 transition-colors"
                  onClick={() => handleSort("patientName")}
                >
                  Patient <SortIcon field="patientName" />
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-red-600 transition-colors"
                  onClick={() => handleSort("hospital_name")}
                >
                  Hospital <SortIcon field="hospital_name" />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Department
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-red-600 transition-colors"
                  onClick={() => handleSort("country")}
                >
                  Country <SortIcon field="country" />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payment
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-red-600 transition-colors"
                  onClick={() => handleSort("createdAt")}
                >
                  Date <SortIcon field="createdAt" />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedApplications.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-red-50/50 transition-colors duration-200 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-red-400 to-red-800 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                        {app.patientName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">
                          {app.patientName}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {app.patient_age} yrs • {app.patient_gender}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-800 max-w-50 truncate">
                          {app.hospital_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                      <Stethoscope className="w-4 h-4 text-gray-400" />
                      {app.department}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-800">
                          {app.destinationCity}
                        </div>
                        <div className="text-xs text-gray-500">
                          {app.country}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenStatusDropdown(
                            openStatusDropdown === app._id ? null : app._id,
                          );
                          setOpenPaymentDropdown(null);
                          setOpenActionDropdown(null);
                        }}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 hover:shadow-md ${getStatusColor(app.appointmentStatus)}`}
                      >
                        {getStatusIcon(app.appointmentStatus)}
                        {app.appointmentStatus}
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </button>

                      {openStatusDropdown === app._id && (
                        <div className="absolute mt-2 w-44 z-9999 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                          {[
                            "pending",
                            "confirmed",
                            "in-progress",
                            "completed",
                            "cancelled",
                          ].map((status) => (
                            <button
                              key={status}
                              onClick={() =>
                                handleStatusChange(app._id, status)
                              }
                              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                                app.appointmentStatus === status
                                  ? "bg-red-50 text-red-800 font-medium"
                                  : "text-gray-700"
                              }`}
                            >
                              {getStatusIcon(status)}
                              <span className="capitalize">{status}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenPaymentDropdown(
                            openPaymentDropdown === app._id ? null : app._id,
                          );
                          setOpenStatusDropdown(null);
                          setOpenActionDropdown(null);
                        }}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 hover:shadow-md ${getPaymentStatusColor(app.paymentStatus)}`}
                      >
                        <CreditCard className="w-3 h-3" />
                        {app.paymentStatus}
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </button>

                      {openPaymentDropdown === app._id && (
                        <div className="absolute left-0 z-9999 mt-2 w-44 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                          {[
                            "paid",
                            "pending",
                            "delivered",
                            "failed",
                            "refunded",
                          ].map((status) => (
                            <button
                              key={status}
                              onClick={() =>
                                handlePaymentStatusChange(app._id, status)
                              }
                              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                                app.paymentStatus === status
                                  ? "bg-red-50 text-red-800 font-medium"
                                  : "text-gray-700"
                              }`}
                            >
                              <CreditCard className="w-3 h-3" />
                              <span className="capitalize">{status}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formatDate(app.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenActionDropdown(
                            openActionDropdown === app._id ? null : app._id,
                          );
                          setOpenStatusDropdown(null);
                          setOpenPaymentDropdown(null);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                      </button>

                      {openActionDropdown === app._id && (
                        <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                          <button
                            onClick={() => handleView(app)}
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700 hover:text-red-600"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                          <Link
                            href={`/dashboard/medical/actions/${app._id}/edit`}
                          >
                            <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700 hover:text-green-600">
                              <Pencil className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                          </Link>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button
                            onClick={() => {
                              setShowDeleteConfirm(app._id);
                              setOpenActionDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-50 transition-colors flex items-center gap-3 text-gray-700 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile and Tablet Cards */}
        <div className="lg:hidden">
          {paginatedApplications.map((app) => (
            <div
              key={app._id}
              className="p-4 border-b border-gray-100 hover:bg-red-50/50 transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-red-400 to-red-800 flex items-center justify-center text-white font-semibold text-lg shadow-lg shrink-0">
                    {app.patientName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {app.patientName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {app.patient_age} yrs • {app.patient_gender}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      {app.destinationCity}, {app.country}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenActionDropdown(
                        openActionDropdown === app._id ? null : app._id,
                      );
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                  </button>

                  {openActionDropdown === app._id && (
                    <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2">
                      <button
                        onClick={() => handleView(app)}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <Link href={`/dashboard/medical/actions/${app._id}/edit`}>
                        <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700">
                          <Pencil className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => setShowDeleteConfirm(app._id)}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{app.hospital_name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Stethoscope className="w-4 h-4 text-gray-400" />
                  <span>{app.department}</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenStatusDropdown(
                          openStatusDropdown === app._id ? null : app._id,
                        )
                      }
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.appointmentStatus)}`}
                    >
                      {getStatusIcon(app.appointmentStatus)}
                      {app.appointmentStatus}
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {openStatusDropdown === app._id && (
                      <div className="absolute z-50 mt-2 w-44 bg-white rounded-xl shadow-2xl border border-gray-100 py-2">
                        {[
                          "pending",
                          "confirmed",
                          "in-progress",
                          "completed",
                          "cancelled",
                        ].map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(app._id, status)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                              app.appointmentStatus === status
                                ? "bg-red-50 text-red-800 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {getStatusIcon(status)}
                            <span className="capitalize">{status}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenPaymentDropdown(
                          openPaymentDropdown === app._id ? null : app._id,
                        )
                      }
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getPaymentStatusColor(app.paymentStatus)}`}
                    >
                      <CreditCard className="w-3 h-3" />
                      {app.paymentStatus}
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {openPaymentDropdown === app._id && (
                      <div className="absolute z-50 mt-2 w-44 bg-white rounded-xl shadow-2xl border border-gray-100 py-2">
                        {[
                          "paid",
                          "pending",
                          "delivered",
                          "failed",
                          "refunded",
                        ].map((status) => (
                          <button
                            key={status}
                            onClick={() =>
                              handlePaymentStatusChange(app._id, status)
                            }
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                              app.paymentStatus === status
                                ? "bg-red-50 text-red-800 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            <CreditCard className="w-3 h-3" />
                            <span className="capitalize">{status}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(app.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {paginatedApplications.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No applications found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  sortedApplications.length,
                )}{" "}
                of {sortedApplications.length} entries
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 ${
                        currentPage === page
                          ? "bg-linear-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-500/25"
                          : "hover:bg-gray-200 text-gray-700"
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
                  className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-300">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Delete Application
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this application? This action
                cannot be undone.
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="px-6 py-2.5 bg-linear-to-r from-red-600 to-red-800 text-white rounded-xl hover:from-red-800 hover:to-red-800 transition-all duration-300 font-medium shadow-lg shadow-red-500/25"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetails && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Application Details
              </h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Patient Info */}
              <div className="bg-linear-to-br from-red-50 to-indigo-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-red-600" />
                  Patient Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Name</label>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedApp.patientName}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">
                      Age & Gender
                    </label>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedApp.patient_age} yrs •{" "}
                      {selectedApp.patient_gender}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Contact</label>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedApp.contactNumber}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Email</label>
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {selectedApp.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medical Info */}
              <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-emerald-600" />
                  Medical Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Disease</label>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedApp.patient_disease}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Duration</label>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedApp.disease_duration?.replace(/_/g, " ")}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Hospital</label>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedApp.hospital_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Department</label>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedApp.department}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-600" />
                  Additional Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Destination</label>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedApp.destinationCity},{" "}
                      {selectedApp.destinationCountry}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">
                      Payment Method
                    </label>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedApp.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Created</label>
                    <p className="text-sm font-medium text-gray-800">
                      {formatDate(selectedApp.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Paid At</label>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedApp.paidAt
                        ? formatDate(selectedApp.paidAt)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-linear-to-br from-gray-50 to-slate-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  Documents
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedApp.medical_report?.map((report, index) => (
                    <a
                      key={index}
                      href={report}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-md transition-all duration-300 text-sm"
                    >
                      <Image className="w-4 h-4 text-red-600" />
                      Report {index + 1}
                    </a>
                  ))}
                  {selectedApp.recent_photo && (
                    <a
                      href={selectedApp.recent_photo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-md transition-all duration-300 text-sm"
                    >
                      <Image className="w-4 h-4 text-green-600" />
                      Recent Photo
                    </a>
                  )}
                  {selectedApp.passport_copy && (
                    <a
                      href={selectedApp.passport_copy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-md transition-all duration-300 text-sm"
                    >
                      <FileText className="w-4 h-4 text-purple-600" />
                      Passport Copy
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={() => setShowDetails(false)}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Close
              </button>
              <Link href={`/dashboard/medical/actions/${selectedApp._id}/edit`}>
                <button className="px-6 py-2.5 bg-linear-to-r from-red-600 to-red-800 text-white rounded-xl hover:from-red-800 hover:to-red-600 transition-all duration-300 font-medium shadow-lg shadow-red-500/25">
                  Edit Application
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediAppli;
