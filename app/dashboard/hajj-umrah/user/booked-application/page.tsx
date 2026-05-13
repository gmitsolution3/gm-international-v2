import { getServerSession } from "next-auth";
import React from "react";
import { fetchMyBooked } from "../my-application/page";
import { authConfig } from "@/auth.config";
import Link from "next/link";
import AllUmrahPackage from "../../admin/components/AllUmrahPackage";

export const fetchesPackages = async (email: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/v1/get-user-booked-packages/${email}`,
    {
      cache: "no-store",
    },
  );

  const result = await res.json();
  return result;
}

const BookedApplications = async () => {
  const session = await getServerSession(authConfig);
  const user = session?.user as any;
  const applications = await fetchesPackages(user?.email);

  const userRole = user?.userRole;

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
              <span className="text-xl">+</span> Booked Package
            </button>
          </Link>
        </div>
        {/* Packages Table/Card View */}
        <AllUmrahPackage packages={applications.data} userRole={userRole} />
      </div>
    </div>
  );
};

export default BookedApplications;
