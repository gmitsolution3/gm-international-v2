"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import Swal from "sweetalert2";

interface Step4Props {
  // formData: any
  onPrevious: () => void;
}

export default function Step4({ onPrevious }: Step4Props) {
  const { handleSubmit } = useFormContext();
  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const fullData = {
      ...data,
      createdBy: session?.user?.email,
      createdAt: new Date().toISOString(),
      applicationStatus: "pending",
      paymentStatus: "pending",
    };
    const res = await fetch(
      "https://gm-international-server-gamma.vercel.app/submit-visa-application",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullData),
      }
    );

    const result = await res.json();
    if (result.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Application Submitted",
        text: "Your visa application has been submitted successfully!",
      });
      router.push("/visa");
      return;
    }

    Swal.fire({
      icon: "error",
      title: "Submission Failed",
      text: "There was an error submitting your application. Please try again.",
    });
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center sm:text-left">
        Application <span className="text-red-500">Submitted</span>
      </h1>

      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 sm:p-8 mb-8 sm:mb-12">
        <p className="text-green-700 text-center sm:text-left text-lg font-semibold">
          ✓ We get your application for submit press Submit Application button
          below.
        </p>
      </div>

      <Button
        onClick={onPrevious}
        variant="outline"
        className="w-full sm:w-auto px-8 py-2.5 rounded-full font-semibold text-base"
      >
        ← Go Back
      </Button>
      <Button onClick={handleSubmit(onSubmit)}>Submit Application</Button>
    </div>
  );
}
