"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { keyof } from "zod";
import Swal from "sweetalert2";
import Loader from "@/components/ui/loader";
import { useSession } from "next-auth/react";

interface CompanyLocation {
  city: string;
  area: string;
  country: string;
}

interface BDAddress {
  city: string;
  area: string;
  country: string;
}

interface PersonalInfo {
  name: string;
  year: string;
  phone: string;
  email: string;
  photo: File | null;
  passport: File | null;
}

interface Documents {
  tinCertificate: File | null;
  binCertificate: File | null;
  tradeLicense: File | null;
}

export interface BusinessDealFormData {
  companyName: string;
  companyLocation: CompanyLocation;
  documents: Documents;
  bdAddress: BDAddress;
  personalInfo: PersonalInfo;
  createdAt: string | Date;
  createdBy: string | null | undefined;
  applicationStatus: "pending" | "approved" | "rejected";
}

const BusinessDealForm = () => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState<BusinessDealFormData>({
    companyName: "",
    companyLocation: {
      city: "",
      area: "",
      country: "",
    },
    documents: {
      tinCertificate: null,
      binCertificate: null,
      tradeLicense: null,
    },
    bdAddress: {
      city: "",
      area: "",
      country: "Bangladesh",
    },
    personalInfo: {
      name: "",
      year: "",
      phone: "",
      email: "",
      photo: null,
      passport: null,
    },
    createdAt: new Date(),
    createdBy: session?.user?.email,
    applicationStatus: "pending",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [previewImages, setPreviewImages] = useState<{ [key: string]: string }>(
    {}
  );

  const handleCompanyLocationChange = (
    field: keyof CompanyLocation,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      companyLocation: {
        ...prev.companyLocation,
        [field]: value,
      },
    }));
  };

  const handleBDAddressChange = (field: keyof BDAddress, value: string) => {
    if (field === "country") return; // Prevent changing country
    setFormData((prev) => ({
      ...prev,
      bdAddress: {
        ...prev.bdAddress,
        [field]: value,
      },
    }));
  };

  const handlePersonalInfoChange = (
    field: keyof PersonalInfo,
    value: string | File
  ) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const handleFileChange = async (
    e: any,
    section: "documents" | "personalInfo",
    field: string
  ) => {
    const file = e.target.files[0];

    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pcakge_img_uploade");
    data.append("cloud_name", "dqyfwfeed");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();

    if (result.secure_url) {
      if (section === "documents") {
        setFormData((prev) => ({
          ...prev,
          documents: {
            ...prev.documents,
            [field]: result.secure_url,
          },
        }));
      } else if (section === "personalInfo") {
        setFormData((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            [field]: result.secure_url,
          },
        }));
      }
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImages((prev) => ({
        ...prev,
        [`${section}-${field}`]: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (section: "documents" | "personalInfo", field: string) => {
    if (section === "documents") {
      setFormData((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [field]: null,
        },
      }));
    } else {
      handlePersonalInfoChange(field as keyof PersonalInfo, "");
    }
    setPreviewImages((prev) => ({
      ...prev,
      [`${section}-${field}`]: "",
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitMessage(null);

    try {
      // Create FormData for multipart/form-data
      const uploadFormData = new FormData();

      // Add text fields
      uploadFormData.append("companyName", formData.companyName);
      uploadFormData.append(
        "companyLocation",
        JSON.stringify(formData.companyLocation)
      );
      uploadFormData.append("bdAddress", JSON.stringify(formData.bdAddress));
      uploadFormData.append(
        "personalInfo",
        JSON.stringify({
          name: formData.personalInfo.name,
          year: formData.personalInfo.year,
          phone: formData.personalInfo.phone,
          email: formData.personalInfo.email,
        })
      );

      // Add document files
      if (formData.documents.tinCertificate) {
        uploadFormData.append(
          "tinCertificate",
          formData.documents.tinCertificate
        );
      }
      if (formData.documents.binCertificate) {
        uploadFormData.append(
          "binCertificate",
          formData.documents.binCertificate
        );
      }
      if (formData.documents.tradeLicense) {
        uploadFormData.append("tradeLicense", formData.documents.tradeLicense);
      }

      // Add personal info files
      if (formData.personalInfo.photo) {
        uploadFormData.append("photo", formData.personalInfo.photo);
      }
      if (formData.personalInfo.passport) {
        uploadFormData.append("passport", formData.personalInfo.passport);
      }

      const res = await fetch(
        "https://gm-international-server-gamma.vercel.app/submit-business-deal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (res.ok) {
        setSubmitMessage({
          type: "success",
          text: "Application submitted successfully!",
        });

        Swal.fire({
          title: "Your Form has been submitted",
          icon: "success",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });

        // Reset form
        setFormData({
          companyName: "",
          companyLocation: { city: "", area: "", country: "" },
          documents: {
            tinCertificate: null,
            binCertificate: null,
            tradeLicense: null,
          },
          bdAddress: { city: "", area: "", country: "Bangladesh" },
          personalInfo: {
            name: "",
            year: "",
            phone: "",
            email: "",
            photo: null,
            passport: null,
          },
          createdAt: new Date(),
          createdBy: session?.user?.email,
          applicationStatus: "pending",
        });
        setPreviewImages({});
      } else {
        setSubmitMessage({
          type: "error",
          text: "Error submitting application",
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Error submitting form. Please try again.",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-8 md:py-12 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Application Form
          </h1>
          <p className="text-red-700">
            Please fill in all required information
          </p>
        </div>

        {/* Submit Message */}
        {submitMessage && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              submitMessage.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {submitMessage.text}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-xl p-6 md:p-8"
        >
          {/* Company Name Section */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-black mb-6 pb-4 border-b-2 border-red-200">
              Company Information
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-black mb-2">
                Company Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    companyName: e.target.value,
                  }))
                }
                placeholder="Enter company name"
                className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition"
                required
              />
            </div>

            {/* Company Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["city", "area", "country"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-black mb-2 capitalize">
                    {field} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={
                      formData.companyLocation[field as keyof CompanyLocation]
                    }
                    onChange={(e) =>
                      handleCompanyLocationChange(
                        field as keyof CompanyLocation,
                        e.target.value
                      )
                    }
                    placeholder={`Enter ${field}`}
                    className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Documents Section */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-black mb-6 pb-4 border-b-2 border-red-200">
              Documents
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { key: "tinCertificate", label: "TIN Certificate" },
                { key: "binCertificate", label: "BIN Certificate" },
                { key: "tradeLicense", label: "Trade License" },
              ].map((doc) => (
                <div key={doc.key}>
                  <label className="block text-sm font-semibold text-black mb-2">
                    {doc.label} (photo) <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) =>
                        handleFileChange(e, "documents", doc.key)
                      }
                      className="hidden"
                      id={`doc-${doc.key}`}
                      required
                    />
                    <label
                      htmlFor={`doc-${doc.key}`}
                      className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition"
                    >
                      <div className="text-center">
                        <Upload
                          size={24}
                          className="text-red-600 mx-auto mb-2"
                        />
                        <p className="text-sm text-red-700 font-medium">
                          Upload file
                        </p>
                      </div>
                    </label>
                    {formData.documents[doc.key as keyof Documents] && (
                      <div className="mt-2 flex items-center justify-between bg-red-50 p-3 rounded-lg">
                        <p className="text-sm text-red-900 font-medium truncate">
                          {
                            (
                              formData.documents[
                                doc.key as keyof Documents
                              ] as File
                            )?.name
                          }
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFile("documents", doc.key)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BD Address Section */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-black mb-6 pb-4 border-b-2 border-red-200">
              Address (Bangladesh)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  City <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.bdAddress.city}
                  onChange={(e) =>
                    handleBDAddressChange("city", e.target.value)
                  }
                  placeholder="Enter city"
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Area <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.bdAddress.area}
                  onChange={(e) =>
                    handleBDAddressChange("area", e.target.value)
                  }
                  placeholder="Enter area"
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.bdAddress.country}
                  disabled
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-lg bg-red-50 text-red-700 font-semibold cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-black mb-6 pb-4 border-b-2 border-red-200">
              Personal Information
            </h2>

            {/* Name and Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.name}
                  onChange={(e) =>
                    handlePersonalInfoChange("name", e.target.value)
                  }
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Year of Birth <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  value={formData.personalInfo.year}
                  onChange={(e) =>
                    handlePersonalInfoChange("year", e.target.value)
                  }
                  placeholder="e.g., 1990"
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Phone and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) =>
                    handlePersonalInfoChange("phone", e.target.value)
                  }
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    handlePersonalInfoChange("email", e.target.value)
                  }
                  placeholder="Enter email"
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Photo and Passport */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Photo <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "personalInfo", "photo")}
                  className="hidden"
                  id="personal-photo"
                  accept="image/*"
                  required
                />
                <label
                  htmlFor="personal-photo"
                  className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition"
                >
                  <div className="text-center">
                    <Upload size={24} className="text-red-600 mx-auto mb-2" />
                    <p className="text-sm text-red-700 font-medium">
                      Upload photo
                    </p>
                  </div>
                </label>
                {previewImages["personalInfo-photo"] && (
                  <div className="mt-3 relative">
                    <img
                      src={previewImages["personalInfo-photo"]}
                      alt="Photo preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile("personalInfo", "photo")}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Passport (photo) <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileChange(e, "personalInfo", "passport")
                  }
                  className="hidden"
                  id="personal-passport"
                  accept="image/*"
                  required
                />
                <label
                  htmlFor="personal-passport"
                  className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition"
                >
                  <div className="text-center">
                    <Upload size={24} className="text-red-600 mx-auto mb-2" />
                    <p className="text-sm text-red-700 font-medium">
                      Upload passport
                    </p>
                  </div>
                </label>
                {previewImages["personalInfo-passport"] && (
                  <div className="mt-3 relative">
                    <img
                      src={previewImages["personalInfo-passport"]}
                      alt="Passport preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile("personalInfo", "passport")}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-linear-to-r from-red-600 to-red-700 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessDealForm;
