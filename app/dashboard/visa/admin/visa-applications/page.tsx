import React from "react";

const VisaApplication = async () => {
  const res = await fetch(
    "https://gm-international-server-gamma.vercel.app/get-all-visa-application",
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  return <div>VisaApplication</div>;
};

export default VisaApplication;
