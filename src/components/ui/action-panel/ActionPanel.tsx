import type { ReactNode } from "react";
import type { Route } from "next";
import Link from "next/link";
import { GITHUB_URL, LINKEDIN_URL } from "@/constants/common";
import { githubSVG, linkedinSVG } from "@/constants/icons";
import styles from "./ActionPanel.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

type ActionPanelProps = {
  label: string;
  icon: ReactNode;
} & ({ href: Route; download?: false } | { href: string; download: true });

export default function ActionPanel({ label, href, icon, download }: ActionPanelProps) {
  const ctaContent = (
    <>
      {label} <span className={cn("icon")}>{icon}</span>
    </>
  );

  return (
    <div className={cn("action-panel")}>
      {download ? (
        <a href={href} download className={cn("cta", "cta--download")}>
          {ctaContent}
        </a>
      ) : (
        <Link href={href} className={cn("cta", { "cta--anchor": href.includes("#") })}>
          {ctaContent}
        </Link>
      )}
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
