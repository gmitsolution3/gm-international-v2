"use client";

import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { ChevronDown } from "lucide-react";

interface Step1Props {
  onNext: () => void;
}

const countries = [
  { value: "china", label: "China" },
  { value: "australia", label: "Australia" },
  { value: "malaysia", label: "Malaysia" },
];

const visaTypes = [
  { value: "tourist", label: "Tourist Visa" },
  { value: "business", label: "Business Visa" },
  { value: "scholarship", label: "Student Visa" },
  { value: "Medical", label: "Medical Visa" },
];

export default function Step1({ onNext }: Step1Props) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const country = watch("country");
  const visaType = watch("visaType");
  const isFormComplete = !!country && !!visaType;

  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center sm:text-left">
        Select <span className="text-red-500">country and visa type</span>
      </h1>

      <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
        {/* Country icon */}
        <div className="flex justify-start md:justify-center w-full">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-full flex items-center justify-center">
            <img
              src="https://i.postimg.cc/prJ5HkXk/Frame-1618871795.png"
              alt="global"
              className="w-20 h-20 sm:w-12 sm:h-12 md:w-20 md:h-20 text-red-500"
            />
          </div>
        </div>

        {/* Visa type icon */}
        <div className="flex justify-start md:justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-4xl flex items-center justify-center">
            <img
              src="https://i.postimg.cc/sDBCbx6G/Frame-1618871796.png"
              alt="visa_type"
              className="w-10 h-10 sm:w-12 sm:h-12 text-red-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {/* Country select - native HTML select */}
        <div className="relative  border border-red-700 rounded-xl">
          <select
            {...register("country", { required: true })}
            defaultValue=""
            className="w-full h-12 sm:h-14 bg-slate-100 border-none text-slate-700 text-base px-4 rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <option value="" disabled>
              Country
            </option>
            {countries.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        </div>

        {/* Visa type select - native HTML select */}
        <div className="relative border border-red-700 rounded-xl">
          <select
            {...register("visaType", { required: true })}
            defaultValue=""
            className="w-full h-12 sm:h-14 bg-slate-100 border-none text-slate-700 text-base px-4 rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <option value="" disabled>
              Select visa type
            </option>
            {visaTypes.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onNext}
          disabled={!isFormComplete}
          className="bg-[#CA2328] hover:bg-red-600 text-white px-10 py-6 rounded-full text-base sm:text-lg md:text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </Button>
      </div>
    </div>
  );
}