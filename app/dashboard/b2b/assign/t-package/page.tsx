import React from "react";
import B2BPackagesPage from "../components/B2BPackagesPage";

const AssignTouristPackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b-user/api/v1/get-tourist-pkg`,
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
