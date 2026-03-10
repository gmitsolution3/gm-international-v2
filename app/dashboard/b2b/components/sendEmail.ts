import { transporter } from "@/lib/mailer";

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
   
  await transporter.sendMail({
    from: `"GM International" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });

};
