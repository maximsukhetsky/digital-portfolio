import { HONEYPOT_FIELD, MIN_FILL_TIME } from "./constants";
import type { SpamCheck } from "./types";

export function createSpamCheck(form: HTMLFormElement, startedAt: number | null): SpamCheck {
  const honeypot = new FormData(form).get(HONEYPOT_FIELD);

  return {
    honeypot: typeof honeypot === "string" ? honeypot : "",
    fillTime: startedAt ? Date.now() - startedAt : 0,
  };
}

export function isSpam({ honeypot, fillTime }: SpamCheck): boolean {
  return !!honeypot || fillTime < MIN_FILL_TIME;
}
