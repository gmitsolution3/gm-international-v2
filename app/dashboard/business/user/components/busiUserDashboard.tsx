"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import { getBusinessUserDashboardData } from "./dataFetch";
import Loader from "@/components/ui/loader";
import StatCard from "@/app/dashboard/scholarship/components/stat_card";
import { BadgePlus, Bookmark, Boxes, CookingPot, CopyCheck } from "lucide-react";

type DashboardResponse = {
  dashboard: {
    totalApplications: number;
    totalDeals: number;
    latestApplications: any[];
    latestDeals: any[];
  };
};

const getStatusCount = (list: any[] = []) =>
  list.reduce(
    (acc, item) => {
      const status = item?.applicationStatus;
      if (status) {
        acc[status] = (acc[status] || 0) + 1;
      }
      return acc;
    },
    { approved: 0, rejected: 0, pending: 0 }
  );

export const BusinessUserDashboard = () => {
  const { data: session, status } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const email = session?.user?.email;

  useEffect(() => {
    if (!email) return;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const data = await getBusinessUserDashboardData(email);
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [email]);

  const applicationStatus = useMemo(
    () => getStatusCount(dashboardData?.dashboard?.latestApplications || []),
    [dashboardData]
  );

  const dealStatus = useMemo(
    () => getStatusCount(dashboardData?.dashboard?.latestDeals || []),
    [dashboardData]
  );

  if (status === "loading" || loading) {
    return (
      <div className="mx-10">
        <Loader />
      </div>
    );
  }

  if (!dashboardData?.dashboard) {
    return <div className="mx-10">No dashboard data found</div>;
  }

  const { totalApplications, totalDeals } = dashboardData.dashboard;

  return (
    <div className="mx-10">
      <div>
        <h1 className="text-2xl font-bold mb-2">Business User Dashboard</h1>
        <p>Welcome, {session?.user?.name || "User"}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-6">
        {/* Total Applications */}
        <StatCard
          title="Application Submitted"
          value={totalApplications}
          icon={<BadgePlus className="w-5 h-5 text-red-700" />}
          trend="up"
        />

        {/* Total Deals */}
        <StatCard
          title="Total Deals"
          value={totalDeals}
          icon={<Boxes className="w-5 h-5 text-red-700" />}
          trend="up"
        />

        {/* Application Approved */}
        <StatCard
          title="Application Approved"
          value={applicationStatus.approved}
          icon={<CopyCheck className="w-5 h-5 text-red-700" />}
          trend="up"
        />

        {/* Business Deals Approved */}
        <StatCard
          title="Business Deals Approved"
          value={dealStatus.approved}
          icon={<Bookmark className="w-5 h-5 text-red-700" />}
          trend="up"
        />

        {/* Application Rejected */}
        <StatCard
          title="Application Rejected"
          value={applicationStatus.rejected}
          icon={<CookingPot className="w-5 h-5 text-red-700" />}
          trend="up"
        />

        {/* Business Deals Rejected */}
        <StatCard
          title="Business Deals Rejected"
          value={dealStatus.rejected}
          icon={<CookingPot className="w-5 h-5 text-red-700" />}
          trend="up"
        />
      </div>
    </div>
  );
};


