import React from "react";
import EditApplication from "../../components/EditApplication";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const findSingleApplication = async(id:string)=>{
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-application/api/v1/get-single/${id}`,
    );

    return res.json()
}

const AppointMentEdit = async ({ params }: PageProps) => {
  const { id } = await params;
  const appResult = await findSingleApplication(id)
  return <div>
    <EditApplication data={appResult.data}/>
  </div>;
};

export default AppointMentEdit;
