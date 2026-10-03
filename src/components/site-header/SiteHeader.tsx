import Link from "next/link";
import SiteNav from "./site-nav/SiteNav";
import styles from "./SiteHeader.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function SiteHeader() {
  return (
    <header className={cn("header", "wrapper")}>
      <Link href="/" className={cn("logo")}>{`<MAX.DEV />`}</Link>
      <SiteNav />
    </header>
  );
}
