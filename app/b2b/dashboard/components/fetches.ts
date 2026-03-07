export const getB2BScholarshipPackage = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-b2b-scholarship-package/${id}`,
    {
      cache: "no-store",
    },
  );

  // if (!res.ok) throw new Error("Data not found");

  return res.json();
};

export const getB2BTouristPackage = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-b2b-tourist-package-dashboard/${id}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
};

export const getB2BDocumentCount = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b-documents-count`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Data not found");

  return res.json();
};
