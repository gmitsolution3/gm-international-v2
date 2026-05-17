import React from "react";
import UmrahCard from "../components/UmrahCard";
import { fetchAllUmrahPackage } from "@/app/dashboard/hajj-umrah/admin/umrah-packages/page";

import generateSEO from "@/lib/seo";

export const metadata = generateSEO(
  "Affordable Umrah & Hajj Packages for Saudi Arabia",
  "Explore affordable Umrah and Hajj packages with complete support for Saudi visa processing, flights, accommodation, transportation, and guided religious tours from Bangladesh.",
);


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
