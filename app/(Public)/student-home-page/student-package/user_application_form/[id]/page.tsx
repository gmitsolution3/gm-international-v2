import React, { Suspense } from "react";
import ScholarshipApplicationForm from "../components/applicationForm";
import Loader from "@/components/ui/loader";
import { authConfig } from "@/auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ParamsProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ b2bId: string; form: string }>;
}

const Application = async ({ params, searchParams }: ParamsProps) => {
  const { id } = await params;
  const { b2bId, form } = await searchParams;

  const source = { b2bId, form };
  const session: any = await getServerSession(authConfig);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/scholarship-package/api/v1/pkg-details/${id}`,
    {
      next: { revalidate: 300 },
    },
  );

  // if (!session?.user) {
  //   redirect("/auth/signin");
  // }

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
        <ScholarshipApplicationForm
          packageData={result.data}
          session={session}
          source={source}
        />
      </Suspense>
    </div>
  );
};

export default Application;
