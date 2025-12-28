import React from "react";
import { getAllMedicalDocuments } from "../../components/fetches";
import StatCard from "../../scholarship/components/stat_card";
import { CheckCircle, Clock, Users, XCircle } from "lucide-react";

const MedicalAdminPage = async () => {
  const data = await getAllMedicalDocuments();
  

  const {
    totalApprovedApplication,
    totalMedicalAppointmentForm,
    totalMedicalList,
    totalMedicalPackages,
    totalPendingApplication,
    totalRejectCount,
  } = data.documentCount;

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Appointment"
            value={totalMedicalAppointmentForm}
            icon={<Users className="w-5 h-5 text-green-500" />}
            trend="up"
          />
          <StatCard
            title="Total Medical List"
            value={totalMedicalList}
            icon={<Clock className="w-5 h-5 text-orange-500" />}
            trend="up"
          />
          <StatCard
            title="Total Medical Package"
            value={totalMedicalPackages}
            icon={<CheckCircle className="w-5 h-5 text-green-500" />}
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

export default MedicalAdminPage;
