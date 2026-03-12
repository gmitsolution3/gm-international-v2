// components/ServicesPricing.tsx
"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  GraduationCap,
  Globe,
  Award,
  FileText,
  Users,
  BookOpen,
  Languages,
  Plane,
  Briefcase,
  Building,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
} from "lucide-react";

interface Service {
  id: number;
  title: string;
  icon: React.ReactNode;
  description?: string;
}

interface Program {
  degree: string;
  teachingLanguage: string;
  price: string;
  priceUSD: number;
}

export interface AdditionalService {
  id: number;
  service: string;
  price: string;
  note?: string;
}

const ServicesPricing: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("general");
  const [showRegionalAlert, setShowRegionalAlert] = useState<boolean>(false);

  const services: Service[] = [
    {
      id: 1,
      title: "Documentation Assistance",
      icon: <FileText className="w-5 h-5" />,
      description: "Complete support for university documentation",
    },
    {
      id: 2,
      title: "University & Subject Selection",
      icon: <GraduationCap className="w-5 h-5" />,
      description: "Expert guidance for suitable universities",
    },
    {
      id: 3,
      title: "University Applications",
      icon: <Globe className="w-5 h-5" />,
      description: "Hassle-free application process",
    },
    {
      id: 4,
      title: "Interview & Exam Preparation",
      icon: <Award className="w-5 h-5" />,
      description: "Basic preparation for success",
    },
    {
      id: 5,
      title: "Scholarship Guidelines",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Navigate scholarship opportunities",
    },
    {
      id: 6,
      title: "Basic Chinese Foundation",
      icon: <Languages className="w-5 h-5" />,
      description: "Language & cultural preparation",
    },
    {
      id: 7,
      title: "Admission Documents Collection",
      icon: <FileText className="w-5 h-5" />,
      description: "JW202/JW201/DQ forms & admission notice",
    },
    {
      id: 8,
      title: "Student Visa Assistance",
      icon: <Plane className="w-5 h-5" />,
      description: "Complete visa application support",
    },
    {
      id: 9,
      title: "Pre-Departure Grooming",
      icon: <Users className="w-5 h-5" />,
      description: "Chinese education system & culture",
    },
    {
      id: 10,
      title: "Routine Communication",
      icon: <Phone className="w-5 h-5" />,
      description: "Ongoing support during studies",
    },
    {
      id: 11,
      title: "Post-Graduation: Job Assistance",
      icon: <Briefcase className="w-5 h-5" />,
      description: "Career placement support",
    },
    {
      id: 12,
      title: "Post-Graduation: Business Setup",
      icon: <Building className="w-5 h-5" />,
      description: "Establish business in China",
    },
  ];

  const programs: Program[] = [
    {
      degree: "Bachelor",
      teachingLanguage: "English",
      price: "800 USD",
      priceUSD: 800,
    },
    {
      degree: "Masters",
      teachingLanguage: "English",
      price: "1000 USD",
      priceUSD: 1000,
    },
    {
      degree: "PhD",
      teachingLanguage: "English",
      price: "1200 USD",
      priceUSD: 1200,
    },
    {
      degree: "Diploma (Associate Degree)",
      teachingLanguage: "English or Chinese",
      price: "700 USD",
      priceUSD: 700,
    },
    {
      degree: "Chinese Language",
      teachingLanguage: "English or Chinese",
      price: "500 USD",
      priceUSD: 500,
    },
  ];

  const additionalServices: AdditionalService[] = [
    {
      id: 1,
      service: "One to One Interview Training",
      price: "100 USD",
    },
    {
      id: 2,
      service: "CSCA Exam Training",
      price: "100 USD",
      note: "Only for Bachelor Degree Students",
    },
    {
      id: 3,
      service: "Airport Pick up Service",
      price: "60 - 100 USD",
      note: "Depends on city and distance",
    },
    {
      id: 4,
      service: "Assisting for Registration after coming to China",
      price: "100 USD",
    },
  ];

  const specialRegions = [
    "China",
    "Thailand",
    "Malaysia",
    "Australia",
    "Singapore",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="text-white rounded-b-2xl"
        style={{
          background: "linear-gradient(360deg, #301314 0%,#CA2328 100%)",
        }}
      >
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              GM International Services
            </h1>
            <p className="text-lg md:text-xl text-red-100 mb-6">
              Your Complete Guide to Studying in China
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-red-700 rounded-lg px-4 py-2 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                <span>10+ Years Experience</span>
              </div>
              <div className="bg-red-700 rounded-lg px-4 py-2 flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>2000+ Students Placed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Regional Alert */}
        <div
          className={`mb-6 p-4 rounded-lg transition-all cursor-pointer ${
            showRegionalAlert
              ? "bg-orange-50 border border-orange-200"
              : "bg-gray-50"
          }`}
          onClick={() => setShowRegionalAlert(!showRegionalAlert)}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle
                className={`w-5 h-5 ${showRegionalAlert ? "text-orange-500" : "text-gray-400"}`}
              />
              <span className="font-medium">
                Special Regional Pricing Available
              </span>
            </div>
            <ChevronRight
              className={`w-5 h-5 transition-transform ${
                showRegionalAlert ? "rotate-90" : ""
              }`}
            />
          </div>

          {showRegionalAlert && (
            <div className="mt-4 pt-4 border-t border-orange-200">
              <p className="text-gray-600 mb-3">
                Students from the following countries should contact our local
                offices:
              </p>
              <div className="flex flex-wrap gap-2">
                {specialRegions.map((region) => (
                  <span
                    key={region}
                    className="bg-white px-3 py-1 rounded-full text-sm border border-orange-200 flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-red-500" />
                    {region}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Services Grid */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Our Comprehensive Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-red-200"
              >
                <div className="flex items-start gap-3">
                  <div className="text-red-500 group-hover:text-red-600 transition-colors">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">
                      {service.id}. {service.title}
                    </h3>
                    {service.description && (
                      <p className="text-sm text-gray-500">
                        {service.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Table */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Service Charges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100"
              >
                <div
                  className="px-4 py-3"
                  style={{
                    background:
                      "linear-gradient(180deg, #301314 0%,#CA2328 100%)",
                  }}
                >
                  <h3 className="text-white font-bold text-lg">
                    {program.degree}
                  </h3>
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">
                      Teaching Language
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-red-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {program.teachingLanguage}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <div className="text-xs text-gray-500 mb-1">
                      Service Charge
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-red-600">
                        {program.price}
                      </span>
                      <span className="text-xs text-gray-400">
                        one-time fee
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Note */}
          <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
            <p className="text-sm text-red-800">
              <span className="font-bold">Note:</span> The above services and
              service charges are applicable only to students.
            </p>
          </div>
        </div>
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Additional Service and Charges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {additionalServices.map((ser) => (
              <div
                key={ser.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100"
              >
                <div
                  className="px-4 py-3"
                  style={{
                    background:
                      "linear-gradient(180deg, #301314 0%,#CA2328 100%)",
                  }}
                >
                  <h3 className="text-white font-bold text-lg">
                    {ser.service}
                  </h3>
                </div>

                <div className="p-4">
                  <div className="border-t border-gray-100 pt-3">
                    <div className="text-xs text-gray-500 mb-1">
                      Service Charge
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-red-600">
                        {ser.price}
                      </span>
                    </div>
                  </div>
                  {ser.note && (
                    <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
                      <p className="text-sm text-red-800">
                        <span className="font-bold">Note:</span> {ser.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Note */}
        </div>

        <div className="mb-12">
          <div
            className="rounded-2xl p-6 md:p-8 text-white"
            style={{
              background: "linear-gradient(360deg, #301314 0%, #CA2328 100%)",
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Text Section */}
              <div className="max-w-3xl">
                <h3 className="text-xl md:text-2xl font-bold mb-3">
                  Payment Process
                </h3>
                <p className="text-red-100 mb-3 leading-relaxed">
                  At GM International, we offer multiple secure payment options
                  to make the process smooth and convenient for our students.
                </p>

                <p className="text-red-100 mb-3 leading-relaxed">
                  All students must make their payments through{" "}
                  <span className="font-semibold text-white">
                    GM International official payment channels
                  </span>
                  . This ensures your transaction is verified, secure, and
                  properly recorded.
                </p>

                <p className="text-red-200 text-sm leading-relaxed">
                  GM International will not be responsible for payments made
                  through unofficial or third-party channels.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Offices */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Regional Offices Contact
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialRegions.map((region) => (
              <div
                key={region}
                className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg"
              >
                <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">{region}</p>
                  <p className="text-sm text-gray-500">
                    Local Office Available
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div
            className="rounded-2xl p-6 md:p-8 text-white"
            style={{
              background: "linear-gradient(180deg, #301314 0%, #CA2328 100%)",
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Text Section */}
              <div className="max-w-3xl">
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Payment Terms & Conditions
                </h3>

                <ul className="space-y-3 text-red-100 leading-relaxed mb-4">
                  <li>
                    <span className="font-semibold text-white">(1)</span> During
                    sending your documents, you need to pay{" "}
                    <span className="font-semibold text-white">
                      $80 Application Deposit
                    </span>{" "}
                    to start the process.
                  </li>

                  <li>
                    <span className="font-semibold text-white">(2)</span> After
                    getting the{" "}
                    <span className="font-semibold text-white">
                      Admission Notice and JW202 copy
                    </span>
                    , you need to pay the remaining service charge.
                  </li>
                </ul>

                <p className="text-red-200 text-sm leading-relaxed">
                  <span className="font-semibold text-white">
                    Refund Policy:
                  </span>{" "}
                  If you do not get any admission because of GM International,
                  the full deposit amount will be refunded.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 text-center">
            Students from these regions should contact local offices for
            region-specific service charges
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default ServicesPricing;
