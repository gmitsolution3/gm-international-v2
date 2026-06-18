import React from "react";
import PaymentClient from "../components/PaymentClient";

interface PageProps {
  searchParams: Promise<{
    id: string;
  }>;
}

type Payment = "Nagad" | "bKash" | "Bank";

const appointmentFound = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-application/api/v1/get-single/${id}`,
    { cache: "no-store" },
  );
  if (!res.ok) {
    return { success: false, message: "Something was wrong!!" };
  }

  return res.json();
};

const PaymentPage = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams;

  const result = await appointmentFound(id);

  if (!result?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">Appointment not found or invalid ID</p>
        </div>
      </div>
    );
  }

  const paymentMethod: Payment = result?.data?.paymentMethod;

  return (
    <PaymentClient
      appointmentData={result.data}
      paymentMethod={paymentMethod}
    />
  );
};

export default PaymentPage;