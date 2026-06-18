import React from "react";
import CantonFairPackageManager from "../components/CantonFairPackageManager";

const AssignBusinessPackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/business-package/api/v1/get/b2b-business-packages`,
    {
      cache: "no-cache",
    },
  );
  const result = await res.json();

  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        <CantonFairPackageManager initialPackages={result.data} />
      </div>
    </div>
  );
};

export default AssignBusinessPackage;
