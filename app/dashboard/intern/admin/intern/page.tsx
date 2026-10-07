import { Suspense } from "react";
import ManageAllInternMain from "./Components/intern/ManageAllInternMain";
import { IInternListResponse } from "./Components/types/validations/intern";
import BatchSkeleton from "../batch/Components/batch/BatchSkeleton";

export const allIntern = async (): Promise<IInternListResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_EXPRESS_BASE_URL}/api/v1/intern/profile/get-all-profile`,
      { cache: "no-store" },
    );
    if (!res.ok) return { data: [] };
    return res.json();
  } catch (err) {
    console.error("allIntern failed:", err);
    return { data: [] };
  }
};

const InternMainPage = async () => {
  const allInterns = await allIntern();
  return (
    <div className="min-h-screen bg-background">
      <ManageAllInternMain data={allInterns} />
    </div>
  );
};

const ExportInternMainPage = async () => {
  return (
    <Suspense fallback={<BatchSkeleton />}>
      <InternMainPage />
    </Suspense>
  );
};

export default ExportInternMainPage;
