import React, { Suspense } from "react";
import ScholarshipApplicationForm from "../components/applicationForm";
import Loader from "@/components/ui/loader";

interface ParamsProps {
  params: { id: string };
}

const Application = async ({ params }: ParamsProps) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/admin/scholarship-package-management/${id}`,
    {
      next: { revalidate: 300 },
    }
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
        <ScholarshipApplicationForm packageData={result} />
      </Suspense>
    </div>
  );
};

export default Application;
