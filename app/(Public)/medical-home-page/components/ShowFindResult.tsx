"use client";

import React, { useState } from "react";
import { MedicalFormData } from "@/app/dashboard/medical/admin/manage-application-package/components/type/type";
import { Search, SlidersHorizontal, X } from "lucide-react";
import HospitalCard from "./HospitalCard";

interface ShowFindResultProps {
  hospitalData: MedicalFormData[];
}

export const ShowFindResult = ({ hospitalData }: ShowFindResultProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<
    "name" | "rating" | "none" | "private" | "public"
  >("none");
  const [showFilters, setShowFilters] = useState(false);

  const filteredData = hospitalData.filter((hospital) => {
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch =
      hospital.hospital_name?.toLowerCase().includes(searchLower) ||
      hospital.city_name?.toLowerCase().includes(searchLower) ||
      hospital.country_name?.toLowerCase().includes(searchLower) ||
      hospital.provience?.toLowerCase().includes(searchLower) ||
      hospital.department?.some((dept) =>
        dept.toLowerCase().includes(searchLower),
      );

    // ✅ hospital type filter
    if (sortBy === "public") {
      return (
        matchesSearch && hospital.hospital_type?.toLowerCase() === "public"
      );
    }

    if (sortBy === "private") {
      return (
        matchesSearch && hospital.hospital_type?.toLowerCase() === "private"
      );
    }

    return matchesSearch;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "name") {
      return (a.hospital_name || "").localeCompare(b.hospital_name || "");
    }

    if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    }

    return 0;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setSortBy("none");
  };

  if (!hospitalData || hospitalData.length === 0) {
    return (
      <div className="min-h-100 flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-8">
        <div className="text-6xl mb-4">🏥</div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          No Hospitals Found
        </h3>
        <p className="text-gray-600 text-center max-w-md">
          No hospitals match your search criteria. Try adjusting your filters or
          browse all available options.
        </p>
        <button
          onClick={resetFilters}
          className="mt-6 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        className=" p-6 md:p-10 lg:p-15 mb-10 rounded-b-2xl"
        style={{
          background: "linear-gradient(180deg, #301314 0%,#CA2328 100%)",
        }}
      >
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Search Results</h1>
          <p className="text-gray-200">
            Found{" "}
            <span className="font-semibold text-green-400">
              {filteredData.length}
            </span>{" "}
            hospitals matching your criteria
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gray-200 rounded-2xl shadow-lg border border-gray-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by hospital name, city, country, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Sort & Filter</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Sort by:
                </span>
                <button
                  onClick={() => setSortBy("name")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === "name"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Hospital Name
                </button>
                <button
                  onClick={() => setSortBy("private")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === "private"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Private
                </button>
                <button
                  onClick={() => setSortBy("public")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === "public"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Public
                </button>
                <button
                  onClick={() => setSortBy("rating")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === "rating"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Rating
                </button>
                {(searchTerm || sortBy !== "none") && (
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Grid */}
        {sortedData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedData.map((hospital, index) => (
              <HospitalCard key={hospital._id || index} hospital={hospital} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No matches found
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any hospitals matching "{searchTerm}"
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Results Summary */}
        {sortedData.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>
              Showing {sortedData.length} of {hospitalData.length} hospitals
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
