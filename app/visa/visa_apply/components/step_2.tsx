"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import VisaForm from "./visaForm";
import { useFormContext, useWatch } from "react-hook-form";
import { formConfig } from "../formhandeling/formConfig";
import Swal from "sweetalert2";

interface Step2Props {
  // formData: any;
  // setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}
// formData;
export default function Step2({ onNext, onPrevious }: Step2Props) {
  const {
    watch,
    formState: { errors, isValid },
    trigger,
  } = useFormContext();

  const [visaData, setVisaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // const watchedValues = watch();
  const watchedValues = useWatch();

  // const handleNextWithValidation = async () => {
  //   const valid = await trigger();
  //   if (valid) onNext();
  // };

  useEffect(() => {
    // Validate form whenever watched values change
    const validateForm = async () => {
      const isFormValid = await trigger();
      setIsFormValid(isFormValid);
    };

    validateForm();
  }, [watchedValues]);

  const handleNextWithValidation = async () => {
    // Trigger validation for all fields
    const isValid = await trigger();

    if (isValid) {
      setIsFormValid(true);
      onNext();
    } else {
      setIsFormValid(false);

      Swal.fire({
        icon: "error",
        title: "Form Incomplete!",
        text: "Please fix the errors before going to the next step.",
        confirmButtonColor: "#CA2328",
      });
    }
  };

  const country = watch("country");
  const visaType = watch("visaType");

  // function cn(arg0: string, arg1: string): string | undefined {
  //   throw new Error("Function not implemented.");
  // }

  function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  // useEffect(() => {
  //   const getFormData = async () => {
  //     setIsLoading(true);
  //     if(!country || !visaType) {
  //       return "Country and visaType not found";
  //     }

  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-form-data?country=${country}&visaType=${visaType}`,
  //         {
  //           cache: "no-store",
  //         }
  //       );

  //       const formData = await res.json();

  //       if (!res.ok) throw new Error("Failed to fetch");

  //       setVisaData(formData)
  //
  //     } catch (error) {
  //       console.error(`fiend error ${error}`);
  //     }finally{
  //       setIsLoading(false);
  //     }
  //   };
  //   getFormData();
  // }, [country,visaType]);

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center sm:text-left">
        Fill up the for below to <span className="text-red-500">apply</span>
      </h1>

      <div className="bg-slate-50 rounded-lg p-6 sm:p-8 mb-8 sm:mb-12 min-h-48">
        {/* <VisaForm formData={visaData} isLoading={isLoading} /> */}
        <VisaForm />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="w-full sm:w-auto px-8 py-2.5 rounded-full font-semibold text-base"
        >
          ← Previous
        </Button>
        <Button
          onClick={handleNextWithValidation}
          disabled={!isFormValid}
          className={cn(
            "w-full sm:w-auto px-8 py-2.5 rounded-full font-semibold text-base transition-opacity",
            isFormValid
              ? "bg-red-500 hover:bg-red-600 text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
          )}
        >
          Next →
        </Button>
      </div>

      {!isFormValid && Object.keys(errors).length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-semibold mb-2">
            Please fix the following errors:
          </p>
          <ul className="text-red-600 text-sm space-y-1">
            {Object.entries(errors).map(([fieldName, error]: any) => (
              <li key={fieldName}>• {error.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
