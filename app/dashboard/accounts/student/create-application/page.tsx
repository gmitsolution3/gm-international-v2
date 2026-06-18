import React from "react";
import StudentForm from "../../components/StudentForm";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";

const CreateApplication = async () => {
  const session = await getServerSession(authConfig);
  return (
    <div>
      <StudentForm email={session?.user?.email} />
    </div>
  );
};

export default CreateApplication;
