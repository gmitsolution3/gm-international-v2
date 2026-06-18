import React from "react";
import { ChevronRight } from "lucide-react";
import { fetchMedicalList } from "./fetches";
import Link from "next/link";
import HospitalCard from "./HospitalCard";
import { MedicalFormData } from "@/app/dashboard/medical/admin/manage-application-package/components/type/type";

export default async function HomeMedicalList() {
  const {data} = await fetchMedicalList();

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-pink-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="header-title text-3xl md:text-5xl font-bold mb-4">
            Our Affiliated <span className="text-red-500">Hospitals!</span>
          </h1>
          <p className="header-desc text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Discover our network of premium healthcare facilities offering
            specialized medical care with international standards and modern
            facilities.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {data.length > 0 ? (
            data.map((d: MedicalFormData) => (
              <HospitalCard key={d._id} hospital={d} />
            ))
          ) : (
            <div className="max-w-7xl mx-auto text-2xl text-red-700 font-bold">
              Package coming soon...
            </div>
          )}
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <Link href="/medical-home-page/medical-list">
            <button
              // onClick={handleViewMore}
              className="view-more-btn px-8 md:px-12 py-3 md:py-4 bg-linear-to-r from-[#CA2328] to-red-600 text-white font-bold rounded-full text-base md:text-lg shadow-lg hover:shadow-xl hover:cursor-pointer"
            >
              View More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
