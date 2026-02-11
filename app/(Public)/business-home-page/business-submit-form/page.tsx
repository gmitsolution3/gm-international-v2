import React from "react";
import RegistrationForm from "../components/userForm";

type PageProps = {
  searchParams: {
    id?: string;
  };
};

const BusinessSubmitForm = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams;

  if (!id) {
    return (
      <div className="text-2xl text-red-500 min-h-screen flex justify-center items-center">
        <h1>First you have to select package</h1>
      </div>
    );
  }

  return (
    <div>
      <RegistrationForm packageId={id} />
    </div>
  );
};

export default BusinessSubmitForm;
