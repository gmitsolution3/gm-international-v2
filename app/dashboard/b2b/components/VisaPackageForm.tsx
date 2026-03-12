"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import { X, Plus, Save, FileText } from "lucide-react";
import Editor from "./Editor";
import { toast } from "sonner";

interface IVisaPackage {
  country: string;
  visaType: string;
  processingTime: string;
  pricing: {
    b2b: number;
    b2c: number;
  };
  validity: string;
  basicDocuments: string[];
  businessDocuments?: string[];
  jobHolderDocuments?: string[];
  studentDocuments?: string[];
  coupleDocuments?: string[];
  otherInformation?: string;
  createdAt: Date;
}

type DocumentField =
  | "basicDocuments"
  | "businessDocuments"
  | "jobHolderDocuments"
  | "studentDocuments"
  | "coupleDocuments";

type VisaPackageFormData = Omit<IVisaPackage, "createdAt">;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/15 backdrop-blur-lg bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative w-full max-w-4xl transform rounded-2xl bg-white p-6 shadow-2xl transition-all">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 text-red-600 hover:bg-red-50 transition-colors"
          >
            <X size={20} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

const VisaPackageForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<VisaPackageFormData | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<VisaPackageFormData>({
    defaultValues: {
      country: "",
      visaType: "",
      processingTime: "",
      pricing: {
        b2b: undefined,
        b2c: undefined,
      },
      validity: "",
      basicDocuments: [""],
      businessDocuments: [""],
      jobHolderDocuments: [""],
      studentDocuments: [""],
      coupleDocuments: [""],
      otherInformation: "",
    },
  });

  // Field arrays for dynamic document lists
  const {
    fields: basicFields,
    append: appendBasic,
    remove: removeBasic,
  } = useFieldArray<any>({ control, name: "basicDocuments" });
  const {
    fields: businessFields,
    append: appendBusiness,
    remove: removeBusiness,
  } = useFieldArray<any>({ control, name: "businessDocuments" });
  const {
    fields: jobFields,
    append: appendJob,
    remove: removeJob,
  } = useFieldArray<any>({ control, name: "jobHolderDocuments" });
  const {
    fields: studentFields,
    append: appendStudent,
    remove: removeStudent,
  } = useFieldArray<any>({ control, name: "studentDocuments" });
  const {
    fields: coupleFields,
    append: appendCouple,
    remove: removeCouple,
  } = useFieldArray<any>({ control, name: "coupleDocuments" });

  // Quill editor modules
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const onSubmit: SubmitHandler<VisaPackageFormData> = (data) => {
    setFormData(data);
    setIsModalOpen(true);
  };



  const confirmSubmit = async () => {
    if (!formData) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b/visa-rate`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await res.json();

 

      if (!result.success) {
        toast.error(result.message || "Something went wrong");
        return;
      }

      toast.success(result.message || "Visa package created");
      setIsModalOpen(false);
      setFormData(null);
      reset()
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 rounded-2xl shadow-xl border my-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-900 border-b-3 border-red-600 pb-3 inline-block">
            Create Visa Package
          </h1>
          <p className="text-red-600 mt-2">
            Fill in the details to create a new visa package
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl p-6 border border-red-200 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-red-800 border-l-4 border-red-600 pl-3 mb-5">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("country", { required: "Country is required" })}
                  placeholder="e.g., Malaysia, Singapore, Thailand"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-red-50/30"
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Visa Type <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("visaType", {
                    required: "visa type is required",
                  })}
                  placeholder="e.g., 3-5 working days"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-red-50/30"
                />
                {errors.visaType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.visaType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Processing Time <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("processingTime", {
                    required: "Processing time is required",
                  })}
                  placeholder="e.g., 3-5 working days"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-red-50/30"
                />
                {errors.processingTime && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.processingTime.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl p-6 border border-red-200 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-red-800 border-l-4 border-red-600 pl-3 mb-5">
              Pricing & Validity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  B2B Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("pricing.b2b", {
                    required: "B2B price is required",
                    min: { value: 0, message: "Price cannot be negative" },
                  })}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-red-50/30"
                />
                {errors.pricing?.b2b && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.pricing.b2b.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  B2C Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("pricing.b2c", {
                    required: "B2C price is required",
                    min: { value: 0, message: "Price cannot be negative" },
                  })}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-red-50/30"
                />
                {errors.pricing?.b2c && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.pricing.b2c.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-red-800 mb-2">
                  Validity <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("validity", {
                    required: "Validity is required",
                  })}
                  placeholder="e.g., 6 months single entry"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-red-50/30"
                />
                {errors.validity && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.validity.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Document Sections */}
          {[
            {
              title: "Basic Documents",
              name: "basicDocuments" as const,
              fields: basicFields,
              append: appendBasic,
              remove: removeBasic,
              required: true,
            },
            {
              title: "Business Documents",
              name: "businessDocuments" as const,
              fields: businessFields,
              append: appendBusiness,
              remove: removeBusiness,
            },
            {
              title: "Job Holder Documents",
              name: "jobHolderDocuments" as const,
              fields: jobFields,
              append: appendJob,
              remove: removeJob,
            },
            {
              title: "Student Documents",
              name: "studentDocuments" as const,
              fields: studentFields,
              append: appendStudent,
              remove: removeStudent,
            },
            {
              title: "Couple Documents",
              name: "coupleDocuments" as const,
              fields: coupleFields,
              append: appendCouple,
              remove: removeCouple,
            },
          ].map(
            (section: {
              title: string;
              name: DocumentField;
              fields: any;
              append: any;
              remove: any;
              required?: boolean;
            }) => (
              <div
                key={section.name}
                className="bg-white rounded-xl p-6 border border-red-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold text-red-800 border-l-4 border-red-600 pl-3 mb-5">
                  {section.title}{" "}
                  {section.required && (
                    <span className="text-red-500 text-sm ml-1">*</span>
                  )}
                </h2>

                <div className="space-y-3">
                  {section.fields.map((field: any, idx: number) => (
                    <div
                      key={field.id}
                      className="flex gap-3 items-center group"
                    >
                      <input
                        {...register(`${section.name}.${idx}` as const)}
                        placeholder={`Enter ${section.title.toLowerCase().slice(0, -1)}`}
                        className="flex-1 px-4 py-2.5 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-red-50/30"
                      />
                      <button
                        type="button"
                        onClick={() => section.remove(idx)}
                        className="p-2.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        title="Remove"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => section.append("")}
                  className="mt-4 px-5 py-2.5 rounded-lg border-2 border-dashed border-red-300 text-red-700 hover:border-red-500 hover:bg-red-50 transition-all inline-flex items-center gap-2 font-medium"
                >
                  <Plus size={18} /> Add Document
                </button>
              </div>
            ),
          )}

          {/* Other Information with Quill */}
          <div className="bg-white rounded-xl p-6 border border-red-200 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-red-800 border-l-4 border-red-600 pl-3 mb-5">
              Other Information
            </h2>
            <div className="quill-wrapper">
              <Editor
                onChange={(value: any) => setValue("otherInformation", value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-linear-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl shadow-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-3"
            >
              <Save size={20} /> Create Visa Package
            </button>
          </div>
        </form>
      </div>

      {/* Review Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-2">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-red-600" size={28} />
            <h2 className="text-2xl font-bold text-red-900">
              Review Visa Package
            </h2>
          </div>

          {formData && (
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">Country</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formData.country}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">Visa Type</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formData.visaType}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">
                    Processing Time
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formData.processingTime}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">Validity</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formData.validity}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">B2B Price</p>
                  <p className="text-lg font-semibold text-gray-800">
                    ${formData.pricing.b2b}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">B2C Price</p>
                  <p className="text-lg font-semibold text-gray-800">
                    ${formData.pricing.b2c}
                  </p>
                </div>
              </div>

              {Object.entries(formData).map(([key, value]) => {
                if (
                  Array.isArray(value) &&
                  value.length > 0 &&
                  value[0] !== ""
                ) {
                  return (
                    <div key={key} className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-red-600 font-medium mb-2">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {value.map((item, idx) => (
                          <li key={idx} className="text-gray-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return null;
              })}

              {formData.otherInformation && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-600 font-medium mb-2">
                    Other Information
                  </p>
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: formData.otherInformation,
                    }}
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 justify-end mt-8 pt-4 border-t border-red-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2.5 rounded-lg border-2 border-red-200 text-red-700 hover:bg-red-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={confirmSubmit}
              className="px-6 py-2.5 bg-linear-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-medium shadow-md"
            >
              Confirm & Submit
            </button>
          </div>
        </div>
      </Modal>

      <style jsx>{`
        .quill-wrapper :global(.ql-container) {
          min-height: 150px;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border-color: #fee2e2;
        }
        .quill-wrapper :global(.ql-toolbar) {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border-color: #fee2e2;
          background-color: #fef2f2;
        }
        .quill-wrapper :global(.ql-container.ql-snow) {
          border-color: #fee2e2;
        }
        .quill-wrapper :global(.ql-editor) {
          min-height: 150px;
        }
        .quill-wrapper :global(.ql-picker-label) {
          color: #991b1b;
        }
      `}</style>
    </>
  );
};

export default VisaPackageForm;
