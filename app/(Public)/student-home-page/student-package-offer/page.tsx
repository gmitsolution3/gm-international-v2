import React from "react";
import ScholarshipPackage from "./components/scholarshipPackage";

const ScholarshipPackageList = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/scholarship-package`,
  );
  const data = await response.json();

  const fData = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-filtered-data`,
  );

  const filterData = await fData.json();




  return (
    <div className="min-h-screen">
      <ScholarshipPackage packageData={data} filterData={filterData} />
    </div>
  );
};

export default ScholarshipPackageList;
