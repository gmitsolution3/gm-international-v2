import { authConfig } from '@/auth.config';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import { getUserMedicalDashboard } from '../../components/fetches';
import StatCard from '../../scholarship/components/stat_card';
import { Clock, Users } from 'lucide-react';

const MedicalUser = async() => {

  const session = await getServerSession(authConfig);

  if(!session?.user?.email){
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

  const { totalMedicalApplication, totalMedicalPackage, totalMedicalList } =
    documentData.documentCount;

  return (
    <div className="my-10 flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Application"
            value={totalMedicalApplication}
            icon={<Users className="w-5 h-5 text-green-500" />}
            trend="up"
          />
          <StatCard
            title="Total Package"
            value={totalMedicalPackage}
            icon={<Clock className="w-5 h-5 text-orange-500" />}
            trend="up"
          />
          <StatCard
            title="Total Medical"
            value={totalMedicalList}
            icon={<Clock className="w-5 h-5 text-orange-500" />}
            trend="up"
          />
        </div>
      </div>
    </div>
  );
}

export default MedicalUser;
