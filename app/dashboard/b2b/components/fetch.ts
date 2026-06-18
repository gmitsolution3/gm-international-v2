export const getAllB2BApplication = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b-applications/api/v1/get-all`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Data not found");

  return res.json();
};

export const getAllB2BUsers = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b-user/api/v1/find-all`,
    {
      cache: "no-store",
    },
  );

  return res.json();
};


export const getB2BStudentPackage = async()=>{
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b-user/api/v1/get-std-pkg`,
  );

  return res.json()
}