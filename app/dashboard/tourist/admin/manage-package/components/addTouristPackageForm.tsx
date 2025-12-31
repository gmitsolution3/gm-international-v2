"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Trash2,
  RotateCcw,
  Save,
  MapPin,
  Globe,
  Package,
  Upload,
  Loader2,
  X,
} from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { Checkbox } from "@headlessui/react";

interface OnClose {
  onClose: () => void;
}

interface PackageFormData {
  country: string;
  city: string;
  photos: string[];
  packageName: string;
  price: string;
  duration: string;
  startDate: string;
  endDate: string;
  packageId: string;
  subDestination: string;
  destination: string;
  includes: string[];
  excludes: string[];
  [key: string]: any;
  updatedAt: string;
  createdBy: string | undefined;
  internationalPackage: boolean;
}

const inclusions = [
  "Return Air Ticket with all Travel Tax",
  "Hotel Accommodation with Twin / DBL Share Basis",
  "Return Airport – Hotel – Airport Pickup and Drop Transfer",
  "Daily Buffet Breakfast at Hotel",
  "Sightseeing as per our itinerary",
];

const excludesData = [
  "Visa Fee",
  "Lunch & Dinner",
  "Service Charge",
  "Personal Tips",
];

const ManagePackageForm = ({ onClose }: OnClose) => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState<PackageFormData>({
    country: "",
    city: "",
    photos: [],
    packageName: "",
    price: "",
    duration: "",
    startDate: "",
    endDate: "",
    packageId: "",
    subDestination: "",
    destination: "",
    includes: [],
    excludes: [],
    updatedAt: new Date().toISOString(),
    createdBy: session?.user?.email || undefined,
    internationalPackage: false,
  });

  const [errors, setErrors] = useState<Partial<PackageFormData>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [forB2BUser, setForB2BUser] = useState(false);
  const [b2bPrice, setB2bPrice] = useState("");
  const [isInternationalPackage, setIsInternationalPackage] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleMultiSelectAdd = (
    name: "includes" | "excludes",
    value: string
  ) => {
    if (!value) return;

    if (formData[name].includes(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: [...prev[name], value],
    }));
  };

  const handleMultiSelectRemove = (
    name: "includes" | "excludes",
    valueToRemove: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].filter((item) => item !== valueToRemove),
    }));
  };

  const handlePhotoChange = async (e: any) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (formData.photos.length + files.length > 5) {
      alert("You can upload maximum 4 photos");
      return;
    }

    setIsUploading(true);
    setErrors((prev) => ({ ...prev, photos: "" }));

    const uploadPromises = files.map(async (file: any) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "pcakge_img_uploade");
      data.append("cloud_name", "dqyfwfeed");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
        { method: "POST", body: data }
      );
      const result = await res.json();
      return result.secure_url;
    });

    try {
      const newPhotos = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos],
      }));
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const removePhoto = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove),
    }));
  };

  const validateForm = () => {
    let newErrors: any = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (key === "includes" || key === "excludes" || key === "photos") return;
      if (!formData[key]) {
        newErrors[key] = "Required";
        isValid = false;
      }
    });

    if (formData.photos.length === 0) {
      newErrors.photos = "At least 1 image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {

    const dataToSubmit = {
      ...formData,
      forB2BUser,
      B2BPrice: forB2BUser ? b2bPrice : null,
      internationalPackage: isInternationalPackage,
    };

    console.log(dataToSubmit)


    // if (validateForm()) {
      const res = await fetch(
        "https://gm-international-server-gamma.vercel.app/tourist-package",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        }
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
    // } else {
    //   alert("Please fill up all required fields!");
    // }
  };

  return (
    <div className="min-h-screen md:p-8 font-sans flex justify-center items-start">
      <div
        className={`max-w-3xl w-full md:max-w-6xl bg-white rounded-3xl p-6 md:p-10 transition-all duration-700 transform ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-10 tracking-tight">
          Manage package
        </h1>

        {/* Section 1 */}
        <div className="bg-gray-100/80 rounded-2xl p-6 md:p-8 mb-6 shadow-inner">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-red-600 mr-2">*</span> Fill up to add packages
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <InputField
              label="Country"
              name="country"
              placeholder="Bangladesh"
              icon={<Globe size={16} />}
              onChange={handleChange}
              value={formData.country}
              error={errors.country}
            />

            <InputField
              label="City"
              name="city"
              placeholder="Dhaka"
              icon={<MapPin size={16} />}
              onChange={handleChange}
              value={formData.city}
              error={errors.city}
            />

            <div className="w-full">
              <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                Photos (Max 5){" "}
                {errors.photos && <span className="text-red-500">*</span>}
              </label>

              {formData.photos.length < 5 && (
                <label
                  htmlFor="fileUpload"
                  className={`cursor-pointer w-full py-1 px-4 border-2 border-dashed ${
                    errors.photos
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-red-400"
                  } rounded-lg font-medium text-sm transition-all duration-300 flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-red-500`}
                >
                  {isUploading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-red-500" />
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      <span className="text-xs">
                        Add Photos ({formData.photos.length}/5)
                      </span>
                    </>
                  )}
                </label>
              )}
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {formData.photos.map((url, index) => (
                    <div key={index} className="relative group h-16 w-full">
                      <img
                        src={url}
                        alt={`uploaded-${index}`}
                        className="h-full w-full object-cover rounded-lg border border-gray-300"
                      />

                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <input
                id="fileUpload"
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                disabled={isUploading || formData.photos.length >= 4}
              />

              {errors.photos && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.photos as unknown as string}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-100/80 rounded-2xl p-6 md:p-8 mb-8 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 items-start">
            <InputField
              label="Package Name"
              name="packageName"
              placeholder="Program"
              icon={<Package size={16} />}
              onChange={handleChange}
              error={errors.packageName}
            />
            <InputField
              label="Price"
              name="price"
              placeholder="0.00 BDT"
              onChange={handleChange}
              error={errors.price}
            />
            <InputField
              label="Duration"
              name="duration"
              placeholder="4 days"
              onChange={handleChange}
              error={errors.duration}
            />
            <DatePickerField
              label="Starting Date"
              name="startDate"
              onChange={handleChange}
              error={errors.startDate}
            />
            <DatePickerField
              label="Ending Date"
              name="endDate"
              onChange={handleChange}
              error={errors.endDate}
            />
            <InputField
              label="Package ID"
              name="packageId"
              placeholder="PKG-001"
              onChange={handleChange}
              error={errors.packageId}
            />
            <InputField
              label="Sub Destination"
              name="subDestination"
              placeholder="Sub dest."
              onChange={handleChange}
              error={errors.subDestination}
            />
            <InputField
              label="Destination"
              name="destination"
              placeholder="Main dest."
              onChange={handleChange}
              error={errors.destination}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <MultiSelectField
              label="Includes"
              name="includes"
              placeholder="Select inclusions"
              options={inclusions}
              selectedItems={formData.includes}
              onAddItem={(val: string) => handleMultiSelectAdd("includes", val)}
              onRemoveItem={(val: string) =>
                handleMultiSelectRemove("includes", val)
              }
            />
            <MultiSelectField
              label="Excludes"
              name="excludes"
              placeholder="Select exclusions"
              options={excludesData}
              selectedItems={formData.excludes}
              onAddItem={(val: string) => handleMultiSelectAdd("excludes", val)}
              onRemoveItem={(val: string) =>
                handleMultiSelectRemove("excludes", val)
              }
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={forB2BUser}
              onChange={(e) => setForB2BUser(e.target.checked)}
              className="h-4 w-4 text-red-600 border-gray-300 rounded"
            />
            <label className="text-sm font-medium">This package for B2B</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isInternationalPackage}
              onChange={(e) => setIsInternationalPackage(e.target.checked)}
              className="h-4 w-4 text-red-600 border-gray-300 rounded"
            />
            <label className="text-sm font-medium">This is international package</label>
          </div>
          <div className="my-5 ">
            {forB2BUser && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  B2B Price
                </label>
                <input
                  type="text"
                  value={b2bPrice}
                  onChange={(e) => setB2bPrice(e.target.value)}
                  className="mt-1 block w-full py-2 rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center gap-2 transition-colors"
          >
            <Save size={20} /> Save Edits
          </button>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-red-700 text-white rounded-xl flex items-center gap-2">
              <Trash2 size={20} /> Delete
            </button>
            <button
              onClick={() => {
                setFormData({ ...formData, photos: [] });
                setErrors({});
              }}
              className="px-8 py-3 bg-red-700 text-white rounded-xl flex items-center gap-2"
            >
              <RotateCcw size={20} /> Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components (Same as before)
const InputField = ({
  label,
  name,
  placeholder,
  defaultValue,
  icon,
  onChange,
  error,
  value,
}: any) => (
  <div className="flex flex-col w-full">
    <label className="text-sm font-semibold text-gray-500 mb-2">
      {label} {error && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <input
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className={`w-full bg-white text-gray-800 rounded-xl px-4 py-3 border-2 focus:outline-none ${
          error ? "border-red-500" : "border-transparent focus:border-red-300"
        }`}
      />
      {icon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
    </div>
    {error && <span className="text-xs text-red-500 mt-1 ml-1">{error}</span>}
  </div>
);

const DatePickerField = ({ label, name, onChange, error }: any) => (
  <div className="flex flex-col w-full">
    <label className="text-sm font-semibold text-gray-500 mb-2">
      {label} {error && <span className="text-red-500">*</span>}
    </label>
    <input
      name={name}
      type="date"
      onChange={onChange}
      className={`w-full bg-white text-gray-800 rounded-xl px-4 py-3 border-2 focus:outline-none ${
        error ? "border-red-500" : "border-transparent focus:border-red-300"
      }`}
    />
    {error && <span className="text-xs text-red-500 mt-1 ml-1">{error}</span>}
  </div>
);

const MultiSelectField = ({
  label,
  placeholder,
  options,
  selectedItems,
  onAddItem,
  onRemoveItem,
}: any) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-semibold text-gray-500 mb-2">
        {label}
      </label>

      {/* Dropdown Input */}
      <div className="relative bg-white rounded-xl">
        <select
          onChange={(e) => {
            onAddItem(e.target.value);
            e.target.value = "";
          }}
          className="w-full bg-white text-gray-800 rounded-xl px-4 py-3 border-2 border-transparent focus:border-red-300 focus:outline-none appearance-none"
        >
          <option value="">{placeholder}</option>
          {options.map((opt: string, idx: number) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      {/* Selected Items (Tags) Display */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedItems.map((item: string, index: number) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-red-50 text-red-600 text-xs font-medium px-3 py-1.5 rounded-full border border-red-100 shadow-sm"
            >
              {item}
              <button
                onClick={() => onRemoveItem(item)}
                className="hover:bg-red-200 rounded-full p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePackageForm;
