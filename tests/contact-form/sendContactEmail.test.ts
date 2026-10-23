import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { CONTACT_EMAIL } from "@/constants/common";
import { EMAIL_SENDER, MIN_FILL_TIME } from "@/lib/contact-form/constants";
import { humanSpamCheck, validValues } from "./fixtures";

const send = vi.hoisted(() => {
  return vi.fn();
});

vi.mock("resend", () => {
  return {
    Resend: class {
      emails = { send };
    },
  };
});

// The API key is read when the module loads, so re-import it after stubbing the env.
async function importSendContactEmail(apiKey = "test-api-key") {
  vi.stubEnv("RESEND_API_KEY", apiKey);
  vi.resetModules();

  const { default: sendContactEmail } = await import("@/lib/contact-form/sendContactEmail");

  return sendContactEmail;
}

describe("sendContactEmail", () => {
  beforeEach(() => {
    send.mockResolvedValue({ data: { id: "email-id" }, error: null });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    send.mockReset();
  });

  test("sends the trimmed message to the contact email", async () => {
    const sendContactEmail = await importSendContactEmail();

    const result = await sendContactEmail(
      { ...validValues, email: ` ${validValues.email} `, message: `  ${validValues.message}  ` },
      humanSpamCheck,
    );

    expect(result).toEqual({ status: "success" });
    expect(send).toHaveBeenCalledOnce();
    expect(send).toHaveBeenCalledWith({
      from: EMAIL_SENDER,
      to: CONTACT_EMAIL,
      replyTo: validValues.email,
      subject: validValues.subject,
      text: `Name: ${validValues.name}\nEmail: ${validValues.email}\n\n${validValues.message}`,
    });
  });

  test("fakes success for a filled honeypot without sending", async () => {
    const sendContactEmail = await importSendContactEmail();

    const result = await sendContactEmail(validValues, { ...humanSpamCheck, honeypot: "bot" });

    expect(result).toEqual({ status: "success" });
    expect(send).not.toHaveBeenCalled();
  });

  test("fakes success for a form filled too fast without sending", async () => {
    const sendContactEmail = await importSendContactEmail();

    const result = await sendContactEmail(validValues, {
      ...humanSpamCheck,
      fillTime: MIN_FILL_TIME - 1,
    });

    expect(result).toEqual({ status: "success" });
    expect(send).not.toHaveBeenCalled();
  });

  test("rejects invalid values without sending", async () => {
    const sendContactEmail = await importSendContactEmail();

    const result = await sendContactEmail({ ...validValues, email: "invalid" }, humanSpamCheck);

    expect(result).toEqual({ status: "error" });
    expect(send).not.toHaveBeenCalled();
  });

  test("returns an error when the API key is missing", async () => {
    const sendContactEmail = await importSendContactEmail("");

    const result = await sendContactEmail(validValues, humanSpamCheck);

    expect(result).toEqual({ status: "error" });
    expect(send).not.toHaveBeenCalled();
  });

  test("returns an error when Resend fails", async () => {
    send.mockResolvedValue({ data: null, error: { message: "Invalid API key" } });
    const sendContactEmail = await importSendContactEmail();

    const result = await sendContactEmail(validValues, humanSpamCheck);

    expect(result).toEqual({ status: "error" });
    expect(send).toHaveBeenCalledOnce();
  });
});
