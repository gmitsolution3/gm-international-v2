
import React from "react";
import { Search, MapPin, Globe, GraduationCap, Filter } from "lucide-react";
import OfferCard from "../components/OfferCard";
import Link from "next/link";

interface PageProps {
  searchParams: {
    country?: string;
    city?: string;
    program?: string;
  };
}

const FindSearchResult = async ({ searchParams }: PageProps) => {
  const { country, city, program } = await searchParams;
  const hotlineNumber = "+8801896042360";



  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-search-result?country=${country}&city=${city}&program=${program}`,
    { cache: "no-store" },
  );

  const searchResult = await res.json();
  const resultsCount = searchResult.data?.length || 0;

  // Format title based on filters
  const getTitle = () => {
    if (!country) return "All Scholarships";

    let title = "";

    if (program) {
      title += `${program} Scholarships`;
    } else {
      title += "Scholarships";
    }

    if (country) {
      title += ` in ${country}`;
    }

    if (city) {
      title += `, ${city}`;
    }

    return title;
  };

  const getSubtitle = () => {
    const parts = [];
    if (country) parts.push(country);
    if (city) parts.push(city);
    if (program) parts.push(program);

    return parts.length > 0
      ? `Filtered by: ${parts.join(" • ")}`
      : "Browse all available scholarships";
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white ">
      {/* Header Section */}
      <div
        className=" text-white"
        style={{
          background: "linear-gradient(180deg, #301314 0%,#CA2328 100%)",
        }}
      >
        <div className="px-4 py-12 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full backdrop-blur-sm mb-4">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {getTitle()}
            </h1>
            <p className="text-lg sm:text-xl text-white mb-6 max-w-3xl mx-auto">
              {getSubtitle()}
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{resultsCount}</div>
              <div className="text-sm text-white">University</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">
                {searchResult.data?.[0]?.deadline ? "Multiple" : "Varies"}
              </div>
              <div className="text-sm text-white">Deadlines</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">
                {new Set(searchResult.data?.map((d: any) => d.university))
                  .size || 0}
              </div>
              <div className="text-sm text-white">Country</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-12 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto -mt-8 relative z-10">
        {/* Results Info */}
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Scholarship Opportunities
              </h2>
              <p className="text-gray-600">
                Found{" "}
                <span className="font-bold text-red-600">{resultsCount}</span>{" "}
                matching scholarships
                {country && ` in ${country}`}
                {city && `, ${city}`}
                {program && ` for ${program}`}
              </p>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {country && (
                <span className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium">
                  <Globe className="w-3 h-3" />
                  {country}
                </span>
              )}
              {city && (
                <span className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  <MapPin className="w-3 h-3" />
                  {city}
                </span>
              )}
              {program && (
                <span className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  <GraduationCap className="w-3 h-3" />
                  {program}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {resultsCount > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {searchResult.data.map((offer: any, index: number) => (
              <div
                key={offer._id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-card-appear"
              >
                <OfferCard offer={offer} />
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No scholarships found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any scholarships matching your current filters.
              Try adjusting your search criteria.
            </p>
            <Link
              href="/student-home-page"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Adjust Filters
            </Link>
          </div>
        )}

        {/* Pagination/Footer Note */}
        {resultsCount > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">
              Showing {resultsCount} of {resultsCount} results • All
              scholarships are updated regularly •
              <a
                href={`tel:${hotlineNumber}`}
                aria-label={`Call our hotline at ${hotlineNumber}`}
                className="text-red-600 hover:text-red-800 ml-1"
              >
                Need help choosing?
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindSearchResult;
