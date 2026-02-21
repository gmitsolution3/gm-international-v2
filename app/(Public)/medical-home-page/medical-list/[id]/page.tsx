import React from "react";
import { getMedicalDetails } from "../../components/fetches";
import HospitalDetailsPage from "../../components/HospitalDetailsPage";

interface MedicalDetailsParams {
  params: { id: string };
}

const MedicalDetails = async ({ params }: MedicalDetailsParams) => {
  const { id } = await params;
  const data = await getMedicalDetails(id);

  return (
    <div className="p-8">
      <div>
        <HospitalDetailsPage hospital={data} />
      </div>
    </div>
  );
};
export default MedicalDetails;
