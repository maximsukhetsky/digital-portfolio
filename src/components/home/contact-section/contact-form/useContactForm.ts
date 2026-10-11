import { useRef, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import validateContactForm from "./validateContactForm";
import { contactFormFields, contactFormSchema } from "./contactFormSchema";
import type { ContactFormErrors, ContactFormField, ContactFormValues } from "./contactFormSchema";

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function useContactForm() {
  const fieldRefs = useRef<Partial<Record<ContactFormField, FieldElement | null>>>({});
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validationErrors = validateContactForm(values);
  const errors: ContactFormErrors = isSubmitted ? validationErrors : {};

  const setFieldRef = (field: ContactFormField) => {
    return (element: FieldElement | null) => {
      fieldRefs.current[field] = element;
    };
  };

  const handleChange = (event: ChangeEvent<FieldElement>) => {
    const { name, value } = event.target;

    setValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  };

  const register = (field: ContactFormField) => {
    return {
      id: field,
      name: field,
      value: values[field],
      maxLength: contactFormSchema[field].maxLength?.value,
      hasError: !!errors[field],
      onChange: handleChange,
      "aria-describedby": errors[field] ? `${field}-error` : undefined,
      ref: setFieldRef(field),
    };
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitted(true);

    const firstInvalidField = contactFormFields.find((field) => {
      return validationErrors[field];
    });

    if (firstInvalidField) {
      fieldRefs.current[firstInvalidField]?.focus();
      return;
    }
  };

  return { errors, register, handleSubmit };
}
