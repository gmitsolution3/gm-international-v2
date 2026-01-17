export const getAllScholarshipDocumnetCount = async () => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-all-scholarship-document`,
    {
      cache: "no-store",
    }
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};
