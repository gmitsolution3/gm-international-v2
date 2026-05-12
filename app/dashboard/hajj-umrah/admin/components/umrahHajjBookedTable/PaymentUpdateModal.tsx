// components/umrahHajjBookedTable/PaymentUpdateModal.tsx
"use client";

import React, { useState } from "react";
import { X, Upload, CreditCard } from "lucide-react";
import { UploadToCloudinary } from "@/app/components/uploadPdf/uploadToCloudinary";

interface Application {
  _id: string;
  applicantInfo: {
    fullName: string;
  };
  payment: {
    paymentMethod: string;
    trxId: string;
    image: string;
    paymentStatus: string;
    paymentPay?: number;
    paymentDue?: number;
  };
  pkgInfo: {
    pkgName: string;
    pkgPrice: number;
  };
}

interface PaymentUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    paymentMethod: string;
    trxId: string;
    paymentStatus: string;
    image?: string | null;
    paymentPay?: number;
    paymentDue?: number;
  }) => void;
  application: Application | null;
  loading: boolean;
}

const PaymentUpdateModal: React.FC<PaymentUpdateModalProps> = ({
  isOpen,
  onSubmit,
  application,
  onClose,
  loading,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [trxId, setTrxId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [paymentPay, setPaymentPay] = useState<number>(0);
  const [paymentDue, setPaymentDue] = useState<number>(0);

  React.useEffect(() => {
    if (application) {
      setPaymentMethod(application.payment.paymentMethod);
      setTrxId(application.payment.trxId);
      setPaymentStatus(application.payment.paymentStatus);
      setImagePreview(application.payment.image);
      setImage(application.payment.image);
      setPaymentPay(application.payment.paymentPay || 0);
      setPaymentDue(
        application.payment.paymentDue ||
          application.pkgInfo.pkgPrice - (application.payment.paymentPay || 0),
      );
    }
  }, [application]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await UploadToCloudinary(file);
      setImagePreview(url);
      setImage(url);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      paymentMethod,
      trxId,
      paymentStatus,
      paymentPay,
      paymentDue:
        application!.pkgInfo.pkgPrice - paymentPay,
      image: image || "",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
    }).format(amount);
  };

  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/10 backdrop-blur-xl bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Update Payment
                </h3>
                <p className="text-sm text-gray-500">
                  {application.applicantInfo.fullName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Application Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Package</p>
                <p className="font-medium text-gray-900">
                  {application.pkgInfo.pkgName}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Total Price</p>
                <p className="font-bold text-red-600">
                  {formatCurrency(application.pkgInfo.pkgPrice)}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              required
            >
              <option value="">Select payment method</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
              <option value="bank">Bank Transfer</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          {/* Transaction ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction ID
            </label>
            <input
              type="text"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              placeholder="Enter transaction ID"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Pay
            </label>
            <input
              type="number"
              value={paymentPay}
              onChange={(e) => setPaymentPay(Number(e.target.value))}
              placeholder="Enter payment amount"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Due
            </label>
            <input
              type="number"
              value={paymentDue}
              readOnly
              placeholder="Enter payment amount"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              required
            />
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["paid", "partial", "unpaid"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setPaymentStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    paymentStatus === status
                      ? status === "paid"
                        ? "bg-green-100 text-green-800 border-2 border-green-500"
                        : status === "partial"
                          ? "bg-orange-100 text-orange-800 border-2 border-orange-500"
                          : "bg-red-100 text-red-800 border-2 border-red-500"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Screenshot */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Screenshot
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-400 transition-colors">
              {imagePreview ? (
                <div className="space-y-3">
                  <img
                    src={imagePreview}
                    alt="Payment proof"
                    className="max-h-40 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview("");
                    }}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove image
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload payment proof
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, JPEG up to 5MB
                  </p>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Payment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentUpdateModal;
