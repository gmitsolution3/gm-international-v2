"use client";

import { use, useEffect, useState } from "react";
// import FilterTag from "./filter-tag"
import { Filter } from "lucide-react";
import OfferCard, { ScholarshipCardProps } from "../../components/OfferCard";
import FilterTag from "./filtered";
import { toast } from "sonner";
import { ServicesSkeleton } from "@/app/components/skeleton/ServicesSkeleton";

interface Country {
  name: string;
}
interface Offer {
  id: string;
  _id: string;
  selectedCountry: Country;
  selectedUniversity: string;

  deadlineDate: string;
  packagePrice: string;
  scholarshipDetails: string;
  imgURL: string;
  B2BPrice: string;
}

// 1. Single Country Info er structure
export interface CityInfo {
  city: string;
  programs: string[];
}

export interface CountryInfo {
  country: string;
  cities: CityInfo[];
}

// 2. Main API Response structure
export interface ScholarshipFilterResponse {
  countryInfo: CountryInfo[];
  programs: string[];
}

export default function ScholarshipPackage({
  packageData,
  filterData,
}: {
  packageData: ScholarshipCardProps[];
  filterData: ScholarshipFilterResponse;
}) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const [filters, setFilters] = useState<string[]>([]);
  const [filterResult, setFilterResult] = useState<
    ScholarshipCardProps[] | null
  >(null);
  const [visibleOffers, setVisibleOffers] = useState<ScholarshipCardProps[]>(
    packageData || [],
  );

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [offers, setOffers] = useState<ScholarshipCardProps[]>(
    packageData || [],
  );

  // Find selected country object
  const selectedCountryData = filterData.countryInfo.find(
    (c) => c.country.toLowerCase() === selectedCountry?.toLowerCase(),
  );

  // Find selected city object (only if country & city selected)
  const selectedCityData = selectedCountryData?.cities.find(
    (cityObj: any) =>
      cityObj.city.trim().toLowerCase() === selectedCity?.trim().toLowerCase(),
  );

  const selectCountry = async (country: string) => {
    setLoading(true);
    setSelectedCountry(country);
    setSelectedCity(null);
    setSelectedProgram(null);
    setFilters([country]);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-filter-data-based-country/${country}`,
        {
          next: { revalidate: 60 },
        },
      );

      const packageDataBasedOnCountry = await res.json();

      if (!packageDataBasedOnCountry.success) {
        toast.error("Something was wrong");
      }

      setFilterResult(packageDataBasedOnCountry.data);
      setVisibleOffers(packageDataBasedOnCountry.data);
    } catch (err: any) {
      toast.error(`Find error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = filterResult ? [...filterResult] : [...packageData];

    if (selectedCity) {
      result = result.filter(
        (o) =>
          o.city?.split(",")[0].trim().toLowerCase() ===
          selectedCity?.trim().toLowerCase(),
      );
    }

    if (selectedProgram) {
      result = result.filter((o) => o.programs?.includes(selectedProgram));
    }

    if (search) {
      result = result.filter((o) =>
        [o.universityName, o.city, o.country, o.programs?.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }

    setVisibleOffers(result);
  }, [selectedCity, selectedProgram, filterResult, search]);

  const selectCity = (city: string) => {
    setSelectedCity(city);
    setSelectedProgram(null);
    setFilters((prev) => {
      const base = prev.filter(
        (f) => f !== selectedCity && f !== selectedProgram,
      );
      return [
        ...base.filter((f) => f !== selectedCountry),
        selectedCountry!,
        city,
      ];
    });
  };

  const selectProgram = (program: string) => {
    setSelectedProgram(program);
    setFilters((prev) => {
      const withoutProg = prev.filter((f) => f !== selectedProgram);
      return [...withoutProg, program];
    });
  };

  const removeFilter = (filter: string) => {
    if (filter === selectedCountry) {
      setSelectedCountry(null);
      setSelectedCity(null);
      setSelectedProgram(null);
      setFilters([]);
      setFilterResult(null);
      setVisibleOffers(packageData);
    } else if (filter === selectedCity) {
      setSelectedCity(null);
      setSelectedProgram(null);
      setFilters(filters.filter((f) => f !== filter));
    } else if (filter === selectedProgram) {
      setSelectedProgram(null);
      setFilters(filters.filter((f) => f !== filter));
    }
  };
  function capitalize(text: string): string {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  const form = "student";

  return (
    <div className="w-full min-h-screen">
      {/* Header Section */}
      <div className="bg-linear-to-r from-white to-gray-50 border-b border-gray-200 px-4 py-8 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
            Found{" "}
            <span className="text-red-600">
              {selectedCountryData
                ? selectedCountryData!.cities.length
                : offers.length}
            </span>{" "}
            Cities Scholarship In{" "}
            <span className="text-red-600">
              {selectedCountry || "Worldwide"}
            </span>
          </h1>

          <div className="mt-6 space-y-6">
            {/* 1. Country List */}
            <div className="flex justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center border-2 gap-2 hover:bg-red-700 hover:text-white font-semibold px-4 py-2 rounded-md transition-all">
                  <Filter size={18} />
                  Filter Scholarship &gt;
                </button>

                <div className="flex flex-wrap gap-2">
                  {filterData.countryInfo.map((c) => (
                    <button
                      key={c.country}
                      onClick={() => selectCountry(c.country)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCountry === c.country
                          ? "bg-red-600 text-white shadow-md"
                          : "bg-white border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {capitalize(c.country)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <input
                  type="text"
                  placeholder="Search scholarship, university..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* 2. Cities (only when country selected) */}
            {selectedCountry && selectedCountryData && (
              <div className="pl-4 border-l-4 border-red-200 bg-white/50 p-4 rounded-r-lg space-y-5">
                <div>
                  <h4 className="text-lg font-bold text-red-700 mb-2">
                    Cities in {selectedCountry}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCountryData.cities.map((cityObj) => (
                      <button
                        key={cityObj.city}
                        onClick={() => selectCity(cityObj.city)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                          selectedCity === cityObj.city
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200 border border-gray-300"
                        }`}
                      >
                        {cityObj.city.trim()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3a. Programs specific to selected city (only when city selected) */}
                {selectedCity && selectedCityData && (
                  <div>
                    <h4 className="text-lg font-bold text-red-700 mb-2">
                      Programs in {selectedCity}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCityData.programs.map((prog) => (
                        <button
                          key={prog}
                          onClick={() => selectProgram(prog)}
                          className={`px-3 py-1.5 rounded-full text-sm ${
                            selectedProgram === prog
                              ? "bg-red-600 text-white"
                              : "bg-gray-100 hover:bg-gray-200 border border-gray-300"
                          }`}
                        >
                          {prog}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* 3b. All Programs (always visible – global list) */}
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-red-700">
                    All Available Programs
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {filterData.programs.map((p) => (
                      <button
                        key={p}
                        onClick={() => selectProgram(p)}
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          selectedProgram === p
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300 border border-gray-400"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Active Filters Tags */}
            {filters.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {filters.map((f) => (
                  <div
                    key={f}
                    className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                  >
                    {f}
                    <button
                      onClick={() => removeFilter(f)}
                      className="ml-1 text-red-600 hover:text-red-800 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && (
        <div className="min-h-screen flex items-start scroll-mt-40 mt-20 justify-center px-6">
          <div className="w-full">
            <ServicesSkeleton />
          </div>
        </div>
      )}

      {selectedCountry ? (
        <div className="px-4 py-12 sm:px-6 md:px-8 lg:px-12 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {(visibleOffers || []).map((offer, index) => (
                <div
                  key={offer._id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="animate-card-appear"
                >
                  <OfferCard offer={offer} form={form} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 py-12 sm:px-6 md:px-8 lg:px-12 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {visibleOffers.map((offer, index) => (
                <div
                  key={offer._id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="animate-card-appear"
                >
                  <OfferCard offer={offer} form={form} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
