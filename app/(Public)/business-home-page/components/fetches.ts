export const getHomeCompany = async () => {
  const res = await fetch(
    "https://gm-international-server-gamma.vercel.app/home-page-company",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const getAllCompanies = async () => {
  const res = await fetch(
    "https://gm-international-server-gamma.vercel.app/all-company",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const getCompany = async (id: string) => {
  const res = await fetch(
    `https://gm-international-server-gamma.vercel.app/get-company/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const getHomePackage = async () => {
  const res = await fetch(
    `https://gm-international-server-gamma.vercel.app/get-homepage-business-package`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};
export const getBusinessPackages = async () => {
  const res = await fetch(
    `https://gm-international-server-gamma.vercel.app/get-business-packages`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const getBusinessDetails = async (id: string) => {
  const res = await fetch(
    `https://gm-international-server-gamma.vercel.app/get-business-details/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};
