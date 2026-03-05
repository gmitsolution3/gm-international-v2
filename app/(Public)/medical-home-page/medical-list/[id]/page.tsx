import React from "react";
import { getMedicalDetails } from "../../components/fetches";
import HospitalDetailsPage from "../../components/HospitalDetailsPage";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";

interface MedicalDetailsParams {
  params: { id: string };
}


const MedicalDetails = async ({ params }: MedicalDetailsParams) => {
  const { id } = await params;
  const data = await getMedicalDetails(id);
  const session = await getServerSession(authConfig);


  console.log({session: session?.user})

  return (
    <div className="lg:p-8">
      <div>
        <HospitalDetailsPage hospital={data} session={session?.user} />
      </div>
    </div>
  );
};
export default MedicalDetails;
