import React from "react";
import TravelPackagesTable from "./components/applicationData";
import { DashboardErrorHandler } from "@/app/dashboard/components/emtryHandaller";

const ManageApplication = async () => {
  const res = await fetch(
    "https://gm-international-server-gamma.vercel.app/get-tourist-booking-package",
    {
      cache: "no-store",
    }
  );

  const resultOfRes = await res.json();



  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Travel Packages
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage and review travel package bookings
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Total Applications: {resultOfRes.length}
        </p>
      </div>
      {resultOfRes.length > 0 ? (
        <div>
          <TravelPackagesTable initialPackages={resultOfRes} />
        </div>
      ) : (
        <DashboardErrorHandler />
      )}
    </div>
  );
};

export default ManageApplication;
