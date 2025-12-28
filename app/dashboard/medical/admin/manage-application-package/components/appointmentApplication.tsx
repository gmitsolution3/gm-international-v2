"use client";

import type React from "react";

import { useState } from "react";
import {
  Eye,
  Edit,
  Trash2,
  X,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Swal from "sweetalert2";

interface Appointment {
  _id: string;
  country: string;
  hospital: string;
  department: string;
  doctor: string;
  patientName: string;
  contactNumber: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  document: string;
  payment: string;
  createdBy: string;
  createdAt: string;
  appointmentStatus: "pending" | "approved" | "rejected";
  paymentStatus: "pending" | "completed" | "failed";
}

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 border border-amber-200",
    approved: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    rejected: "bg-red-100 text-red-700 border border-red-200",
    completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    failed: "bg-red-100 text-red-700 border border-red-200",
  };

  const icons: Record<string, React.ReactNode> = {
    pending: <Clock className="w-3 h-3" />,
    approved: <CheckCircle className="w-3 h-3" />,
    rejected: <XCircle className="w-3 h-3" />,
    completed: <CheckCircle className="w-3 h-3" />,
    failed: <XCircle className="w-3 h-3" />,
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1 w-fit ${
        styles[status] || styles["pending"]
      }`}
    >
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function AppointmentsApplications({
  initialAppointments,
}: {
  initialAppointments: Appointment[];
}) {
  const [appointments, setAppointments] = useState<Appointment[]>(
    initialAppointments || []
  );
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string, timeString: string) => {
    return `${formatDate(dateString)} at ${timeString}`;
  };

  const handleStatusChange = async (
    id: string,
    status: "pending" | "approved" | "rejected"
  ) => {
    try {
      const res = await fetch(
        `https://gm-international-server-gamma.vercel.app/update-medical-appointments-status/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointmentStatus: status }), // <-- Only updating status
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      setAppointments((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, appointmentStatus: status } : app
        )
      );

      setEditingAppointment(null);
    } catch (error) {
      console.error("Status update error:", error);
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
            `https://gm-international-server-gamma.vercel.app/delete-medical-appointments/${id}`,
            {
              method: "DELETE",
            }
          );
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Delete failed");
          if (res.ok) {
            Swal.fire("Deleted!", "Package has been deleted.", "success");
            setAppointments((prev) => prev.filter((a) => a._id !== id));
            setShowDeleteConfirm(null);
          }
        }
      });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="min-h-screen p-3 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Mobile View - Stacked Cards */}
        <div className="md:hidden space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-lg shadow-md border border-red-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-linear-to-r from-rose-500 to-red-500 text-white p-3 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base">
                    {appointment.hospital}
                  </h3>
                  <p className="text-rose-100 text-xs mt-1">
                    {appointment.country}
                  </p>
                </div>
                <StatusBadge status={appointment.appointmentStatus} />
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs font-semibold">
                      Doctor
                    </p>
                    <p className="text-gray-800 font-medium truncate">
                      {appointment.doctor}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold">Email</p>
                    <p className="text-gray-800 font-medium truncate text-xs">
                      {appointment.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold">Date</p>
                    <p className="text-gray-800 font-medium">
                      {formatDate(appointment.appointmentDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold">
                      Payment
                    </p>
                    <StatusBadge status={appointment.paymentStatus} />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setSelectedAppointment(appointment)}
                    className="flex-1 py-2 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold text-xs hover:shadow-lg transition-all flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  <button
                    onClick={() => setEditingAppointment(appointment)}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-semibold text-xs hover:shadow-lg transition-all flex items-center justify-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(appointment._id)}
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
                  <th className="px-4 py-3 text-left font-semibold">Country</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Hospital
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Doctor</th>
                  <th className="px-4 py-3 text-left font-semibold">Email</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">Payment</th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="hover:bg-rose-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {appointment.country}
                    </td>
                    <td className="px-4 py-3 text-gray-700 truncate">
                      {appointment.hospital}
                    </td>
                    <td className="px-4 py-3 text-gray-700 truncate">
                      {appointment.doctor}
                    </td>
                    <td className="px-4 py-3 text-gray-700 truncate text-xs">
                      {appointment.email}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {formatDate(appointment.appointmentDate)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={appointment.appointmentStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={appointment.paymentStatus} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => setSelectedAppointment(appointment)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors inline-flex"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingAppointment(appointment)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors inline-flex"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(appointment._id)}
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
                  <th className="px-6 py-4 text-left font-semibold">Country</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Hospital
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Appointment Date
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    App. Status
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Payment Status
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((appointment, idx) => (
                  <tr
                    key={appointment._id}
                    className="hover:bg-rose-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {appointment.country}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {appointment.hospital}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {appointment.doctor}
                    </td>
                    <td className="px-6 py-4 text-gray-700 truncate max-w-xs">
                      {appointment.email}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {formatDateTime(
                        appointment.appointmentDate,
                        appointment.appointmentTime
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={appointment.appointmentStatus} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={appointment.paymentStatus} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => setSelectedAppointment(appointment)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors inline-flex"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setEditingAppointment(appointment)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors inline-flex"
                          title="Edit Status"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(appointment._id)}
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
        {selectedAppointment && (
          <div className="fixed inset-0 backdrop-blur-xl bg-white/10 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-linear-to-r from-rose-500 to-red-500 text-white p-4 sm:p-6 flex justify-between items-center z-10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Appointment Details
                  </h2>
                  <p className="text-rose-100 text-xs sm:text-sm mt-1">
                    {selectedAppointment.hospital}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="p-2 hover:bg-white hover:text-black hover:bg-opacity-20 rounded-full transition-colors shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* Patient Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-linear-to-br from-rose-50 to-red-50 p-4 rounded-lg border border-red-100">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">
                      Patient Name
                    </p>
                    <p className="text-gray-900 font-bold">
                      {selectedAppointment.patientName}
                    </p>
                  </div>
                  <div className="bg-linear-to-br from-rose-50 to-red-50 p-4 rounded-lg border border-red-100">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">
                      Email
                    </p>
                    <p className="text-gray-900 font-bold text-sm break-all">
                      {selectedAppointment.email}
                    </p>
                  </div>
                  <div className="bg-linear-to-br from-rose-50 to-red-50 p-4 rounded-lg border border-red-100">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">
                      Contact Number
                    </p>
                    <p className="text-gray-900 font-bold">
                      {selectedAppointment.contactNumber}
                    </p>
                  </div>
                  <div className="bg-linear-to-br from-rose-50 to-red-50 p-4 rounded-lg border border-red-100">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">
                      Payment Method
                    </p>
                    <p className="text-gray-900 font-bold">
                      {selectedAppointment.payment}
                    </p>
                  </div>
                </div>

                {/* Hospital & Doctor Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">
                      Hospital
                    </p>
                    <p className="text-gray-900 font-bold">
                      {selectedAppointment.hospital}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">
                      Department
                    </p>
                    <p className="text-gray-900 font-bold">
                      {selectedAppointment.department}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">
                      Doctor
                    </p>
                    <p className="text-gray-900 font-bold">
                      {selectedAppointment.doctor}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">
                      Country
                    </p>
                    <p className="text-gray-900 font-bold">
                      {selectedAppointment.country}
                    </p>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-linear-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">
                      Appointment Date
                    </p>
                    <p className="text-gray-900 font-bold">
                      {formatDate(selectedAppointment.appointmentDate)}
                    </p>
                  </div>
                  <div className="bg-linear-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">
                      Appointment Time
                    </p>
                    <p className="text-gray-900 font-bold">
                      {selectedAppointment.appointmentTime}
                    </p>
                  </div>
                </div>

                {/* Document Link */}
                {selectedAppointment.document && (
                  <div className="bg-linear-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                    <p className="text-xs text-gray-600 mb-2 font-semibold">
                      Medical Document
                    </p>
                    <a
                      href={selectedAppointment.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 font-semibold break-all hover:underline text-sm"
                    >
                      View Document
                    </a>
                  </div>
                )}

                {/* Status Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      Application Status
                    </p>
                    <StatusBadge
                      status={selectedAppointment.appointmentStatus}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      Payment Status
                    </p>
                    <StatusBadge status={selectedAppointment.paymentStatus} />
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="w-full py-3 bg-linear-to-r from-rose-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Status Modal */}
        {editingAppointment && (
          <div className="fixed inset-0 backdrop-blur-xl bg-white/10 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-full max-w-md shadow-2xl">
              {/* Modal Header */}
              <div className="bg-linear-to-r from-rose-500 to-red-600 text-white p-4 sm:p-6 flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold">Update Status</h2>
                <button
                  onClick={() => setEditingAppointment(null)}
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
                            handleStatusChange(editingAppointment._id, status)
                          }
                          className={`w-full py-2 px-4 rounded-lg font-semibold transition-all text-sm ${
                            editingAppointment.appointmentStatus === status
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
                  onClick={() => setEditingAppointment(null)}
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
          <div className="fixed inset-0 backdrop-blur-xl bg-white/10 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Delete Appointment?
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this appointment? This action
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
    </div>
  );
}
