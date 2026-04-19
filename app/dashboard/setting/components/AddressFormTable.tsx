// components/AddressFormTable.tsx
"use client";
import React, { useState } from "react";
import {
  Eye,
  Trash2,
  X,
  Phone,
  Mail,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

// Interface matching your data format
export interface IOfficeAddress {
  _id: string;
  createdAt: string;
  country: string;
  address: Array<{
    add: string;
    email: string;
    phone: string[];
    image: string;
  }>;
}

const AddressFormTable = ({ offices }: { offices: IOfficeAddress[] }) => {
  const [selectedOffice, setSelectedOffice] = useState<IOfficeAddress | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleView = (office: IOfficeAddress) => {
    setSelectedOffice(office);
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/delete-office-address/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      // Refresh the page or update state
      window.location.reload();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete office address");
    } finally {
      setDeletingId(null);
      setDeleteConfirm(null);
    }
  };

  // Mobile Card View
  const MobileCardView = () => (
    <div className="space-y-4 md:hidden">
      {offices.map((office) => (
        <div
          key={office._id}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-red-100"
        >
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-red-800">
                {office.country}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleView(office)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  <Eye size={18} />
                </button>
                {deleteConfirm === office._id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(office._id)}
                      disabled={deletingId === office._id}
                      className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(office._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-gray-700 flex-1">{office.address[0]?.add}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-red-500 shrink-0" />
                <a
                  href={`mailto:${office.address[0]?.email}`}
                  className="text-blue-600 hover:underline truncate"
                >
                  {office.address[0]?.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} className="text-red-500 mt-0.5 shrink-0" />
                <div className="flex-1">
                  {office.address[0]?.phone.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block text-gray-700 hover:text-red-600 mb-1"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Desktop Table View
  const DesktopTableView = () => (
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-red-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Country
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-red-100">
          {offices.map((office, idx) => (
            <tr key={office._id} className="hover:bg-red-50 transition">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="relative w-12 h-12">
                  <Image
                    src={office.address[0]?.image || "/placeholder.png"}
                    alt={office.country}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {office.country}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-700 max-w-xs truncate">
                  {office.address[0]?.add}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-700">
                  <a
                    href={`mailto:${office.address[0]?.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {office.address[0]?.email}
                  </a>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-700">
                  {office.address[0]?.phone.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block hover:text-red-600"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(office)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  {deleteConfirm === office._id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(office._id)}
                        disabled={deletingId === office._id}
                        className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(office._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Modal Component
  const ViewModal = () => {
    if (!selectedOffice) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-red-100 p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-800">Office Details</h2>
            <button
              onClick={() => setSelectedOffice(null)}
              className="p-2 hover:bg-red-50 rounded-lg transition"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Image */}
            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={selectedOffice.address[0]?.image || "/placeholder.png"}
                alt={selectedOffice.country}
                fill
                className="object-contain"
              />
            </div>

            {/* Country */}
            <div>
              <h3 className="text-sm font-semibold text-red-600 uppercase mb-2">
                Country
              </h3>
              <p className="text-xl font-semibold text-gray-900">
                {selectedOffice.country}
              </p>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-sm font-semibold text-red-600 uppercase mb-2 flex items-center gap-2">
                <MapPin size={16} /> Address
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {selectedOffice.address[0]?.add}
              </p>
            </div>

            {/* Email */}
            <div>
              <h3 className="text-sm font-semibold text-red-600 uppercase mb-2 flex items-center gap-2">
                <Mail size={16} /> Email
              </h3>
              <a
                href={`mailto:${selectedOffice.address[0]?.email}`}
                className="text-blue-600 hover:underline"
              >
                {selectedOffice.address[0]?.email}
              </a>
            </div>

            {/* Phone */}
            <div>
              <h3 className="text-sm font-semibold text-red-600 uppercase mb-2 flex items-center gap-2">
                <Phone size={16} /> Phone Numbers
              </h3>
              <div className="space-y-2">
                {selectedOffice.address[0]?.phone.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="block text-gray-700 hover:text-red-600"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className="pt-4 border-t border-red-100">
              <div className="text-xs text-gray-500">
                <p>ID: {selectedOffice._id}</p>
                <p>
                  Created: {new Date(selectedOffice.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Stats Bar */}
      <div className="mb-6 p-4 bg-linear-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-red-600 font-medium">Total Offices</p>
            <p className="text-2xl font-bold text-red-800">{offices.length}</p>
          </div>
          <div className="text-red-400">
            <MapPin size={32} />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <MobileCardView />

      {/* Desktop View */}
      <DesktopTableView />

      {/* View Modal */}
      <ViewModal />
    </div>
  );
};

export default AddressFormTable;
