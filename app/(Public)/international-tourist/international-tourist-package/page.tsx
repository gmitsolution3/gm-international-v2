import React from "react";
import TouristFilter from "../../tourist-home-page/package/components/touristFilter";
import TouristHomePackages from "../../tourist-home-page/components/home/homePackage";
import generateSEO from "@/lib/seo";

export const metadata = generateSEO(
  "Best Travel & Visa Consultancy for Bangladesh",
  "GM International provides professional tourist visa services, travel planning, holiday packages, flight booking, and international travel assistance for Bangladesh.",
);

const InternationalPackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-package/api/v1/get/all-packages/int-client`,
    {
      next: { revalidate: 300 },
    },
  );

  const result = await res.json();

  const from = "allInternationalPackages";
  return (
    <div>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-16 text-center py-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Our <span className="text-red-600">Available Offers</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Discover our exclusive travel packages designed to give you
          unforgettable experiences. Choose from our curated destinations and
          start your adventure today.
        </p>
      </div>
      <div className="flex max-w-full w-full justify-center gap-10">
        <div>
          <TouristHomePackages packages={result.data} />
        </div>
      </div>
    </div>
  );
};

export default InternationalPackage;
