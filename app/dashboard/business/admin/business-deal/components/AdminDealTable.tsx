// components/AdminTable.tsx
"use client";

import React, { useState } from "react";
import {
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Save,
  Upload,
  Phone,
  Mail,
  Building2,
  Clock,
  CreditCard,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { ApplicationData, ModalType } from "./types";
import Swal from "sweetalert2";

interface AdminTableProps {
  initialData: ApplicationData[];
}

const AdminDealTable: React.FC<AdminTableProps> = ({ initialData }) => {
  const [data, setData] = useState<ApplicationData[]>(initialData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<ApplicationData | null>(
    null,
  );
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editFormData, setEditFormData] = useState<Partial<ApplicationData>>(
    {},
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const itemsPerPage = 10;

  // Filter data based on search
  const filteredData = data.filter(
    (item) =>
      item.f_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.c_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handle view
  const handleView = (item: ApplicationData) => {
    setSelectedItem(item);
    setModalType("view");
  };

  // Handle edit
  const handleEdit = (item: ApplicationData) => {
    setSelectedItem(item);
    setEditFormData(item);
    setModalType("edit");
  };

  // Handle delete
  const handleDelete = (item: ApplicationData) => {
    setSelectedItem(item);
    setModalType("delete");
  };

  // Handle update
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      // API call to update
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/business-deal-applications-update/${selectedItem?._id}`,
        {
          method: "PUT",
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
            item._id === selectedItem?._id
              ? { ...item, ...editFormData }
              : item,
          ),
        );
        setModalType(null);
      }
    } catch (error) {
      console.error("Error updating:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    setIsLoading(true);

    if (selectedItem?.applicationStatus !== "rejected") {
      Swal.fire({
        title: "Cannot delete!",
        text: "Only rejected deals can be deleted.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      setModalType(null);
      setIsLoading(false)
      return;
    }

    try {
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
            `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/delete-deal/${selectedItem?._id}`,
            {
              method: "DELETE",
            },
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

          setData((prevData) =>
            prevData.filter((item) => item._id !== selectedItem?._id),
          );
          setModalType(null);
        }
      });
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change for edit form
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Modal Component
  const Modal = () => {
    if (!modalType || !selectedItem) return null;

    return (
      <div className="fixed inset-0 bg-white/30 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="sticky top-0 bg-red-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {modalType === "view" && "View Application Details"}
              {modalType === "edit" && "Edit Application"}
              {modalType === "delete" && "Confirm Delete"}
            </h2>
            <button
              onClick={() => setModalType(null)}
              className="p-1 hover:bg-red-700 rounded"
            >
              <X size={24} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {modalType === "view" && (
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-semibold text-red-600 mb-3">
                      Personal Information
                    </h3>
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedItem.f_name}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedItem.phone}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {selectedItem.c_email}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-semibold text-red-600 mb-3">
                      Company Information
                    </h3>
                    <p>
                      <span className="font-medium">Company:</span>{" "}
                      {selectedItem.c_name}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span>{" "}
                      {selectedItem.c_address}
                    </p>
                    <p>
                      <span className="font-medium">Service:</span>{" "}
                      {selectedItem.serviceTitle}
                    </p>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-red-600 mb-3">
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <p>
                      <span className="font-medium">Gateway:</span> Gateway{" "}
                      {selectedItem.payment_gateway}
                    </p>
                    <p>
                      <span className="font-medium">Transaction ID:</span>{" "}
                      {selectedItem.transaction_id || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusBadge(selectedItem.applicationStatus)}`}
                      >
                        {selectedItem.applicationStatus}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Documents */}
                {(selectedItem.payment_photo || selectedItem.p_photo) && (
                  <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-semibold text-red-600 mb-3">
                      Documents
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedItem.payment_photo && (
                        <div>
                          <p className="font-medium mb-2">Payment Proof:</p>
                          <img
                            src={selectedItem.payment_photo}
                            alt="Payment"
                            className="w-full h-32 object-cover rounded"
                          />
                        </div>
                      )}
                      {selectedItem.p_photo && (
                        <div>
                          <p className="font-medium mb-2">Profile Photo:</p>
                          <img
                            src={selectedItem.p_photo}
                            alt="Profile"
                            className="w-full h-32 object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Information based on service type */}
                {selectedItem.select_advise_time && (
                  <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-semibold text-red-600 mb-3">
                      Service Details
                    </h3>
                    <p>
                      <span className="font-medium">Advise Time:</span>{" "}
                      {selectedItem.select_advise_time}
                    </p>
                    {selectedItem.select_adviser && (
                      <p>
                        <span className="font-medium">Adviser:</span>{" "}
                        {selectedItem.select_adviser}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {modalType === "edit" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="f_name"
                      value={editFormData.f_name || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.phone || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="c_name"
                      value={editFormData.c_name || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Email
                    </label>
                    <input
                      type="email"
                      name="c_email"
                      value={editFormData.c_email || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      name="c_address"
                      value={editFormData.c_address || ""}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      name="transaction_id"
                      value={editFormData.transaction_id || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="applicationStatus"
                      value={editFormData.applicationStatus || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading ? "Updating..." : "Update"}
                    <Save size={16} />
                  </button>
                </div>
              </form>
            )}

            {modalType === "delete" && (
              <div className="text-center py-4">
                <p className="text-lg mb-6">
                  Are you sure you want to delete this application?
                </p>
                <p className="text-gray-600 mb-6">
                  This action cannot be undone.
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setModalType(null)}
                    className="px-6 py-2 border rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={isLoading}
                    className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    {isLoading ? "Deleting..." : "Delete"}
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
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gray-100 rounded-lg shadow-md p-4 mb-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Admin Dashboard
          </h1>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, phone, company, service or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            />
          </div>
        </div>

        {/* Table - Desktop View */}
        <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Company</th>
                  <th className="p-3 text-left">Service</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Txn ID</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr
                    key={item._id}
                    className="bg-gray-100 hover:bg-red-100 border-b"
                  >
                    <td className="p-3 font-medium">{item.f_name}</td>
                    <td className="p-3">{item.phone}</td>
                    <td className="p-3">{item.c_name}</td>
                    <td className="p-3">{item.service}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(item.applicationStatus)}`}
                      >
                        {item.applicationStatus}
                      </span>
                    </td>
                    <td className="p-3">{item.transaction_id || "-"}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(item)}
                          className="p-1 text-red-600 hover:bg-blue-50 rounded"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
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

        {/* Mobile View - Card Layout */}
        <div className="md:hidden space-y-4">
          {currentData.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{item.f_name}</h3>
                  <p className="text-gray-600 flex items-center gap-1 mt-1">
                    <Phone size={14} /> {item.phone}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(item.applicationStatus)}`}
                >
                  {item.applicationStatus}
                </span>
              </div>

              <div className="space-y-2 mb-3">
                <p className="flex items-center gap-2">
                  <Building2 size={14} className="text-gray-500" />
                  <span className="text-gray-700">{item.c_name}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FileText size={14} className="text-gray-500" />
                  <span className="text-gray-700">Service: {item.service}</span>
                </p>
                {item.transaction_id && (
                  <p className="flex items-center gap-2">
                    <CreditCard size={14} className="text-gray-500" />
                    <span className="text-gray-700">
                      Txn: {item.transaction_id}
                    </span>
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t">
                <button
                  onClick={() => handleView(item)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-1"
                >
                  <Eye size={18} /> View
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg flex items-center gap-1"
                >
                  <Edit size={18} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1"
                >
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-white rounded shadow hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="px-4 py-2 bg-white rounded shadow">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 bg-white rounded shadow hover:bg-gray-50 disabled:opacity-50"
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
