export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactFormField = keyof ContactFormValues;

type RuleWithValue<T> = {
  value: T;
  message: string;
};

export type FieldRules = {
  required?: string;
  minLength?: RuleWithValue<number>;
  maxLength?: RuleWithValue<number>;
  pattern?: RuleWithValue<RegExp>;
};

export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

export type ParsedContactForm = {
  data: ContactFormValues;
  errors: ContactFormErrors;
};

export type SpamCheck = {
  honeypot: string;
  fillTime: number;
};

export type SendContactEmailResult = { status: "success" | "error" };

export type ContactFormStatus = "default" | SendContactEmailResult["status"];
