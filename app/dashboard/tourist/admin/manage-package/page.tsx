import React from "react";
import SelectTourPackage from "./components/SelectTourPackage";

const TouristManagePackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-package/api/v1/get/all-packages/bd-client`,
    {
      cache: "no-store",
    },
  );

  const resOfResult = await res.json();

  return (
    <div>
      <SelectTourPackage initialPackages={resOfResult.data} />
    </div>
  );
};

export default TouristManagePackage;
