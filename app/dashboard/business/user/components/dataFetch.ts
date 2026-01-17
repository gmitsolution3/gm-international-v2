export const getBusinessUserDashboardData = async (email: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-business-user-dashboard-data?email=${email}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Data not found");
  return res.json();
};
