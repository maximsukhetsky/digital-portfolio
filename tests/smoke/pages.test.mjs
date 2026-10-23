import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { before, test } from "node:test";
import { BASE_URL, EXPECTED_TITLE, load, loadPages, PAGES } from "./helpers.mjs";

let home;
let pages;

before(async () => {
  home = await load("/");
  pages = await loadPages();
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
}
