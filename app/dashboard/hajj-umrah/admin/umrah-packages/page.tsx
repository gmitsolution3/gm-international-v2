// app/dashboard/hajj-umrah/admin/umrah-packages/page.tsx
import Link from "next/link";
import React from "react";
import AllUmrahPackage from "../components/AllUmrahPackage";

export const fetchAllUmrahPackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/get-all/umrah-packages`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );
  const data = await res.json();
  return data;
};

const UmrahPackages = async () => {
  const packages = await fetchAllUmrahPackage();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Umrah Packages</h1>
            <p className="text-gray-600 mt-1">
              Manage your Umrah packages here
            </p>
          </div>
          <Link href="/dashboard/hajj-umrah/admin/umrah-packages/create-package">
            <button className="bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center gap-2">
              <span className="text-xl">+</span> Create Package
            </button>
          </Link>
        </div>
        {/* Packages Table/Card View */}
        <AllUmrahPackage packages={packages.data} />
      </div>
    </div>
  );
};

export default UmrahPackages;
