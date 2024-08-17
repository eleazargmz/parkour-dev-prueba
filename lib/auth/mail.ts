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
      from: "parkour@prelace.com",
      to: email,
      subject: "Verifique su correo electrónico",
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