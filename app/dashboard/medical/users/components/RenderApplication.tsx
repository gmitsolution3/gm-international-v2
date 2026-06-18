import React from "react";
import AppointmentTable from "./appointmentForm";

const RenderApplication = ({
  appointments,
  form,
}: {
  appointments: any;
  form: any;
}) => {
  return (
    <div>
      <AppointmentTable appointments={appointments} form={form} />
    </div>
  );
};

export default RenderApplication;
