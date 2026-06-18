import AppointmentTable from "../components/appointmentForm";
import { appointmentForm } from "../components/fetches";
import { getServerSession } from "next-auth";

const EditInfo = async () => {
  const session = await getServerSession();
  const data = await appointmentForm(session?.user?.email);

  return (
    <div>
      <AppointmentTable appointments={data.data} form={"edit"} />
    </div>
  );
};

export default EditInfo;
