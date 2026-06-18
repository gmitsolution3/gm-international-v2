export const getMedicalAnalysis = async () => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-application/api/v1/dashboard-stats`,
    {
      cache: "no-store",
    },
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};

export const getTouristAnalysis = async () => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/tourist-package/api/v1/get/dashboard-state`,
    {
      cache: "no-store",
    },
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};

export const getUserScholarshipDocuments = async (email: string) => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-users-documents?email=${email}`,
    {
      cache: "force-cache",
    },
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};

export const getUserTouristDocuments = async (email: string) => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-users-tourist-documents?email=${email}`,
    {
      cache: "force-cache",
    },
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};
export const getUserMedicalDashboard = async (email: string) => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-application/api/v1/user-dashboard-stats?email=${email}`,
    {
      cache: "force-cache",
    },
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};

export const getBusinessAnalysis = async () => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/business-application/api/v1/get-dashboard/stats`,
    {
      cache: "force-cache",
    },
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};
export const getUmrahHajjAnalysis = async () => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/umrah-application/api/v1/dashboard-stats`,
    {
      cache: "force-cache",
    },
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};
