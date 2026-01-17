export const appointmentForm = async (email: string | null | undefined) => {
  if (!email) return;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/get-medical-appointment-form?email=${email}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch appointment form");

  return res.json();
};
