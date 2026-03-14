"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Trash2,
  Eye,
  X,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Building,
  Briefcase,
  Hotel,
  CheckCircle,
  Edit,
  Save,
  Plus,
  ImageIcon,
  Upload,
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";

// Quill Editor Component
const DescriptionEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    let Quill: any;

    const loadQuill = async () => {
      if (typeof window === "undefined") return;

      const quillModule = await import("quill");
      Quill = quillModule.default;

      if (editorRef.current && !quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: "Enter package description...",
          modules: {
            toolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ header: [1, 2, 3, false] }],
              ["link"],
              ["clean"],
            ],
          },
          formats: ["bold", "italic", "underline", "list", "header", "link"],
        });

        if (value) {
          quillRef.current.root.innerHTML = value;
        }

        quillRef.current.on("text-change", () => {
          const html = quillRef.current?.root.innerHTML || "";
          onChange(html === "<p><br></p>" ? "" : html);
        });
      }
    };

    loadQuill();
  }, []);

  useEffect(() => {
    if (
      quillRef.current &&
      value !== undefined &&
      quillRef.current.root.innerHTML !== value
    ) {
      quillRef.current.root.innerHTML = value || "";
    }
  }, [value]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-linear-to-r from-red-50 to-gray-50 border-b border-gray-300 p-4">
        <h3 className="font-semibold text-red-700">Package Description</h3>
        <p className="text-sm text-gray-600">
          Add detailed information about the package with formatting
        </p>
      </div>
      <div
        ref={editorRef}
        className="quill-editor min-h-50"
        style={{ borderRadius: "0px" }}
      />
      <div className="bg-gray-50 border-t border-gray-300 p-2">
        <p className="text-xs text-gray-500">
          Tip: Use formatting tools to make your description more appealing.
        </p>
      </div>
    </div>
  );
};

// Package Description View Component for displaying HTML
const PackageDescriptionView = ({ html }: { html: string }) => {
  return (
    <div
      className="package-description"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// Types
interface PhaseItem {
  phaseNumber: number;
  startDate: string;
  endDate: string;
  returnCity: string;
}

interface TourPackage {
  _id: string;
  packageName: string;
  eventName: string;
  duration: string;
  country: string;
  phases: PhaseItem[];
  maxPrice: number;
  minimumPax: number;
  description: string;
  image: string;
  createdAt: string;
  createdBy: string;
  packageStatus?: "active" | "inactive" | "pending";
  isB2B?: boolean;
  B2BPrice?: string;
}

interface TourPackageProps {
  initialData: TourPackage[];
}

type EditFormData = Omit<TourPackage, "_id" | "createdAt" | "createdBy">;

const ShowAllTourPackages = ({ initialData }: TourPackageProps) => {
  const [packages, setPackages] = useState<TourPackage[]>(initialData);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditFormData>({
    defaultValues: {
      packageName: "",
      eventName: "",
      duration: "",
      country: "",
      phases: [],
      maxPrice: 0,
      minimumPax: 0,
      description: "",
      image: "",
      packageStatus: "active",
    },
  });

  const {
    fields: phaseFields,
    append: appendPhase,
    remove: removePhase,
  } = useFieldArray({
    control,
    name: "phases",
  });

  const handleDelete = (id: string): void => {
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
          `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/business-package-delete/${id}`,
          {
            method: "DELETE",
          },
        );

        const result = await res.json();

        if (!result) {
          Swal.fire("Package not deleted yet!!!", "error");
        }

        setPackages(packages.filter((pkg) => pkg._id !== id));
        Swal.fire("Deleted!", "Package has been deleted.", "success");
      }
    });
  };

  const handleView = (pkg: TourPackage): void => {
    setSelectedPackage(pkg);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (pkg: TourPackage): void => {
    setSelectedPackage(pkg);
    setIsEditMode(true);

    // Reset form with package data
    reset({
      packageName: pkg.packageName,
      eventName: pkg.eventName,
      duration: pkg.duration,
      country: pkg.country,
      phases: pkg.phases,
      maxPrice: pkg.maxPrice,
      minimumPax: pkg.minimumPax,
      description: pkg.description,
      image: pkg.image,
      packageStatus: pkg.packageStatus || "active",
      isB2B: pkg.isB2B || false,
      B2BPrice: pkg.B2BPrice || "",
    });

    setImagePreview(pkg.image);
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    setIsEditMode(false);
    setSelectedImage(null);
    setImagePreview(null);
    setImageURL(null);
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pcakge_img_uploade");
    data.append("cloud_name", "dqyfwfeed");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
        {
          method: "POST",
          body: data,
        },
      );

      const result = await res.json();

      if (!result.secure_url) toast.error("Image not uploaded");

      if (result.secure_url) {
        setImageURL(result.secure_url);
        setImagePreview(result.secure_url);
        toast.success("Image uploaded");
      }
      // setImageURL(result.secure_url);
    } catch (err) {
      console.error(err);
      setImageURL(null);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: EditFormData) => {
    if (!selectedPackage) return;

    try {
      Swal.fire({
        title: "Updating package...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Update package
      const updateData = {
        ...data,
        image: imageURL || selectedPackage.image,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/business-package-update/${selectedPackage._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        },
      );

      const result = await res.json();

      if (res.ok) {
        // Update local state
        // setPackages((prev) =>
        //   prev.map((pkg) =>
        //     pkg._id === selectedPackage._id
        //       ? {
        //           ...pkg,
        //           ...updateData,
        //           _id: pkg._id,
        //           createdAt: pkg.createdAt,
        //           createdBy: pkg.createdBy,
        //         }
        //       : pkg,
        //   ),
        // );

        // setSelectedPackage((prev) =>
        //   prev ? { ...prev, ...updateData } : null,
        // );

        Swal.fire({
          icon: "success",
          title: "Package updated successfully!",
          timer: 1500,
          showConfirmButton: false,
        });

        setIsEditMode(false);
        setIsModalOpen(false);
      } else {
        throw new Error(result.message || "Failed to update package");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to update package",
        text: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  const handleToggleStatus = async (id: string): Promise<void> => {
    try {
      const pkg = packages.find((p) => p._id === id);
      if (!pkg) return;

      Swal.fire({
        title: "Are you sure?",
        text: `Do you want to ${
          pkg.packageStatus === "active" ? "Deactivate" : "Activate"
        } this package?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, continue!",
      }).then(async (result) => {
        if (!result.isConfirmed) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/toggle-business-package-status/${id}`,
          {
            method: "PATCH",
          },
        );

        const data = await res.json();

        if (res.status !== 200) {
          Swal.fire({
            icon: "error",
            title: data.message || "Something went wrong",
            timer: 1500,
            showConfirmButton: false,
          });
          return;
        }

        const newStatus = data.newStatus;

        setPackages((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, packageStatus: newStatus } : item,
          ),
        );

        if (selectedPackage && selectedPackage._id === id) {
          setSelectedPackage({
            ...selectedPackage,
            packageStatus: newStatus,
          });
        }

        Swal.fire({
          icon: "success",
          title: `Package ${
            newStatus === "active" ? "Activated" : "Deactivated"
          }!`,
          timer: 1500,
          showConfirmButton: false,
        });
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unexpected error occurred",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isB2BSelected = watch("isB2B");

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Table for Desktop */}
        <div className="hidden md:block bg-white rounded-lg shadow-2xl overflow-hidden border-t-4 border-red-600">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-red-600 to-red-700 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Package Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Event
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Price (BDT)
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Min Pax
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100">
                {packages.map((pkg) => (
                  <tr
                    key={pkg._id}
                    className="hover:bg-red-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-black">
                      {pkg.packageName}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {pkg.eventName}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {pkg.duration}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-red-600">
                      ৳{pkg.maxPrice}
                    </td>
                    <td className="px-6 py-4 text-sm text-black">
                      {pkg.minimumPax}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          pkg.packageStatus || "active",
                        )}`}
                      >
                        {(pkg.packageStatus || "active")
                          .charAt(0)
                          .toUpperCase() +
                          (pkg.packageStatus || "active").slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleView(pkg)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors shadow-md hover:shadow-lg"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(pkg)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors shadow-md hover:shadow-lg"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg._id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors shadow-md hover:shadow-lg"
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

        {/* Cards for Mobile & Tablet */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-lg shadow-lg p-5 border-t-4 border-red-600 hover:shadow-xl transition-shadow"
            >
              <h3 className="font-bold text-red-900 mb-3 text-base line-clamp-2">
                {pkg.packageName}
              </h3>

              <div className="space-y-2 mb-4 text-sm text-black">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-red-600" />
                  <span>{pkg.eventName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-red-600" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-red-600" />
                  <span className="font-bold">৳{pkg.maxPrice}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-red-600" />
                  <span>Min {pkg.minimumPax} Pax</span>
                </div>
                <div className="mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      pkg.packageStatus || "active",
                    )}`}
                  >
                    {(pkg.packageStatus || "active").charAt(0).toUpperCase() +
                      (pkg.packageStatus || "active").slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleView(pkg)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Eye size={16} />
                  View
                </button>
                <button
                  onClick={() => handleEdit(pkg)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {packages.length === 0 && (
          <div className="bg-white rounded-lg shadow-xl p-12 text-center border-t-4 border-red-600">
            <p className="text-red-700 text-lg">No tour packages found</p>
          </div>
        )}
      </div>

      {/* Modal - View/Edit */}
      {isModalOpen && selectedPackage && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border-t-4 border-red-600">
            {/* Modal Header */}
            <div className="bg-linear-to-r from-red-600 to-red-700 text-white p-6 flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold">
                  {isEditMode ? "Edit Package" : selectedPackage.packageName}
                </h2>
                <p className="text-red-100 text-sm mt-1">
                  {isEditMode
                    ? "Update package information"
                    : selectedPackage.eventName}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-red-600 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6 space-y-6">
                {/* Package Status - Only show in view mode */}
                {!isEditMode && (
                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-red-700 font-medium mb-2">
                        Package Status
                      </p>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                          selectedPackage.packageStatus || "active",
                        )}`}
                      >
                        {(selectedPackage.packageStatus || "active")
                          .charAt(0)
                          .toUpperCase() +
                          (selectedPackage.packageStatus || "active").slice(1)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleToggleStatus(selectedPackage._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      Toggle Status
                    </button>
                  </div>
                )}

                {/* Image Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                    <ImageIcon size={20} className="text-red-600" />
                    Package Image
                  </h3>
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="relative w-full max-w-md h-64 overflow-hidden rounded-xl shadow-lg bg-gray-100">
                      <Image
                        src={selectedPackage.image}
                        alt="Package"
                        fill
                        className="object-contain"
                      />
                    </div>
                    {isEditMode && (
                      // <div className="w-full">
                      //   <label className="block text-sm font-medium text-gray-700 mb-2">
                      //     Change Image
                      //   </label>
                      //   <input
                      //     type="file"
                      //     accept="image/*"
                      //     onChange={handleImageChange}
                      //     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                      //   />
                      // </div>

                      <div
                        className="animate-fade-in my-4"
                        style={{ animationDelay: "200ms" }}
                      >
                        <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                          Thumbnail<span className="text-red-400">*</span>
                        </label>
                        <label
                          htmlFor="image"
                          className={`cursor-pointer py-3 px-4 border-2 ${
                            imageURL
                              ? "border-green-600 text-green-600"
                              : "border-red-600 text-red-600"
                          } border-solid rounded-lg font-medium text-sm hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-md`}
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              Thumbnail
                            </>
                          )}
                        </label>

                        <input
                          id="image"
                          type="file"
                          onChange={(e) => handleFileUpload(e)}
                          className="hidden"
                        />

                        {imageURL && (
                          <span>Card is uploaded uploaded successfully</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                    <Briefcase size={20} className="text-red-600" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isEditMode ? (
                      <>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Package Name
                          </label>
                          <input
                            {...register("packageName", {
                              required: "Package name is required",
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          />
                          {errors.packageName && (
                            <p className="text-red-600 text-xs">
                              {errors.packageName.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Event Name
                          </label>
                          <input
                            {...register("eventName", {
                              required: "Event name is required",
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          />
                          {errors.eventName && (
                            <p className="text-red-600 text-xs">
                              {errors.eventName.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Duration
                          </label>
                          <input
                            {...register("duration", {
                              required: "Duration is required",
                            })}
                            placeholder="e.g., 5 Days, 4 Nights"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          />
                          {errors.duration && (
                            <p className="text-red-600 text-xs">
                              {errors.duration.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Country
                          </label>
                          <input
                            {...register("country", {
                              required: "Country is required",
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          />
                          {errors.country && (
                            <p className="text-red-600 text-xs">
                              {errors.country.message}
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-3 bg-red-50 rounded-lg">
                          <p className="text-red-700 font-medium">
                            Package Name
                          </p>
                          <p className="text-black font-semibold">
                            {selectedPackage.packageName}
                          </p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                          <p className="text-red-700 font-medium">Event Name</p>
                          <p className="text-black font-semibold">
                            {selectedPackage.eventName}
                          </p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                          <p className="text-red-700 font-medium">Duration</p>
                          <p className="text-black font-semibold">
                            {selectedPackage.duration}
                          </p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                          <p className="text-red-700 font-medium">Country</p>
                          <p className="text-black font-semibold">
                            {selectedPackage.country}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Tour Phases */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-red-900 flex items-center gap-2">
                      <Calendar size={20} className="text-red-600" />
                      Tour Phases
                    </h3>
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() =>
                          appendPhase({
                            phaseNumber: phaseFields.length + 1,
                            startDate: "",
                            endDate: "",
                            returnCity: "",
                          })
                        }
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-1"
                      >
                        <Plus size={16} /> Add Phase
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {isEditMode
                      ? phaseFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600 relative"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-semibold text-red-900">
                                Phase {index + 1}
                              </p>
                              <button
                                type="button"
                                onClick={() => removePhase(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {/* .${index} as const*/}
                              <div>
                                <label className="block text-xs text-red-700 font-medium mb-1">
                                  Start Date
                                </label>
                                <input
                                  {...register(`phases.${index}.startDate`, {
                                    required: "Start date is required",
                                  })}
                                  type="text"
                                  className="w-full px-2 py-1 text-sm border border-red-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-red-700 font-medium mb-1">
                                  End Date
                                </label>
                                <input
                                  {...register(`phases.${index}.endDate`, {
                                    required: "End date is required",
                                  })}
                                  type="text"
                                  className="w-full px-2 py-1 text-sm border border-red-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-red-700 font-medium mb-1">
                                  Return City
                                </label>
                                <input
                                  {...register(
                                    `phases.${index}.returnCity` as const,
                                    { required: "Return city is required" },
                                  )}
                                  className="w-full px-2 py-1 text-sm border border-red-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : selectedPackage.phases.map((phase, index) => (
                          <div
                            key={index}
                            className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600"
                          >
                            <p className="font-semibold text-red-900 mb-2">
                              Phase {phase.phaseNumber}
                            </p>
                            <div className="grid grid-cols-3 gap-2 text-sm text-black">
                              <div>
                                <p className="text-red-700 font-medium">
                                  Start
                                </p>
                                <p>{phase.startDate}</p>
                              </div>
                              <div>
                                <p className="text-red-700 font-medium">End</p>
                                <p>{phase.endDate}</p>
                              </div>
                              <div>
                                <p className="text-red-700 font-medium">
                                  Return
                                </p>
                                <p>{phase.returnCity}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>

                {/* Pricing Information */}
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                    <DollarSign size={20} className="text-red-600" />
                    Pricing Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isEditMode ? (
                      <>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Price Per Person (৳)
                          </label>
                          <input
                            {...register("maxPrice", {
                              required: "Price is required",
                              valueAsNumber: true,
                              min: {
                                value: 0,
                                message: "Price must be positive",
                              },
                            })}
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          />
                          {errors.maxPrice && (
                            <p className="text-red-600 text-xs">
                              {errors.maxPrice.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Minimum Pax
                          </label>
                          <input
                            {...register("minimumPax", {
                              required: "Minimum pax is required",
                              valueAsNumber: true,
                              min: {
                                value: 1,
                                message: "Minimum pax must be at least 1",
                              },
                            })}
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          />
                          {errors.minimumPax && (
                            <p className="text-red-600 text-xs">
                              {errors.minimumPax.message}
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <p className="text-yellow-700 font-medium">
                            Price/Person
                          </p>
                          <p className="text-black font-bold text-lg">
                            ৳{selectedPackage.maxPrice}
                          </p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <p className="text-yellow-700 font-medium">
                            Minimum Person
                          </p>
                          <p className="text-black font-bold text-lg">
                            {selectedPackage.minimumPax}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isEditMode ? (
                      <>
                        <div className="space-y-2 flex gap-2 items-center min-h-30">
                          <input
                            type="checkbox"
                            {...register("isB2B")}
                            className="h-5 w-5"
                          />
                          <label className="block text-sm font-medium text-gray-700">
                            Is This Package For B2B
                          </label>
                        </div>
                        {isB2BSelected && (
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              B2B Price
                            </label>

                            <input
                              {...register("B2BPrice", {
                                required: "B2B Price is required",
                                valueAsNumber: true,
                                min: {
                                  value: 1,
                                  message: "Minimum price must be at least 1",
                                },
                              })}
                              type="number"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            />

                            {errors.B2BPrice && (
                              <p className="text-red-600 text-xs">
                                {errors.B2BPrice.message}
                              </p>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <p className="text-yellow-700 font-medium">
                            Price/Person
                          </p>
                          <p className="text-black font-bold text-lg">
                            ৳{selectedPackage.maxPrice}
                          </p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <p className="text-yellow-700 font-medium">
                            Minimum Person
                          </p>
                          <p className="text-black font-bold text-lg">
                            {selectedPackage.minimumPax}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Description - Using Quill Editor for Edit Mode and PackageDescriptionView for View Mode */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                      <span className="text-red-700 font-bold">i</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Package Details
                    </h2>
                  </div>

                  {isEditMode ? (
                    <div className="space-y-2">
                      <DescriptionEditor
                        value={watch("description") || ""}
                        onChange={(value) => setValue("description", value)}
                      />
                      <input type="hidden" {...register("description")} />
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-gray-200 p-8">
                      <div className="prose prose-lg max-w-none">
                        {selectedPackage.description ? (
                          <PackageDescriptionView
                            html={selectedPackage.description}
                          />
                        ) : (
                          <p className="text-gray-500 italic">
                            No description available
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Meta Information - Only in view mode */}
                {!isEditMode && (
                  <div>
                    <h3 className="text-lg font-semibold text-red-900 mb-4">
                      Meta Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-700 font-medium">Created By</p>
                        <p className="text-black font-semibold">
                          {selectedPackage.createdBy}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-700 font-medium">Created At</p>
                        <p className="text-black font-semibold">
                          {formatDate(selectedPackage.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {isEditMode && (
                  <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setIsEditMode(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Quill CSS */}
      <style jsx global>{`
        @import "quill/dist/quill.snow.css";

        .quill-editor {
          background: white;
          min-height: 200px;
        }

        .quill-editor .ql-container {
          min-height: 200px;
          font-size: 16px;
        }

        .quill-editor .ql-editor {
          min-height: 200px;
        }

        .package-description {
          font-family: inherit;
          line-height: 1.6;
        }

        .package-description h1,
        .package-description h2,
        .package-description h3 {
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .package-description ul,
        .package-description ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .package-description p {
          margin-bottom: 1rem;
        }

        .package-description a {
          color: #dc2626;
          text-decoration: underline;
        }

        .package-description a:hover {
          color: #b91c1c;
        }
      `}</style>
    </div>
  );
};

export default ShowAllTourPackages;
