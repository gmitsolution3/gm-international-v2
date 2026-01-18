export const getAllB2BApplication = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-b2b-application`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Data not found");

  return res.json();
};

export const getAllB2BUsers = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b-user`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};


export const getSingleB2BUser = async(id:string)=>{
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/b2b-user/${id}`,
  );

  return res.json()
}