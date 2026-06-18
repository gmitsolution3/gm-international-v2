import React from "react";
import TouristForm from "../../components/TouristForm";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";

const TouristApplication = async() => {
    const session = await getServerSession(authConfig)
    const email = session?.user?.email
    
  return (
    <div>
      <TouristForm email={email}/>
    </div>
  );
};

export default TouristApplication;
