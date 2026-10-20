"use client";

import classNames from "classnames/bind";
import Button from "@/components/ui/button/Button";
import FormField from "@/components/ui/form-field/FormField";
import Input from "@/components/ui/input/Input";
import Textarea from "@/components/ui/textarea/Textarea";
import type { ContactFormStatus } from "@/lib/contact-form/types";
import Honeypot from "./honeypot/Honeypot";
import useContactForm from "./useContactForm";
import styles from "./ContactForm.module.scss";

const cn = classNames.bind(styles);

const statusMessages: Record<Exclude<ContactFormStatus, "default">, string> = {
  success: "Thanks! Your message has been sent.",
  error: "Something went wrong. Please try again later.",
};

export default function ContactForm() {
  const { errors, status, isPending, register, handleSubmit } = useContactForm();

  return (
    <form noValidate onSubmit={handleSubmit} className={cn("contact-form")}>
      <Honeypot />
      <FormField label="Name" error={errors.name} htmlFor="name" className={cn("form-field")}>
        <Input {...register("name")} />
      </FormField>
      <FormField label="Email" error={errors.email} htmlFor="email" className={cn("form-field")}>
        <Input type="email" {...register("email")} />
      </FormField>
      <FormField
        label="Subject"
        error={errors.subject}
        htmlFor="subject"
        className={cn("form-field")}
      >
        <Input {...register("subject")} />
      </FormField>
      <FormField
        label="Message"
        error={errors.message}
        htmlFor="message"
        className={cn("form-field")}
      >
        <Textarea rows={5} {...register("message")} />
      </FormField>
      <div className={cn("control")}>
        <Button type="submit" disabled={isPending} className={cn("submit-button")}>
          {isPending ? "Sending..." : "Send"}
        </Button>
        {status !== "default" && (
          <p className={cn("status", { "status--error": status === "error" })} role="status">
            {statusMessages[status]}
          </p>
        )}
      </div>
    </form>
  );
}
