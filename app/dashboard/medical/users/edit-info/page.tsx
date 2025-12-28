"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import AppointmentTable from "../components/appointmentForm";
import { appointmentForm } from "../components/fetches";

const EditInfo = () => {
  const { data: session } = useSession();

  const [appointmentData, setAppointmentData] = useState<any>([]);

  const fetchData = async () => {
    const data = await appointmentForm(session?.user?.email);
    setAppointmentData(data);
  };

  useEffect(() => {
    fetchData();
  }, [session?.user?.email]);

  return (
    <div>
      <AppointmentTable appointments={appointmentData} form={"edit"} />
    </div>
  );
};

export default EditInfo;
