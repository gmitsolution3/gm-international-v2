import React from "react";
import { getMedicalDetails } from "../../components/fetches";
import HospitalDetailsPage from "../../components/HospitalDetailsPage";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";

interface MedicalDetailsParams {
  params: { id: string };
  searchParams: { b2bId?: string };
}

const MedicalDetails = async ({
  params,
  searchParams,
}: MedicalDetailsParams) => {
  const { id } = await params;
  const { b2bId } = await searchParams;

  const [result, session] = await Promise.all([
    getMedicalDetails(id),
    getServerSession(authConfig),
  ]);

  return (
    <div className="lg:p-8">
      <div>
        <HospitalDetailsPage
          hospital={result.data}
          session={session?.user}
          b2bId={b2bId}
        />
      </div>
    </div>
  );
};
export default MedicalDetails;
