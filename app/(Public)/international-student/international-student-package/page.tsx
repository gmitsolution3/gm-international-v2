import { Filter } from "lucide-react";
import React from "react";
import OfferCard from "../../student-home-page/components/OfferCard";

const InternationalStudentPackage = async () => {
  const res = await fetch(
    "https://gm-international-server-gamma.vercel.app/international-student-package",
    {
      cache: "no-store",
    }
  );

  const result = await res.json();

  const from = "internationalDetails";

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="border-b border-gray-200 px-4 py-8 sm:px-6 md:px-8 lg:px-12">
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
            {/* <div className="flex flex-wrap gap-2">
              {filters.map((filter, index) => (
                <FilterTag
                  key={index}
                  label={filter}
                  onRemove={() => removeFilter(filter)}
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>
      <div className="min-h-[60vh] mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          {result.map((offer: any, index: number) => (
            <OfferCard key={index} offer={offer} form={from} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternationalStudentPackage;
