export const getPackageWithoutVisa = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/business-package/api/v1/get/business-home-pkg-without-visa`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const getAllPackageWithoutVisa = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/business-package/api/v1/get/business-all-pkg-without-visa`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const getCompany = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/get-company/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const getHomePackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/business-package/api/v1/get/business-home-pkg`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};
export const getBusinessPackages = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/business-package/api/v1/get/all-packages`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const getBusinessDetails = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/business-package/api/v1/get/single-package/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};
