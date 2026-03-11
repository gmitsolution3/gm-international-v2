import React from "react";
import ScholarshipPackage from "./components/scholarshipPackage";



const ScholarshipPackageFetch = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/scholarship-package`,
  );
  return await response.json();
};

const FilteredData = async () => {
  const fData = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-filtered-data`,
  );

  return await fData.json();
};

const ScholarshipPackageList = async () => {
  
  const [data, filterData] = await Promise.all([
    ScholarshipPackageFetch(),
    FilteredData(),
  ]);

  return (
    <div className="min-h-screen">
      <ScholarshipPackage packageData={data} filterData={filterData} />
    </div>
  );
};

export default ScholarshipPackageList;
