import React from "react";
import { DashboardErrorHandler } from "@/app/dashboard/components/emtryHandaller";
import MediAppli from "./components/mediApp/MediAppli";

const ManageApplicationPackage = async () => {
  const medicalApplication = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-application/api/v1/get-all`,
    { cache: "no-store" },
  );
  const medicalApplicationData = await medicalApplication.json();

  return (
    <div>
      {medicalApplicationData.data.length > 0 ? (
        <div>
          <MediAppli application={medicalApplicationData.data} />
        </div>
      ) : (
        <DashboardErrorHandler />
      )}
    </div>
  );
};

export default ManageApplicationPackage;
