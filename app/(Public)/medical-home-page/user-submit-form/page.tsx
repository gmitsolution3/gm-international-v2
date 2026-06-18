import React from "react";
import AppointmentForm from "./components/submitForm";
import { getAllMedicalData, getMedicalDetails } from "../components/fetches";
import { getServerSession } from "next-auth";

interface PageProps {
  searchParams: {
    id: string;
    b2bId?: string;
  };
}

const UserSubmitForm = async ({ searchParams }: PageProps) => {
  const { id, b2bId } = await searchParams;
  const user = await getServerSession();

  if (!user?.user) {
    return <div>Login require</div>;
  }

  const packageData = await getMedicalDetails(id);
  return (
    <div>
      <AppointmentForm
        hospitals={packageData.data}
        b2bId={b2bId}
        userEmail={user?.user?.email as string}
      />
    </div>
  );
};

export default UserSubmitForm;
