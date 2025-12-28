import React from "react";
import { fetchMedicalPackageDetails } from "../../components/fetches";
import PackageDetailsPage from "../components/packagesDetails";

interface MedicalDetailsProps {
  params: { id: string };
}

const MedicalPackageDetails = async ({ params }: MedicalDetailsProps) => {
  const { id } = await params;
  const data = await fetchMedicalPackageDetails(id);

  

  return (
    <div>
      <PackageDetailsPage packageData={data}/>
    </div>
  );
};

export default MedicalPackageDetails;
