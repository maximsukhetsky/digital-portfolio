import { contactFormFields, contactFormSchema } from "./contactFormSchema";
import type { ContactFormErrors, ContactFormValues, FieldRules } from "./contactFormSchema";

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

export default function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  for (const field of contactFormFields) {
    const error = validateField(values[field].trim(), contactFormSchema[field]);

    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}
