import Link from "next/link";
import SiteNav from "./site-nav/SiteNav";
import styles from "./SiteHeader.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

const LOGO = "<MAX.DEV />";

export default function SiteHeader() {
  const logoChars = [...LOGO].map((char, index) => (
    <span key={index} className={cn("char")}>{char}</span>
  ));

  return (
    <header className={cn("header", "wrapper")}>
      <Link href="/" className={cn("logo")}>{logoChars}</Link>
      <SiteNav />
    </header>
  );
}
