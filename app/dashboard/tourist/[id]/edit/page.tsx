import React from "react";
import { fetchApplicationDetails } from "../view/page";
import EditApplicationForm from "../components/EditApplicationFrom";
interface IParams {
  params: { id: string };
}

const EditApplications = async ({ params }: IParams) => {
  const { id } = await params;
  const application = await fetchApplicationDetails(id);
  return (
    <div>
      <EditApplicationForm data={application.data} />
    </div>
  );
};

export default EditApplications;
