export const dynamic = "force-dynamic";

import React from "react";
import ApplicationBookedTable from "../components/umrahHajjBookedTable/ApplicationBookedTable";
import Loading from "./loading";

const getUmrahHajj = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/v1/get-all-booked-umrah-application`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return {
      success: false,
      message: "Failed to fetch applications",
      data: [],
    };
  }
};

const UmrahHajjApplicationsPage = async () => {
  const umrahHajjData = await getUmrahHajj();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Umrah & Hajj Applications
          </h1>
          <p className="mt-2 text-gray-600">
            View and manage all booked applications
          </p>
        </div>
        {/* Table Component */}
        <ApplicationBookedTable bookedData={umrahHajjData} />
      </div>
    </div>
  );
};

export default UmrahHajjApplicationsPage;
