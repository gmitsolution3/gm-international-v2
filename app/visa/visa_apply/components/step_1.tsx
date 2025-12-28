"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

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
  // const isFormComplete = formData.country && formData.visaType
  const {
    setValue,
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
            {/* <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" /> */}
            <img
              src="https://i.postimg.cc/prJ5HkXk/Frame-1618871795.png"
              alt="global"
              className='"w-20 h-20 sm:w-12 sm:h-12 md:w-20 md:h-20 text-red-500" '
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
        {/* Country select */}
        <div>
          {/* value={formData.country} onValueChange= */}
          {/* {(value) => setFormData({ ...formData, country: value })} */}
          <Select
            onValueChange={(value) =>
              setValue("country", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full h-12 sm:h-14 bg-slate-100 border-none text-slate-700 text-base py-8 px-4">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Visa type select */}
        <div>
          <Select
            onValueChange={(value) =>
              setValue("visaType", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full h-12 sm:h-14 bg-slate-100 border-none text-slate-700 text-base py-8 px-4">
              <SelectValue placeholder="Select visa type" />
            </SelectTrigger>
            <SelectContent>
              {visaTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
