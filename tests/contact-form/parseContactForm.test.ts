import { describe, expect, test } from "vitest";
import parseContactForm from "@/lib/contact-form/parseContactForm";
import { contactFormFields, contactFormSchema } from "@/lib/contact-form/schema";
import type { ContactFormField } from "@/lib/contact-form/types";
import { validValues } from "./fixtures";

const lengthFields = contactFormFields.filter((field) => {
  return field !== "email";
});

function parseWith(field: ContactFormField, value: string) {
  return parseContactForm({ ...validValues, [field]: value });
}

describe("parseContactForm", () => {
  test("returns no errors for valid values", () => {
    const { data, errors } = parseContactForm(validValues);

    expect(errors).toEqual({});
    expect(data).toEqual(validValues);
  });

  test("trims every field", () => {
    const { data, errors } = parseContactForm({
      name: "  Jane Doe  ",
      email: " jane@example.com ",
      subject: "\tHello there\n",
      message: "  This is a test message.  ",
    });

    expect(errors).toEqual({});
    expect(data).toEqual(validValues);
  });

  test.each(contactFormFields)("requires %s", (field) => {
    expect(parseWith(field, "").errors).toEqual({ [field]: contactFormSchema[field].required });
  });

  test.each(contactFormFields)("treats whitespace-only %s as empty", (field) => {
    expect(parseWith(field, "   ").errors).toEqual({
      [field]: contactFormSchema[field].required,
    });
  });

  test.each(lengthFields)("enforces the min length of %s", (field) => {
    const minLength = contactFormSchema[field].minLength!;

    expect(parseWith(field, "a".repeat(minLength.value)).errors).toEqual({});
    expect(parseWith(field, "a".repeat(minLength.value - 1)).errors).toEqual({
      [field]: minLength.message,
    });
  });

  test.each(lengthFields)("enforces the max length of %s", (field) => {
    const maxLength = contactFormSchema[field].maxLength!;

    expect(parseWith(field, "a".repeat(maxLength.value)).errors).toEqual({});
    expect(parseWith(field, "a".repeat(maxLength.value + 1)).errors).toEqual({
      [field]: maxLength.message,
    });
  });

  test("checks the min length after trimming", () => {
    expect(parseWith("name", "  a  ").errors).toEqual({
      name: contactFormSchema.name.minLength!.message,
    });
  });

  test("enforces the max length of email", () => {
    const maxLength = contactFormSchema.email.maxLength!;
    const domain = "@example.com";
    const localPart = (length: number) => {
      return "a".repeat(length - domain.length);
    };

    expect(parseWith("email", `${localPart(maxLength.value)}${domain}`).errors).toEqual({});
    expect(parseWith("email", `${localPart(maxLength.value + 1)}${domain}`).errors).toEqual({
      email: maxLength.message,
    });
  });

  test.each(["jane", "jane@example", "jane doe@example.com", "@example.com", "jane@.com"])(
    "rejects invalid email %j",
    (email) => {
      expect(parseWith("email", email).errors).toEqual({
        email: contactFormSchema.email.pattern!.message,
      });
    },
  );

  test("reports errors for all invalid fields at once", () => {
    const { errors } = parseContactForm({ name: "", email: "", subject: "", message: "" });

    expect(Object.keys(errors)).toEqual(contactFormFields);
  });
});
