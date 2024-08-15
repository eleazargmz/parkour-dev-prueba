import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendEmailVerification = async <T extends string>(
  email: T,
  token: T,
  name: T
): Promise<{ success?: boolean; error?: boolean }> => {
  try {
    await resend.emails.send({
      from: "NextAuth.js <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email",
      react: EmailTemplate({ firstName: name, token }),
    });
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
    };
  }
};