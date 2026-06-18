import React from "react";
import UmrahPackageDetailsCom from "../../components/UmrahPackageDetailsCom";

export const getUmrahDataBySlug = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/umrah/api/v1/get-single-pkg/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );
  return await res.json();
};

const UmrahPackageDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const pkgDetails = await getUmrahDataBySlug(id);

  return (
    <div>
      <UmrahPackageDetailsCom pkg={pkgDetails.data} />
    </div>
  );
};

export default UmrahPackageDetails;
