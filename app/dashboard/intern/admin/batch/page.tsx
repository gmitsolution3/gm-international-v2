import { Suspense } from "react";
import BatchContent from "./Components/batch/BatchContent";
import BatchSkeleton from "./Components/batch/BatchSkeleton";

const InternBatchMainPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<BatchSkeleton />}>
        <BatchContent />
      </Suspense>
    </div>
  );
};

export default InternBatchMainPage;
