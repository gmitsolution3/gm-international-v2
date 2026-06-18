export const getB2BScholarshipPackage = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/std-pkg/api/v1/find-b2b-all-pkg`,
    {
      cache: "no-store",
    },
  );

  // if (!res.ok) throw new Error("Data not found");

  return res.json();
};

export const getB2BTouristPackage = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-pkg/api/v1/all-tourist-pkg`,
    {
      cache: "no-store",
    },
  );

  return res.json();
};

export const getB2BDocumentCount = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b-user/api/v1/get-user-dashboard-stats`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Data not found");

  return res.json();
};
