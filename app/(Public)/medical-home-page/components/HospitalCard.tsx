"use client";

import { MedicalFormData } from "@/app/dashboard/medical/admin/manage-application-package/components/type/type";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaHospital,
  FaMapMarkerAlt,
  FaEye,
  FaStar,
  FaBuilding,
  FaChevronRight,
} from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";

const HospitalCard = ({ hospital }: { hospital: MedicalFormData }) => {
  const [imageError, setImageError] = useState(false);

  const getImageSource = () => {
    if (hospital.photo && !imageError) {
      return hospital.photo;
    }

    return hospital.hospital_type === "public"
      ? "/images/default-public-hospital.jpg"
      : "/images/default-private-hospital.jpg";
  };

  const renderDepartments = () => {
    const departments = hospital.department.slice(0, 6);
    const remainingCount = hospital.department.length - 6;

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {departments.map((dept, index) => (
          <div
            key={index}
            className="bg-red-50/80 text-red-700 px-2 py-1.5 rounded-lg text-xs font-medium text-center border border-red-100 hover:bg-red-100 transition-all truncate"
            title={dept}
          >
            {dept}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="bg-gray-100 text-gray-600 px-2 py-1.5 rounded-lg text-xs font-medium text-center border border-gray-200">
            +{remainingCount} more
          </div>
        )}
      </div>
    );
  };

  const renderRating = () => {
    if (!hospital.rating) return null;

    const fullStars = Math.floor(hospital.rating);
    const hasHalfStar = hospital.rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-1">
        <div className="flex">
          {[...Array(5)].map((_, i) => {
            if (i < fullStars) {
              return (
                <FaStar
                  key={i}
                  className="w-3.5 h-3.5 text-yellow-400 fill-current"
                />
              );
            } else if (i === fullStars && hasHalfStar) {
              return (
                <div key={i} className="relative">
                  <FaStar className="w-3.5 h-3.5 text-gray-300" />
                  <FaStar
                    className="w-3.5 h-3.5 text-yellow-400 fill-current absolute top-0 left-0 overflow-hidden"
                    style={{ clipPath: "inset(0 50% 0 0)" }}
                  />
                </div>
              );
            }
            return <FaStar key={i} className="w-3.5 h-3.5 text-gray-300" />;
          })}
        </div>
        <span className="text-xs font-medium text-gray-700">
          {hospital.rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-red-100 to-orange-50">
        <Image
          src={getImageSource()}
          alt={hospital.hospital_name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImageError(true)}
          priority={false}
        />

        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
              hospital.hospital_type === "public"
                ? "bg-red-500/90 text-white"
                : "bg-red-800/90 text-white"
            }`}
          >
            {hospital.hospital_type}
          </span>
        </div>

        {hospital.total_view > 0 && (
          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
            <FaEye className="w-3 h-3" />
            <span>{hospital.total_view.toLocaleString()}</span>
          </div>
        )}
      </div>
      <div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-1 group-hover:text-red-600 transition-colors">
            {hospital.hospital_name}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaMapMarkerAlt className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="truncate">
                {hospital.city_name}, {hospital.provience}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaBuilding className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="truncate">{hospital.country_name}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            {renderRating()}
            {hospital.total_sell > 0 && (
              <span className="text-xs text-gray-500">
                {hospital.total_sell}+ Booking
              </span>
            )}
          </div>

          {hospital.department.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Department
              </h4>
              {renderDepartments()}
            </div>
          )}

          <Link href={`/medical-home-page/medical-list/${hospital._id}`}>
            <button className="w-full group/btn relative inline-flex items-center justify-center hover:cursor-pointer px-4 py-2.5 overflow-hidden font-medium text-red-600 transition-all duration-300 ease-out bg-red-50 rounded-xl hover:bg-red-600 hover:text-white border border-red-200 hover:border-red-600">
              <span className="flex items-center gap-2">
                <MdLocalHospital className="w-4 h-4" />
                <span>View Details</span>
                <FaChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </button>
          </Link>
        </div>

        <div className="flex justify-around">
          <div>
            {hospital.createdAt && (
              <div className="px-5 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
                Created At: {new Date(hospital.createdAt).toLocaleDateString()}
              </div>
            )}
          </div>
          <div>
            {hospital.total_view > 0 && (
              <div className="px-5 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
                Total view: {hospital.total_view}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
