// components/HospitalTable.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  X,
  Save,
  Plus,
  Minus,
} from "lucide-react";
import DescriptionEditor from "./DescriptionEditor";
import { MedicalFormData } from "./type/type";
import { PackageDescriptionView } from "@/app/dashboard/scholarship/admin/manage-student-packages/components/PackageDescriptionView";
import { handleFileUpload } from "@/app/components/uploadPdf/uploadToCloudinary";
import { toast } from "sonner";

interface HospitalTableProps {
  initialHospitals: MedicalFormData[];
}

export default function HospitalTable({
  initialHospitals,
}: HospitalTableProps) {
  const [hospitals, setHospitals] =
    useState<MedicalFormData[]>(initialHospitals);
  const [selectedHospital, setSelectedHospital] =
    useState<MedicalFormData | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<MedicalFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "department" as never,
  });

  const handlePhotoUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await handleFileUpload(file);

    if (!imageUrl) {
      return toast.error("Image not uploaded!!");
    }
    setImagePreview(imageUrl);
  };

  const handleView = (hospital: MedicalFormData) => {
    setSelectedHospital(hospital);
    setIsViewModalOpen(true);
  };

  const handleEdit = (hospital: MedicalFormData) => {
    setSelectedHospital(hospital);
    reset({
      hospital_name: hospital.hospital_name,
      city_name: hospital.city_name,
      provience: hospital.provience,
      photo: hospital.photo,
      hospital_type: hospital.hospital_type,
      department: hospital.department,
      description: hospital.description,
      total_view: hospital.total_view,
      total_sell: hospital.total_sell,
      rating: hospital.rating,
      country_name: hospital.country_name || "",
    });
    setIsEditModalOpen(true);
    setIsMobileMenuOpen(null);
  };

  const handleDelete = (hospital: MedicalFormData) => {
    setSelectedHospital(hospital);
    setIsDeleteModalOpen(true);
    setIsMobileMenuOpen(null);
  };

  const confirmDelete = async () => {
    if (selectedHospital) {

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/hospital-list-delete/${selectedHospital._id}`,{
            method: "DELETE"
          }
        );

        const result = await res.json();


        if (result.success) {
          setHospitals(hospitals.filter((h) => h._id !== selectedHospital._id));
          setIsDeleteModalOpen(false);
          setSelectedHospital(null);
          toast.success(result.message);
          return;
        }

        toast.error(result.message);
      } catch (err: any) {
        console.log(err);
        toast.error(err);
      }
    }
  };

  const onSubmitEdit = async (data: MedicalFormData) => {
    if (!selectedHospital) return;

    const finalPayload = {
      ...data,
      photo: imagePreview || data.photo,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/hospital-list-update/${selectedHospital._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalPayload),
        },
      );

      const result = await res.json();

      if (result.success) {
        setHospitals((prev) =>
          prev.map((h) =>
            h._id === selectedHospital._id
              ? { ...h, ...data, updatedAt: new Date().toISOString() }
              : h,
          ),
        );

        setIsEditModalOpen(false);
        setSelectedHospital(null);
        toast.success("Data updated successfully!!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (hospitals.length === 0) {
    return <div>No Data found in db</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            Medical Centers Management
          </h2>
        </div>

        {/* Table - Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hospital
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Depart.
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Photo
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number of Sell
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hospitals.map((hospital: MedicalFormData) => (
                <tr key={hospital._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                    <div className="relative h-10 w-10">
                      {hospital.photo && (
                        <Image
                          src={hospital.photo}
                          alt={hospital.hospital_name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <div className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {hospital.hospital_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Rating: {hospital.rating}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {hospital?._id?.slice(0, 8)}...
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {hospital.hospital_type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {hospital.city_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {hospital.provience}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative h-10 w-10"></div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {hospital.department.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {hospital.total_sell.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleView(hospital)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(hospital)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(hospital)}
                        className="text-red-600 hover:text-red-900"
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

        {/* Mobile View - Card Layout */}
        <div className="md:hidden">
          {hospitals.map((hospital) => (
            <div
              key={hospital._id}
              className="border-b border-gray-200 p-4 hover:bg-gray-50"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative h-12 w-12 shrink-0">
                    {hospital.photo && (
                      <Image
                        src={hospital.photo}
                        alt={hospital.hospital_name}
                        fill
                        className="rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {hospital.hospital_name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {hospital.city_name}, {hospital.provience}
                    </p>
                    <p className="text-xs text-gray-500">
                      Rating: {hospital.rating} | Sell: ${hospital.total_sell}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsMobileMenuOpen(
                        isMobileMenuOpen === hospital._id
                          ? null
                          : hospital._id || null,
                      )
                    }
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <MoreVertical size={20} className="text-gray-500" />
                  </button>

                  {isMobileMenuOpen === hospital._id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                      <div className="py-1">
                        <button
                          onClick={() => handleView(hospital)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye size={16} className="mr-3 text-blue-600" />
                          View Details
                        </button>
                        <button
                          onClick={() => handleEdit(hospital)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit size={16} className="mr-3 text-green-600" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(hospital)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <Trash2 size={16} className="mr-3 text-red-600" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Details Modal */}
        {isViewModalOpen && selectedHospital && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-red-600 px-6 py-4 flex justify-between items-center sticky top-0">
                <h3 className="text-lg font-semibold text-white">
                  Hospital Details
                </h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {selectedHospital.photo && (
                      <img
                        src={selectedHospital.photo}
                        alt={selectedHospital.hospital_name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedHospital.hospital_name}
                    </h4>
                    <p className="text-gray-600 mb-1">
                      <span className="font-semibold">ID:</span>{" "}
                      {selectedHospital._id}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="font-semibold">Location:</span>{" "}
                      {selectedHospital.city_name}, {selectedHospital.provience}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="font-semibold">Country:</span>{" "}
                      {selectedHospital.country_name || "N/A"}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="font-semibold">Type:</span>{" "}
                      {selectedHospital.hospital_type}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="font-semibold">Rating:</span>{" "}
                      {selectedHospital.rating} / 5
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="font-semibold">Total Sell:</span> $
                      {selectedHospital.total_sell}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="font-semibold">Total Views:</span>{" "}
                      {selectedHospital.total_view}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Departments
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedHospital.department.map((dept, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Description
                  </h5>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <PackageDescriptionView
                      html={selectedHospital.description}
                    />
                  </div>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  <p>
                    Created:{" "}
                    {new Date(selectedHospital.createdAt).toLocaleString()} by{" "}
                    {selectedHospital.createdBy}
                  </p>
                  <p>
                    Last Updated:{" "}
                    {new Date(selectedHospital.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && selectedHospital && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-red-600 px-6 py-4 flex justify-between items-center sticky top-0">
                <h3 className="text-lg font-semibold text-white">
                  Edit Hospital
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Image
                </label>

                {selectedHospital.photo && (
                  <div className="mb-3 p-4">
                    <img
                      src={selectedHospital.photo}
                      alt="Preview"
                      className="w-full h-70 object-cover rounded-lg border"
                    />
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e)}
                  className="w-full"
                />
              </div>

              <form onSubmit={handleSubmit(onSubmitEdit)} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hospital Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hospital Name *
                    </label>
                    <input
                      type="text"
                      {...register("hospital_name", {
                        required: "Hospital name is required",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.hospital_name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.hospital_name.message}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      {...register("city_name", {
                        required: "City is required",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.city_name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.city_name.message}
                      </p>
                    )}
                  </div>

                  {/* Province */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Province *
                    </label>
                    <input
                      type="text"
                      {...register("provience", {
                        required: "Province is required",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.provience && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.provience.message}
                      </p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      {...register("country_name")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  {/* Photo URL */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo URL *
                    </label>
                    <input
                      type="url"
                      {...register("photo", {
                        required: "Photo URL is required",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.photo && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.photo.message}
                      </p>
                    )}
                  </div>

                  {/* Hospital Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hospital Type *
                    </label>
                    <select
                      {...register("hospital_type", {
                        required: "Hospital type is required",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                    {errors.hospital_type && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.hospital_type.message}
                      </p>
                    )}
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating (0-5)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      {...register("rating", {
                        valueAsNumber: true,
                        min: {
                          value: 0,
                          message: "Rating must be between 0 and 5",
                        },
                        max: {
                          value: 5,
                          message: "Rating must be between 0 and 5",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.rating && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.rating.message}
                      </p>
                    )}
                  </div>

                  {/* Departments */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departments
                    </label>
                    <Controller
                      name="department"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {field.value?.map((dept: string, index: number) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                              >
                                {dept}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newDepts = [...field.value];
                                    newDepts.splice(index, 1);
                                    field.onChange(newDepts);
                                  }}
                                  className="ml-2 text-red-600 hover:text-red-800"
                                >
                                  <Minus size={14} />
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex">
                            <input
                              type="text"
                              placeholder="Add department"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  const input = e.target as HTMLInputElement;
                                  if (input.value.trim()) {
                                    field.onChange([
                                      ...(field.value || []),
                                      input.value.trim(),
                                    ]);
                                    input.value = "";
                                  }
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                const input = (
                                  e.target as HTMLElement
                                ).parentElement?.querySelector("input");
                                if (input?.value.trim()) {
                                  field.onChange([
                                    ...(field.value || []),
                                    input.value.trim(),
                                  ]);
                                  input.value = "";
                                }
                              }}
                              className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700"
                            >
                              <Plus size={20} />
                            </button>
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <Controller
                      name="description"
                      control={control}
                      rules={{
                        required: "Description is required",
                        minLength: {
                          value: 10,
                          message: "Description must be at least 10 characters",
                        },
                      }}
                      render={({ field: { onChange, value } }) => (
                        <DescriptionEditor value={value} onChange={onChange} />
                      )}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                  >
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && selectedHospital && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="bg-red-600 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">
                  Confirm Delete
                </h3>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">
                    {selectedHospital.hospital_name}
                  </span>
                  ? This action cannot be undone.
                </p>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                  >
                    <Trash2 size={18} className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
