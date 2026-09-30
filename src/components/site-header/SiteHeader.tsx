import Link from "next/link";
import { NAV_ITEMS } from "@/lib/navigation";
import NavLink from "./NavLink";

export default function SiteHeader() {
  return (
    <header>
      <Link href="/">Maxim Sukhetsky</Link>
      <nav>
        <ul>
          {NAV_ITEMS.map(({ href, label }) => (
            <li key={href}>
              <NavLink href={href}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
