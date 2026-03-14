"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Trash2,
  Save,
  ChevronDown,
  ChevronUp,
  Loader2,
  Upload,
} from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { toast } from "sonner";

interface PackageItem {
  id: string;
  title: string;
}

export interface TourPackage {
  _id?: string;
  packageName: string;
  eventName: string;
  duration: string;
  country: string;
  phases: Array<{
    phaseNumber: number;
    startDate: string;
    endDate: string;
    returnCity: string;
  }>;
  hotelName: string;
  hotelRating: string;
  maxPrice: number;
  minimumPax: number;
  photo: string;
  image: string;
  sold?: number;
  description: string;
  createdAt: string | Date;
  createdBy: string | null | undefined;
  packageStatus: string;
  isWithVisaAndAirTicket: boolean;
  isB2B?: boolean;
  B2BPrice?: string;
}


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
      <div className="bg-linear-to-r from-blue-50 to-gray-50 border-b border-gray-300 p-4">
        <h3 className="font-semibold text-blue-700">Package Description</h3>
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

const MakePackage = ({ closeModal }: { closeModal: () => void }) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<TourPackage>({
    packageName: "",
    eventName: "",
    duration: "",
    country: "",
    phases: [
      {
        phaseNumber: 1,
        startDate: "14 October",
        endDate: "20 October",
        returnCity: "Dhaka",
      },
    ],

    hotelName: "",
    hotelRating: "",
    maxPrice: 0,
    minimumPax: 2,
    description: "",
    image: "",
    photo: "",
    createdAt: new Date(),
    createdBy: session?.user?.email,
    packageStatus: "active",
    isWithVisaAndAirTicket: false,
    isB2B: false,
    B2BPrice: "",
  });

  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    phases: true,
    pricing: true,
  });
  const [uploading, setUploading] = useState(false);
  const [imgURL, setImageURL] = useState<string | null>(null);
  const [isAirTicket, setIsAirTicket] = useState(false);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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
      setImageURL(result.secure_url);
    } catch (err) {
      console.error(err);
      setImageURL(null);
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "customerPrice" || name === "maxPrice" || name === "minimumPax"
          ? Number(value)
          : value,
    }));
  };

  const handlePhaseChange = (index: number, field: string, value: string) => {
    const newPhases = [...formData.phases];
    newPhases[index] = { ...newPhases[index], [field]: value };
    setFormData((prev) => ({ ...prev, phases: newPhases }));
  };

  const addPhase = () => {
    setFormData((prev) => ({
      ...prev,
      phases: [
        ...prev.phases,
        {
          phaseNumber: prev.phases.length + 1,
          startDate: "",
          endDate: "",
          returnCity: "",
        },
      ],
    }));
  };

  const deletePhase = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      phases: prev.phases.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalPayload = { ...formData, image: imgURL, isWithVisaAndAirTicket: isAirTicket };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/post-business-package`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPayload),
      },
    );

    const result = await res.json();

    if (!result.insertedId) {
      Swal.fire({
        title: "Something went wrong! Please try again",
        icon: "error",
        draggable: false,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (result.insertedId) {
      Swal.fire({
        title: "Package created successfully!",
        icon: "success",
        draggable: false,
        showConfirmButton: false,
        timer: 2000,
      });
      closeModal();
    }
  };


  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-linear-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-2">
            Business Tour Package Creator
          </h1>
          <p className="text-gray-600 text-lg">
            Create and manage your business tour packages with ease
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Basic Information Section */}
            <div className="border-b border-gray-200">
              <button
                type="button"
                onClick={() => toggleSection("basic")}
                className="w-full px-8 py-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <span className="text-red-600 font-bold">📋</span>
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Basic Information
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Package name, duration, country & description
                    </p>
                  </div>
                </div>
                {expandedSections.basic ? (
                  <ChevronUp className="text-gray-400" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>

              {expandedSections.basic && (
                <div className="px-8 pb-8 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Package Name *
                      </label>
                      <input
                        type="text"
                        name="packageName"
                        value={formData.packageName}
                        required
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                        placeholder="e.g., CANTON FAIR 2025"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duration *
                      </label>
                      <input
                        type="text"
                        name="duration"
                        required
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                        placeholder="e.g., 5 Nights 6 Days"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        required
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                        placeholder="e.g., China"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Event Name
                      </label>
                      <input
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                        placeholder="e.g., Canton Fair Phase 3"
                      />
                    </div>
                    <div
                      className="animate-fade-in my-4"
                      style={{ animationDelay: "200ms" }}
                    >
                      <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2">
                        Thumbnail<span className="text-red-400">*</span>
                      </label>
                      <label
                        htmlFor="card"
                        className={`cursor-pointer py-3 px-4 border-2 ${
                          imgURL
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
                        id="card"
                        type="file"
                        onChange={(e) => handleFileUpload(e)}
                        className="hidden"
                      />

                      {imgURL && (
                        <span>Card is uploaded uploaded successfully</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Package Description *
                    </label>
                    <DescriptionEditor
                      value={formData.description}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, description: value }))
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Tour Phases Section */}
            <div className="border-b border-gray-200">
              <button
                type="button"
                onClick={() => toggleSection("phases")}
                className="w-full px-8 py-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold">📅</span>
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Tour Phases
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Add multiple phases with dates and return cities
                    </p>
                  </div>
                </div>
                {expandedSections.phases ? (
                  <ChevronUp className="text-gray-400" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>

              {expandedSections.phases && (
                <div className="px-8 pb-8 pt-2">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Total Phases: {formData.phases.length}
                    </h3>
                    <button
                      type="button"
                      onClick={addPhase}
                      className="flex items-center gap-2 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                      <Plus size={18} />
                      Add New Phase
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.phases.map((phase, index) => (
                      <div
                        key={index}
                        className="p-5 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold text-green-700">
                            Phase {phase.phaseNumber}
                          </h4>
                          {formData.phases.length > 1 && (
                            <button
                              type="button"
                              onClick={() => deletePhase(index)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">
                              Phase Number
                            </label>
                            <input
                              type="number"
                              value={phase.phaseNumber}
                              onChange={(e) =>
                                handlePhaseChange(
                                  index,
                                  "phaseNumber",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">
                              Start Date *
                            </label>
                            <input
                              type="text"
                              value={phase.startDate}
                              required
                              onChange={(e) =>
                                handlePhaseChange(
                                  index,
                                  "startDate",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="14 October"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">
                              End Date *
                            </label>
                            <input
                              type="text"
                              value={phase.endDate}
                              required
                              onChange={(e) =>
                                handlePhaseChange(
                                  index,
                                  "endDate",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="20 October"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">
                              Return City *
                            </label>
                            <input
                              type="text"
                              required
                              value={phase.returnCity}
                              onChange={(e) =>
                                handlePhaseChange(
                                  index,
                                  "returnCity",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="Dhaka"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pricing Information Section */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection("pricing")}
                className="w-full px-8 py-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-600 font-bold">💰</span>
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Pricing Information
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Set package pricing and participant details
                    </p>
                  </div>
                </div>
                {expandedSections.pricing ? (
                  <ChevronUp className="text-gray-400" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>

              {expandedSections.pricing && (
                <div className="px-8 pb-8 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price (BDT) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          ৳
                        </span>
                        <input
                          type="number"
                          name="maxPrice"
                          required
                          value={formData.maxPrice}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Minimum Participants *
                      </label>
                      <input
                        type="number"
                        name="minimumPax"
                        required
                        value={formData.minimumPax}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-4 border border-gray-200 max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                onChange={(e) => setIsAirTicket(e.target.checked)}
                className="h-5 w-5"
              />
              <label className="text-sm font-semibold text-gray-600">
                This package include visa and air ticket{" "}
                <span className="text-red-700">(by default false)</span>
              </label>
            </div>
          </div>
          {/* <div className="bg-white rounded-xl shadow-2xl p-4 border border-gray-200 max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                onChange={formData.isB2B}
                className="h-5 w-5"
              />
              <label className="text-sm font-semibold text-gray-600">
                Is this package for b2b{" "}
                <span className="text-red-700">(by default false)</span>
              </label>
            </div>
          </div> */}
          <div className="bg-white rounded-xl shadow-2xl p-4 border border-gray-200 max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={formData.isB2B}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isB2B: e.target.checked,
                  })
                }
                className="h-5 w-5"
              />

              <label className="text-sm font-semibold text-gray-600">
                Is this package for b2b{" "}
                <span className="text-red-700">(by default false)</span>
              </label>
            </div>

            {/* B2B Price Input */}
            {formData.isB2B && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  B2B Price
                </label>

                <input
                  type="text"
                  placeholder="Enter B2B Price"
                  value={formData.B2BPrice}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      B2BPrice: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <div className="bg-white rounded-xl shadow-2xl p-4 border border-gray-200 max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">
                    Ready to create your package?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Review all information before submitting
                  </p>
                </div>
                <div className="flex gap-4">
                  {/* <button
                    type="button"
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Save as Draft
                  </button> */}
                  <button
                    type="submit"
                    className="px-8 py-3 bg-linear-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-400 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 hover:cursor-pointer"
                  >
                    <Save size={20} />
                    Create Package
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakePackage;
