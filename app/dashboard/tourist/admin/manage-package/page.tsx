import React from "react";
import { AddTouristPackage } from "./components/addTouristpackage";
import PackageManagement from "./components/packageManagement";
import TourPackagesAdmin from "./components/packageManagement";
import { DashboardErrorHandler } from "@/app/dashboard/components/emtryHandaller";
import SelectTourPackage from "./components/SelectTourPackage";

const TouristManagePackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/all/tourist-package/bd-client`,
    {
      cache: "no-store",
    },
  );

  const resOfResult = await res.json();

  return (
    <div>
      <SelectTourPackage initialPackages={resOfResult} />
    </div>
  );
};

export default TouristManagePackage;
