import React from "react";
import AppointmentForm from "./components/submitForm";
import { getAllMedicalData, getMedicalDetails } from "../components/fetches";

interface PageProps {
  searchParams: {
    id: string;
    b2bId?: string;
  };
}

const UserSubmitForm = async ({ searchParams }: PageProps) => {
  const { id, b2bId } = await searchParams;
 

  const packageData = await getMedicalDetails(id);

  return (
    <div>
      <AppointmentForm hospitals={packageData} b2bId={b2bId} />
    </div>
  );
};

export default UserSubmitForm;
