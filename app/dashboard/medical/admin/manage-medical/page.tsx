import React from "react";
import { AddMedicalPackage } from "../manage-application-package/components/addMedicalPackage";
import { DashboardErrorHandler } from "@/app/dashboard/components/emtryHandaller";
import { getAllMedicalData } from "@/app/(Public)/medical-home-page/components/fetches";
import HospitalTable from "../manage-application-package/components/HospitalTable";

const ManageMedical = async () => {
  const value: string = "medicalList";

  const medicalData = await getAllMedicalData();


  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Medical Treatments
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Explore available treatment options and appointments
          </p>
        </div>
        <AddMedicalPackage value={value} />
      </div>

      {medicalData.length > 0 ? (
        <div>
          {/* <AdminMedicalPackage treatments={medicalPackageData} /> */}
          <HospitalTable initialHospitals={medicalData} />
        </div>
      ) : (
        <DashboardErrorHandler />
      )}
    </div>
  );
};

export default ManageMedical;
