"use client";

import { useState } from "react";
import { ExternalLink, Calendar, DollarSign, MapPin } from "lucide-react";
import { MedicalPackageDetails } from "../../medical-list/components/type";
import Image from "next/image";
import useUserRole from "@/app/useContext/useUserRole";
import Link from "next/link";

export default function PackageDetailsPage({
  packageData,
}: MedicalPackageDetails) {
  const [activeTab, setActiveTab] = useState("basic");
  const [isBooking, setIsBooking] = useState(false);
  const { userRole } = useUserRole();

  const doctorExpertiseLines = packageData.doctorExpertise
    .split("\\n")
    .filter((line) => line.trim());

  const appointmentDateObj = new Date(packageData.appointmentDate);
  const formattedDate = appointmentDateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white py-6 md:py-10 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Illustration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-14">
          {/* Left: Illustration */}
          <div className="flex items-center justify-center md:justify-start animate-fade-in">
            <div className="w-full max-w-full">
              <Image
                src={packageData.photo}
                alt={packageData.hospitalName}
                placeholder="blur"
                width={620}
                height={320}
                blurDataURL={packageData.photo}
                className="w-full h-auto animate-bounce-slow rounded-xl"
              />
            </div>
          </div>

          {/* Right: Title and Basic Info */}
          <div className="flex flex-col justify-center animate-fade-in-right">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {packageData.hospitalName}
            </h1>

            {/* Info Box */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md border-2 border-gray-100 animate-slide-up space-y-4">
              {/* Tab Buttons */}
              <div className="flex gap-3 mb-6 flex-wrap">
                <button
                  onClick={() => setActiveTab("basic")}
                  className={`px-4 md:px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                    activeTab === "basic"
                      ? "bg-slate-900 text-white shadow-lg"
                      : "bg-gray-200 text-slate-700 hover:bg-gray-300"
                  }`}
                >
                  With AI Ticket
                </button>
              </div>
              {/* Appointment Date */}
              <div className="transform transition-all duration-300 hover:translate-x-1 flex justify-between">
                <p className="text-xs md:text-sm font-semibold text-slate-600 mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-600" />
                  Appointment Date :
                </p>
                <p className="text-lg md:text-2xl font-bold text-slate-900">
                  {packageData.appointmentDate}
                </p>
              </div>

              {/* Hospital Name */}
              <div className="transform transition-all duration-300 hover:translate-x-1 flex justify-between">
                <p className="text-xs md:text-sm font-semibold text-slate-600 mb-1">
                  Hospital :
                </p>
                <p className="text-sm md:text-base text-slate-700">
                  {packageData.hospitalName}
                </p>
              </div>

              {/* Fees */}
              <div className="transform transition-all duration-300 hover:translate-x-1 flex justify-between gap-5">
                <p className="text-xs md:text-sm font-semibold text-slate-600 mb-1 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-red-600" />
                  Fees:
                </p>
                <p className="text-base md:text-lg font-bold text-slate-900">
                  {packageData.appointmentFree}
                </p>
              </div>

              {/* Country */}
              <div className="transform transition-all duration-300 hover:translate-x-1 flex justify-between">
                <p className="text-xs md:text-sm font-semibold text-slate-600 mb-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  Country
                </p>
                <p className="text-sm md:text-base text-slate-700 capitalize">
                  {packageData.country}
                </p>
              </div>

              {/* Book Appointment Button */}
              <Link href="/medical-home-page/user-submit-form">
                <button
                  onMouseEnter={() => setIsBooking(true)}
                  onMouseLeave={() => setIsBooking(false)}
                  className={`w-full py-3 bg-red-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${
                    isBooking ? "bg-red-700" : ""
                  }`}
                >
                  Book Appointment
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {/* Treatment Description Section */}
          <section
            className="animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Treatment Description:
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
              {packageData.treatmentDescription}
            </p>
            <a
              href={packageData.hospitalWebLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors duration-300 group"
            >
              Visit Website
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </section>

          {/* Treatment Details Section */}
          <section
            className="animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Treatment Details:
            </h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              {packageData.treatmentDetails}
            </p>
          </section>

          {/* Doctors Experts Section */}
          <section
            className="animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Doctors experts:
            </h2>

            {/* Doctor Expertise - Split by newlines */}
            <div className="bg-linear-to-r from-red-50 to-pink-50 rounded-2xl p-4 md:p-6 border border-red-200 mb-6">
              <ul className="space-y-3">
                {doctorExpertiseLines.map((line, idx) => (
                  <li
                    key={idx}
                    className={`flex gap-3 animate-slide-in-left text-sm md:text-base ${
                      idx === 0 ? "font-bold text-slate-900" : "text-slate-700"
                    }`}
                    style={{ animationDelay: `${0.3 + idx * 0.05}s` }}
                  >
                    <span className="text-red-600 font-bold shrink-0">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Description */}
            <div className="border-l-4 border-red-600 pl-4 md:pl-6 py-2">
              <p className="text-sm md:text-base text-slate-600 leading-relaxed italic">
                {packageData.treatmentDetails}
              </p>
            </div>
          </section>
        </div>

        {/* Footer Info */}
        <div
          className="mt-12 pt-8 border-t border-gray-200 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 text-center`}>
            {userRole === "admin" && (
              <div className="flex flex-col md:flex-row gap-3 md:gap-10">
                <div>
                  <p className="text-xs md:text-sm text-slate-600 mb-1">
                    Created By
                  </p>
                  <p className="text-sm md:text-base font-semibold text-slate-900">
                    {packageData.createdBy}
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-slate-600 mb-1">
                    Created On
                  </p>
                  <p className="text-sm md:text-base font-semibold text-slate-900 whitespace-nowrap">
                    {packageData.createdAt}
                  </p>
                </div>
              </div>
            )}

            <div>
              <p className="text-xs md:text-sm text-slate-600 mb-1">Country</p>
              <p className="text-sm md:text-base font-semibold text-slate-900 capitalize">
                {packageData.country}
              </p>
            </div>
            <div>
              <p className="text-xs md:text-sm text-slate-600 mb-1">
                Package ID
              </p>
              <p className="text-sm md:text-base font-semibold text-slate-900 truncate">
                {packageData._id}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
