import assert from "node:assert/strict";
import { before, test } from "node:test";
import { activeLinks, load, loadPages, PAGES } from "./helpers.mjs";

let home;
let pages;

before(async () => {
  home = await load("/");
  pages = await loadPages();
});

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

for (const { path } of PAGES) {
  test(`${path} marks only its own nav link as current`, () => {
    const active = activeLinks(pages.get(path).html);
    assert.equal(active.length, 1, `expected 1 aria-current link, got ${active.length}`);
    assert.ok(active[0].includes(`href="${path}"`), `aria-current is on ${active[0]}`);
  });
}
