import React from "react";

const VisaApplication = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-all-visa-application`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  return <div>VisaApplication</div>;
};

export default VisaApplication;
