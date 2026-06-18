import React from "react";
import { getAllBusinessApplication } from "../../components/fetches";
import ShowAllBusinessApplications from "./components/showAllBusinessApplications";

const MangeBusinessApplications = async () => {
  const userApplication = await getAllBusinessApplication();

  

  return (
    <div>
      <ShowAllBusinessApplications initialData={userApplication.data} />
    </div>
  );
};

export default MangeBusinessApplications;
