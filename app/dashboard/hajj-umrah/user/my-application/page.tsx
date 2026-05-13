import { authConfig } from "@/auth.config";
import { getServerSession } from "next-auth";
import React from "react";
import ApplicationBookedTable from "../../admin/components/umrahHajjBookedTable/ApplicationBookedTable";

export const fetchMyBooked = async (email: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/v1/get-user-booked-umrah-packages/${email}`,
    {
      cache: "no-store",
    },
  );

  const result = await res.json();
  return result;
};

const MyApplication = async () => {
  const session = await getServerSession(authConfig);
  const user = session?.user as any;
  const applications = await fetchMyBooked(user?.email);
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
        <ApplicationBookedTable bookedData={applications} />
      </div>
    </div>
  );
};

export default MyApplication;
