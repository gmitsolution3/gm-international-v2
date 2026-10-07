import React from "react";
import CreateBatchMain from "../Components/Create/CreateBatchMain";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import { redirect } from "next/navigation";
import type { User } from "@/app/profile/components/profileCard";

const InternCreateBatchMainPage = async () => {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    redirect("/unauthorized");
  }

  const user = session.user as unknown as User;

  return (
    <div className="min-h-screen bg-background">
      <CreateBatchMain session={user} />
    </div>
  );
};

export default InternCreateBatchMainPage;
