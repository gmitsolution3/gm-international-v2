import React from "react";
import { getAllTouristDocuments } from "../../components/fetches";
import StatCard from "../../scholarship/components/stat_card";
import { CheckCircle, Clock, Users, XCircle } from "lucide-react";

const TouristAdmin = async () => {
  const data = await getAllTouristDocuments();

 

  const {
    totalApprovedApplication,
    totalPendingApplication,
    totalRejectCount,
    totalTouristPackageBookings,
    totalTouristPackage,
  } = data.documentCount;

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Application"
            value={totalTouristPackageBookings}
            icon={<Users className="w-5 h-5 text-green-500" />}
            trend="up"
          />
          <StatCard
            title="Total Package"
            value={totalTouristPackage}
            icon={<Clock className="w-5 h-5 text-orange-500" />}
            trend="up"
          />
          <StatCard
            title="Approved Appointment"
            value={totalApprovedApplication}
            icon={<CheckCircle className="w-5 h-5 text-green-500" />}
            trend="up"
          />
          <StatCard
            title="Pending Appointment"
            value={totalPendingApplication}
            icon={<XCircle className="w-5 h-5 text-red-500" />}
            trend="up"
          />
          <StatCard
            title="Rejected Appointment"
            value={totalRejectCount}
            icon={<XCircle className="w-5 h-5 text-red-500" />}
            trend="down"
          />
        </div>
      </div>
    </div>
  );
};

export default TouristAdmin;
