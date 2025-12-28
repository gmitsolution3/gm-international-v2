'use client'

import { Search, Sliders, DollarSign, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { MedicalPackageProps } from "../../medical-list/components/type";
import Link from "next/link";

export default function OffersPage({ offers }:MedicalPackageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null | undefined>(null);


  const filteredOffers = offers.filter(
    (offer) =>
      offer._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="py-8 md:py-12 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3">
            <span className="text-slate-900">Our </span>
            <span className="text-red-600">Offers</span>
          </h1>

          {/* Description */}
          <p className="text-center text-slate-600 text-sm md:text-base lg:max-w-3xl lg:mx-auto mb-8 leading-relaxed">
            Explore our comprehensive range of medical treatments and healthcare
            packages from leading hospitals worldwide. Get access to specialized
            procedures with expert doctors at competitive prices.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            {/* Search Bar */}
            <div className="w-full md:w-80">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 rounded-2xl border-2 border-red-400 focus:outline-none focus:border-red-600 transition-all text-sm placeholder-slate-400"
                />
              </div>
            </div>

            {/* Filter Info */}
            <div className="flex items-center gap-2 text-slate-600 text-sm whitespace-nowrap">
              <span>Showing results based on filter</span>
              <Sliders className="w-5 h-5 text-red-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Offers Grid Section */}
      <section className="py-8 md:py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredOffers.map((offer) => (
              <div
                key={offer._id}
                onMouseEnter={() => setHoveredId(offer._id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative h-72 md:h-80 rounded-3xl overflow-hidden shadow-lg transition-all duration-500
                  ${
                    hoveredId === offer._id
                      ? "shadow-2xl lg:scale-105"
                      : "hover:shadow-xl"
                  }`}
              >
                {/* Background Image */}
                <img
                  src={offer.photo}
                  alt={offer.treatmentDescription}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500
                    ${
                      hoveredId === offer._id
                        ? "scale-110 brightness-50"
                        : "scale-100 brightness-60"
                    }`}
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-b opacity-40 transition-opacity duration-500
                  ${hoveredId === offer._id ? "opacity-55" : "opacity-40"}`}
                />

                {/* Content Container */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 text-white">
                  {/* Top Content */}
                  <div className="space-y-2">
                    <h3 className="text-base md:text-lg font-bold leading-snug drop-shadow-lg line-clamp-2">
                      {offer.treatmentDescription}
                    </h3>
                    <p className="text-xs md:text-sm font-medium drop-shadow-md opacity-90">
                      {offer.hospitalName}
                    </p>
                  </div>

                  {/* Hover Details - Hidden normally, shown on hover */}
                  <div
                    className={`space-y-3 transition-all duration-500 ${
                      hoveredId === offer._id
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    <p className="text-xs md:text-sm drop-shadow-md line-clamp-2">
                      {offer.treatmentDetails.slice(100)}
                    </p>
                    <p className="text-xs md:text-sm font-semibold drop-shadow-md">
                      {offer.doctorExpertise.slice(100)}...
                    </p>
                  </div>

                  {/* Button */}
                  <Link href={`/medical-home-page/medical-packages/${offer._id}`}>
                  
                  <button
                    className={`w-full py-2 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 border-2 backdrop-blur-sm transform
                      ${
                        hoveredId === offer._id
                          ? "bg-red-700 border-red-700 text-white shadow-lg -translate-y-1 cursor-pointer"
                          : "bg-white/15 border-white/60 text-white hover:bg-white/25 hover:border-white"
                      }`}
                  >
                    View Details
                  </button>
                  </Link>
                </div>

                {/* Shine Effect */}
                <div
                  className={`absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent transition-all duration-500
                    ${
                      hoveredId === offer._id
                        ? "translate-x-full"
                        : "-translate-x-full"
                    }`}
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredOffers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-600 text-lg font-medium">
                No offers found matching your search.
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Try adjusting your search terms.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
