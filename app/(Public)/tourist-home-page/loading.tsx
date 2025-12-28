import { ServicesSkeleton } from "@/app/components/skeleton/ServicesSkeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-start scroll-mt-40 mt-20 justify-center px-6">
      <div className="w-full">
        <ServicesSkeleton />
      </div>
    </div>
  );
};

export default Loading;
