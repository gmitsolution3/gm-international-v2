"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DEPARTMENT_OPTIONS, MedicalFormData } from "./type/type";
import dynamic from "next/dynamic";
import { handleFileUpload } from "@/app/components/uploadPdf/uploadToCloudinary";
import { toast } from "sonner";
import Swal from "sweetalert2";
const DescriptionEditor = dynamic(() => import("./DescriptionEditor"), {
  ssr: false,
});

interface onCloseProps {
  onClose: () => void;
  email: string | null | undefined;
}

const MedicalForm = ({ onClose, email }: onCloseProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<MedicalFormData>({
    defaultValues: {
      hospital_name: "",
      country_name: "",
      city_name: "",
      provience: "",
      photo: null,
      hospital_type: "public",
      department: [],
      description: "",
      total_view: 0,
      total_sell: 0,
      createdAt: new Date(),
      createdBy: email || "admin",
      updatedAt: new Date(),
      rating: 0,
    },
  });

  const departments = watch("department");

  const [imageUploading, setImageUploading] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [departmentInput, setDepartmentInput] = useState("");


  const handleAddDepartment = () => {
    if (!departmentInput.trim()) return;

    // duplicate prevent
    if (departments.includes(departmentInput.trim())) return;

    const updated = [...departments, departmentInput.trim()];
    setValue("department", updated);

    setDepartmentInput("");
  };

  const handleRemoveDepartment = (name: string) => {
    const filtered = departments.filter((d) => d !== name);
    setValue("department", filtered);
  };

  const handlePhotoUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);

    try {
      const imgURL = await handleFileUpload(file);
      // console.log({ imageUrl: imgURL });
      if (!imgURL) {
        return toast.error("Image not uploaded! try again");
      }
      setImageURL(imgURL);
      toast.success("Image uploade successfully");
    } catch (err: any) {
      console.error(err);
    } finally {
      setImageUploading(false);
    }
  };



  const onSubmit = async (data: MedicalFormData) => {
    
    const finalData = {
      ...data,
      photo: imageURL,
    };


    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-list`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      },
    );

    const result = await res.json();

    if (!result) {
      Swal.fire({
        title: "Something was wrong!! try again",
        icon: "error",
        draggable: false,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (result.insertedId) {
      Swal.fire({
        title: "Your Form has been submitted",
        icon: "success",
        draggable: false,
        showConfirmButton: false,
        timer: 2000,
      });
      onClose();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-800 mb-2">
            Medical Information Form
          </h1>
          <p className="text-red-600">
            Please fill in all the hospital information correctly
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 space-y-6"
        >
          {/* Hospital Name & City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hospital Name */}
            <div>
              <label className="block text-sm font-medium text-red-800 mb-2">
                Hospital Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("hospital_name", {
                  required: "Hospital name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                className="w-full px-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                placeholder="Enter hospital name"
              />
              {errors.hospital_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.hospital_name.message}
                </p>
              )}
            </div>

            {/* Country Name */}
            <div>
              <label className="block text-sm font-medium text-red-800 mb-2">
                Country Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("country_name", {
                  required: "Country name is required",
                })}
                className="w-full px-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                placeholder="Enter city name"
              />
              {errors.city_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.city_name.message}
                </p>
              )}
            </div>
          </div>

          {/* Province and Hospital Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* City Name */}
            <div>
              <label className="block text-sm font-medium text-red-800 mb-2">
                City Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("city_name", {
                  required: "City name is required",
                })}
                className="w-full px-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                placeholder="Enter city name"
              />
              {errors.city_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.city_name.message}
                </p>
              )}
            </div>
            {/* Province */}
            <div>
              <label className="block text-sm font-medium text-red-800 mb-2">
                Province <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("provience", {
                  required: "provience is required",
                })}
                className="w-full px-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                placeholder="Enter provience"
              />

              {errors.provience && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.provience.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-red-800">
                Photo <span className="text-red-500">*</span>
              </label>

              <div className="relative border-2 border-dashed border-red-200 hover:border-red-400 transition rounded-xl p-6 bg-linear-to-br from-red-50 to-white">
                {imageUploading ? (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="h-8 w-8 border-4 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
                    <p className="text-sm text-red-600 font-medium">
                      Uploading image...
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center space-y-3">
                    {/* Preview */}
                    {imageURL && (
                      <div className="relative">
                        <img
                          src={imageURL}
                          alt="Uploaded"
                          className="h-28 w-28 object-cover rounded-lg shadow-md border border-red-200"
                        />
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow">
                          ✓
                        </span>
                      </div>
                    )}

                    {/* Upload Button */}
                    <input
                      type="file"
                      accept="image/*"
                      {...register("photo", {
                        required: false,
                      })}
                      onChange={(e) => handlePhotoUpload(e)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />

                    <div className="pointer-events-none">
                      <p className="text-sm font-medium text-red-700">
                        {imageURL ? "Change Photo" : "Click to upload"}
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {errors.photo && (
                <p className="text-sm text-red-600 font-medium">
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* Hospital Type */}
            <div>
              <label className="block text-sm font-medium text-red-800 mb-2">
                Hospital Type <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="public"
                    {...register("hospital_type", {
                      required: "Please select hospital type",
                    })}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-gray-700">Public</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="private"
                    {...register("hospital_type")}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-gray-700">Private</span>
                </label>
              </div>
              {errors.hospital_type && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.hospital_type.message}
                </p>
              )}
            </div>
          </div>

          {/* Departments */}
          {/* <div>
            <label className="block text-sm font-medium text-red-800 mb-2">
              Departments
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4 bg-red-50 rounded-lg">
              {DEPARTMENT_OPTIONS.map((dept) => (
                <label key={dept.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={dept.name}
                    {...register("department")}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{dept.name}</span>
                </label>
              ))}
            </div>
          </div> */}
          <div>
            <label className="block text-sm font-medium text-red-800 mb-2">
              Departments
            </label>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={departmentInput}
                onChange={(e) => setDepartmentInput(e.target.value)}
                placeholder="Enter department name"
                className="flex-1 border rounded px-3 py-2 text-sm"
              />

              <button
                type="button"
                onClick={handleAddDepartment}
                className="bg-red-600 text-white px-4 py-2 rounded text-sm"
              >
                Add
              </button>
            </div>

            {/* Department List */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                >
                  {dept}
                  <button
                    type="button"
                    onClick={() => handleRemoveDepartment(dept)}
                    className="text-red-600 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Description - Quill Editor */}
          <div>
            <label className="block text-sm font-medium text-red-800 mb-2">
              Description
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

          {/* Numeric Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-red-800 mb-2">
                Rating (0-5)
              </label>
              <input
                type="number"
                step="0.1"
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
                className="w-full px-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                placeholder="0-5"
              />
              {errors.rating && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.rating.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition duration-200 transform hover:scale-105"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalForm;
