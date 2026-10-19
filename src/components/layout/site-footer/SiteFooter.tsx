import Link from "next/link";
import classNames from "classnames/bind";
import {AUTHOR_NAME, CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL} from "@/constants/common";
import { githubSVG, linkedinSVG, phoneSVG, telegramSVG } from "@/constants/icons";
import ContactForm from "./contact-form/ContactForm";
import styles from "./SiteFooter.module.scss";

const cn = classNames.bind(styles);

export default function SiteFooter() {
  return (
    <footer className={cn("site-footer", "wrapper")} id="contact">
      <div className={cn("heading")}>
        <h2 className={cn("title")}>Let’s connect</h2>
        <p className={cn("subtitle")}>
          Say hello at <Link href={`mailto:${CONTACT_EMAIL}`} className={cn("link")}>{CONTACT_EMAIL}</Link>
        </p>
        <p className={cn("subtitle")}>
          For more info, here’s my <a download href={RESUME_URL} className={cn("link")}>resume</a>
        </p>
      </div>
      <div className={cn("socials")}>
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
        <Link
          href="https://t.me/suheckiymax"
          target="_blank"
          rel="noopener noreferrer"
          className={cn("social-link")}
          aria-label="Telegram"
        >
          {telegramSVG}
        </Link>
        <Link
          href="tel:+380930238028"
          className={cn("social-link")}
          aria-label="Mobile phone"
        >
          {phoneSVG}
        </Link>
      </div>
      <ContactForm />
      <p className={cn("copyright")}>©2026 {AUTHOR_NAME}</p>
    </footer>
  );
}
