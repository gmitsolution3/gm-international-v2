export const getSubmitApplication = async (
  email: string | null | undefined
) => {
  if (!email) return;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-user-application?email=${email}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Data not found");

  return res.json();
};

export const getAllBusinessApplication = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-business-all-applications`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("data not found");

  return res.json();
};

export const getAllBusinessDeal = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-business-deal`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Data not found");

  return res.json();
};

export const getUserBusinessDeal = async (email: string | null | undefined) => {
  if (!email) return;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-user-business-deal?email=${email}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Data not found");

  return res.json();
};

export const getAllBusinessPackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-all-business-package`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Data not found");

  return res.json();
};

export const getAllBusinessDocuments = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-all-admin-business-documents`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return "Data not Found";
  }

  return res.json();
};
