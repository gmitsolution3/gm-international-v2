// app/dashboard/setting/office-address/page.tsx
import { getOfficeAddress } from "@/app/page";
import Link from "next/link";
import React from "react";
import AddressFormTable from "../components/AddressFormTable";

const OfficeAddress = async () => {
  const officeData = await getOfficeAddress();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-red-800">
              Office Addresses
            </h1>
            <p className="text-gray-600 mt-1">
              Manage all your global office locations
            </p>
          </div>
          <Link href={"/dashboard/setting/office-address/create-address"}>
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Address +
            </button>
          </Link>
        </div>

        {/* Table Component */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <AddressFormTable offices={officeData.data} />
        </div>
      </div>
    </div>
  );
};

export default OfficeAddress;
