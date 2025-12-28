"use client";

import React, { useEffect, useState } from "react";
import { getAllBusinessDocuments } from "../../components/fetches";
import { useSession } from "next-auth/react";
import { BookA, Bookmark, ChartBarIncreasing, ChartPie, Codesandbox, Hotel, Loader } from "lucide-react";
import StatCard from "@/app/dashboard/scholarship/components/stat_card";

type DashboardResponse = {
    company: number;
    businessPackage: number;
    applicationCount: number;
    businessDeal: number;
    adminDashboard: {
      applicationCount: number;
      businessDeal: number;
      businessPackage: number;
      company: number;
    };
};

export const MainAdminDashboard =() => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    if (!session) return;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const data = await getAllBusinessDocuments();
        const finalData = data.adminDashboard;
        setAdminData(finalData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [session]);

  if (status === "loading" || loading) {
    return (
      <div className="mx-10">
        <Loader />
      </div>
    );
  }

  if (!adminData) {
    return <div className="mx-10">No dashboard data found</div>;
  }

  return (
    <div>
      {" "}
      <div className="mx-10">
        <div>
          <h1 className="text-2xl font-bold mb-2">Business User Dashboard</h1>
          <p>Welcome, {session?.user?.name || "User"}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 my-6">
          <StatCard
            title="Total Application"
            value={adminData.applicationCount}
            icon={<BookA className="w-5 h-5 text-red-700" />}
            trend="up"
          />
          
          <StatCard
            title="Total Deals"
            value={adminData.businessDeal}
            icon={<ChartBarIncreasing className="w-5 h-5 text-red-700" />}
            trend="up"
          />
          
          <StatCard
            title="Total Business Package"
            value={adminData.businessPackage}
            icon={<ChartPie className="w-5 h-5 text-red-700" />}
            trend="up"
          />
         
          <StatCard
            title="Total Company"
            value={adminData.company}
            icon={<Hotel className="w-5 h-5 text-red-700" />}
            trend="up"
          />
        </div>
      </div>
    </div>
  );
};
