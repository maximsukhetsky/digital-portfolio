import { contactFormFields, contactFormSchema } from "./schema";
import type { ContactFormErrors, ContactFormValues, FieldRules, ParsedContactForm } from "./types";

function validateField(value: string, rules: FieldRules): string | undefined {
  if (rules.required && !value) {
    return rules.required;
  }

  if (rules.minLength && value.length < rules.minLength.value) {
    return rules.minLength.message;
  }

  if (rules.maxLength && value.length > rules.maxLength.value) {
    return rules.maxLength.message;
  }

  if (rules.pattern && !rules.pattern.value.test(value)) {
    return rules.pattern.message;
  }

  return undefined;
}

export default function parseContactForm(values: ContactFormValues): ParsedContactForm {
  const data = { ...values };
  const errors: ContactFormErrors = {};

  for (const field of contactFormFields) {
    data[field] = values[field].trim();

    const error = validateField(data[field], contactFormSchema[field]);

    if (error) {
      errors[field] = error;
    }
  }

  return { data, errors };
}
