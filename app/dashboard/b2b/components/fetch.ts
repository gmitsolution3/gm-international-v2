export const getAllB2BApplication = async () => {
  const res = await fetch("https://gm-international-server-gamma.vercel.app/get-b2b-application", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Data not found");

  return res.json();
};


export const getAllB2BUsers = async()=>{
  const res = await fetch("https://gm-international-server-gamma.vercel.app/b2b-user",{
    cache: "no-store",
  })

  if(!res.ok) throw new Error("Data not found");

  return res.json();
}
