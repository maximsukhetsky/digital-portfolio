import type { Route } from "next";

export type NavItem = {
  href: Route;
  label: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
