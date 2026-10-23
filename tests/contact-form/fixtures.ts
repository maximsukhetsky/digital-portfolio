import { MIN_FILL_TIME } from "@/lib/contact-form/constants";
import type { ContactFormValues, SpamCheck } from "@/lib/contact-form/types";

export const validValues: ContactFormValues = {
  name: "Jane Doe",
  email: "jane@example.com",
  subject: "Hello there",
  message: "This is a test message.",
};

export const humanSpamCheck: SpamCheck = {
  honeypot: "",
  fillTime: MIN_FILL_TIME,
};
