import React from "react";
import ScholarshipPackage from "./components/scholarshipPackage";
import generateSEO from "@/lib/seo";
import ScholarshipFetch from "@/app/util/scholarship/fetches/fetches";

export const metadata = generateSEO(
  "International Student Scholarships for China, Malaysia & Australia",
  "Apply for fully funded and partial scholarships in China, Malaysia, and Australia. Get expert support for admissions, visa applications, and study abroad programs.",
);

const ScholarshipPackageList = async () => {
  const [data, filterData] = await Promise.all([
    ScholarshipFetch.getAllScholarshipPkg(),
    ScholarshipFetch.getFilterData(),
  ]);

  return (
    <div className="min-h-screen">
      <ScholarshipPackage
        packageData={data.data}
        filterData={filterData.data}
      />
    </div>
  );
};

export default ScholarshipPackageList;
