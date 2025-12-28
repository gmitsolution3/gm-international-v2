import { sendEmail } from "@/app/dashboard/b2b/components/sendEmail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, name,b2bProfilePassword, b2bProfileId} = await req.json();

  await sendEmail({
    to: email,
    subject: "Welcome to our platform 🎉",
    html: `
      <h2>Hello ${name}</h2>
      <p>Your registration is successful.</p>
      <p>b2bProfileId: ${b2bProfileId}</p>
      <p>b2bProfilePassword: ${b2bProfilePassword}</p>
    `,
  });

  return NextResponse.json({ success: true });
}
