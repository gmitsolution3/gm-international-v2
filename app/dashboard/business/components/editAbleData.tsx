"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getSubmitApplication } from "./fetches";
import EditAbleTable from "./eidtTable";
import Loader from "@/components/ui/loader";

interface FormProps{
  form : string;
}


export const EditAbleData = ({ form }: FormProps) => {
  const { data: session } = useSession();
  const [applicationData, setApplicationData] = useState();
  const[isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    if (!session?.user?.email) return;
    try {
      setIsLoading(true)
      const userFormData = await getSubmitApplication(session?.user?.email);
      setApplicationData(userFormData);
    } catch (err) {
      console.error("find error", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [session]);

  if(isLoading){
    return <Loader/>
  }


  // const form = "edit";
  return (
    <div>
      <EditAbleTable editTableData={applicationData} form={form} />
    </div>
  );
};
