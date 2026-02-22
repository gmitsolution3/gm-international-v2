"use client";

import { MedicalFormData } from "@/app/dashboard/medical/admin/manage-application-package/components/type/type";
import { PackageDescriptionView } from "@/app/dashboard/scholarship/admin/manage-student-packages/components/PackageDescriptionView";
import { hotlineNumber } from "@/app/shared/navbar/components/hotlineButton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaHospital,
  FaMapMarkerAlt,
  FaEye,
  FaStar,
  FaBuilding,
  FaChevronLeft,
  FaShare,
  FaBookmark,
  FaPhone,
  FaGlobe,
  FaClock,
  FaUserMd,
  FaProcedures,
  FaAmbulance,
  FaHeartbeat,
  FaStethoscope,
  FaSyringe,
  FaPills,
  FaMicroscope,
  FaXRay,
  FaCalendarAlt,
  FaRegClock,
  FaCheckCircle,
} from "react-icons/fa";
import { MdLocalHospital, MdEmail, MdLocationOn } from "react-icons/md";

interface HospitalDetailsPageProps {
  hospital: MedicalFormData;
  relatedHospitals?: MedicalFormData[];
}

const HospitalDetailsPage = ({
  hospital,
  relatedHospitals = [],
}: HospitalDetailsPageProps) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "details" | "departments" | "reviews"
  >("details");


  const getImageSource = () => {
    if (hospital.photo && !imageError) {
      return hospital.photo;
    }
    return hospital.hospital_type === "public"
      ? "/images/default-public-hospital.jpg"
      : "/images/default-private-hospital.jpg";
  };


  const renderRating = (rating: number, showText: boolean = true) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => {
            if (i < fullStars) {
              return (
                <FaStar
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                />
              );
            } else if (i === fullStars && hasHalfStar) {
              return (
                <div key={i} className="relative">
                  <FaStar className="w-4 h-4 text-gray-300" />
                  <FaStar
                    className="w-4 h-4 text-yellow-400 fill-current absolute top-0 left-0 overflow-hidden"
                    style={{ clipPath: "inset(0 50% 0 0)" }}
                  />
                </div>
              );
            }
            return <FaStar key={i} className="w-4 h-4 text-gray-300" />;
          })}
        </div>
        {showText && (
          <span className="text-sm font-medium text-gray-700">
            {rating.toFixed(1)} ({hospital.total_view} reviews)
          </span>
        )}
      </div>
    );
  };


  const getDepartmentIcon = (dept: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      cardiology: <FaHeartbeat className="w-4 h-4" />,
      neurology: <FaBrain className="w-4 h-4" />,
      orthopedics: <FaBone className="w-4 h-4" />,
      pediatrics: <FaChild className="w-4 h-4" />,
      gynecology: <FaVenus className="w-4 h-4" />,
      dermatology: <FaAllergies className="w-4 h-4" />,
      ophthalmology: <FaEye className="w-4 h-4" />,
      dentistry: <FaTooth className="w-4 h-4" />,
      psychiatry: <FaBrain className="w-4 h-4" />,
      radiology: <FaXRay className="w-4 h-4" />,
      pathology: <FaMicroscope className="w-4 h-4" />,
      pharmacy: <FaPills className="w-4 h-4" />,
    };
    return iconMap[dept.toLowerCase()] || <FaStethoscope className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="bg-linear-to-r from-red-600 to-red-500 h-48 md:h-64 relative"
        style={{
          background: "linear-gradient(360deg, #CA2328 0%, #301314 100%)",
        }}
      >
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-3 py-2 md:px-4 md:py-2 rounded-xl hover:bg-white/30 transition-all duration-300"
          >
            <FaChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>

        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex gap-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="bg-white/20 backdrop-blur-md text-white p-2 md:p-3 rounded-xl hover:bg-white/30 transition-all duration-300"
          >
            <FaBookmark
              className={`w-4 h-4 md:w-5 md:h-5 ${isBookmarked ? "fill-current" : ""}`}
            />
          </button>
          {/* <button className="bg-white/20 backdrop-blur-md text-white p-2 md:p-3 rounded-xl hover:bg-white/30 transition-all duration-300">
            <FaShare className="w-4 h-4 md:w-5 md:h-5" />
          </button> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 pb-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-48 md:h-72 lg:h-96">
            <Image
              src={getImageSource()}
              alt={hospital.hospital_name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover"
              onError={() => setImageError(true)}
              priority
            />

            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              <span
                className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-lg backdrop-blur-md ${
                  hospital.hospital_type === "public"
                    ? "bg-red-500/90 text-white"
                    : "bg-red-800/90 text-white"
                }`}
              >
                {hospital.hospital_type}
              </span>

              {hospital.total_sell > 0 && (
                <span className="bg-purple-500/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
                  ⭐ {hospital.total_sell}+ Booking
                </span>
              )}
            </div>
          </div>

          <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                  {hospital.hospital_name}
                </h1>

                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <FaMapMarkerAlt className="w-4 h-4 text-red-500" />
                    <span className="text-sm md:text-base">
                      {hospital.city_name}, {hospital.provience}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaBuilding className="w-4 h-4 text-red-500" />
                    <span className="text-sm md:text-base">
                      {hospital.country_name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-2">
                {renderRating(hospital.rating || 0)}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaEye className="w-4 h-4" />
                    {hospital.total_view.toLocaleString()} views
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="w-4 h-4" />
                    {new Date(hospital.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex border-b border-gray-200 mb-6 overflow-x-auto pb-px hide-scrollbar">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-4 md:px-6 py-3 text-sm md:text-base font-medium whitespace-nowrap transition-colors ${
                  activeTab === "details"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("departments")}
                className={`px-4 md:px-6 py-3 text-sm md:text-base font-medium whitespace-nowrap transition-colors ${
                  activeTab === "departments"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Departments ({hospital.department.length})
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-4 md:px-6 py-3 text-sm md:text-base font-medium whitespace-nowrap transition-colors ${
                  activeTab === "reviews"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Review & Rating
              </button>
            </div>

            <div className="mb-8">
              {activeTab === "details" && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                      Description:
                    </h2>
                    <PackageDescriptionView html={hospital.description} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                      <FaUserMd className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-blue-600 font-medium">
                          Specialist Doctor
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          25+ Specialist
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 flex items-start gap-3">
                      <FaProcedures className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-green-600 font-medium">
                          Bed capacity
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          500+ Bed capacity
                        </p>
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 flex items-start gap-3">
                      <FaAmbulance className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-purple-600 font-medium">
                          Emergency Service
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          24/7 Ambulance{" "}
                        </p>
                      </div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4 flex items-start gap-3">
                      <FaRegClock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-orange-600 font-medium">
                          OPD Schedule
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          9AM - 10PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "departments" && (
                <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                    Departments
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {hospital.department.map((dept, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-3 border border-gray-100 hover:border-red-200 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-red-500 group-hover:scale-110 transition-transform">
                            {getDepartmentIcon(dept)}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {dept}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                    Patient Review/Feedback
                  </h2>
                  <div className="text-center py-8 text-gray-500">
                    <p>Comming soon...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`tel:${hotlineNumber}`}
                    aria-label={`Call our hotline at ${hotlineNumber}`}
                  >
                    <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-xl hover:bg-red-700 transition-colors text-sm md:text-base">
                      <FaPhone className="w-4 h-4" />
                      <span>Contact Us</span>
                    </button>
                  </a>
                  <Link
                    href={`/medical-home-page/user-submit-form?id=${hospital._id}`}
                  >
                    <button className="flex items-center gap-2 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-sm md:text-base hover:cursor-pointer">
                      <FaCalendarAlt className="w-4 h-4" />
                      <span>Request for invitation</span>
                    </button>
                  </Link>
                </div>

                <div className="flex gap-2">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <FaGlobe className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <MdEmail className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedHospitals.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              See more
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedHospitals.map((relatedHospital, index) => (
                <Link
                  key={index}
                  href={`/hospital/${relatedHospital.hospital_name}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={
                          relatedHospital.photo ||
                          "/images/default-hospital.jpg"
                        }
                        alt={relatedHospital.hospital_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
                        {relatedHospital.hospital_name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                        {relatedHospital.city_name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            relatedHospital.hospital_type === "public"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {relatedHospital.hospital_type}
                        </span>
                        <span className="text-xs text-gray-400">
                          {relatedHospital.total_view} views
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalDetailsPage;

const FaBrain = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);
const FaBone = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);
const FaChild = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);
const FaVenus = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);
const FaAllergies = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);
const FaTooth = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);
