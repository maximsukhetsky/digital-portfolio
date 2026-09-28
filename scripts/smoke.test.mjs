import { before, test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

const BASE_URL = process.env.SMOKE_URL ?? "http://localhost:3000";
const EXPECTED_TITLE = "Digital Portfolio | Maxim Sukhetsky";

let home;

before(async () => {
  const res = await fetch(new URL("/", BASE_URL));
  home = { res, html: await res.text() };
});

test("home page responds with HTML", () => {
  assert.equal(home.res.status, 200);
  assert.match(home.res.headers.get("content-type") ?? "", /text\/html/);
});

test("home page has lang, title, description and main", () => {
  assert.match(home.html, /<html[^>]*\slang="en"/);
  assert.ok(home.html.includes(`<title>${EXPECTED_TITLE}</title>`), "title mismatch");
  assert.match(home.html, /<meta name="description" content="[^"]+"/);
  assert.match(home.html, /<main[\s>]/);
});

test("static assets referenced by home page are served", async () => {
  const assets = new Set(
    [...home.html.matchAll(/(?:href|src)="(\/_next\/static\/[^"]+)"/g)].map((m) => m[1]),
  );
  assert.ok(assets.size > 0, "no /_next/static assets found");

  for (const path of assets) {
    const res = await fetch(new URL(path, BASE_URL));
    assert.equal(res.status, 200, `${path} -> ${res.status}`);
  }
});

test("unknown route returns 404", async () => {
  const res = await fetch(new URL("/__smoke-not-found", BASE_URL));
  assert.equal(res.status, 404);
});

test("home page is statically prerendered", () => {
  assert.ok(existsSync(".next/server/app/index.html"), "/ is no longer static");
});
