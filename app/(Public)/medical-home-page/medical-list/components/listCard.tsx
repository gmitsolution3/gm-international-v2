"use client";
import { useState } from "react";
import { Search, Star, Sliders } from "lucide-react";
import { HospitalList, HospitalListProps } from "./type";
import Link from "next/link";

export default function ListCard({ hospitals }: HospitalListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null | undefined>(null);

  const filteredHospitals = hospitals.filter((hospital: HospitalList) =>
    hospital.hospitalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white py-6 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          {/* Left: Search Bar */}
          <div className="w-full lg:w-64">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search university here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 rounded-xl border-2 border-red-300 focus:outline-none focus:border-red-500 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Right: Filter Text */}
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <span>Showing results based on filter</span>
            <Sliders className="w-4 h-4 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-8">
          <span className="text-slate-900">Popular </span>
          <span className="text-red-600">Hospitals</span>
        </h1>

        {/* Cards Container */}
        <div className="space-y-6">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital._id}
              onMouseEnter={() => setHoveredId(hospital._id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`flex flex-col md:flex-row gap-4 md:gap-6 p-5 md:p-6 rounded-2xl border-2 border-slate-200 bg-white transition-all duration-300 cursor-pointer
                ${
                  hoveredId === hospital._id
                    ? "shadow-xl border-red-300 scale-[1.02]"
                    : "shadow-md hover:shadow-lg"
                }`}
            >
              {/* Image */}
              <div className="w-full md:w-56 lg:w-64 shrink-0">
                <div
                  className={`relative h-48 md:h-56 rounded-xl overflow-hidden bg-slate-200 transition-all duration-300
                  ${hoveredId === hospital._id ? "scale-105" : "scale-100"}`}
                >
                  <img
                    src={hospital.images[0]}
                    alt={hospital.hospitalName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                {/* Top Content */}
                <div>
                  <h2
                    className={`text-2xl md:text-2xl font-bold mb-3 transition-colors duration-300
                    ${
                      hoveredId === hospital._id
                        ? "text-red-600"
                        : "text-slate-900"
                    }`}
                  >
                    {hospital.hospitalName}
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed line-clamp-3">
                    {hospital.description}
                  </p>
                </div>

                {/* Bottom: Rating and Button */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-4 md:mt-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-red-600 text-red-600" />
                    <span className="font-bold text-slate-900 text-lg">
                      {hospital.rating}
                    </span>
                  </div>

                  {/* View Details Button */}
                  <Link
                    href={`/medical-home-page/medical-list/${hospital._id}`}
                  >
                    <button
                      className={`px-6 py-2 bg-[#CA2328] text-white font-semibold rounded-lg transition-all duration-300 whitespace-nowrap
                    ${
                      hoveredId === hospital._id
                        ? "bg-red-700 shadow-lg"
                        : "hover:bg-red-700"
                    }`}
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredHospitals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              No hospitals found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
