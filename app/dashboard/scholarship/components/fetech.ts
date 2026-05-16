
export const getScholarshipsAnalysis = async () => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/api/v1/admin/scholarship/dashboard-stats`,
    {
      cache: "no-store",
    },
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};
