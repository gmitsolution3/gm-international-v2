export const getPackageWithoutVisa = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/home-page-package-without-visa-air-ticket`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const getAllPackageWithoutVisa = async () => {
  const res = await fetch(`${process.env.NEXT_EXPRESS_BASE_URL}/all-package-without-visa-and-air-ticket`, {
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
