import { afterEach, describe, expect, test, vi } from "vitest";
import { HONEYPOT_FIELD, MIN_FILL_TIME } from "@/lib/contact-form/constants";
import { createSpamCheck, isSpam } from "@/lib/contact-form/spam";

type FakeForm = Record<string, string>;

// Node's FormData can't read an HTMLFormElement, so read fields from a plain object instead.
class FakeFormData {
  constructor(private form: FakeForm) {}

  get(name: string) {
    return this.form[name] ?? null;
  }
}

function createForm(fields: FakeForm = {}) {
  return fields as unknown as HTMLFormElement;
}

describe("isSpam", () => {
  test("passes a human submission", () => {
    expect(isSpam({ honeypot: "", fillTime: MIN_FILL_TIME })).toBe(false);
    expect(isSpam({ honeypot: "", fillTime: MIN_FILL_TIME * 10 })).toBe(false);
  });

  test("flags a filled honeypot", () => {
    expect(isSpam({ honeypot: "https://spam.example", fillTime: MIN_FILL_TIME })).toBe(true);
  });

  test("flags a form filled faster than the minimum time", () => {
    expect(isSpam({ honeypot: "", fillTime: MIN_FILL_TIME - 1 })).toBe(true);
    expect(isSpam({ honeypot: "", fillTime: 0 })).toBe(true);
  });
});

describe("createSpamCheck", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  test("reads the honeypot value and measures the fill time", () => {
    vi.stubGlobal("FormData", FakeFormData);
    vi.useFakeTimers();
    vi.setSystemTime(10_000);

    const spamCheck = createSpamCheck(createForm({ [HONEYPOT_FIELD]: "bot" }), 4_000);

    expect(spamCheck).toEqual({ honeypot: "bot", fillTime: 6_000 });
  });

  test("returns an empty honeypot when the field is missing", () => {
    vi.stubGlobal("FormData", FakeFormData);

    expect(createSpamCheck(createForm(), Date.now()).honeypot).toBe("");
  });

  test("returns zero fill time when the form was never edited", () => {
    vi.stubGlobal("FormData", FakeFormData);

    const spamCheck = createSpamCheck(createForm(), null);

    expect(spamCheck.fillTime).toBe(0);
    expect(isSpam(spamCheck)).toBe(true);
  });
});
