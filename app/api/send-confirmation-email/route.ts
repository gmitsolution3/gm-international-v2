// app/api/send-confirmation-email/route.ts
import { sendEmail } from "@/app/dashboard/b2b/components/sendEmail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, applicationId, applicantName, packageName, packageDetails } =
      body;

    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626, #991b1b); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .card { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .app-id { font-size: 24px; font-weight: bold; color: #dc2626; }
          .status { display: inline-block; background: #fef3c7; color: #92400e; padding: 5px 15px; border-radius: 20px; font-size: 14px; }
          .steps { list-style: none; padding: 0; }
          .steps li { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .steps li:last-child { border-bottom: none; }
          .button { display: inline-block; background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🎉 Application Submitted Successfully!</h1>
            <p style="margin: 10px 0 0;">GM International - Umrah & Hajj Services</p>
          </div>
          
          <div class="content">
            <p>Dear <strong>${applicantName}</strong>,</p>
            <p>JazakAllah Khair for choosing GM International for your spiritual journey. Your application has been received successfully.</p>
            
            <div class="card">
              <h2 style="margin: 0 0 15px; color: #dc2626;">Application Details</h2>
              <p style="margin: 5px 0;"><strong>Application ID:</strong> <span class="app-id">${applicationId}</span></p>
              <p style="margin: 5px 0;"><strong>Package:</strong> ${packageName}</p>
              ${
                packageDetails
                  ? `
                <p style="margin: 5px 0;"><strong>Price:</strong> ৳ ${packageDetails.price.toLocaleString()}</p>
                <p style="margin: 5px 0;"><strong>Status:</strong> <span class="status">Pending Review</span></p>
              `
                  : ""
              }
            </div>

            <div class="card">
              <h3 style="color: #1e40af; margin: 0 0 15px;">📋 What Happens Next?</h3>
              <ol class="steps">
                <li>✅ Our team will review your application within 24-48 hours</li>
                <li>📧 You'll receive a detailed confirmation email</li>
                <li>📞 Our representative will contact you for document verification</li>
                <li>💳 Complete payment to confirm your booking</li>
                <li>✈️ Receive your travel documents and prepare for your journey</li>
              </ol>
            </div>

            <div class="card" style="background: #fef3c7;">
              <h3 style="color: #92400e; margin: 0 0 10px;">⚠️ Important Reminders</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Keep your application ID (${applicationId}) for future reference</li>
                <li>Ensure your passport is valid for at least 6 months</li>
                <li>Prepare necessary documents for verification</li>
              </ul>
            </div>

            <p>If you have any questions, please don't hesitate to contact us:</p>
            <p>📞 Phone: +880 1XXX-XXXXXX</p>
            <p>📧 Email: support@gminternational.com</p>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} GM International. All rights reserved.</p>
            <p>This is an automated email. Please do not reply directly.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail({
      to,
      subject: `Application Confirmed - ${applicationId} | GM International`,
      html: emailHTML,
    });

    return NextResponse.json({
      success: true,
      message: "Confirmation email sent successfully",
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send confirmation email",
      },
      { status: 500 },
    );
  }
}
