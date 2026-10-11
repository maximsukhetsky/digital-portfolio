import Link from "next/link";
import classNames from "classnames/bind";
import { githubSVG, linkedinSVG, phoneSVG, telegramSVG } from "@/constants/icons";
import ContactForm from "./contact-form/ContactForm";
import styles from "./ContactSection.module.scss";

const cn = classNames.bind(styles);

export default function ContactSection() {
  return (
    <section className={cn("contact", "wrapper")}>
      <div className={cn("heading")}>
        <h2 className={cn("title")}>Let’s connect</h2>
        <p className={cn("subtitle")}>
          Say hello at <Link href="mailto:suheckiymax@gmail.com" className={cn("link")}>suheckiymax@gmail.com</Link>
        </p>
        <p className={cn("subtitle")}>
          For more info, here’s my <Link href="#" className={cn("link")}>resume</Link>
        </p>
      </div>
      <div className={cn("socials")}>
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
    </section>
  );
}
