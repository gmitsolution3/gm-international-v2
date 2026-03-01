"use client";

import { useState } from "react";
import { Search, MapPin, Globe, BookOpen } from "lucide-react";
import Link from "next/link";

interface FilterInfo {
  country: string[];
  department: string[];
  areaInfo: {
    provience: string[];
    city: string[];
  };
}

interface SearchFilters {
  country: string;
  department: string;
  provience: string;
  city: string;
}

export function MedicalTabSection({ filterData }: { filterData: FilterInfo }) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedProvience, setSelectedProvience] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const hotlineNumber = "+8801896042360";

  const handleSearch = () => {
    const query: SearchFilters = {
      country: selectedCountry,
      department: selectedDepartment,
      provience: selectedProvience,
      city: selectedCity,
    };
    console.log("Search filters:", query);
  };

  const resetAll = () => {
    setSelectedCountry("");
    setSelectedDepartment("");
    setSelectedProvience("");
    setSelectedCity("");
  };

  const resetProvienceAndCity = () => {
    setSelectedProvience("");
    setSelectedCity("");
  };

  const resetCityOnly = () => {
    setSelectedCity("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Find Your Perfect Opportunity
        </h1>
        <p className="text-gray-600 text-lg">
          Filter by country, department, province, and city to discover options
        </p>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                resetProvienceAndCity();
              }}
            >
              <option value="">Choose a country</option>
              {filterData.country.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Department Selector */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-red-600" />
              <label className="font-semibold text-gray-800">Department</label>
            </div>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none appearance-none cursor-pointer"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All departments</option>
              {filterData.department.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Province Selector */}
          {selectedCountry && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <label className="font-semibold text-gray-800">Province</label>
              </div>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none appearance-none cursor-pointer"
                value={selectedProvience}
                onChange={(e) => {
                  setSelectedProvience(e.target.value);
                  resetCityOnly();
                }}
              >
                <option value="">All provinces</option>
                {filterData.areaInfo.provience.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* City Selector - Shows after province selected */}
          {selectedProvience && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <label className="font-semibold text-gray-800">City</label>
              </div>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none appearance-none cursor-pointer"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">All cities</option>
                {filterData.areaInfo.city.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Search Button and Filters Display */}
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
                      setSelectedProvience("");
                      setSelectedCity("");
                    }}
                    className="ml-1 hover:text-red-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedDepartment && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  {selectedDepartment}
                  <button
                    onClick={() => setSelectedDepartment("")}
                    className="ml-1 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedProvience && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  {selectedProvience}
                  <button
                    onClick={() => {
                      setSelectedProvience("");
                      setSelectedCity("");
                    }}
                    className="ml-1 hover:text-green-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCity && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                  {selectedCity}
                  <button
                    onClick={() => setSelectedCity("")}
                    className="ml-1 hover:text-purple-900"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>

            {/* Search Button */}
            <Link
              href={`/medical-home-page/find-result?country=${selectedCountry}&department=${selectedDepartment}&provience=${selectedProvience}&city=${selectedCity}`}
            >
              <button className="group flex items-center gap-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-50 justify-center">
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-red-100 rounded-xl">
              <div className="text-2xl font-bold text-gray-900">
                {filterData.country.length}
              </div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="p-4 bg-blue-100 rounded-xl">
              <div className="text-2xl font-bold text-gray-900">
                {filterData.department.length}
              </div>
              <div className="text-sm text-gray-600">Departments</div>
            </div>
            <div className="p-4 bg-green-100 rounded-xl">
              <div className="text-2xl font-bold text-gray-900">
                {filterData.areaInfo.provience.length}
              </div>
              <div className="text-sm text-gray-600">Provinces</div>
            </div>
            <div className="p-4 bg-purple-100 rounded-xl">
              <div className="text-2xl font-bold text-gray-900">
                {filterData.areaInfo.city.length}
              </div>
              <div className="text-sm text-gray-600">Cities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Need assistance?{" "}
          <a
            href={`tel:${hotlineNumber}`}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Contact our advisors
          </a>
        </p>
      </div>
    </div>
  );
}
