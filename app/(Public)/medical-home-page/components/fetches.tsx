export const fetchMedicalPackage = async () => {
  const res = await fetch(
    "https://gm-international-server-gamma.vercel.app/get-medical-package",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const fetchMedicalAllPackages = async () => {
  const res = await fetch(
    "https://gm-international-server-gamma.vercel.app/get-medical-all-package",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const fetchMedicalPackageDetails = async (id: string) => {
  const res = await fetch(
    `https://gm-international-server-gamma.vercel.app/get-medical-package-details/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const fetchMedicalList = async () => {
  const res = await fetch(
    "https://gm-international-server-gamma.vercel.app/get-medical-list",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch package");

  return res.json();
};

export const getAllMedicalData = async () => {
  const res = await fetch(
    "https://gm-international-server-gamma.vercel.app/get-all-medical-list",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("failed to fetch all medical list");

  return res.json();
};

export const getMedicalDetails = async (id: string) => {
  const res = await fetch(
    `https://gm-international-server-gamma.vercel.app/get-medical-details/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("failed to fetch details medical list");

  return res.json();
};
