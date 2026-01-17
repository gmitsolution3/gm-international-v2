export const getAllMedicalDocuments = async () => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-all-medical-document`,
    {
      cache: "force-cache",
    }
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};

export const getAllTouristDocuments = async () => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-all-tourist-document`,
    {
      cache: "force-cache",
    }
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};

export const getUserScholarshipDocuments = async (email: string) => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-users-documents?email=${email}`,
    {
      cache: "force-cache",
    }
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};

export const getUserTouristDocuments = async (email: string) => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-users-tourist-documents?email=${email}`,
    {
      cache: "force-cache",
    }
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};
export const getUserMedicalDashboard = async (email: string) => {
  const documents = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-users-medical-documents?email=${email}`,
    {
      cache: "force-cache",
    }
  );

  if (!documents) throw new Error("Data not found in db");

  return documents.json();
};
