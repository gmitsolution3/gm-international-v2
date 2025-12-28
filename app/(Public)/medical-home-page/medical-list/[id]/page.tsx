import React from "react";
import { getMedicalDetails } from "../../components/fetches";
import HospitalDetailPage from "../components/details";

interface MedicalDetailsParams {
  params: { id: string };
}

const MedicalDetails = async ({ params }: MedicalDetailsParams) => {
  const { id } = await params;
  const data = await getMedicalDetails(id);

  return (
    <div className="p-8">
      <div>
        <HospitalDetailPage hospital={data} />
      </div>
    </div>
  );
};
export default MedicalDetails;
