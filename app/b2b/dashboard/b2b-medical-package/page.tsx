import HospitalCard from "@/app/(Public)/medical-home-page/components/HospitalCard";
import { MedicalFormData } from "@/app/dashboard/medical/admin/manage-application-package/components/type/type";
import { authConfig } from "@/auth.config";
import { getServerSession } from "next-auth";
import React from "react";

const B2BMedicalPackage = async () => {
  const session = await getServerSession(authConfig);
  // const

  const id = (session?.user as any).id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b-medical-pkg/api/v1/get-all-med-pkg`,
  );

  const result = await res.json();

  return (
    <div className="space-y-6">
      <div className="text-2xl text-red-700 font-bold">Medical Section</div>
      {result.data.packageIds.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          {result.data.packageIds.map(
            (hospital: MedicalFormData, index: number) => (
              <HospitalCard key={index} hospital={hospital} b2bId={id} />
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default B2BMedicalPackage;
