import Link from "next/link";
import { arrowSVG, githubSVG, linkedinSVG } from "@/constants/icons";
import styles from "./ContactPanel.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function ContactPanel() {
  return (
    <div className={cn("contact-panel")}>
      <Link href="/contact" className={cn("contact-link")}>
        Contact Me <span className={cn("icon")}>{arrowSVG}</span>
      </Link>
      <Link
        href="https://www.linkedin.com/in/maxim-sukhetsky"
        target="_blank"
        rel="noopener noreferrer"
        className={cn("social-link")}
        aria-label="LinkedIn"
      >
        {linkedinSVG}
      </Link>
      <Link
        href="https://github.com/maximsukhetsky"
        target="_blank"
        rel="noopener noreferrer"
        className={cn("social-link")}
        aria-label="GitHub"
      >
        {githubSVG}
      </Link>
    </div>
  );
}
