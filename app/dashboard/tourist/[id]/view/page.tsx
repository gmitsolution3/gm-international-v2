import React from "react";
import ViewApplicationDetails from "../components/ViewApplication";

interface IParams {
  params: { id: string };
}

export const fetchApplicationDetails = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-application/api/v1/get/single-application/${id}`,
    {
      cache: "no-store",
    },
  );

  const result = await res.json();
  return result;
};

const ViewApplication = async ({ params }: IParams) => {
  const { id } = await params;
  const application = await fetchApplicationDetails(id);


  return (
    <div>
      <ViewApplicationDetails data={application.data} />
    </div>
  );
};

export default ViewApplication;
