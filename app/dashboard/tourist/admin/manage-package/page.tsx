import React from "react";
import { AddTouristPackage } from "./components/addTouristpackage";
import PackageManagement from "./components/packageManagement";
import TourPackagesAdmin from "./components/packageManagement";
import { DashboardErrorHandler } from "@/app/dashboard/components/emtryHandaller";

const TouristManagePackage = async () => {
  const res = await fetch(
    "https://gm-international-server-gamma.vercel.app/all/tourist-package",
    {
      cache: "no-store",
    }
  );

  const resOfResult = await res.json();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Tour Packages Management
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage and review tour packages
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Total Packages: {resOfResult.length}
          </p>
        </div>
        <AddTouristPackage />
      </div>
      <div>
        {resOfResult.length > 0 ? (
          <TourPackagesAdmin initialPackages={resOfResult} />
        ) : (
          <DashboardErrorHandler />
        )}
      </div>
    </div>
  );
};

export default TouristManagePackage;
