"use client";

import { useEffect, useState } from "react";
// import FilterTag from "./filter-tag"
import { Filter } from "lucide-react";
import OfferCard, { ScholarshipCardProps } from "../../components/OfferCard";
import FilterTag from "./filtered";


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

export default function ScholarshipPackage({
  packageData,
}: {
  packageData: ScholarshipCardProps[]
}) {
  const [filters, setFilters] = useState<string[]>(["Doctorate", "Australia"]);

  const [offers, setOffers] = useState<ScholarshipCardProps[]>(packageData || []);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch from your database
//     const fetchOffers = async () => {
//       try {
//         // Replace with your actual API endpoint
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/scholarship-package`,
//         );
//         const data = await response.json();
//         setOffers(data);
//       } catch (error) {
//         console.error("Failed to fetch offers:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOffers();
//   }, []);

  const removeFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const form = "student";

  return (
    <div className="w-full min-h-screen">
      {/* Header Section */}
      <div className="bg-linear-to-r from-white to-gray-50 border-b border-gray-200 px-4 py-8 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
            Found <span className="text-red-600">15</span>{" "}
            <span className="text-red-600">Doctorate</span> Scholarship In{" "}
            <span className="text-red-600">Australia</span>
          </h1>

          {/* Filter Button */}
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200 hover:shadow-lg active:scale-95 animate-slide-up">
              <Filter size={18} />
              Filter Scholarship
            </button>
            Filter Tags
            <div className="flex flex-wrap gap-2">
              {filters.map((filter, index) => (
                <FilterTag
                  key={index}
                  label={filter}
                  onRemove={() => removeFilter(filter)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scholarship Cards Grid */}
      <div className="px-4 py-12 sm:px-6 md:px-8 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {offers.map((offer, index) => (
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
    </div>
  );
}
