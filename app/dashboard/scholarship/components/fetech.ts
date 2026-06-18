
export const getScholarshipsAnalysis = async () => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/scholarship-application/api/v1/get-dashboard-stats`,
    {
      cache: "no-store",
    },
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};
