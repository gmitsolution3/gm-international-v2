"use client";
import { useState } from "react";
import { Search, Star, Sliders } from "lucide-react";
import Link from "next/link";
import HospitalCard from "../../components/HospitalCard";
import { MedicalFormData } from "@/app/dashboard/medical/admin/manage-application-package/components/type/type";

export default function ListCard({ hospitals }: { hospitals: MedicalFormData[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null | undefined>(null);

  const filteredHospitals = hospitals.filter((hospital: MedicalFormData) =>
    hospital.hospital_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white py-6 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
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
        <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital, index) => (
            <HospitalCard key={index} hospital={hospital} />
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
