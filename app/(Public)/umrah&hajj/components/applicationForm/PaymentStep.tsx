// components/steps/PaymentStep.tsx
import { UploadToCloudinary } from "@/app/components/uploadPdf/uploadToCloudinary";
import { FormData } from "@/app/types/UmrahHazz-form-types";
import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import FormSelect from "../ui/FormSelect";
import FormField from "../ui/FormField";
import FileUpload from "../ui/FileUpload";


const PaymentStep = ({ packagePrice }: { packagePrice: number }) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<FormData>();

  const [uploadingPayment, setUploadingPayment] = useState(false);
  const paymentMethod = watch("payment.paymentMethod");
  const paymentStatus = watch("payment.paymentStatus");

  const handlePaymentScreenshot = async (file: File) => {
    setUploadingPayment(true);
    try {
      const url = await UploadToCloudinary(file);
      setValue("payment.image", url, { shouldValidate: true });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload payment screenshot. Please try again.");
    } finally {
      setUploadingPayment(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">
        Payment Information
      </h3>

      {/* Payment Summary */}
      <div className="bg-linear-to-r from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Payment Summary
        </h4>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Package Price:</span>
          <span className="text-2xl font-bold text-red-600">
            ৳ {packagePrice.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Payment Method *"
          name="payment.paymentMethod"
          register={register}
          error={errors.payment?.paymentMethod?.message}
          options={[
            { value: "bkash", label: "bKash" },
            { value: "nagad", label: "Nagad" },
            { value: "bank", label: "Bank Transfer" },
            { value: "cash", label: "Cash" },
          ]}
        />

        <FormSelect
          label="Payment Status *"
          name="payment.paymentStatus"
          register={register}
          error={errors.payment?.paymentStatus?.message}
          options={[
            { value: "pending", label: "Pending" },
            { value: "partial", label: "Partial" },
            { value: "paid", label: "Paid" },
          ]}
        />

        {/* Show TRX ID for mobile banking */}
        {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
          <>
            <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-800 mb-2">
                {paymentMethod === "bkash" ? "bKash" : "Nagad"} Payment Details
              </h5>
              <p className="text-sm text-blue-600 mb-2">
                Send payment to: <strong>01XXXXXXXXX</strong> (
                {paymentMethod === "bkash"
                  ? "bKash Merchant"
                  : "Nagad Merchant"}
                )
              </p>
            </div>
            <FormField
              label="Transaction ID *"
              name="payment.trxId"
              register={register}
              error={errors.payment?.trxId?.message}
              placeholder="Enter transaction ID"
            />
          </>
        )}

        {/* Bank Transfer Details */}
        {paymentMethod === "bank" && (
          <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-2">
              Bank Account Details
            </h5>
            <div className="space-y-1 text-sm text-blue-600">
              <p>Bank: Dutch-Bangla Bank Ltd.</p>
              <p>Account Name: Umrah Travel Agency</p>
              <p>Account Number: XXXX-XXXX-XXXX-XXXX</p>
              <p>Routing Number: XXXXXXX</p>
            </div>
          </div>
        )}

        {/* Payment Screenshot Upload */}
        {(paymentMethod === "bkash" ||
          paymentMethod === "nagad" ||
          paymentMethod === "bank") &&
          paymentStatus !== "pending" && (
            <div className="md:col-span-2">
              <Controller
                name="payment.image"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    label="Payment Screenshot *"
                    accept="image/*"
                    value={field.value || ""}
                    onChange={async (file) => {
                      await handlePaymentScreenshot(file);
                      field.onChange(file);
                    }}
                    error={errors.payment?.image?.message}
                    uploading={uploadingPayment}
                    placeholder="Upload payment screenshot"
                  />
                )}
              />
            </div>
          )}
      </div>

      {/* Cash Payment Note */}
      {paymentMethod === "cash" && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <p className="text-sm text-yellow-700">
            You have selected cash payment. Please visit our office to complete
            the payment.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentStep;
