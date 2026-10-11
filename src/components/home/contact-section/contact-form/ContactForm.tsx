"use client";

import classNames from "classnames/bind";
import FormField from "@/components/ui/form-field/FormField";
import Input from "@/components/ui/input/Input";
import Textarea from "@/components/ui/textarea/Textarea";
import Button from "@/components/ui/button/Button";
import useContactForm from "./useContactForm";
import styles from "./ContactForm.module.scss";

const cn = classNames.bind(styles);

export default function ContactForm() {
  const { errors, register, handleSubmit } = useContactForm();

  return (
    <form noValidate onSubmit={handleSubmit} className={cn("contact-form")}>
      <FormField label="Name" error={errors.name} htmlFor="name" className={cn("form-field")}>
        <Input {...register("name")} />
      </FormField>
      <FormField label="Email" error={errors.email} htmlFor="email" className={cn("form-field")}>
        <Input type="email" {...register("email")} />
      </FormField>
      <FormField label="Subject" error={errors.subject} htmlFor="subject" className={cn("form-field")}>
        <Input {...register("subject")} />
      </FormField>
      <FormField label="Message" error={errors.message} htmlFor="message" className={cn("form-field")}>
        <Textarea rows={5} {...register("message")} />
      </FormField>
      <Button type="submit" className={cn("submit-button")}>Send</Button>
    </form>
  );
}
