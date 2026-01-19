import React from "react";
import ScholarshipPackage from "./components/scholarshipPackage";

const ScholarshipPackageList = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/scholarship-package`,
  );
  const data = await response.json();

  return (
    <div className="min-h-screen">
      <ScholarshipPackage packageData={data}/>
    </div>
  );
};

export default ScholarshipPackageList;
