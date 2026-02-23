"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  User,
  Phone,
  Mail,
  Calendar,
  Hospital,
  CreditCard,
  Upload,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Copy,
  Check,
  Download,
  Shield,
  Banknote,
  Smartphone,
  Building2,
} from "lucide-react";
import Swal from "sweetalert2";
import Image from "next/image";

interface AppointmentData {
  _id: string;
  patientName: string;
  contactNumber: string;
  email: string;
  hospital: string;
  department: string;
  doctor: string;
  appointmentDate: string;
  appointmentTime: string;
  payment: string;
  paymentStatus: string;
  amount?: number;
}

interface PaymentClientProps {
  appointmentData: AppointmentData;
  paymentMethod: "bKash" | "Nagad" | "Bank";
}

// Bkash QR Code Component
const BkashPayment = ({
  appointmentId,
  amount,
  onSuccess,
}: {
  appointmentId: string;
  amount: number;
  onSuccess: () => void;
}) => {
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const bkashNumber = "01814913378"; // Replace with actual bKash number
  const bkashQRCode = "https://i.postimg.cc/mZ5dXVG9/qr-code-jpg-(1).jpg"; // Replace with actual QR code path

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: "File too large",
          text: "Please upload screenshot less than 5MB",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }
      setScreenshot(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!screenshot || !transactionId) {
      Swal.fire({
        title: "Missing Information",
        text: "Please provide both transaction ID and payment screenshot",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setUploading(true);

    try {
      // Upload screenshot to Cloudinary first
      const formData = new FormData();
      formData.append("file", screenshot);
      formData.append("upload_preset", "pcakge_img_uploade");
      formData.append("cloud_name", "dqyfwfeed");

      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const uploadResult = await uploadRes.json();

      if (!uploadResult.secure_url) {
        throw new Error("Failed to upload screenshot");
      }

      // Update payment status
     const updateRes = await fetch(
       `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/update-medical-payment/${appointmentId}`,
       {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           paymentStatus: "Delivered",
           transactionId: transactionId,
           paymentScreenshot: uploadResult.secure_url,
           paymentMethod: "Bkash",
           paidAt: new Date(),
         }),
       },
     );

      const result = await updateRes.json();

      if (result.success) {
        Swal.fire({
          title: "Payment Successful!",
          text: "Your payment has been verified",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        onSuccess();
      } else {
        throw new Error("Payment update failed");
      }
    } catch (error) {
      Swal.fire({
        title: "Payment Failed",
        text: "Please try again or contact support",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* bKash Number */}
      <div className="bg-linear-to-r from-pink-50 to-red-50 p-6 rounded-2xl border-2 border-pink-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-pink-600 rounded-full p-3">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-pink-700">bKash Payment</h3>
          </div>
          <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-semibold">
            Amount: ৳{amount || 5000}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl">
          <p className="text-sm text-gray-500 mb-2">
            Send money to this bKash number:
          </p>
          <div className="flex items-center justify-between bg-pink-50 p-3 rounded-lg">
            <span className="text-2xl font-bold text-pink-700">
              {bkashNumber}
            </span>
            <button
              onClick={() => copyToClipboard(bkashNumber)}
              className="bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-700 transition-all"
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 text-center">
        <h4 className="text-lg font-semibold mb-4">Scan QR Code to Pay</h4>
        <div className="flex justify-center mb-4">
          <div className="relative w-48 h-48 bg-gray-100 rounded-xl p-4">
            <Image
              src={bkashQRCode}
              alt="bKash QR Code"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <button
          onClick={() => window.open(bkashQRCode, "_blank")}
          className="text-pink-600 hover:text-pink-700 flex items-center gap-2 mx-auto"
        >
          <Download className="w-4 h-4" />
          Download QR Code
        </button>
      </div>

      {/* Transaction Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter bKash transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Screenshot <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all
              ${previewUrl ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-pink-500"}`}
            >
              {previewUrl ? (
                <div className="space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
                  <p className="text-sm text-gray-600">
                    Screenshot uploaded successfully!
                  </p>
                  <button
                    onClick={() => {
                      setScreenshot(null);
                      setPreviewUrl(null);
                    }}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    Click to upload payment screenshot
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={uploading || !screenshot || !transactionId}
          className="w-full bg-linear-to-r from-pink-600 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-700 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {uploading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </div>
          ) : (
            "Confirm Payment"
          )}
        </button>
      </div>
    </div>
  );
};

// Nagad Payment Component
const NagadPayment = ({
  appointmentId,
  amount,
  onSuccess,
}: {
  appointmentId: string;
  amount: number;
  onSuccess: () => void;
}) => {
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const nagadNumber = "01814913378"; // Replace with actual Nagad number

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: "File too large",
          text: "Please upload screenshot less than 5MB",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }
      setScreenshot(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!screenshot || !transactionId) {
      Swal.fire({
        title: "Missing Information",
        text: "Please provide both transaction ID and payment screenshot",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setUploading(true);

    try {
      // Upload screenshot to Cloudinary
      const formData = new FormData();
      formData.append("file", screenshot);
      formData.append("upload_preset", "pcakge_img_uploade");
      formData.append("cloud_name", "dqyfwfeed");

      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const uploadResult = await uploadRes.json();

      if (!uploadResult.secure_url) {
        throw new Error("Failed to upload screenshot");
      }

      // Update payment status
      const updateRes = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/update-medical-payment/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentStatus: "Delivered",
            transactionId: transactionId,
            paymentScreenshot: uploadResult.secure_url,
            paymentMethod: "Nagad",
            paidAt: new Date(),
          }),
        },
      );

      const result = await updateRes.json();

      if (result.success) {
        Swal.fire({
          title: "Payment Successful!",
          text: "Your payment has been verified",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        onSuccess();
      } else {
        throw new Error("Payment update failed");
      }
    } catch (error) {
      Swal.fire({
        title: "Payment Failed",
        text: "Please try again or contact support",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Nagad Number */}
      <div className="bg-linear-to-r from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 rounded-full p-3">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-orange-700">Nagad Payment</h3>
          </div>
          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold">
            Amount: ৳{amount || 5000}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl">
          <p className="text-sm text-gray-500 mb-2">
            Send money to this Nagad number:
          </p>
          <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
            <span className="text-2xl font-bold text-orange-700">
              {nagadNumber}
            </span>
            <button
              onClick={() => copyToClipboard(nagadNumber)}
              className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-all"
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Nagad transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Screenshot <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all
              ${previewUrl ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-orange-500"}`}
            >
              {previewUrl ? (
                <div className="space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
                  <p className="text-sm text-gray-600">
                    Screenshot uploaded successfully!
                  </p>
                  <button
                    onClick={() => {
                      setScreenshot(null);
                      setPreviewUrl(null);
                    }}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    Click to upload payment screenshot
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={uploading || !screenshot || !transactionId}
          className="w-full bg-linear-to-r from-orange-600 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {uploading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </div>
          ) : (
            "Confirm Payment"
          )}
        </button>
      </div>
    </div>
  );
};

// Bank Payment Component
const BankPayment = ({
  appointmentId,
  amount,
  onSuccess,
}: {
  appointmentId: string;
  amount: number;
  onSuccess: () => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

  const bankDetails = {
    bankName: "BRAC Bank PLC",
    accountName: "GM International",
    accountNumber: "2074848480001",
    branch: "Mirpur",
    routingNumber: "123456789",
    swiftCode: "BRACBDDH",
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [field]: true });
    setTimeout(() => setCopied({ ...copied, [field]: false }), 2000);
  };

  const handleSubmit = async () => {
    setUploading(true);

    try {
      const updateRes = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/update-medical-payment/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentStatus: "Delivered",
            paymentMethod: "Bank",
            paidAt: new Date(),
          }),
        },
      );

      const result = await updateRes.json();

      if (result.success) {
        Swal.fire({
          title: "Payment Information Submitted!",
          text: "Your bank payment will be verified within 24 hours",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        onSuccess();
      } else {
        throw new Error("Payment update failed");
      }
    } catch (error) {
      Swal.fire({
        title: "Submission Failed",
        text: "Please try again or contact support",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Bank Details */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-full p-3">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-blue-700">Bank Transfer</h3>
          </div>
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            Amount: ৳{amount || 5000}
          </span>
        </div>

        <div className="bg-white rounded-xl p-6 space-y-4">
          <div className="border-b pb-4">
            <p className="text-2xl font-bold text-blue-800 mb-2">
              {bankDetails.bankName}
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                label: "Account Name",
                value: bankDetails.accountName,
                field: "name",
              },
              {
                label: "Account Number",
                value: bankDetails.accountNumber,
                field: "number",
              },
              { label: "Branch", value: bankDetails.branch, field: "branch" },
              {
                label: "Routing Number",
                value: bankDetails.routingNumber,
                field: "routing",
              },
              {
                label: "SWIFT Code",
                value: bankDetails.swiftCode,
                field: "swift",
              },
            ].map((item) => (
              <div
                key={item.field}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="font-semibold text-gray-800">{item.value}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(item.value, item.field)}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  {copied[item.field] ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg flex gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0" />
            <p className="text-sm text-yellow-700">
              Please include your Appointment ID ({appointmentId}) in the bank
              transfer reference. Payment verification may take up to 24 hours.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={uploading}
        className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50"
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </div>
        ) : (
          "I Have Made the Payment"
        )}
      </button>
    </div>
  );
};

// Main Payment Client Component
const PaymentClient = ({
  appointmentData,
  paymentMethod,
}: PaymentClientProps) => {
  const router = useRouter();
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // const formatTime = (timeString: string) => {
  //   const [hours, minutes] = timeString.split(":");
  //   const hour = parseInt(hours);
  //   const ampm = hour >= 12 ? "PM" : "AM";
  //   const hour12 = hour % 12 || 12;
  //   return `${hour12}:${minutes} ${ampm}`;
  // };

  if (paymentCompleted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Your payment has been processed successfully. You will receive a
            confirmation email shortly.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-linear-to-r from-green-600 to-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-red-50 py-8 px-4 md:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-center text-red-600 mb-8">
          Complete Your Payment
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Appointment Summary
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Patient Name</p>
                    <p className="font-semibold text-gray-800">
                      {appointmentData.patientName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Hospital className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Hospital</p>
                    <p className="font-semibold text-gray-800">
                      {appointmentData.hospital}
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-semibold text-gray-800">
                      {formatDate(appointmentData.appointmentDate)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatTime(appointmentData.appointmentTime)}
                    </p>
                  </div>
                </div> */}

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-semibold text-gray-800">
                      {appointmentData.contactNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800">
                      {appointmentData.email}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-red-600">
                      ৳{appointmentData.amount || 5000}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="w-6 h-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Payment Method
                  </h2>
                </div>
                <div className="bg-red-50 p-4 rounded-xl">
                  <p className="text-red-700 font-medium">
                    Selected Payment Method:{" "}
                    <span className="font-bold">{paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Render appropriate payment component */}
              {paymentMethod === "bKash" && (
                <BkashPayment
                  appointmentId={appointmentData._id}
                  amount={appointmentData.amount || 5000}
                  onSuccess={() => setPaymentCompleted(true)}
                />
              )}

              {paymentMethod === "Nagad" && (
                <NagadPayment
                  appointmentId={appointmentData._id}
                  amount={appointmentData.amount || 5000}
                  onSuccess={() => setPaymentCompleted(true)}
                />
              )}

              {paymentMethod === "Bank" && (
                <BankPayment
                  appointmentId={appointmentData._id}
                  amount={appointmentData.amount || 5000}
                  onSuccess={() => setPaymentCompleted(true)}
                />
              )}

              {/* Payment Status */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Payment Status:</span>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
                    Pending Verification
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Your payment will be verified within 24 hours. You will
                  receive a confirmation email once verified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentClient;
