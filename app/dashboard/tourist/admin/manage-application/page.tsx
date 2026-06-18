
// app/dashboard/tourist/admin/manage-application/page.tsx
export const dynamic = "force-dynamic";

import React from "react";
import { DashboardErrorHandler } from "@/app/dashboard/components/emtryHandaller";

import { IApiResponse } from "@/app/types/touristBooking";
import TouristApplicationTable from "./components/applicationData";


const ManageApplication = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-application/api/v1/get/all-applications`,
      {
        cache: "no-store",
      },
    );

    const resultOfRes: IApiResponse = await res.json();

    return (
      <div className="min-h-screen max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-1 bg-linear-to-b from-red-500 to-red-700 rounded-full"></div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Travel Packages
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Manage and review travel package bookings
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-red-600 font-medium bg-red-50 inline-block px-3 py-1 rounded-full">
              Total Applications: {resultOfRes?.data?.length || 0}
            </p>
          </div>
        </div>

        {resultOfRes?.data?.length > 0 ? (
          <TouristApplicationTable initialPackages={resultOfRes.data} />
        ) : (
          <DashboardErrorHandler />
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <DashboardErrorHandler />;
  }
};

export default ManageApplication;
