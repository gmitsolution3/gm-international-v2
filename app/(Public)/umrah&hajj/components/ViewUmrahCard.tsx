import React from "react";
import UmrahCard from "./UmrahCard";

const UmrahHajjData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/umrah/api/v1/get-home-pkg`,
    {
      cache: "no-store",
    },
  );
  return await res.json();
};

const ViewUmrahCard = async () => {
  const umrahData = await UmrahHajjData();

  return (
    <div>
      <UmrahCard packages={umrahData.data} />
    </div>
  );
};

export default ViewUmrahCard;
