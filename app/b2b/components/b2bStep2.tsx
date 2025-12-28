"use client";
import React, { useState } from "react";
import {
  Building2,
  MapPin,
  FileText,
  Calendar,
  Phone,
  Globe,
  Facebook,
  Users,
  Briefcase,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface FormData {
  organizationName: string;
  officeAddress: string;
  tradeLicenseNumber: string;
  issueDate: string;
  businessStartDate: string;
  officeSize: string;
  tinNumber: string;
  mobileNumber: string;
  branchOfficeCount: string;
  website: string;
  facebookPage: string;
}

interface Field {
  label: string;
  name: keyof FormData;
  icon: React.ElementType;
  placeholder: string;
  span: string;
  type?: string;
}

const fields: Field[] = [
  {
    label: "Organization’s Name",
    name: "organizationName",
    icon: Building2,
    placeholder: "Organization Name",
    span: "md:col-span-1",
  },
  {
    label: "Office Address",
    name: "officeAddress",
    icon: MapPin,
    placeholder: "Office Address",
    span: "md:col-span-1",
  },
  {
    label: "Trade License Number",
    name: "tradeLicenseNumber",
    icon: FileText,
    placeholder: "Trade License Number",
    span: "md:col-span-1",
  },
  {
    label: "Issue Date",
    name: "issueDate",
    icon: Calendar,
    placeholder: "YYYY-MM-DD",
    span: "md:col-span-1",
    type: "date",
  },
  {
    label: "Business Start Date",
    name: "businessStartDate",
    icon: Calendar,
    placeholder: "YYYY-MM-DD",
    span: "md:col-span-1",
    type: "date",
  },
  {
    label: "Size of Office",
    name: "officeSize",
    icon: Briefcase,
    placeholder: "e.g. 1200 sq ft",
    span: "md:col-span-1",
  },
  {
    label: "TIN Number",
    name: "tinNumber",
    icon: FileText,
    placeholder: "TIN Number",
    span: "md:col-span-1",
  },
  {
    label: "Mobile Number",
    name: "mobileNumber",
    icon: Phone,
    placeholder: "+880...",
    span: "md:col-span-1",
    type: "tel",
  },
  {
    label: "Number of Branch Office",
    name: "branchOfficeCount",
    icon: Users,
    placeholder: "Number of Branch Office",
    span: "md:col-span-1",
  },
  {
    label: "Organization Website",
    name: "website",
    icon: Globe,
    placeholder: "https://example.com",
    span: "md:col-span-1",
  },
  {
    label: "Facebook Page Link",
    name: "facebookPage",
    icon: Facebook,
    placeholder: "Facebook Page URL",
    span: "md:col-span-1",
  },
];

interface Step2Props {
  onPrevious: () => void;
}

const B2BStep2 = ({ onPrevious }: Step2Props) => {
  const { register, handleSubmit, reset } = useFormContext();
  const { data: session } = useSession();
  const router = useRouter();
  const [focused, setFocused] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    const fullData = {
      ...data,
      createdBy: session?.user?.email,
      createdAt: new Date().toISOString(),
      applicationStatus: "pending",
    };

    const res = await fetch(
      "https://gm-international-server-gamma.vercel.app/b2b-application-submit",
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
      reset();
      router.push("/b2b");
      return;
    }

    Swal.fire({
      icon: "error",
      title: "Submission Failed",
      text: "There was an error submitting your application. Please try again.",
    });
  };

  const getShadow = (active: boolean) =>
    active
      ? {
          boxShadow:
            "0 0 0 4px rgba(202, 35, 40, 0.1), 0 10px 25px rgba(202, 35, 40, 0.2)",
        }
      : { boxShadow: "0 2px 8px rgba(0,0,0,0.08)" };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl p-6 sm:p-8">
        <h1 className="my-4 text-2xl font-bold">Company Information</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field, i) => {
            const Icon = field.icon;
            const isFocused = focused === field.name;

            return (
              <div key={i} className={`${field.span}`}>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <Icon size={18} className="text-slate-600" />
                  {field.label}
                </label>

                <div className="relative">
                  <input
                    {...register(field.name, { required: true })}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                    className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all duration-300
                      ${
                        isFocused
                          ? "border-red-500"
                          : "border-slate-200 hover:border-slate-300"
                      }
                    `}
                    style={getShadow(isFocused)}
                  />

                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-linear-to-r from-red-400 to-red-500 rounded-full transition-all duration-300
                      ${isFocused ? "w-full" : "w-0"}
                    `}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="my-5 flex flex-col md:flex-row gap-5">
          <Button
            onClick={onPrevious}
            variant="outline"
            className="w-full sm:w-auto px-8 py-2.5 rounded-full font-semibold text-base"
          >
            ← Previous
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>Submit Application</Button>
        </div>
      </div>
    </div>
  );
};

export default B2BStep2;
