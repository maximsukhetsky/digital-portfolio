import type { Route } from "next";

export type NavItem = {
  href: Route;
  label: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/education", label: "Education" },
  { href: "/experience", label: "Experience" },
];
