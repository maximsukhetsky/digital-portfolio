"use server";

import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/constants/common";
import { EMAIL_SENDER } from "./constants";
import parseContactForm from "./parseContactForm";
import { isSpam } from "./spam";
import type { ContactFormValues, SendContactEmailResult, SpamCheck } from "./types";

const API_KEY = process.env.RESEND_API_KEY;

export default async function sendContactEmail(
  values: ContactFormValues,
  spamCheck: SpamCheck,
): Promise<SendContactEmailResult> {
  if (isSpam(spamCheck)) {
    return { status: "success" };
  }

  const { data, errors } = parseContactForm(values);

  if (Object.keys(errors).length > 0) {
    return { status: "error" };
  }

  if (!API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return { status: "error" };
  }

  const { name, email, subject, message } = data;

  const resend = new Resend(API_KEY);

  const { error } = await resend.emails.send({
    from: EMAIL_SENDER,
    to: CONTACT_EMAIL,
    replyTo: email,
    subject,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("Failed to send contact email: ", error);
    return { status: "error" };
  }

  return { status: "success" };
}
