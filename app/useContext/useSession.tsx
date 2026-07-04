import { auth } from "@/auth";
import React from "react";

const useSession = async () => {

  const session = await auth(); 

  if (!session) {
    return null;
  }

  return session;
  
};

export default useSession;
