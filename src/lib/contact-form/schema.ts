import type { ContactFormField, ContactFormValues, FieldRules } from "./types";

const requiredRule = { required: "This field is required" };

export const contactFormSchema: Record<ContactFormField, FieldRules> = {
  name: {
    ...requiredRule,
    minLength: { value: 2, message: "Name must be at least 2 characters" },
    maxLength: { value: 50, message: "Name must be at most 50 characters" },
  },
  email: {
    ...requiredRule,
    maxLength: { value: 254, message: "Email must be at most 254 characters" },
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address" },
  },
  subject: {
    ...requiredRule,
    minLength: { value: 3, message: "Subject must be at least 3 characters" },
    maxLength: { value: 100, message: "Subject must be at most 100 characters" },
  },
  message: {
    ...requiredRule,
    minLength: { value: 10, message: "Message must be at least 10 characters" },
    maxLength: { value: 2000, message: "Message must be at most 2000 characters" },
  },
};

export const contactFormFields = Object.keys(contactFormSchema) as ContactFormField[];

export const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};
