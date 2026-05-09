// export default AddressFormTable;

"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Eye,
  Trash2,
  X,
  Phone,
  Mail,
  MapPin,
  Pencil,
  Plus,
  Minus,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";

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

type EditFormValues = {
  country: string;
  address: {
    add: string;
    email: string;
    phone: { value: string }[];
    image: string;
  };
};

const AddressFormTable = ({ offices }: { offices: IOfficeAddress[] }) => {
  const [selectedOffice, setSelectedOffice] = useState<IOfficeAddress | null>(
    null,
  );
  const [editingOffice, setEditingOffice] = useState<IOfficeAddress | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "address.phone",
  });

  const handleView = (office: IOfficeAddress) => setSelectedOffice(office);

  const handleEditOpen = (office: IOfficeAddress) => {
    setEditingOffice(office);
    setSubmitError(null);
    reset({
      country: office.country,
      address: {
        add: office.address[0]?.add || "",
        email: office.address[0]?.email || "",
        phone: (office.address[0]?.phone || [""]).map((p) => ({ value: p })),
        image: office.address[0]?.image || "",
      },
    });
  };

  const handleEditClose = () => {
    setEditingOffice(null);
    setSubmitError(null);
  };

  const onSubmit = async (data: EditFormValues) => {
    if (!editingOffice) return;
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const payload = {
        country: data.country,
        address: [
          {
            add: data.address.add,
            email: data.address.email,
            phone: data.address.phone.map((p) => p.value),
            image: data.address.image,
          },
        ],
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/v1/update-office-address/${editingOffice._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.message || "Update failed");
      }

      handleEditClose();
      Swal.fire("Success", "Office address updated successfully", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      setSubmitError(error?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/delete-office-address/${id}`,
        { method: "DELETE" },
      );
      if (!response.ok) throw new Error("Failed to delete");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete office address");
    } finally {
      setDeletingId(null);
      setDeleteConfirm(null);
    }
  };

  // ─── Action Buttons (reusable) ───────────────────────────────────────────────
  const ActionButtons = ({ office }: { office: IOfficeAddress }) => (
    <div className="flex items-center gap-1 flex-wrap">
      <button
        onClick={() => handleView(office)}
        className="p-2 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        title="View Details"
      >
        <Eye size={17} />
      </button>
      <button
        onClick={() => handleEditOpen(office)}
        className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
        title="Edit"
      >
        <Pencil size={17} />
      </button>
      {deleteConfirm === office._id ? (
        <div className="flex gap-1">
          <button
            onClick={() => handleDelete(office._id)}
            disabled={deletingId === office._id}
            className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 disabled:opacity-60"
          >
            {deletingId === office._id ? "..." : "Confirm"}
          </button>
          <button
            onClick={() => setDeleteConfirm(null)}
            className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setDeleteConfirm(office._id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 size={17} />
        </button>
      )}
    </div>
  );

  // ─── Mobile Card View ────────────────────────────────────────────────────────
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
              <ActionButtons office={office} />
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

  // ─── Desktop Table View ──────────────────────────────────────────────────────
  const DesktopTableView = () => (
    <div className="hidden md:block w-full overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white">
        <thead className="bg-red-700">
          <tr>
            {["Image", "Country", "Address", "Email", "Phone", "Actions"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-red-50">
          {offices.map((office) => (
            <tr key={office._id} className="hover:bg-red-50 transition-colors">
              <td className="px-4 py-3">
                <div className="relative w-11 h-11 shrink-0">
                  <Image
                    src={office.address[0]?.image || "/placeholder.png"}
                    alt={office.country}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-900">
                  {office.country}
                </span>
              </td>
              <td className="px-4 py-3 max-w-45">
                <span className="text-sm text-gray-700 line-clamp-2">
                  {office.address[0]?.add}
                </span>
              </td>
              <td className="px-4 py-3 max-w-40">
                <a
                  href={`mailto:${office.address[0]?.email}`}
                  className="text-sm text-blue-700 hover:underline truncate block"
                >
                  {office.address[0]?.email}
                </a>
              </td>
              <td className="px-4 py-3">
                <div className="text-sm text-gray-700 space-y-0.5">
                  {office.address[0]?.phone.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block hover:text-red-600 whitespace-nowrap"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <ActionButtons office={office} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // ─── View Modal ──────────────────────────────────────────────────────────────
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
            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={selectedOffice.address[0]?.image || "/placeholder.png"}
                alt={selectedOffice.country}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-red-600 uppercase mb-1">
                Country
              </h3>
              <p className="text-xl font-semibold text-gray-900">
                {selectedOffice.country}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-red-600 uppercase mb-1 flex items-center gap-1">
                <MapPin size={14} /> Address
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {selectedOffice.address[0]?.add}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-red-600 uppercase mb-1 flex items-center gap-1">
                <Mail size={14} /> Email
              </h3>
              <a
                href={`mailto:${selectedOffice.address[0]?.email}`}
                className="text-blue-600 hover:underline"
              >
                {selectedOffice.address[0]?.email}
              </a>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-red-600 uppercase mb-1 flex items-center gap-1">
                <Phone size={14} /> Phone Numbers
              </h3>
              <div className="space-y-1">
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
            <div className="pt-4 border-t border-red-100 text-xs text-gray-400 space-y-0.5">
              <p>ID: {selectedOffice._id}</p>
              <p>
                Created: {new Date(selectedOffice.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── Edit Modal ──────────────────────────────────────────────────────────────
  const EditModal = () => {
    if (!editingOffice) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-xl max-w-lg w-full max-h-[92vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-red-100 px-5 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-100 rounded-lg">
                <Pencil size={16} className="text-emerald-700" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Edit Office</h2>
            </div>
            <button
              onClick={handleEditClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-5">
            {/* Country */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                {...register("country", { required: "Country is required" })}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-300 transition ${
                  errors.country
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="e.g. Bangladesh"
              />
              {errors.country && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("address.add", {
                  required: "Address is required",
                })}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-300 transition resize-none ${
                  errors.address?.add
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Full office address"
              />
              {errors.address?.add && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.address.add.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                {...register("address.email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email",
                  },
                })}
                type="email"
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-300 transition ${
                  errors.address?.email
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="office@example.com"
              />
              {errors.address?.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.address.email.message}
                </p>
              )}
            </div>

            {/* Phone Numbers */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                Phone Numbers <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <input
                      {...register(`address.phone.${index}.value`, {
                        required: "Phone number is required",
                      })}
                      className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-300 transition ${
                        errors.address?.phone?.[index]?.value
                          ? "border-red-400 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="+880 1XXX XXXXXX"
                    />
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition shrink-0"
                      >
                        <Minus size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {errors.address?.phone && (
                  <p className="text-xs text-red-500">
                    All phone fields are required
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => append({ value: "" })}
                  className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium hover:text-emerald-800 transition"
                >
                  <Plus size={14} /> Add Phone Number
                </button>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                Image URL
              </label>
              <input
                {...register("address.image")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                placeholder="https://..."
              />
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {submitError}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleEditClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 bg-red-700 text-white text-sm font-semibold rounded-lg hover:bg-red-800 transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting && <Loader2 size={15} className="animate-spin" />}
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
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

      {/* Edit Modal */}
      <EditModal />
    </div>
  );
};

export default AddressFormTable;
