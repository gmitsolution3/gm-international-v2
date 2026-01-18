export const getB2BScholarshipPackage = async (email:string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-b2b-scholarship-package/${email}`,
    {
      cache: "no-store",
    }
  );

  // if (!res.ok) throw new Error("Data not found");

  return res.json();
};

export const getB2BTouristPackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-b2b-tourist-package`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Data not found");

  return res.json();
};

export const getB2BDocumentCount = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b-documents-count`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Data not found");

  return res.json();
};
