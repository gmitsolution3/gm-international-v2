import { sendEmail } from "@/app/dashboard/b2b/components/sendEmail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name, b2bProfilePassword, b2bProfileId } = await req.json();

    await sendEmail({
      to: email,
      subject: "Welcome to our platform 🎉",
      
      html: `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
    
    <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
      
      <div style="background:#0f766e; color:white; padding:20px; text-align:center;">
        <h1 style="margin:0;">GM International</h1>
        <p style="margin:5px 0 0;">B2B Partner Portal</p>
      </div>

      <div style="padding:30px;">
        <h2 style="margin-top:0;">Hello ${name} 👋</h2>

        <p>
          Welcome to <b>GM International</b>. Your B2B partner account has been created successfully.
          Please find your login details below:
        </p>

        <div style="background:#f1f5f9; padding:20px; border-radius:8px; margin:20px 0;">
          
          <p style="margin:0 0 10px;">
            <b>Profile ID:</b> ${b2bProfileId}
          </p>

          <p style="margin:0;">
            <b>Password:</b> ${b2bProfilePassword}
          </p>

        </div>

        <p>
          Please keep this information secure. You can use these credentials to access your B2B dashboard.
        </p>

        <div style="text-align:center; margin:30px 0;">
          <a 
            href="https://gminternational.live/b2b"
            style="
              background:#0f766e;
              color:white;
              padding:12px 24px;
              text-decoration:none;
              border-radius:6px;
              display:inline-block;
              font-weight:bold;
            "
          >
            Login to Dashboard
          </a>
        </div>

        <p style="font-size:14px; color:#555;">
          If you did not request this account, please ignore this email.
        </p>
      </div>

      <div style="background:#f8fafc; padding:15px; text-align:center; font-size:13px; color:#666;">
        © ${new Date().getFullYear()} GM International. All rights reserved.
      </div>

    </div>

  </div>
`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("EMAIL ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Email send failed", error },
      { status: 500 },
    );
  }
}
