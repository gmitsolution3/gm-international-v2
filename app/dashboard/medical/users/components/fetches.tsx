export const appointmentForm = async (email: string | null | undefined) => {
  if (!email) return;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/medical-application/api/v1/get-user-application/${email}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch appointment form");

  const result = await res.json();
  return result;
};
