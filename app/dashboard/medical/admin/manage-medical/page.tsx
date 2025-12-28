import React from "react";
import { AddMedicalPackage } from "../manage-application-package/components/addMedicalPackage";
import AdminMedicalPackage from "../manage-application-package/components/medicalPackage";
import { Trash2 } from "lucide-react";
import { DashboardErrorHandler } from "@/app/dashboard/components/emtryHandaller";

const ManageMedical = async () => {
  const value: string = "medicalList";
  const medicalPackages = await fetch(
    "https://gm-international-server-gamma.vercel.app/get-medical-all-package",
    {
      cache: "no-store",
    }
  );
  const medicalPackageData = await medicalPackages.json();


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

      {medicalPackageData.length > 0 ? (
        <div>
          <AdminMedicalPackage treatments={medicalPackageData} />
        </div>
      ) : (
        <DashboardErrorHandler />
      )}
    </div>
  );
};

export default ManageMedical;
