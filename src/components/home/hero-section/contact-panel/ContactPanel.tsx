import Link from "next/link";
import { GITHUB_URL, LINKEDIN_URL } from "@/constants/common";
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
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("social-link")}
        aria-label="LinkedIn"
      >
        {linkedinSVG}
      </Link>
      <Link
        href={GITHUB_URL}
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
