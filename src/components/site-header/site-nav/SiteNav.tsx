"use client";

import { useState } from "react";
import classNames from "classnames/bind";
import { NAV_ITEMS } from "@/lib/navigation";
import BurgerButton from "./burger-button/BurgerButton";
import NavLink from "./nav-link/NavLink";
import styles from "./SiteNav.module.scss";

const cn = classNames.bind(styles);

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((open) => !open);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const navLinks = NAV_ITEMS.map(({ href, label }) => (
    <NavLink key={href} href={href} isMenuOpen={isOpen} onClick={handleClose}>
      {label}
    </NavLink>
  ));

  return (
    <>
      <BurgerButton isOpen={isOpen} onClick={handleToggle} />
      <nav className={cn("nav", { open: isOpen })}>
        {navLinks}
      </nav>
    </>
  );
}
