import React from "react";
import ApplicationForm from "../components/ApplicationForm";
import { getServerSession } from "next-auth";

const CSCAApplication = async () => {
  const session = await getServerSession();

  const userEmail = session?.user?.email;

  return (
    <div className="min-h-screen">
      <ApplicationForm userEmail={userEmail} />
    </div>
  );
};

export default CSCAApplication;
