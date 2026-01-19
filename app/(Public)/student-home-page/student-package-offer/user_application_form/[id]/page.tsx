import React, { Suspense } from "react";
import ScholarshipApplicationForm from "../components/applicationForm";
import Loader from "@/components/ui/loader";
import { authConfig } from "@/auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ParamsProps {
  params: { id: string };
}

const Application = async ({ params }: ParamsProps) => {
  const { id } = await params;
  const session: any = await getServerSession(authConfig);

  if (!session.user) {
    redirect("/auth/signin");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/admin/scholarship-package-management/${id}`,
    {
      next: { revalidate: 300 },
    },
  );

  const result = await res.json();

  return (
    <div>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <ScholarshipApplicationForm packageData={result} session={session} />
      </Suspense>
    </div>
  );
};

export default Application;
