import React from "react";
import B2BPackagesPage from "../components/B2BPackagesPage";

const AssignTouristPackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/all/tourist-packages/for-b2b`,
    {
      cache: "no-store",
    },
  );
  const resOfResult = await res.json();



  return (
    <div>
      <B2BPackagesPage data={resOfResult.data} />
    </div>
  );
};

export default AssignTouristPackage;
