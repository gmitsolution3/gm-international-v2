
import Link from "next/link";
import React from "react";

interface PhaseItem {
  phaseNumber: number;
  startDate: string;
  endDate: string;
  returnCity: string;
}

interface IncludeItem {
  id: string;
  title: string;
}

interface TourPackage {
  _id: string;
  packageName: string;
  eventName: string;
  duration: string;
  country: string;
  phases: PhaseItem[];
  includes: IncludeItem[];
  hotelName: string;
  hotelRating: string;
  customerPrice: number;
  paxPrice: number;
  minimumPax: number;
  description: string;
  createdAt: string;
  createdBy: string;
}

interface TourPackageCardsProps {
  packages: TourPackage[];
}

const ShowHomePackage: React.FC<TourPackageCardsProps> = ({
  packages = [],
}) => {

  const renderStars = (rating: string | undefined) => {
    if (!rating) return [];

    const numericPart = rating.replace(/[^\d]/g, "");
    const count = parseInt(numericPart) || 0;

    const starCount = Math.min(count, 5);

    return [...Array(starCount)].map((_, i) => (
      <span key={i} className="text-yellow-500 text-lg">
        ★
      </span>
    ));
  };

  const dummyVisaData = {
    name: "Business Visa/Type",
    amount: 123000,
    deadline: "September 12, 2025",
    description:
      "Business tourists contribute significantly to global trade by building cross-border relations, expanding business networks, and creating pathways for future investments.",
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
            Explore our{" "}
            <span className="text-red-700">Business Tour Packages</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explore our exclusive dolor business ame designed to your expand to
            help your expand network and grow the business globally.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg: TourPackage) => (
            <div
              key={pkg._id}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 transform hover:shadow-2xl hover:shadow-red-500 hover:border-red-700 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className="border border-gray-300 rounded-xl p-5 bg-white shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {pkg.packageName}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">Amount:</p>
                  <p className="text-2xl font-extrabold text-red-700 mb-2">
                    BDT {dummyVisaData.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Deadline:</p>
                  <p className="text-base font-bold text-gray-800 mb-3">
                    {dummyVisaData.deadline}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-3">
                    {dummyVisaData.description}
                  </p>
                </div>
                {/* View Details Button */}
                <Link href={`/business-home-page/business-packages/${pkg._id}`}>
                  <button
                    // onClick={() => handleViewDetails(pkg)}
                    className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {packages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl font-semibold">
              No packages available the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowHomePackage;
