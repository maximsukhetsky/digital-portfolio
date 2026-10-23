export const BASE_URL = process.env.SMOKE_URL ?? "http://localhost:3000";
export const EXPECTED_TITLE = "Digital Portfolio | Maxim Sukhetsky";
export const PAGES = [
  { path: "/experience", title: "Experience | Maxim Sukhetsky", file: "experience.html" },
  { path: "/about", title: "About | Maxim Sukhetsky", file: "about.html" },
  { path: "/education", title: "Education | Maxim Sukhetsky", file: "education.html" },
];

export async function load(path) {
  const res = await fetch(new URL(path, BASE_URL));
  return { res, html: await res.text() };
}

export async function loadPages() {
  const pages = new Map();
  for (const { path } of PAGES) {
    pages.set(path, await load(path));
  }
  return pages;
}

export function activeLinks(html) {
  return [...html.matchAll(/<a\s[^>]*aria-current="page"[^>]*>/g)].map((m) => m[0]);
}
