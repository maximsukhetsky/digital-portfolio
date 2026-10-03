import { before, test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

const BASE_URL = process.env.SMOKE_URL ?? "http://localhost:3000";
const EXPECTED_TITLE = "Digital Portfolio | Maxim Sukhetsky";
const PAGES = [
  { path: "/work", title: "Work | Maxim Sukhetsky", file: "work.html" },
  { path: "/about", title: "About | Maxim Sukhetsky", file: "about.html" },
  { path: "/contact", title: "Contact | Maxim Sukhetsky", file: "contact.html" },
];

let home;
const pages = new Map();

async function load(path) {
  const res = await fetch(new URL(path, BASE_URL));
  return { res, html: await res.text() };
}

function activeLinks(html) {
  return [...html.matchAll(/<a\s[^>]*aria-current="page"[^>]*>/g)].map((m) => m[0]);
}

before(async () => {
  home = await load("/");
  for (const { path } of PAGES) {
    pages.set(path, await load(path));
  }
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

for (const { path, title, file } of PAGES) {
  test(`${path} responds with HTML`, () => {
    const { res } = pages.get(path);
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type") ?? "", /text\/html/);
  });

  test(`${path} has lang, title, description and main`, () => {
    const { html } = pages.get(path);
    assert.match(html, /<html[^>]*\slang="en"/);
    assert.ok(html.includes(`<title>${title}</title>`), "title mismatch");
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(html, /<main[\s>]/);
  });

  test(`${path} is statically prerendered`, () => {
    assert.ok(existsSync(`.next/server/app/${file}`), `${path} is no longer static`);
  });

  test(`${path} marks only its own nav link as current`, () => {
    const active = activeLinks(pages.get(path).html);
    assert.equal(active.length, 1, `expected 1 aria-current link, got ${active.length}`);
    assert.ok(active[0].includes(`href="${path}"`), `aria-current is on ${active[0]}`);
  });
}

test("home page has main navigation with links to all pages", () => {
  const nav = home.html.match(/<nav[\s>][\s\S]*?<\/nav>/);
  assert.ok(nav, "main nav not found");
  assert.match(home.html, /<a\s[^>]*href="\/"/, "home link not found");
  for (const { path } of PAGES) {
    assert.ok(nav[0].includes(`href="${path}"`), `nav link to ${path} not found`);
  }
});

test("home page has no current nav link", () => {
  assert.equal(activeLinks(home.html).length, 0);
});
