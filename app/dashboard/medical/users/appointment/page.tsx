"use client";

import { useSession } from "next-auth/react";
import React, { use, useEffect, useState } from "react";
import { appointmentForm } from "../components/fetches";
import AppointmentTable from "../components/appointmentForm";

const AppointmentStatus = () => {
  const { data: session } = useSession();



  const [appointmentData, setAppointmentData] = useState<any>([]);

  const fetchData = async () => {
    const data =await appointmentForm(session?.user?.email);
    setAppointmentData(data);
  };

  useEffect(() => {
    fetchData();
  }, [session?.user?.email]);


  return (
    <div>
      <AppointmentTable appointments={appointmentData} form = {"application"}/>
    </div>
  );
};

export default AppointmentStatus;
