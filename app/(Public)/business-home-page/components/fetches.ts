export const getHomeCompany = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/home-page-company`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const getAllCompanies = async () => {
  const res = await fetch(`${process.env.NEXT_EXPRESS_BASE_URL}/all-company`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const getCompany = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/get-company/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const getHomePackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/get-homepage-business-package`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};
export const getBusinessPackages = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/get-business-packages`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const getBusinessDetails = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/get-business-details/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};
