import React from "react";
import { AddMedicalPackage } from "./components/addMedicalPackage";
import AppointmentsApplications from "./components/appointmentApplication";
import { Trash2 } from "lucide-react";
import { DashboardErrorHandler } from "@/app/dashboard/components/emtryHandaller";

const ManageApplicationPackage = async () => {
  const medicalApplicatoin = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-medical-all-appointment-forms`,
    { cache: "no-store" }
  );
  const medicalApplicationData = await medicalApplicatoin.json();

  const value: string = "medicalPackage";

  return (
    <div>
      <div className="flex flex-col max-w-7xl mx-auto m-6 sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Medical Appointment Applications
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage and review patient appointments
          </p>
        </div>
        <AddMedicalPackage value={value} />
      </div>

      {medicalApplicationData.length > 0 ? (
        <div>
          <AppointmentsApplications
            initialAppointments={medicalApplicationData}
          />
        </div>
      ) : (
        <DashboardErrorHandler />
      )}
    </div>
  );
};

export default ManageApplicationPackage;
