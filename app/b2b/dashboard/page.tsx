import React from "react";
import { getB2BDocumentCount } from "./components/fetches";
import StatCard from "@/app/dashboard/scholarship/components/stat_card";
import { BadgePlus } from "lucide-react";

const B2BUserDashboard = async () => {
  const count = await getB2BDocumentCount();

  const { dashboard } = count;

  if (!dashboard) {
    return <div className="mx-10">No dashboard data found</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-6">
        <StatCard
          title="Total Scholarship package"
          value={dashboard.b2bScholarshipPackage}
          icon={<BadgePlus className="w-5 h-5 text-red-700" />}
          trend="up"
        />
        <StatCard
          title="Total Tourist package"
          value={dashboard.b2bTouristPackage}
          icon={<BadgePlus className="w-5 h-5 text-red-700" />}
          trend="up"
        />
      </div>
    </div>
  );
};

export default B2BUserDashboard;
