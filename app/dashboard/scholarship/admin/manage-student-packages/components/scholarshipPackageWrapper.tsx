"use client";

import React from "react";
import dynamic from "next/dynamic";

const ScholarshipPackageInAdminDashboard = dynamic(
  () => import("./scholarShipPackageTable"),
  { ssr: false },
);

export const ScholarshipPackageWrapper = ({
  scholarshipPackage,
}: {
  scholarshipPackage: any;
}) => {
  return (
    <div>
      <ScholarshipPackageInAdminDashboard
        scholarshipPackage={scholarshipPackage}
      />
    </div>
  );
};
