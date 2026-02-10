"use client"

import { useState } from "react";
import { Search, MapPin, Globe, BookOpen } from "lucide-react";
import { ScholarshipFilterResponse } from "../student-package-offer/components/scholarshipPackage";
import Link from "next/link";

interface SearchFilters {
  country: string;
  city: string;
  program: string;
}

export function TabsSection({
  filterData,
}: {
  filterData: ScholarshipFilterResponse;
}) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");

  const selectedCountryObj = filterData.countryInfo.find(
    (c) => c.country.toLowerCase() === selectedCountry.toLowerCase(),
  );

  const hotlineNumber = "+8801896042360";

  const handleSearch = () => {
    const query: SearchFilters = {
      country: selectedCountry,
      city: selectedCity,
      program: selectedProgram,
    };

  };

  const resetCityAndProgram = () => {
    setSelectedCity("");
    setSelectedProgram("");
  };

  const resetProgramOnly = () => {
    setSelectedProgram("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Find Your Perfect Scholarship
        </h1>
        <p className="text-gray-600 text-lg">
          Filter by country, city, and program to discover opportunities
        </p>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Country Selector */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-red-600" />
              <label className="font-semibold text-gray-800">Country</label>
            </div>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none appearance-none cursor-pointer"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                resetCityAndProgram();
              }}
            >
              <option value="">Choose a country</option>
              {filterData.countryInfo.map((c) => (
                <option key={c.country} value={c.country}>
                  {c.country}
                </option>
              ))}
            </select>
          </div>

          {/* City Selector - Conditionally shown */}
          {selectedCountry && selectedCountryObj && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <label className="font-semibold text-gray-800">
                  City in {selectedCountry}
                </label>
              </div>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none appearance-none cursor-pointer"
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  resetProgramOnly();
                }}
              >
                <option value="">All cities</option>
                {selectedCountryObj.cities.map((cityObj) => (
                  <option key={cityObj.city} value={cityObj.city}>
                    {cityObj.city.trim()}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Program Selector */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-red-600" />
              <label className="font-semibold text-gray-800">
                {selectedCity ? `Program in ${selectedCity}` : "Program"}
              </label>
            </div>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none appearance-none cursor-pointer overflow-y-auto"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
            >
              <option value="">All programs</option>
              {selectedCity &&
              selectedCountryObj?.cities.find((c) => c.city === selectedCity)
                ? selectedCountryObj.cities
                    .find((c) => c.city === selectedCity)
                    ?.programs.map((prog) => (
                      <option key={prog} value={prog}>
                        {prog}
                      </option>
                    ))
                : filterData.programs
                    .filter((p) => p)
                    .map((prog) => (
                      <option key={prog} value={prog}>
                        {prog}
                      </option>
                    ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-10 pt-6 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Selected Filters Display */}
            <div className="flex flex-wrap gap-2">
              {selectedCountry && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium">
                  {selectedCountry}
                  <button
                    onClick={() => {
                      setSelectedCountry("");
                      setSelectedCity("");
                      setSelectedProgram("");
                    }}
                    className="ml-1 hover:text-red-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCity && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  {selectedCity}
                  <button
                    onClick={() => setSelectedCity("")}
                    className="ml-1 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedProgram && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  {selectedProgram}
                  <button
                    onClick={() => setSelectedProgram("")}
                    className="ml-1 hover:text-green-900"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>

            {/* Search Button */}
            <Link
              href={`/student-home-page/find-result?country=${selectedCountry}&city=${selectedCity}&program=${selectedProgram}`}
            >
              <button
                // onClick={handleSearch}
                // disabled={!selectedCountry}
                className="group flex items-center gap-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg min-w-50 justify-center"
              >
                <Search className="w-5 h-5" />
                <span>Search Scholarships</span>
              </button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-3 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-red-100 rounded-xl">
              <div className="text-2xl font-bold text-gray-900">
                {filterData.countryInfo.length}
              </div>
              <div className="text-sm text-gray-600">Countries Available</div>
            </div>
            <div className="p-4 bg-red-100 rounded-xl">
              <div className="text-2xl font-bold text-gray-900">
                {selectedCountryObj?.cities.length ||
                  filterData.countryInfo.reduce(
                    (acc, c) => acc + c.cities.length,
                    0,
                  )}
              </div>
              <div className="text-sm text-gray-600">Cities Covered</div>
            </div>
            <div className="p-4 bg-red-100 rounded-xl">
              <div className="text-2xl font-bold text-gray-900">
                {filterData.programs.length}
              </div>
              <div className="text-sm text-gray-600">Programs Offered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Text */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Can't find what you're looking for?{" "}
          <a
            href={`tel:${hotlineNumber}`}
            aria-label={`Call our hotline at ${hotlineNumber}`}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Contact our advisors
          </a>
        </p>
      </div>
    </div>
  );
}

