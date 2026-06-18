import React from "react";
import HospitalPackageManager from "../components/HospitalPackageManager";

const AssignMedicalPackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-pkg/api/v1/get/b2b-medical-pkg`,
    { cache: "no-cache" },
  );

  const result = await res.json();

  return (
    <div className="min-h-screen bg-gray-50">
      <HospitalPackageManager initialPackages={result.data} />
    </div>
  );
};

export default AssignMedicalPackage;
