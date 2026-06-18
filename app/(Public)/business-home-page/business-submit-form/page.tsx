import React from "react";
import RegistrationForm from "../components/userForm";
import generateSEO from "@/lib/seo";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";

type PageProps = {
  searchParams: {
    id?: string;
    b2bid?: string;
  };
};

export const metadata = generateSEO(
  "China Business Visa & Canton Fair Submitted Form",
  "Apply for China business visas and get complete Canton Fair support with invitation letters, Z Visa processing, travel planning, interpreter support, hotel booking, and business consultancy.",
);

const BusinessSubmitForm = async ({ searchParams }: PageProps) => {
  const { id, b2bid } = await searchParams;
  const user =await getServerSession(authConfig)
  console.log("user", user)
  const userEmail = user?.user?.email

  if (!id) {
    return (
      <div className="text-2xl text-red-500 min-h-screen flex justify-center items-center">
        <h1>First you have to select package</h1>
      </div>
    );
  }

  return (
    <div>
      <RegistrationForm packageId={id} b2bid={b2bid} userEmail={userEmail!}/>
    </div>
  );
};

export default BusinessSubmitForm;
