import React from "react";
import TouristHomePackages from "../components/home/homePackage";
import TouristASide from "./components/aSide";
import TouristFilter from "./components/touristFilter";

import generateSEO from "@/lib/seo";

export const metadata = generateSEO(
  "Best Travel & Visa Consultancy for China, Thailand & Malaysia",
  "GM International provides professional tourist visa services, travel planning, holiday packages, flight booking, and international travel assistance for China, Thailand, and Malaysia.",
);

const TouristAllPackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-package/api/v1/get/all-packages/bd-client`,
    {
      next: { revalidate: 300 },
    },
  );

  const data = await res.json();

  const from = "tourist";

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
        {/* <div className="hidden md:block mt-10 p-8">
          
          <TouristFilter allPackage={data} />
        </div> */}
        <div>
          <TouristHomePackages packages={data.data} />
        </div>
      </div>
    </div>
  );
};

export default TouristAllPackage;
