import React from "react";
import UmrahCard from "../components/UmrahCard";
import { fetchAllUmrahPackage } from "@/app/dashboard/hajj-umrah/admin/umrah-packages/page";

const UmrahPackages = async () => {
  const umrahPackage = await fetchAllUmrahPackage();
  return (
    <div>
      <div>
        <UmrahCard packages={umrahPackage.data} />
      </div>
    </div>
  );
};

export default UmrahPackages;
