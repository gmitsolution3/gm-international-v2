// components/OfficeAddressForm.tsx
"use client";

import { UploadToCloudinary } from "@/app/components/uploadPdf/uploadToCloudinary";
import React, { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

// Define the types based on your structure
export interface AddressEntry {
  add: string;
  email: string;
  phone: string[];
  image: string;
}

export interface IOfficeAddress {
  _id?: string;
  country: string;
  address: AddressEntry[];
}

const OfficeAddressForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<IOfficeAddress>({
    defaultValues: {
      country: "",
      address: [
        {
          add: "",
          email: "gminternational.live@gmail.com",
          phone: [""],
          image: "",
        },
      ],
    },
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "address",
  });

  //   const phones = watch(`address.${index}.phone`) || [];

  const addPhone = (index: number) => {
    const phones = watch(`address.${index}.phone`) || [];
    setValue(`address.${index}.phone`, [...phones, ""]);
  };

  const removePhone = (index: number, phoneIndex: number) => {
    const phones = watch(`address.${index}.phone`) || [];
    const updated = phones.filter((_, i) => i !== phoneIndex);
    setValue(`address.${index}.phone`, updated);
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);

    try {
      const imageUrl = await UploadToCloudinary(file);

      // set value manually in form
      setValue(`address.${index}.image`, imageUrl);
      setPreview(imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<IOfficeAddress> = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/create-office-address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
     

      if (!result.success) {
        throw new Error("Failed to submit form");
      }

      alert("Office address created successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  const addNewAddress = () => {
    append({ add: "", email: "", phone: [""], image: "" });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-red-800 mb-2">
            Office Address Management
          </h1>
          <p className="text-red-600">Create and manage office locations</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white rounded-xl shadow-xl p-6 md:p-8"
        >
          {/* Country Field */}
          <div>
            <label className="block text-sm font-semibold text-red-800 mb-2">
              Country
            </label>
            <input
              {...register("country", { required: "Country is required" })}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                errors.country
                  ? "border-red-500 bg-red-50"
                  : "border-red-200 hover:border-red-300"
              }`}
              placeholder="Enter country name"
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">
                {errors.country.message}
              </p>
            )}
          </div>

          {/* Address Fields */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-red-800">Addresses</h2>
              <button
                type="button"
                onClick={addNewAddress}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 flex items-center gap-2 text-sm font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Address
              </button>
            </div>

            {fields.map((field, index) => {
              const phones = watch(`address.${index}.phone`) || [];
              return (
                <div
                  key={field.id}
                  className="border-2 border-red-100 rounded-lg p-6 space-y-4 relative bg-red-50/30"
                >
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}

                  <h3 className="text-md font-semibold text-red-700 mb-3">
                    Address {index + 1}
                  </h3>

                  {/* Address Line */}
                  <div>
                    <label className="block text-sm font-medium text-red-800 mb-1">
                      Address
                    </label>
                    <textarea
                      {...register(`address.${index}.add`, {
                        required: "Address is required",
                      })}
                      rows={2}
                      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                        errors.address?.[index]?.add
                          ? "border-red-500 bg-red-50"
                          : "border-red-200 hover:border-red-300"
                      }`}
                      placeholder="Enter full address"
                    />
                    {errors.address?.[index]?.add && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address[index]?.add?.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-red-800 mb-1">
                      Email
                    </label>
                    <input
                      {...register(`address.${index}.email`, {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                        errors.address?.[index]?.email
                          ? "border-red-500 bg-red-50"
                          : "border-red-200 hover:border-red-300"
                      }`}
                      placeholder="office@example.com"
                    />
                    {errors.address?.[index]?.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address[index]?.email?.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}

                  <div>
                    <label className="block text-sm font-medium text-red-800 mb-1">
                      Phone Numbers
                    </label>

                    {phones.map((phone: string, phoneIndex: number) => (
                      <div key={phoneIndex} className="flex gap-2 mb-2">
                        <input
                          {...register(`address.${index}.phone.${phoneIndex}`, {
                            required: "Phone number is required",
                          })}
                          className="w-full px-4 py-2 border-2 rounded-lg"
                          placeholder="+880 1234 567890"
                        />

                        {phones.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePhone(index, phoneIndex)}
                            className="text-red-500"
                          >
                            ❌
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addPhone(index)}
                      className="text-sm text-red-600 mt-1"
                    >
                      + Add Phone
                    </button>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-red-800 mb-1">
                      Image URL
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                        errors.address?.[index]?.image
                          ? "border-red-500 bg-red-50"
                          : "border-red-200 hover:border-red-300"
                      }`}
                    />
                    {loading ? (
                      <span className="text-red-700 text-2xl">Loading...</span>
                    ) : (
                      <div>
                        {preview && (
                          <img src={preview} className="w-32 mt-2 rounded" />
                        )}
                      </div>
                    )}
                    {errors.address?.[index]?.image && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address[index]?.image?.message}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                "Create Office Address"
              )}
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 border-2 border-red-300 text-red-700 rounded-lg font-semibold hover:bg-red-50 transition duration-200"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfficeAddressForm;
