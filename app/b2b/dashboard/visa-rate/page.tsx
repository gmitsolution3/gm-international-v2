import React from "react";
import VisaPackages from "../components/VisaPackages";

const VisaRate = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b/get-visa-rate`,
    {
      cache: "no-cache",
    },
  );

  const result = await res.json();


  return (
    <div>
      <VisaPackages data={result} />
    </div>
  );
};

export default VisaRate;
