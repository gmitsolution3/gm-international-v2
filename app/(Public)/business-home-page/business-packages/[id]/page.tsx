import React from "react";
import { getBusinessDetails } from "../../components/fetches";
import Link from "next/link";

interface BusinessDetailsProps {
  params: { id: string };
}

const BusinessPackageDetails = async ({ params }: BusinessDetailsProps) => {
  const { id } = await params;
  const packageDetails = await getBusinessDetails(id);


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

  if (!packageDetails) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-xl font-semibold">
          No packages available the moment
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6 lg:p-10">
      <div className="bg-red-700 text-white p-6 rounded-t-xl flex justify-between items-center sticky top-0 z-10">
        <h2 className="text-2xl md:text-3xl font-bold">
          {packageDetails.packageName}
        </h2>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        {/* Tour Summary (Header Card) */}
        <div className="p-4 bg-red-50 rounded-lg border border-red-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="text-sm">
            <p className="text-red-700 font-bold uppercase mb-1">Duration</p>
            <p className="font-semibold text-gray-800">
              {packageDetails.duration}
            </p>
          </div>
          <div className="text-sm">
            <p className="text-red-700 font-bold uppercase mb-1">Min Pax</p>
            <p className="font-semibold text-gray-800">
              {packageDetails.minimumPax}
            </p>
          </div>
          <div className="text-sm">
            <p className="text-red-700 font-bold uppercase mb-1">
              Price/Person
            </p>
            <p className="font-semibold text-gray-800">
              ৳{packageDetails.paxPrice.toLocaleString()}
            </p>
          </div>
          <div className="text-sm">
            <p className="text-red-700 font-bold uppercase mb-1">Destination</p>
            <p className="font-semibold text-gray-800">
              {packageDetails.country}
            </p>
          </div>
        </div>

        {/* Includes Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Includes</h3>
          <div className="space-y-3">
            {packageDetails.includes.map((item: any) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-gray-800 font-medium">
                    {item.title}
                  </span>
                </div>
                <span className="text-sm text-gray-500">Included</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tour Schedule Section (Details) */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Tour Schedule
          </h3>
          <div className="space-y-4">
            {packageDetails.phases.map((phase: any) => (
              <div
                key={phase.phaseNumber}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"
              >
                <h4 className="text-lg font-bold text-red-700 mb-3">
                  Phase {phase.phaseNumber}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">
                      Start Date
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {phase.startDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">
                      End Date
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {phase.endDate}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-600 font-medium mb-1">
                      Return City
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {phase.returnCity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            🏨 Accommodation
          </h3>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xl font-bold text-gray-900">
                {packageDetails.hotelName}
              </p>
              <div className="flex gap-1">
                {renderStars(packageDetails.hotelRating)}
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {packageDetails.hotelRating} Star Hotel
            </p>
          </div>
        </div>

        {/* Description & Book Button */}
        <div className="pt-4 border-t border-gray-200">
          {packageDetails.description && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                About This Package
              </h3>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
                {packageDetails.description}
              </p>
            </div>
          )}
          <Link href="/business-home-page/business-submit-form">
            <button className="w-full bg-red-700 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg">
              Book Now →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessPackageDetails;
