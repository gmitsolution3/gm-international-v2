import { appointmentForm } from "../components/fetches";
import AppointmentTable from "../components/appointmentForm";
import { getServerSession } from "next-auth";

const AppointmentStatus = async () => {
  const session = await getServerSession();
  const data = await appointmentForm(session?.user?.email);
  console.log({data})

  return (
    <div>
      <AppointmentTable appointments={data.data} form={"application"} />
    </div>
  );
};

export default AppointmentStatus;
