export const getAllMedicalDocuments = async () => {
  const documents = await fetch(
    "https://gm-international-server-gamma.vercel.app/get-all-medical-document",
    {
      cache: "force-cache",
    }
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};

export const getAllTouristDocuments = async () => {
  const documents = await fetch(
    "https://gm-international-server-gamma.vercel.app/get-all-tourist-document",
    {
      cache: "force-cache",
    }
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};

export const getUserScholarshipDocuments = async (email: string) => {
  const documents = await fetch(
    `https://gm-international-server-gamma.vercel.app/get-users-documents?email=${email}`,
    {
      cache: "force-cache",
    }
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};

export const getUserTouristDocuments = async (email: string) => {
  const documents = await fetch(
    `https://gm-international-server-gamma.vercel.app/get-users-tourist-documents?email=${email}`,
    {
      cache: "force-cache",
    }
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};
export const getUserMedicalDashboard = async (email: string) => {
  const documents = await fetch(
    `https://gm-international-server-gamma.vercel.app/get-users-medical-documents?email=${email}`,
    {
      cache: "force-cache",
    }
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};
