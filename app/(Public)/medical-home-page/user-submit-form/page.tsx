import React from "react";
import AppointmentForm from "./components/submitForm";
import { getAllMedicalData, getMedicalDetails } from "../components/fetches";

interface PageProps {
  searchParams: {
    id: string;
  };
}

const UserSubmitForm = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams;

  const packageData = await getMedicalDetails(id)

  return (
    <div>
      <AppointmentForm hospitals={packageData} />
    </div>
  );
};

export default UserSubmitForm;
