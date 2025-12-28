import React, {
  useState,
} from "react";
import {
  Mail,
  Phone,
  User,
  Calendar,
  FileText,
  MapPin,
  BookOpen,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import Swal from "sweetalert2";

interface Step1Props {
  onNext: () => void;
}

// Type definitions
interface FormData {
  name: string;
  email: string;
  fatherName: string;
  motherName: string;
  dob: string;
  nid: string;
  passport: string;
  mobile: string;
  address: string;
  qualification: string;
  presentAddress: string;
}

interface FormField {
  label: string;
  name: keyof FormData;
  icon: React.ElementType;
  placeholder: string;
  span: string;
}

interface InputStyleProps {
  isFocused: boolean;
  boxShadow: string;
}

const fields: FormField[] = [
  {
    label: "Name",
    name: "name",
    icon: User,
    placeholder: "Full Name",
    span: "md:col-span-1",
  },
  {
    label: "Email Address",
    name: "email",
    icon: Mail,
    placeholder: "your@email.com",
    span: "md:col-span-1",
  },
  {
    label: "Father's Name",
    name: "fatherName",
    icon: Users,
    placeholder: "Father's Name",
    span: "md:col-span-1",
  },
  {
    label: "Mother's Name",
    name: "motherName",
    icon: Users,
    placeholder: "Mother's Name",
    span: "md:col-span-1",
  },
  {
    label: "Date of birth",
    name: "dob",
    icon: Calendar,
    placeholder: "YYYY-MM-DD",
    span: "md:col-span-1",
  },
  {
    label: "NID Number",
    name: "nid",
    icon: FileText,
    placeholder: "NID Number",
    span: "md:col-span-1",
  },
  {
    label: "Passport Number",
    name: "passport",
    icon: FileText,
    placeholder: "Passport Number",
    span: "md:col-span-1",
  },
  {
    label: "Mobile Number",
    name: "mobile",
    icon: Phone,
    placeholder: "+880...",
    span: "md:col-span-1",
  },
  {
    label: "Permanent Address",
    name: "address",
    icon: MapPin,
    placeholder: "Full Address",
    span: "md:col-span-1",
  },
  {
    label: "Present Address",
    name: "presentAddress",
    icon: MapPin,
    placeholder: "Full Present Address ",
    span: "md:col-span-1",
  },
  {
    label: "Educational Qualification",
    name: "qualification",
    icon: BookOpen,
    placeholder: "Your Qualification",
    span: "md:col-span-1",
  },
];

// Component
const B2BStep1 = ({ onNext }: Step1Props) => {
  const [focused, setFocused] = useState<string | null>(null);
  const {
    formState: { isValid },
    register,
    trigger,
  } = useFormContext();
 
  const handleFocus = (fieldName: string): void => {
    setFocused(fieldName);
  };

  const handleBlur = (): void => {
    setFocused(null);
  };

  const methods = useForm({
    mode: "onChange",
  });

  const handleNextWithValidation = async () => {
    const valid = await trigger();

    if (valid) {
      onNext();
    } else {
      Swal.fire({
        icon: "error",
        title: "Form Incomplete!",
        text: "Please fix the errors before going to the next step.",
        confirmButtonColor: "#CA2328",
      });
    }
  };

  const getInputType = (fieldName: keyof FormData): string => {
    switch (fieldName) {
      case "dob":
        return "date";
      case "email":
        return "email";
      case "mobile":
        return "tel";
      default:
        return "text";
    }
  };

  const getShadowStyle = (isFocused: boolean): { boxShadow: string } => {
    return isFocused
      ? {
          boxShadow:
            "0 0 0 4px rgba(202, 35, 40, 0.1), 0 10px 25px rgba(202, 35, 40, 0.2)",
        }
      : { boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" };
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Form Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-8">
          <h1 className="my-4 text-2xl font-bold">Personal Information</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field, index) => {
              const Icon = field.icon;
              const isFocused = focused === field.name;
              //   const hasValue = formData[field.name];

              return (
                <div
                  key={index}
                  className={`${field.span} transition-all duration-300`}
                >
                  <label className="flex text-sm font-semibold text-slate-700 mb-3 items-center gap-2">
                    <Icon size={18} className="text-slate-600" />
                    {field.label}
                  </label>

                  <div className="relative">
                    <input
                      {...register(field.name, { required: true })}
                      type={getInputType(field.name)}
                      onFocus={() => handleFocus(field.name)}
                      onBlur={handleBlur}
                      placeholder={field.placeholder}
                      className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all duration-300 text-slate-800 placeholder-slate-400
                        ${
                          isFocused
                            ? "border-red-500"
                            : "border-slate-200 hover:border-slate-300"
                        }
                        bg-white
                        `}
                      // || hasValue
                      style={getShadowStyle(isFocused)}
                    />

                    <div
                      className={`absolute bottom-0 left-0 h-1 bg-linear-to-r from-red-400 to-red-500 transition-all duration-300 rounded-full
                        ${isFocused ? "w-full" : "w-0"}
                      `}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Button Section */}
          <div className="my-4">
            <Button
              onClick={handleNextWithValidation}
              disabled={!isValid}
              className="bg-[#CA2328] hover:bg-red-600 text-white px-10 py-6 rounded-full text-base sm:text-lg md:text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-600">
          <p>All fields are required. Please fill them carefully.</p>
        </div>
      </div>
    </div>
  );
};

export default B2BStep1;
