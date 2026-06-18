import { authConfig } from "@/auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { getUserMedicalDashboard } from "../../components/fetches";
import StatCard from "../../scholarship/components/stat_card";
import { Clock, Users } from "lucide-react";
import MedicalDashboardStats from "../admin/components/MedicalAnalysisState";

const MedicalUser = async () => {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    redirect("/auth/signin");
  }

  const email = session.user.email;
  const documentData = await getUserMedicalDashboard(email);

  if (!documentData || !documentData.documentCount) {
    return (
      <div className="my-10 flex-1 overflow-auto p-6">
        <p className="text-center text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div>
      <MedicalDashboardStats data={documentData} />
    </div>
  );
};

export default MedicalUser;
