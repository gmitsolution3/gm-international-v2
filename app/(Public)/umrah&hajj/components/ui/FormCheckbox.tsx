// components/ui/FormCheckbox.tsx
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface FormCheckboxProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  className?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  name,
  register,
  className = "",
}) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <input
        type="checkbox"
        id={name}
        {...register(name)}
        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
      />
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 cursor-pointer select-none"
      >
        {label}
      </label>
    </div>
  );
};

export default FormCheckbox;
