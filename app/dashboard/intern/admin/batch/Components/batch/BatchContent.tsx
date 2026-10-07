
import { IInternBatchListResponse } from "@/app/dashboard/intern/types/validations/batch";
import AllInternBatchMain from "./AllInternBatchMain";

export async function getAllBatches(): Promise<IInternBatchListResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_EXPRESS_BASE_URL}/api/v1/intern/batch/get-all-batch`,
      { cache: "no-store" },
    );
    if (!res.ok) return { data: [] };
    return res.json();
  } catch (err) {
    console.error("getAllBatches failed:", err);
    return { data: [] };
  }
}

export default async function BatchContent() {
  const batches = await getAllBatches();
  return <AllInternBatchMain data={batches.data} />;
}
