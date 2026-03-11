"use client";

// components/PaymentForm.tsx
import React, { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  Phone,
  Building2,
  Mail,
  MapPin,
  Image as ImageIcon,
  CreditCard,
  Wallet,
  Landmark,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { ServiceConfig } from "../types/form.types";
import FormFields from "./FormFields";
import { toast } from "sonner";
import Image from "next/image";
import Swal from "sweetalert2";
import { ServiceForPricing } from "./service";

interface PriceItem {
  duration: string;
  price: number;
  currency: string;
}

export function parsePricing(text: string): PriceItem[] {
  const matches = text.match(/\d+\s*hour\s*-\s*\d+\s*CNY/gi);

  if (!matches) return [];

  return matches.map((item) => {
    const [durationPart, pricePart] = item.split("-");

    const duration = durationPart.trim();
    const price = parseInt(pricePart.replace(/[^\d]/g, ""));
    const currency = "CNY";

    return { duration, price, currency };
  });
}

// Form validation schema using zod
const formSchema = z
  .object({
    // Personal Info
    f_name: z.string().min(1, "Name is required"),
    phone: z.string().min(11, "Valid phone number is required"),
    c_name: z.string().min(1, "Company name is required"),
    c_email: z.string().email("Valid email is required"),
    c_address: z.string().min(1, "Address is required"),
    p_photo: z.any().optional(),

    // Payment Info
    payment_gateway: z.enum(["1", "2", "3"], {
      message: "Please select a payment gateway",
    }),
    payment_proof_type: z.enum(["t_id", "p_photo"]).optional(),
    transaction_id: z.string().optional(),
    payment_photo: z.any().optional(),
  })
  .refine(
    (data) => {
      if (data.payment_gateway === "1" || data.payment_gateway === "2") {
        return (
          data.payment_proof_type &&
          (data.payment_proof_type === "t_id"
            ? data.transaction_id?.trim()
            : data.payment_photo)
        );
      }
      return true;
    },
    {
      message: "Payment proof is required",
      path: ["payment_proof_type"],
    },
  );

type FormData = z.infer<typeof formSchema>;

interface PaymentFormProps {
  //   onSubmit: (data: FormData) => void;
  serviceConfig: ServiceConfig;
  service: string;
  userEmail: string | null | undefined
}

const DealForm: React.FC<PaymentFormProps> = ({
  serviceConfig,
  service,
  userEmail,
}) => {
  const [showPaymentProof, setShowPaymentProof] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [personalPhotoPreview, setPersonalPhotoPreview] = useState<
    string | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   payment_gateway: "0",
    // },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
  } = methods;

  const selectedGateway = watch("payment_gateway");
  const paymentProofType = watch("payment_proof_type");

  React.useEffect(() => {
    if (
      selectedGateway === "1" ||
      selectedGateway === "2" ||
      selectedGateway === "3"
    ) {
      setShowPaymentProof(true);
    } else {
      setShowPaymentProof(false);
      setValue("payment_proof_type", undefined);
      setValue("transaction_id", "");
      setValue("payment_photo", undefined);
      setPreviewImage(null);
    }
  }, [selectedGateway, setValue]);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "payment" | "personal",
  ) => {
    const file = e.target.files?.[0];
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
      if (!result.secure_url) {
        toast.error("Image not uploaded");
        return;
      }

      if (type === "payment") {
        setValue("payment_photo", result.secure_url);
        setPreviewImage(result.secure_url as string);
      } else {
        setValue("p_photo", result.secure_url);
        setPersonalPhotoPreview(result.secure_url as string);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const clearImage = (type: "payment" | "personal") => {
    if (type === "payment") {
      setPreviewImage(null);
      setValue("payment_photo", undefined);
    } else {
      setPersonalPhotoPreview(null);
      setValue("p_photo", undefined);
    }
  };

  const getGatewayIcon = (value: string) => {
    switch (value) {
      case "1":
        return <Wallet className="w-5 h-5" />;
      case "2":
        return <CreditCard className="w-5 h-5" />;
      case "3":
        return <Landmark className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getGatewayColor = (value: string) => {
    switch (value) {
      case "1":
        return "bg-green-50 border-green-200 text-green-700 hover:bg-green-100";
      case "2":
        return "bg-red-50 border-red-200 text-red-700 hover:bg-red-100";
      case "3":
        return "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100";
      default:
        return "";
    }
  };

  const onSubmit = async (data: any) => {
    const allFormData = methods.getValues();

    const finalData = {
      ...allFormData,
      service: service,
      serviceTitle: serviceConfig.title,
      createdBy: userEmail,
      createdAt: new Date(),
      applicationStatus: "pending"
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/submit-business-deal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        },
      );

      if (response.ok) {
        Swal.fire({
          title: "Your Form has been submitted",
          icon: "success",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
        reset();
        setPreviewImage(null);
        setPersonalPhotoPreview(null);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting form. Please try again.");
    }
  };


  const prices = parsePricing(serviceConfig.title);

  const [before, after] = serviceConfig.title.split("-");


  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Complete Your Payment
          </h2>
          <p className="text-gray-500 mt-2">
            Please fill in your details to proceed with the payment
          </p>
        </div>

        <div className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-linear-to-r from-red-50 to-red-50 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Personal Information
                </h3>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    Full Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register("f_name")}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.f_name
                          ? "border-red-300 bg-red-50 focus:ring-red-500"
                          : "border-gray-200 focus:border-red-500 focus:ring-red-500"
                      } focus:ring-2 focus:outline-none transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.f_name && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.f_name && (
                    <p className="text-sm text-red-600 flex items-center mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.f_name.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    Phone Number <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register("phone")}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.phone
                          ? "border-red-300 bg-red-50 focus:ring-red-500"
                          : "border-gray-200 focus:border-red-500 focus:ring-red-500"
                      } focus:ring-2 focus:outline-none transition-all`}
                      placeholder="+880 1XXX NNNNNN"
                    />
                    {errors.phone && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-600 flex items-center mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                    Company Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    {...register("c_name")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                    placeholder="Company Ltd."
                  />
                  {errors.c_name && (
                    <p className="text-sm text-red-600 flex items-center mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.c_name.message}
                    </p>
                  )}
                </div>

                {/* Company Email */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    Company Email <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    {...register("c_email")}
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                    placeholder="company@example.com"
                  />
                  {errors.c_email && (
                    <p className="text-sm text-red-600 flex items-center mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.c_email.message}
                    </p>
                  )}
                </div>

                {/* Company Address - Full width */}
                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    Company Address <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    {...register("c_address")}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all resize-none"
                    placeholder="123 Business Street, City, Country"
                  />
                  {errors.c_address && (
                    <p className="text-sm text-red-600 flex items-center mt-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.c_address.message}
                    </p>
                  )}
                </div>

                {/* Personal Photo */}
                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <ImageIcon className="w-4 h-4 mr-2 text-gray-400" />
                    Personal Photo
                  </label>
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, "personal")}
                          className="hidden"
                          id="personal-photo"
                        />
                        {uploading ? (
                          <div className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-red-300 rounded-xl bg-red-50">
                            <div className="text-center flex flex-col items-center gap-2">
                              <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
                              <p className="text-sm text-red-600 font-medium">
                                Uploading your photo...
                              </p>
                            </div>
                          </div>
                        ) : (
                          <label
                            htmlFor="personal-photo"
                            className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all cursor-pointer group"
                          >
                            <div className="text-center">
                              <Upload className="w-8 h-8 mx-auto text-gray-400 group-hover:text-red-500 transition-colors" />
                              <p className="mt-2 text-sm text-gray-500 group-hover:text-red-600">
                                Click to upload your photo
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                PNG, JPG up to 5MB
                              </p>
                            </div>
                          </label>
                        )}
                      </div>
                    </div>

                    {personalPhotoPreview && (
                      <div className="relative w-24 h-24">
                        <img
                          src={personalPhotoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-xl border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => clearImage("personal")}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* form dynamic create here */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-linear-to-r from-red-50 to-red-50 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  {before}
                </h3>
              </div>
            </div>
            <div className="space-y-6 grid grid-cols-2 gap-2 p-6">
              <FormFields fields={serviceConfig} />
            </div>
          </div>

          {/* Payment Information Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-linear-to-r from-green-50 to-emerald-50 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Payment Information
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Payment Gateway Selection */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  Select Payment Gateway{" "}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    {
                      value: "1",
                      label: "WeChat Pay",
                      icon: <Wallet className="w-5 h-5" />,
                      color: "red",
                    },
                    {
                      value: "2",
                      label: "Alipay",
                      icon: <CreditCard className="w-5 h-5" />,
                      color: "red",
                    },
                    {
                      value: "3",
                      label: "Bank Transfer",
                      icon: <Landmark className="w-5 h-5" />,
                      color: "red",
                    },
                  ].map((gateway) => (
                    <label
                      key={gateway.value}
                      className={`
                      relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${
                        selectedGateway === gateway.value
                          ? `border-${gateway.color}-500 bg-${gateway.color}-50`
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }
                    `}
                    >
                      <input
                        type="radio"
                        {...register("payment_gateway")}
                        value={gateway.value}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3 w-full">
                        <div
                          className={`
                        p-2 rounded-lg
                        ${
                          selectedGateway === gateway.value
                            ? `bg-${gateway.color}-500 text-white`
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                        >
                          {gateway.icon}
                        </div>
                        <span
                          className={`font-medium ${
                            selectedGateway === gateway.value
                              ? `text-${gateway.color}-700`
                              : "text-gray-700"
                          }`}
                        >
                          {gateway.label}
                        </span>
                      </div>
                      {selectedGateway === gateway.value && (
                        <CheckCircle
                          className={`absolute top-2 right-2 w-5 h-5 text-${gateway.color}-500`}
                        />
                      )}
                    </label>
                  ))}
                </div>
                {errors.payment_gateway && (
                  <p className="text-sm text-red-600 flex items-center mt-2">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.payment_gateway.message}
                  </p>
                )}
              </div>

              {/* Payment Proof Section */}
              {showPaymentProof && (
                <div className="mt-6 flex flex-col md:flex-row justify-around p-6 bg-gray-50 rounded-xl border border-gray-200 animate-fadeIn">
                  {selectedGateway === "1" && (
                    <div>
                      <Image
                        src="https://i.postimg.cc/tg9SCwh0/Whats-App-Image-2026-02-15-at-7-40-57-PM.jpg"
                        width={320}
                        height={320}
                        alt="Payment Image"
                      />
                    </div>
                  )}
                  {selectedGateway === "2" && (
                    <div>
                      <Image
                        src="https://i.postimg.cc/7LgnxQT3/qr-code-jpg.jpg"
                        width={320}
                        height={320}
                        alt="Payment Image"
                      />
                    </div>
                  )}
                  {selectedGateway === "3" && (
                    <>
                      <div className="w-full md:w-105 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                          Bank Transfer Details
                        </h4>

                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Bank Name</span>
                            <span className="font-medium text-gray-800">
                              BANK OF CHINA
                            </span>
                          </div>

                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Account Name</span>
                            <span className="font-medium text-gray-800">
                              ISLAM MD ASHRAFUL
                            </span>
                          </div>

                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Account No</span>
                            <span className="font-medium text-gray-800">
                              275287115044
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-500">Card No</span>
                            <span className="font-medium text-gray-800">
                              6216610200020867143
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                          After sending payment, our team will verify and
                          activate your service.
                        </div>
                      </div>
                      <div className="w-full md:w-105 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                          Bangladesh Bank Transfer Details
                        </h4>

                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Bank Name</span>
                            <span className="font-medium text-gray-800">
                              BRAC Bank PLC
                            </span>
                          </div>

                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Account Name</span>
                            <span className="font-medium text-gray-800">
                              GM International
                            </span>
                          </div>

                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Account No</span>
                            <span className="font-medium text-gray-800">
                              2074848480001
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-500">Branch</span>
                            <span className="font-medium text-gray-800">
                              Mirpur
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                          After sending payment, our team will verify and
                          activate your service.
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    {service === "legal-advice" ? (
                      <ServiceForPricing
                        service={service}
                        title={serviceConfig.title}
                      />
                    ) : (
                      <div className="text-lg text-green-800 p-4 bg-green-200 rounded-2xl my-4 font-bold max-">
                        {after}
                      </div>
                    )}

                    <h4 className="text-md font-semibold text-gray-700 mb-4">
                      Payment Proof for{" "}
                      {selectedGateway === "1" ? "WeChat Pay" : "Alipay"}
                    </h4>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Select Proof Type{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-6">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              {...register("payment_proof_type")}
                              value="t_id"
                              className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                            />
                            <span className="text-sm text-gray-700">
                              Transaction ID
                            </span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              {...register("payment_proof_type")}
                              value="p_photo"
                              className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                            />
                            <span className="text-sm text-gray-700">
                              Payment Screenshot
                            </span>
                          </label>
                        </div>
                      </div>

                      {paymentProofType === "t_id" && (
                        <div className="space-y-2 animate-slideDown">
                          <label className="block text-sm font-medium text-gray-700">
                            Transaction ID{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            {...register("transaction_id")}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                            placeholder="Enter your transaction ID"
                          />
                        </div>
                      )}

                      {paymentProofType === "p_photo" && (
                        <div className="space-y-2 animate-slideDown">
                          <label className="block text-sm font-medium text-gray-700">
                            Upload Payment Screenshot{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-start space-x-4">
                            <div className="flex-1">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageChange(e, "payment")
                                }
                                className="hidden"
                                id="payment-photo"
                              />
                              {uploading ? (
                                <div className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-red-300 rounded-xl bg-red-50">
                                  <div className="text-center flex flex-col items-center gap-2">
                                    <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
                                    <p className="text-sm text-red-600 font-medium">
                                      Uploading your photo...
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <label
                                  htmlFor="payment-photo"
                                  className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all cursor-pointer"
                                >
                                  <div className="text-center">
                                    <Upload className="w-6 h-6 mx-auto text-gray-400" />
                                    <p className="mt-1 text-sm text-gray-500">
                                      Click to upload screenshot
                                    </p>
                                  </div>
                                </label>
                              )}
                            </div>

                            {previewImage && (
                              <div className="relative w-24 h-24 shrink-0">
                                <img
                                  src={previewImage}
                                  alt="Preview"
                                  className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                  type="button"
                                  onClick={() => clearImage("payment")}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className={`
              px-8 py-4 rounded-xl font-semibold text-white
              transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl"
              }
            `}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : (
                "Submit Payment"
              )}
            </button>
          </div>
        </div>

        {/* Add these styles to your global CSS or component */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }

          .animate-slideDown {
            animation: slideDown 0.3s ease-out;
          }
        `}</style>
      </form>
    </FormProvider>
  );
};

export default DealForm;
