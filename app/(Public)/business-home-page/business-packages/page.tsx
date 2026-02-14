import React from "react";
import { getBusinessPackages } from "../components/fetches";
import ShowHomePackage from "../components/showHomePackage";

const BusinessPackages = async () => {
  const packages = await getBusinessPackages();

  return (
    <div className="p-4 md:p-10">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Business Tour <span className="text-red-700">Packages</span>
          <br />
          <span className="text-red-700">With</span>{" "}
          Visa <span className="text-red-700">&</span> Air Ticket
        </h1>
      </div>
      <div>
        <ShowHomePackage packages={packages} />
      </div>
    </div>
  );
};

export default BusinessPackages;
