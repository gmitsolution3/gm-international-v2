"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { FieldConfig } from "../types/form.types";

interface FormFieldsProps {
  fields: FieldConfig[];
}





const FormFields: React.FC<FormFieldsProps> = ({ fields }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

      if (result.secure_url) {
        setValue(name, result.secure_url, { shouldValidate: true });
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
    }
  };


  const renderField = (field: FieldConfig) => {
    const baseClassName =
      "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-base sm:text-sm";

    switch (field.type) {
      case "select":
        return (
          <select
            {...register(field.name, { required: field.required })}
            className={baseClassName}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="flex flex-wrap gap-4">
            {field.options?.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  {...register(field.name, { required: field.required })}
                  value={option.value}
                  className="w-4 h-4 text-red-600"
                />
                <span className="text-sm sm:text-base">{option.label}</span>
              </label>
            ))}
          </div>
        );

      //   case "file":
      //     return (
      //       <input
      //         type="file"
      //         {...register(field.name, { required: field.required })}
      //         className={`${baseClassName} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer`}
      //       />
      //     );

      case "file":
        return (
          <div className="space-y-2">
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, field.name)}
              className={`${baseClassName} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer`}
            />

            {/* hidden input যা actual form value ধরে রাখবে */}
            <input
              type="hidden"
              {...register(field.name, { required: field.required })}
            />
          </div>
        );

      default:
        return (
          <input
            type={field.type}
            {...register(field.name, { required: field.required })}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            className={baseClassName}
          />
        );
    }
  };

  return (
    <>
      {fields.map((field) => (
        <div key={field.name} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
          {errors[field.name] && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {field.label} is required
            </p>
          )}
        </div>
      ))}
    </>
  );
};

export default FormFields;