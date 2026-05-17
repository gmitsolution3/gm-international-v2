import React from "react";
import ScholarshipPackage from "./components/scholarshipPackage";
import generateSEO from "@/lib/seo";

export const metadata = generateSEO(
  "International Student Scholarships for China, Malaysia & Australia",
  "Apply for fully funded and partial scholarships in China, Malaysia, and Australia. Get expert support for admissions, visa applications, and study abroad programs.",
);




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
