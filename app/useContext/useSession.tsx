import { auth } from "@/auth";
import React from "react";

const useSession = async () => {

  const session = await auth(); 

  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  return session;
  
};

export default useSession;
