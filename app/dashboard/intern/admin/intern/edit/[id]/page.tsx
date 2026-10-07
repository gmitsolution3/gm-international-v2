import { getAllBatches } from "../../../batch/Components/batch/BatchContent";
import CreateInterProfileMain from "../../Components/create/CreateInterProfileMain";
import { IInternProfile } from "../../Components/types/validations/intern";

async function getInternById(id: string): Promise<IInternProfile | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_EXPRESS_BASE_URL}/api/v1/intern/profile/get-profile-details/${id}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json ?? null;
  } catch (err) {
    console.error("getInternById failed:", err);
    return null;
  }
}

export default async function EditInternProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [batches, intern] = await Promise.all([
    getAllBatches(),
    getInternById(id),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <CreateInterProfileMain
        batches={batches.data}
        initialData={intern}
        mode="edit"
      />
    </div>
  );
}

