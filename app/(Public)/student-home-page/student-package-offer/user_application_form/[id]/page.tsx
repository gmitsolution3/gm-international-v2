import React, { Suspense } from "react";
import ScholarshipApplicationForm from "../components/applicationForm";
import Loader from "@/components/ui/loader";

const Application = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <ScholarshipApplicationForm />
      </Suspense>
    </div>
  );
};

export default Application;
