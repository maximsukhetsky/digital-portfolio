import { useRef, useState, useTransition } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import parseContactForm from "@/lib/contact-form/parseContactForm";
import sendContactEmail from "@/lib/contact-form/sendContactEmail";
import { contactFormFields, contactFormSchema, initialValues } from "@/lib/contact-form/schema";
import { createSpamCheck } from "@/lib/contact-form/spam";
import type { ContactFormErrors, ContactFormField, ContactFormValues } from "@/lib/contact-form/types";
import useTemporaryStatus from "./useTemporaryStatus";

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

export default function useContactForm() {
  const fieldRefs = useRef<Partial<Record<ContactFormField, FieldElement | null>>>({});
  const startedAtRef = useRef<number | null>(null);
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useTemporaryStatus();

  const { errors: validationErrors } = parseContactForm(values);
  const errors: ContactFormErrors = isSubmitted ? validationErrors : {};

  const setFieldRef = (field: ContactFormField) => {
    return (element: FieldElement | null) => {
      fieldRefs.current[field] = element;
    };
  };

  const handleChange = (event: ChangeEvent<FieldElement>) => {
    const { name, value } = event.target;

    startedAtRef.current ??= Date.now();

    setValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitted(true);
    setStatus("default");

    const firstInvalidField = contactFormFields.find((field) => {
      return validationErrors[field];
    });

    if (firstInvalidField) {
      fieldRefs.current[firstInvalidField]?.focus();
      return;
    }

    const spamCheck = createSpamCheck(event.currentTarget, startedAtRef.current);

    startTransition(async () => {
      const result = await sendContactEmail(values, spamCheck);

      setStatus(result.status);

      if (result.status === "success") {
        setValues(initialValues);
        setIsSubmitted(false);
        startedAtRef.current = null;
      }
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

  return { errors, status, isPending, register, handleSubmit };
}
