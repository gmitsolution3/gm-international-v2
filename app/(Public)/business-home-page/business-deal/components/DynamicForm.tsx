"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ServiceConfig } from "../types/form.types";
import { commonFields } from "../utils/formConfig";
import FormFields from "./FormFields";
import Swal from "sweetalert2";

interface DynamicFormProps {
  serviceConfig: ServiceConfig;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ serviceConfig }) => {
  const methods = useForm();
  const allFields = [...commonFields, ...serviceConfig.fields];

  const onSubmit = async (data: any) => {
    console.log("Form Data:", data);

    // Handle file uploads
    // const formData = new FormData();
    // Object.keys(data).forEach((key) => {
    //   if (data[key] instanceof FileList) {
    //     Array.from(data[key]).forEach((file) => {
    //       formData.append(key, file);
    //     });
    //   } else {
    //     formData.append(key, data[key]);
    //   }
    // });

    try {
      //   API call example
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/submit-business-deal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      //   console.log({formData: formData})

      if (response.ok) {
        Swal.fire({
          title: "Your Form has been submitted",
          icon: "success",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  const [before, after] = serviceConfig.title.split("-");

  return (
    <FormProvider {...methods}>
      <div className="text-center my-5">
        {/* <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {serviceConfig.title.split("-")}
        </h1> */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {before}-<span className="text-red-700">{after}</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          {serviceConfig.description}
        </p>
      </div>

      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 ">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 ">
          {/* Service Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <span className="text-3xl sm:text-4xl">{serviceConfig.icon}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {serviceConfig.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {serviceConfig.description}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6 grid grid-cols-2 gap-2">
            <FormFields fields={allFields} />
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              Submit Application
            </button>
            <button
              type="button"
              onClick={() => methods.reset()}
              className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm sm:text-base"
            >
              Reset Form
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default DynamicForm;
