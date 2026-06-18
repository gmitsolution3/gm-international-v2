// "use client";

// import React, { useState } from "react";
// import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
// import dynamic from "next/dynamic";
// import { X, Plus, Save, FileText } from "lucide-react";
// import Editor from "./Editor";
// import { toast } from "sonner";

// type DocItem = {
//   value: string;
// };

// interface IVisaPackage {
//   country: string;
//   visaType: string;
//   processingTime: string;
//   pricing: {
//     b2b: number;
//     b2c: number;
//   };
//   validity: string;

//   basicDocuments: DocItem[];
//   businessDocuments?: DocItem[];
//   jobHolderDocuments?: DocItem[];
//   studentDocuments?: DocItem[];
//   coupleDocuments?: DocItem[];

//   otherInformation?: string;
//   createdAt: Date;
// }

// type DocumentField =
//   | "basicDocuments"
//   | "businessDocuments"
//   | "jobHolderDocuments"
//   | "studentDocuments"
//   | "coupleDocuments";

// type VisaPackageFormData = Omit<IVisaPackage, "createdAt">;

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex min-h-screen items-center justify-center p-4">
//         {/* Backdrop */}
//         <div
//           className="fixed inset-0 bg-black/15 backdrop-blur-lg bg-opacity-50 transition-opacity"
//           onClick={onClose}
//         />

//         {/* Modal Content */}
//         <div className="relative w-full max-w-4xl transform rounded-2xl bg-white p-6 shadow-2xl transition-all">
//           <button
//             onClick={onClose}
//             className="absolute right-4 top-4 rounded-lg p-1 text-red-600 hover:bg-red-50 transition-colors"
//           >
//             <X size={20} />
//           </button>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// const VisaPackageForm: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState<VisaPackageFormData | null>(null);

//   const {
//     register,
//     control,
//     handleSubmit,
//     setValue,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm<VisaPackageFormData>({
//     defaultValues: {
//       country: "",
//       visaType: "",
//       processingTime: "",
//       pricing: {
//         b2b: undefined,
//         b2c: undefined,
//       },
//       validity: "",
//       basicDocuments: [{ value: "" }],
//       businessDocuments: [{ value: "" }],
//       jobHolderDocuments: [{ value: "" }],
//       studentDocuments: [{ value: "" }],
//       coupleDocuments: [{ value: "" }],
//       otherInformation: "",
//     },
//   });

//   // Field arrays for dynamic document lists
//   const {
//     fields: basicFields,
//     append: appendBasic,
//     remove: removeBasic,
//   } = useFieldArray({ control, name: "basicDocuments" });
//   const {
//     fields: businessFields,
//     append: appendBusiness,
//     remove: removeBusiness,
//   } = useFieldArray({ control, name: "businessDocuments" });
//   const {
//     fields: jobFields,
//     append: appendJob,
//     remove: removeJob,
//   } = useFieldArray({ control, name: "jobHolderDocuments" });
//   const {
//     fields: studentFields,
//     append: appendStudent,
//     remove: removeStudent,
//   } = useFieldArray({ control, name: "studentDocuments" });
//   const {
//     fields: coupleFields,
//     append: appendCouple,
//     remove: removeCouple,
//   } = useFieldArray({ control, name: "coupleDocuments" });

//   const onSubmit: SubmitHandler<VisaPackageFormData> = (data) => {
//     setFormData(data);
//     setIsModalOpen(true);
//   };

//   const confirmSubmit = async () => {
//     if (!formData) return;

//     const transformedData = {
//       ...formData,
//       basicDocuments: formData.basicDocuments.map((i) => i.value),
//       businessDocuments: formData.businessDocuments?.map((i) => i.value),
//       jobHolderDocuments: formData.jobHolderDocuments?.map((i) => i.value),
//       studentDocuments: formData.studentDocuments?.map((i) => i.value),
//       coupleDocuments: formData.coupleDocuments?.map((i) => i.value),
//     };

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/visa-rate/api/v1/create`,
//         {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json",
//           },
//           body: JSON.stringify(transformedData),
//         },
//       );

//       const result = await res.json();
//       console.log({ result, transformedData });

//       if (!result.success) {
//         toast.error(result.message || "Something went wrong");
//         return;
//       }

//       toast.success(result.message || "Visa package created");
//       setIsModalOpen(false);
//       setFormData(null);
//       reset();
//     } catch (error) {
//       console.error(error);
//       toast.error("Server error");
//     }
//   };

//   return (
//     <>
//       <div className="max-w-7xl mx-auto p-6 rounded-2xl shadow-xl border my-6">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-red-900 border-b-3 border-red-600 pb-3 inline-block">
//             Create Visa Package
//           </h1>
//           <p className="text-red-600 mt-2">
//             Fill in the details to create a new visa package
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
//           {/* Basic Information */}
//           <div className="bg-white rounded-xl p-6 border border-red-200 shadow-sm hover:shadow-md transition-shadow z-999">
//             <h2 className="text-xl font-semibold text-red-800 border-l-4 border-red-600 pl-3 mb-5">
//               Basic Information
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//               <div>
//                 <label className="block text-sm font-medium text-red-800 mb-2">
//                   Country <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   {...register("country", { required: "Country is required" })}
//                   placeholder="e.g., Malaysia, Singapore, Thailand"
//                   className="w-full px-4 py-2.5 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-red-50/30"
//                 />
//                 {errors.country && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.country.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-red-800 mb-2">
//                   Visa Type <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   {...register("visaType", {
//                     required: "visa type is required",
//                   })}
//                   placeholder="e.g., 3-5 working days"
//                   className="w-full px-4 py-2.5 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-red-50/30"
//                 />
//                 {errors.visaType && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.visaType.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-red-800 mb-2">
//                   Processing Time <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   {...register("processingTime", {
//                     required: "Processing time is required",
//                   })}
//                   placeholder="e.g., 3-5 working days"
//                   className="w-full px-4 py-2.5 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-red-50/30"
//                 />
//                 {errors.processingTime && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.processingTime.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Pricing */}
//           <div className="bg-white rounded-xl p-6 border border-red-200 shadow-sm hover:shadow-md transition-shadow">
//             <h2 className="text-xl font-semibold text-red-800 border-l-4 border-red-600 pl-3 mb-5">
//               Pricing & Validity
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//               <div>
//                 <label className="block text-sm font-medium text-red-800 mb-2">
//                   B2B Price ($) <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   {...register("pricing.b2b", {
//                     required: "B2B price is required",
//                     min: { value: 0, message: "Price cannot be negative" },
//                   })}
//                   placeholder="0.00"
//                   className="w-full px-4 py-2.5 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-red-50/30"
//                 />
//                 {errors.pricing?.b2b && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.pricing.b2b.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-red-800 mb-2">
//                   B2C Price ($) <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   {...register("pricing.b2c", {
//                     required: "B2C price is required",
//                     min: { value: 0, message: "Price cannot be negative" },
//                   })}
//                   placeholder="0.00"
//                   className="w-full px-4 py-2.5 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-red-50/30"
//                 />
//                 {errors.pricing?.b2c && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.pricing.b2c.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-red-800 mb-2">
//                   Validity <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   {...register("validity", {
//                     required: "Validity is required",
//                   })}
//                   placeholder="e.g., 6 months single entry"
//                   className="w-full px-4 py-2.5 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-red-50/30"
//                 />
//                 {errors.validity && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.validity.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Document Sections */}
//           {[
//             {
//               title: "Basic Documents",
//               name: "basicDocuments" as const,
//               fields: basicFields,
//               append: appendBasic,
//               remove: removeBasic,
//               required: true,
//             },
//             {
//               title: "Business Documents",
//               name: "businessDocuments" as const,
//               fields: businessFields,
//               append: appendBusiness,
//               remove: removeBusiness,
//             },
//             {
//               title: "Job Holder Documents",
//               name: "jobHolderDocuments" as const,
//               fields: jobFields,
//               append: appendJob,
//               remove: removeJob,
//             },
//             {
//               title: "Student Documents",
//               name: "studentDocuments" as const,
//               fields: studentFields,
//               append: appendStudent,
//               remove: removeStudent,
//             },
//             {
//               title: "Couple Documents",
//               name: "coupleDocuments" as const,
//               fields: coupleFields,
//               append: appendCouple,
//               remove: removeCouple,
//             },
//           ].map(
//             (section: {
//               title: string;
//               name: DocumentField;
//               fields: any;
//               append: any;
//               remove: any;
//               required?: boolean;
//             }) => (
//               <div
//                 key={section.name}
//                 className="bg-white rounded-xl p-6 border border-red-200 shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <h2 className="text-xl font-semibold text-red-800 border-l-4 border-red-600 pl-3 mb-5">
//                   {section.title}{" "}
//                   {section.required && (
//                     <span className="text-red-500 text-sm ml-1">*</span>
//                   )}
//                 </h2>

//                 <div className="space-y-3">
//                   {section.fields.map((field: any, idx: number) => (
//                     <div
//                       key={field.id}
//                       className="flex gap-3 items-center group"
//                     >
//                       <input
//                         {...register(`${section.name}.${idx}` as const)}
//                         placeholder={`Enter ${section.title.toLowerCase().slice(0, -1)}`}
//                         className="flex-1 px-4 py-2.5 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-red-50/30"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => section.remove(idx)}
//                         className="p-2.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
//                         title="Remove"
//                       >
//                         <X size={18} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => section.append("")}
//                   className="mt-4 px-5 py-2.5 rounded-lg border-2 border-dashed border-red-300 text-red-700 hover:border-red-500 hover:bg-red-50 transition-all inline-flex items-center gap-2 font-medium"
//                 >
//                   <Plus size={18} /> Add Document
//                 </button>
//               </div>
//             ),
//           )}

//           {/* Other Information with Quill */}
//           <div className="bg-white rounded-xl p-6 border border-red-200 shadow-sm hover:shadow-md transition-shadow">
//             <h2 className="text-xl font-semibold text-red-800 border-l-4 border-red-600 pl-3 mb-5">
//               Other Information
//             </h2>
//             <div className="quill-wrapper">
//               <Editor
//                 onChange={(value: any) => setValue("otherInformation", value)}
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-start pt-4 z-999">
//             <button
//               type="submit"
//               className="px-8 py-3 bg-linear-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl shadow-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-3"
//             >
//               <Save size={20} /> Create Visa Package
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Review Modal */}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div className="p-2">
//           <div className="flex items-center gap-3 mb-6">
//             <FileText className="text-red-600" size={28} />
//             <h2 className="text-2xl font-bold text-red-900">
//               Review Visa Package
//             </h2>
//           </div>

//           {formData && (
//             <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-red-50 p-4 rounded-lg">
//                   <p className="text-sm text-red-600 font-medium">Country</p>
//                   <p className="text-lg font-semibold text-gray-800">
//                     {formData.country}
//                   </p>
//                 </div>
//                 <div className="bg-red-50 p-4 rounded-lg">
//                   <p className="text-sm text-red-600 font-medium">Visa Type</p>
//                   <p className="text-lg font-semibold text-gray-800">
//                     {formData.visaType}
//                   </p>
//                 </div>
//                 <div className="bg-red-50 p-4 rounded-lg">
//                   <p className="text-sm text-red-600 font-medium">
//                     Processing Time
//                   </p>
//                   <p className="text-lg font-semibold text-gray-800">
//                     {formData.processingTime}
//                   </p>
//                 </div>
//                 <div className="bg-red-50 p-4 rounded-lg">
//                   <p className="text-sm text-red-600 font-medium">Validity</p>
//                   <p className="text-lg font-semibold text-gray-800">
//                     {formData.validity}
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-red-50 p-4 rounded-lg">
//                   <p className="text-sm text-red-600 font-medium">B2B Price</p>
//                   <p className="text-lg font-semibold text-gray-800">
//                     ${formData.pricing.b2b}
//                   </p>
//                 </div>
//                 <div className="bg-red-50 p-4 rounded-lg">
//                   <p className="text-sm text-red-600 font-medium">B2C Price</p>
//                   <p className="text-lg font-semibold text-gray-800">
//                     ${formData.pricing.b2c}
//                   </p>
//                 </div>
//               </div>

//               {Object.entries(formData).map(([key, value]) => {
//                 if (
//                   Array.isArray(value) &&
//                   value.length > 0 &&
//                   value[0].value !== ""
//                 ) {
//                   return (
//                     <div key={key} className="bg-red-50 p-4 rounded-lg">
//                       <p className="text-sm text-red-600 font-medium mb-2">
//                         {key.replace(/([A-Z])/g, " $1").trim()}
//                       </p>
//                       <ul className="list-disc list-inside space-y-1">
//                         {value.map((item, idx) => (
//                           <li key={idx} className="text-gray-700">
//                             {item.value}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   );
//                 }
//                 return null;
//               })}

//               {formData.otherInformation && (
//                 <div className="bg-red-50 p-4 rounded-lg">
//                   <p className="text-sm text-red-600 font-medium mb-2">
//                     Other Information
//                   </p>
//                   <div
//                     className="prose max-w-none text-gray-700"
//                     dangerouslySetInnerHTML={{
//                       __html: formData.otherInformation,
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           )}

//           <div className="flex gap-3 justify-end mt-8 pt-4 border-t border-red-200">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="px-6 py-2.5 rounded-lg border-2 border-red-200 text-red-700 hover:bg-red-50 transition-colors font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={confirmSubmit}
//               className="px-6 py-2.5 bg-linear-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-medium shadow-md"
//             >
//               Confirm & Submit
//             </button>
//           </div>
//         </div>
//       </Modal>

//       <style jsx>{`
//         .quill-wrapper :global(.ql-container) {
//           min-height: 150px;
//           border-bottom-left-radius: 0.5rem;
//           border-bottom-right-radius: 0.5rem;
//           border-color: #fee2e2;
//         }
//         .quill-wrapper :global(.ql-toolbar) {
//           border-top-left-radius: 0.5rem;
//           border-top-right-radius: 0.5rem;
//           border-color: #fee2e2;
//           background-color: #fef2f2;
//         }
//         .quill-wrapper :global(.ql-container.ql-snow) {
//           border-color: #fee2e2;
//         }
//         .quill-wrapper :global(.ql-editor) {
//           min-height: 150px;
//         }
//         .quill-wrapper :global(.ql-picker-label) {
//           color: #991b1b;
//         }
//       `}</style>
//     </>
//   );
// };

// export default VisaPackageForm;

"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import {
  X,
  Plus,
  Save,
  FileText,
  Globe,
  Clock,
  DollarSign,
  Calendar,
  FileCheck,
} from "lucide-react";
import Editor from "./Editor";
import { toast } from "sonner";

type DocItem = {
  value: string;
};

interface IVisaPackage {
  country: string;
  visaType: string;
  processingTime: string;
  pricing: {
    b2b: number;
    b2c: number;
  };
  validity: string;
  basicDocuments: DocItem[];
  businessDocuments?: DocItem[];
  jobHolderDocuments?: DocItem[];
  studentDocuments?: DocItem[];
  coupleDocuments?: DocItem[];
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl transition-all animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const VisaPackageForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<VisaPackageFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
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
      basicDocuments: [{ value: "" }],
      businessDocuments: [{ value: "" }],
      jobHolderDocuments: [{ value: "" }],
      studentDocuments: [{ value: "" }],
      coupleDocuments: [{ value: "" }],
      otherInformation: "",
    },
  });

  // Field arrays for dynamic document lists
  const {
    fields: basicFields,
    append: appendBasic,
    remove: removeBasic,
  } = useFieldArray({ control, name: "basicDocuments" });

  const {
    fields: businessFields,
    append: appendBusiness,
    remove: removeBusiness,
  } = useFieldArray({ control, name: "businessDocuments" });

  const {
    fields: jobFields,
    append: appendJob,
    remove: removeJob,
  } = useFieldArray({ control, name: "jobHolderDocuments" });

  const {
    fields: studentFields,
    append: appendStudent,
    remove: removeStudent,
  } = useFieldArray({ control, name: "studentDocuments" });

  const {
    fields: coupleFields,
    append: appendCouple,
    remove: removeCouple,
  } = useFieldArray({ control, name: "coupleDocuments" });

  const onSubmit: SubmitHandler<VisaPackageFormData> = (data) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  const confirmSubmit = async () => {
    if (!formData) return;

    setIsSubmitting(true);

    // Fix: Properly handle document fields - filter out empty values
    const transformedData = {
      ...formData,
      pricing: {
        b2b: Number(formData.pricing.b2b),
        b2c: Number(formData.pricing.b2c),
      },
      basicDocuments: formData.basicDocuments
        .filter((doc) => doc.value && doc.value.trim() !== "")
        .map((doc) => doc.value),
      businessDocuments:
        formData.businessDocuments
          ?.filter((doc) => doc.value && doc.value.trim() !== "")
          .map((doc) => doc.value) || [],
      jobHolderDocuments:
        formData.jobHolderDocuments
          ?.filter((doc) => doc.value && doc.value.trim() !== "")
          .map((doc) => doc.value) || [],
      studentDocuments:
        formData.studentDocuments
          ?.filter((doc) => doc.value && doc.value.trim() !== "")
          .map((doc) => doc.value) || [],
      coupleDocuments:
        formData.coupleDocuments
          ?.filter((doc) => doc.value && doc.value.trim() !== "")
          .map((doc) => doc.value) || [],
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/visa-rate/api/v1/create`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(transformedData),
        },
      );

      const result = await res.json();

      console.log({ result, transformedData });

      if (!result.success) {
        toast.error(result.message || "Something went wrong");
        return;
      }

      toast.success(result.message || "Visa package created successfully");
      setIsModalOpen(false);
      setFormData(null);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Server error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const DocumentSection = ({
    title,
    name,
    fields,
    append,
    remove,
    required = false,
  }: {
    title: string;
    name: DocumentField;
    fields: any[];
    append: (value: DocItem | DocItem[]) => void;
    remove: (index: number) => void;
    required?: boolean;
  }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-red-200 transition-all duration-200">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <FileCheck size={20} className="text-red-600" />
        {title}
        {required && (
          <span className="text-red-500 text-sm font-normal">(Required)</span>
        )}
      </h3>

      <div className="space-y-3">
        {fields.map((field, idx) => (
          <div key={field.id} className="flex gap-2 items-start">
            <input
              {...register(`${name}.${idx}.value` as any)}
              placeholder={`Enter ${title.toLowerCase().replace(/ documents$/, "")} requirement`}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-sm"
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(idx)}
                className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ value: "" })}
        className="mt-4 text-sm font-medium text-red-600 hover:text-red-700 inline-flex items-center gap-1.5 transition-colors"
      >
        <Plus size={16} /> Add requirement
      </button>
    </div>
  );

  const documentSections = [
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
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create Visa Package
            </h1>
            <p className="mt-2 text-gray-600">
              Configure visa details, pricing, and requirements
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Globe size={20} className="text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Basic Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Enter the core visa details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("country", {
                      required: "Country is required",
                    })}
                    placeholder="e.g., Malaysia, Singapore"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-sm"
                  />
                  {errors.country && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Visa Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("visaType", {
                      required: "Visa type is required",
                    })}
                    placeholder="e.g., Tourist, Business"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-sm"
                  />
                  {errors.visaType && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.visaType.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Processing Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("processingTime", {
                      required: "Processing time is required",
                    })}
                    placeholder="e.g., 3-5 working days"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-sm"
                  />
                  {errors.processingTime && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.processingTime.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-50 rounded-lg">
                  <DollarSign size={20} className="text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Pricing & Validity
                  </h2>
                  <p className="text-sm text-gray-500">
                    Set pricing structure and validity period
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    B2B Price (USD) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      {...register("pricing.b2b", {
                        required: "B2B price is required",
                        min: { value: 0, message: "Price cannot be negative" },
                      })}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-sm"
                    />
                  </div>
                  {errors.pricing?.b2b && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.pricing.b2b.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    B2C Price (USD) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      {...register("pricing.b2c", {
                        required: "B2C price is required",
                        min: { value: 0, message: "Price cannot be negative" },
                      })}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-sm"
                    />
                  </div>
                  {errors.pricing?.b2c && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.pricing.b2c.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Validity <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar
                      size={16}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                    <input
                      {...register("validity", {
                        required: "Validity is required",
                      })}
                      placeholder="e.g., 6 months single entry"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all text-sm"
                    />
                  </div>
                  {errors.validity && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.validity.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Document Sections */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-50 rounded-lg">
                  <FileCheck size={20} className="text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Required Documents
                  </h2>
                  <p className="text-sm text-gray-500">
                    Specify documents needed for different applicant types
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {documentSections.map((section) => (
                  <DocumentSection key={section.name} {...section} />
                ))}
              </div>
            </div>

            {/* Other Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-50 rounded-lg">
                  <FileText size={20} className="text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Additional Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Add any extra details or notes
                  </p>
                </div>
              </div>

              <Editor
                onChange={(value: string) =>
                  setValue("otherInformation", value)
                }
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 focus:ring-4 focus:ring-red-100 transition-all duration-200 inline-flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <Save size={18} />
                Review & Create Package
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Review Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-50 rounded-lg">
              <FileText size={24} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Review Visa Package
            </h2>
          </div>

          {formData && (
            <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-2">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Country
                  </p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {formData.country}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Visa Type
                  </p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {formData.visaType}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Processing Time
                  </p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {formData.processingTime}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Validity
                  </p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {formData.validity}
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    B2B Price
                  </p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    ${formData.pricing.b2b}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    B2C Price
                  </p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    ${formData.pricing.b2c}
                  </p>
                </div>
              </div>

              {/* Documents - Fixed to show only non-empty documents */}
              {Object.entries(formData).map(([key, value]) => {
                if (
                  Array.isArray(value) &&
                  value.some((item) => item.value && item.value.trim() !== "")
                ) {
                  return (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/Documents$/, " Documents")
                          .trim()}
                      </p>
                      <ul className="space-y-1.5">
                        {value
                          .filter(
                            (item) => item.value && item.value.trim() !== "",
                          )
                          .map((item, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-700 flex items-start gap-2"
                            >
                              <span className="text-red-500 mt-1">•</span>
                              {item.value}
                            </li>
                          ))}
                      </ul>
                    </div>
                  );
                }
                return null;
              })}

              {/* Other Information */}
              {formData.otherInformation &&
                formData.otherInformation.trim() !== "" && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      Additional Information
                    </p>
                    <div
                      className="prose prose-sm max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: formData.otherInformation,
                      }}
                    />
                  </div>
                )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Edit Details
            </button>
            <button
              onClick={confirmSubmit}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Confirm & Create
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VisaPackageForm;
