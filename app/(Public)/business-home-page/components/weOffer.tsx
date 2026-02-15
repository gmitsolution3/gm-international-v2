"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Building,
  RefreshCw,
  FileText,
  DollarSign,
  BarChart3,
  Scale,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
  isOpen: boolean;
  action: string;
}

const ServicesComponent = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: "company-setup",
      title: "Company Setup",
      icon: <Building size={40} className="text-white" />,
      description:
        "Complete business registration and incorporation services for foreign companies in China.",
      details: [
        "Registration of Wholly Foreign Owned Enterprise (including HK/Macau/Taiwan)",
        "Registration of Joint Venture",
        "Registration of Foreign Representative Office",
        "Hong Kong Company Registration",
        "Registration of Branch Office",
      ],
      isOpen: false,
      action: "Open Company",
    },
    {
      id: "change-info",
      title: "Change Information",
      icon: <RefreshCw size={40} className="text-white" />,
      description:
        "Update company details, legal representatives, shareholders, and more.",
      details: [
        "Change Company Name",
        "Change Legal Representative (chief representative)",
        "Increase General Representative (R.O.)",
        "Change Business Scope",
        "Change Registration Capital",
        "Change Shareholder",
        "Change Address",
        "Extend Business License",
      ],
      isOpen: false,
      action: "Apply now",
    },
    {
      id: "license-cert",
      title: "License & Certificate",
      icon: <FileText size={40} className="text-white" />,
      description:
        "Obtain and manage all necessary business licenses and certificates.",
      details: [
        "Import & Export license",
        "Change information of Import & Export License",
        "Food Operation License",
        "Hygienic License (beauty salon, gymnasium, etc)",
        "China Trademark Application",
        "Labor Dispatch Permit",
      ],
      isOpen: false,
      action: "Apply now",
    },
    {
      id: "tax",
      title: "Tax",
      icon: <DollarSign size={40} className="text-white" />,
      description:
        "Comprehensive tax consulting, compliance, and optimization strategies.",
      details: [
        "Tax Return Service",
        "Individual income tax remittance",
        "Company Annual Inspection",
        "Tax planning consulting (VAT, EIT, PIT)",
      ],
      isOpen: false,
      action: "Apply now",
    },
    {
      id: "accounting",
      title: "Accounting",
      icon: <Scale size={40} className="text-white" />,
      description:
        "Professional bookkeeping, financial reporting, and automation solutions.",
      details: ["Account solutions", "Software and automation"],
      isOpen: false,
      action: "Apply now",
    },
    {
      id: "legal-advice",
      title: "Legal Advice",
      icon: <Scale size={40} className="text-white" />,
      description:
        "Expert legal advice on doing business in China, compliance, and risk management.",
      details: [
        "Advice on China law",
        "How to legally do business",
        "What not to do in China",
      ],
      isOpen: false,
      action: "Apply now",
    },
  ]);

  const toggleDetails = (id: string) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, isOpen: !service.isOpen } : service,
      ),
    );
  };

  return (
    <div className="min-h-screen py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            What We Offer
          </h1>
          <p className="text-red-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive business solutions tailored to your needs, from
            startup to expansion.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Container */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col hover:scale-105">
                {/* Colored Header with Icon */}
                <div className="bg-[#CA2328] p-8 flex flex-col items-center justify-center min-h-45 relative overflow-hidden group">
                  {/* Animated background element */}
                  <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                  {/* Icon with animation */}
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>

                  <h3 className="text-white text-xl md:text-2xl font-bold mt-4 text-center relative z-10">
                    {service.title}
                  </h3>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  {/* Description */}
                  <p className="text-black text-sm md:text-base leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  {/* Learn More / Hide Details Button */}
                  <button
                    onClick={() => toggleDetails(service.id)}
                    className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-800 transition-colors duration-300 group self-start"
                  >
                    <span className="text-sm md:text-base">
                      {service.isOpen ? "Hide Details" : "Learn More"}
                    </span>
                    {service.isOpen ? (
                      <ChevronUp
                        size={20}
                        className="group-hover:translate-y-1 transition-transform"
                      />
                    ) : (
                      <ChevronDown
                        size={20}
                        className="group-hover:translate-y-1 transition-transform"
                      />
                    )}
                  </button>

                  {/* Expandable Details Section */}
                  {service.isOpen && (
                    <div className="mt-6 pt-6 border-t-2 border-red-200 animate-slideDown">
                      <ul className="space-y-3">
                        {service.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-black text-sm md:text-base group/item"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                          >
                            <span className="text-red-600 font-bold mt-0.5 group-hover/item:scale-125 transition-transform">
                              •
                            </span>
                            <span className="group-hover/item:text-red-900 transition-colors">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="my-4 flex justify-end ">
                        <Link
                          href={`/business-home-page/business-deal/${service.id}`}
                          className="animate-slideDown px-3 py-2 bg-red-700 border border-red-700 text-white rounded-lg hover:bg-white hover:text-red-700 font-bold"
                        >
                          {service.action}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="my-15 flex justify-center">
          <Link href="/business-home-page/business-deal">
            <Button
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden 
          bg-linear-to-b from-[#CA2328] via-[#FF5E63] to-[#FF5E63] px-15 font-medium text-neutral-200 transition hover:scale-110 hover:cursor-pointer rounded-full text-lg"
            >
              <span className="flex gap-2 items-center">
                Apply Now <ArrowRight />
              </span>
              <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
            </Button>
          </Link>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ServicesComponent;
