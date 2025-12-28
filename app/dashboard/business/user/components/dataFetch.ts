export const getBusinessUserDashboardData = async (email: string) => {
  const res = await fetch(
    `https://gm-international-server-gamma.vercel.app/get-business-user-dashboard-data?email=${email}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Data not found");
  return res.json();
};
