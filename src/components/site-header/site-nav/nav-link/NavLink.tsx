import type { Route } from "next";
import type { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames/bind";
import styles from "./NavLink.module.scss";

const cn = classNames.bind(styles);

type NavLinkProps = {
  href: Route;
  children: ReactNode;
  isMenuOpen: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement>;
};

export default function NavLink({ href, children, isMenuOpen, onClick }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn("link", { open: isMenuOpen })}
      aria-current={pathname === href ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
