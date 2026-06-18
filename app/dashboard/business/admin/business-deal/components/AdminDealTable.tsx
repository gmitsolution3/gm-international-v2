// components/AdminTable.tsx
"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Save,
  Phone,
  Building2,
  CreditCard,
  FileText,
  Loader,
  Mail,
} from "lucide-react";
import { IApplicationData, ModalType } from "./types";
import Swal from "sweetalert2";

interface AdminTableProps {
  initialData: IApplicationData[];
}

const AdminDealTable: React.FC<AdminTableProps> = ({ initialData }) => {
  const [data, setData] = useState<IApplicationData[]>(initialData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<IApplicationData | null>(
    null,
  );
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editFormData, setEditFormData] = useState<IApplicationData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<string>("");

  const itemsPerPage = 10;

  // Memoized filtered data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.allFormData.f_name.toLowerCase().includes(searchLower) ||
        item.allFormData.phone.includes(searchTerm) ||
        item.allFormData.c_name.toLowerCase().includes(searchLower) ||
        item.service.toLowerCase().includes(searchLower) ||
        item.allFormData.transaction_id?.toLowerCase().includes(searchLower)
      );
    });
  }, [data, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = useMemo(() => {
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, startIndex]);

  // Reset page when search changes
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on search
  }, []);

  // Handle view
  const handleView = useCallback((item: IApplicationData) => {
    setSelectedItem(item);
    setModalType("view");
    setEditFormData(null);
  }, []);

  // Handle edit
  const handleEdit = useCallback((item: IApplicationData) => {
    setSelectedItem(item);
    setEditFormData({ ...item }); // Create a copy for editing
    setModalType("edit");
  }, []);

  // Handle delete
  const handleDelete = useCallback((item: IApplicationData) => {
    setSelectedItem(item);
    setModalType("delete");
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setModalType(null);
    setSelectedItem(null);
    setEditFormData(null);
    setActionLoading("");
  }, []);

  // Handle update
  const handleUpdate = async () => {
    if (!editFormData || !selectedItem) return;

    setActionLoading("update");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/business-deal/api/v1/update/${selectedItem._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        },
      );

      if (response.ok) {
        // Update local state
        setData((prevData) =>
          prevData.map((item) =>
            item._id === selectedItem._id ? { ...editFormData } : item,
          ),
        );

        Swal.fire({
          title: "Updated!",
          text: "Application has been updated successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        closeModal();
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      closeModal();
      Swal.fire({
        title: "Error!",
        text: "Failed to update application. Please try again.",
        icon: "error",
      });
    } finally {
      setActionLoading("");
    }
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!selectedItem) return;
    closeModal();

    if (selectedItem.applicationStatus !== "rejected") {
      await Swal.fire({
        title: "Cannot delete!",
        text: "Only rejected deals can be deleted.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }


    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setActionLoading("delete");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/business-deal/api/v1/delete/${selectedItem._id}`,
          {
            method: "DELETE",
          },
        );

        const responseData = await response.json();

        if (response.status !== 200) {
          throw new Error(responseData.message || "Something went wrong");
        }

        setData((prevData) =>
          prevData.filter((item) => item._id !== selectedItem._id),
        );

        await Swal.fire({
          title: "Deleted Successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        closeModal();
        Swal.fire({
          title:
            error instanceof Error ? error.message : "Something went wrong",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      } finally {
        setActionLoading("");
      }
    }
  };

  // Handle input change for edit form
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    if (!editFormData) return;

    const { name, value } = e.target;

    setEditFormData((prev) => {
      if (!prev) return null;

      // Check if the field is nested in allFormData
      if (name in prev.allFormData) {
        return {
          ...prev,
          allFormData: {
            ...prev.allFormData,
            [name]: value,
          },
        };
      }

      // Otherwise update top-level field
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Modal Component
  const Modal = () => {
    if (!modalType || !selectedItem) return null;

    return (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-9999 p-4 transition-all duration-300"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
          {/* Modal Header */}
          <div className="sticky top-0 bg-linear-to-r from-red-600 to-red-700 text-white p-4 flex justify-between items-center rounded-t-lg z-10">
            <h2 className="text-xl font-semibold">
              {modalType === "view" && "View Application Details"}
              {modalType === "edit" && "Edit Application"}
              {modalType === "delete" && "Confirm Delete"}
            </h2>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-red-500 rounded-full transition-colors duration-200"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {modalType === "view" && (
              <div className="space-y-6 animate-fadeIn">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-linear-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        👤
                      </span>
                      Personal Information
                    </h3>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <span className="font-medium text-gray-600">Name:</span>{" "}
                        {selectedItem.allFormData.f_name}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-400" />
                        <span className="font-medium text-gray-600">
                          Phone:
                        </span>{" "}
                        {selectedItem.allFormData.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-400" />
                        <span className="font-medium text-gray-600">
                          Email:
                        </span>{" "}
                        {selectedItem.allFormData.c_email}
                      </p>
                    </div>
                  </div>

                  <div className="bg-linear-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        🏢
                      </span>
                      Company Information
                    </h3>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <Building2 size={16} className="text-gray-400" />
                        <span className="font-medium text-gray-600">
                          Company:
                        </span>{" "}
                        {selectedItem.allFormData.c_name}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600">
                          Address:
                        </span>{" "}
                        {selectedItem.allFormData.c_address}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600">
                          Service:
                        </span>{" "}
                        {selectedItem.serviceTitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-linear-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                    <CreditCard size={20} />
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <p>
                      <span className="font-medium text-gray-600">
                        Gateway:
                      </span>{" "}
                      {selectedItem.allFormData.payment_gateway}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Transaction ID:
                      </span>{" "}
                      {selectedItem.allFormData.transaction_id || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium text-gray-600">Status:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedItem.applicationStatus)}`}
                      >
                        {selectedItem.applicationStatus}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Documents */}
                {(selectedItem.payment_photo ||
                  selectedItem.allFormData.p_photo) && (
                  <div className="bg-linear-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-red-600 mb-3">
                      Documents
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedItem.payment_photo && (
                        <div>
                          <p className="font-medium mb-2 text-gray-600">
                            Payment Proof:
                          </p>
                          <img
                            src={selectedItem.payment_photo}
                            alt="Payment"
                            className="w-full h-48 object-cover rounded-lg border border-gray-200"
                            loading="lazy"
                          />
                        </div>
                      )}
                      {selectedItem.allFormData.p_photo && (
                        <div>
                          <p className="font-medium mb-2 text-gray-600">
                            Profile Photo:
                          </p>
                          <img
                            src={selectedItem.allFormData.p_photo}
                            alt="Profile"
                            className="w-full h-48 object-cover rounded-lg border border-gray-200"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {modalType === "edit" && editFormData && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="f_name"
                      value={editFormData.allFormData.f_name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.allFormData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="c_name"
                      value={editFormData.allFormData.c_name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Email
                    </label>
                    <input
                      type="email"
                      name="c_email"
                      value={editFormData.allFormData.c_email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      name="c_address"
                      value={editFormData.allFormData.c_address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      name="transaction_id"
                      value={editFormData.allFormData.transaction_id || ""}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="applicationStatus"
                      value={editFormData.applicationStatus}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading === "update"}
                    className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200"
                  >
                    {actionLoading === "update" ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Update
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {modalType === "delete" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={32} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Delete Application
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this application?
                  <br />
                  This action cannot be undone.
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={actionLoading === "delete"}
                    className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200"
                  >
                    {actionLoading === "delete" ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <span className="text-sm text-gray-500">
              Total Applications: {filteredData.length}
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, phone, company, service or transaction ID..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Table - Desktop View */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-red-600 to-red-700 text-white">
                  <th className="p-4 text-left font-semibold">Name</th>
                  <th className="p-4 text-left font-semibold">Phone</th>
                  <th className="p-4 text-left font-semibold">Company</th>
                  <th className="p-4 text-left font-semibold">Service</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-left font-semibold">Txn ID</th>
                  <th className="p-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`border-b border-gray-100 hover:bg-red-50 transition-colors duration-150 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {item.allFormData.f_name}
                    </td>
                    <td className="p-4 text-gray-600">
                      {item.allFormData.phone}
                    </td>
                    <td className="p-4 text-gray-600">
                      {item.allFormData.c_name}
                    </td>
                    <td className="p-4 text-gray-600">{item.service}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.applicationStatus)}`}
                      >
                        {item.applicationStatus}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {item.allFormData.transaction_id || "-"}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(item)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {currentData.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View - Card Layout */}
        <div className="md:hidden space-y-4">
          {currentData.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {item.allFormData.f_name}
                  </h3>
                  <p className="text-gray-600 flex items-center gap-1 mt-1">
                    <Phone size={14} className="text-gray-400" />
                    {item.allFormData.phone}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.applicationStatus)}`}
                >
                  {item.applicationStatus}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="flex items-center gap-2 text-gray-600">
                  <Building2 size={14} className="text-gray-400" />
                  {item.allFormData.c_name}
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <FileText size={14} className="text-gray-400" />
                  Service: {item.service}
                </p>
                {item.allFormData.transaction_id && (
                  <p className="flex items-center gap-2 text-gray-600">
                    <CreditCard size={14} className="text-gray-400" />
                    Txn: {item.allFormData.transaction_id}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleView(item)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-1"
                >
                  <Eye size={18} /> View
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 flex items-center gap-1"
                >
                  <Edit size={18} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center gap-1"
                >
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </div>
          ))}
          {currentData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No applications found
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                      currentPage === page
                        ? "bg-red-600 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal />
    </div>
  );
};

export default AdminDealTable;
