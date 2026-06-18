export const fetchMedicalPackage = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/get-medical-package`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const fetchMedicalAllPackages = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/get-medical-all-package`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const fetchMedicalPackageDetails = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/get-medical-package-details/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch packages");

  return res.json();
};

export const fetchMedicalList = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/medical-pkg/api/v1/get/home-medical-pkg`,
    {
      cache: "no-store",
    },
  );

  return res.json();
};

export const getAllMedicalData = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/medical-pkg/api/v1/get/all-medical-pkg`,
    {
      cache: "no-store",
    },
  );
  
  return res.json();
};

export const getFilterInfo = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/medical-pkg/api/v1/hospital-filters`,
    {
      cache: "no-store",
    },
  );
  return res.json();
};

export const getMedicalDetails = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_BASE_URL}/medical-pkg/api/v1/get/medical/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("failed to fetch details medical list");

  return res.json();
};
