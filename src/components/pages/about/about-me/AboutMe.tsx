import Image from "next/image";
import classNames from "classnames/bind";
import portraitSmiling from "@/assets/images/portrait-smiling.webp";
import ActionPanel from "@/components/ui/action-panel/ActionPanel";
import { AUTHOR_NAME, RESUME_URL } from "@/constants/common";
import { downloadSVG } from "@/constants/icons";
import styles from "./AboutMe.module.scss";

const cn = classNames.bind(styles);

export default function AboutMe() {
  return (
    <section className={cn("about-me", "wrapper")}>
      <div className={cn("inner")}>
        <h1 className={cn("title")}>About Me</h1>
        <div className={cn("content")}>
          <div className={cn("text")}>
            <p className={cn("lead")}>
              Frontend Engineer who turns complex requirements into clear, maintainable, and fast
              interfaces.
            </p>
            <p className={cn("description")}>
              I started in 2018 as an HTML Coder building responsive email templates, then moved to
              React at Genesis, where I built an HTML email editor with reusable components, data
              tables for managing email campaigns, and complex forms. Since 2023 at SeaRates, I have
              been developing customer-facing and internal applications for logistics and supply
              chain workflows, including Micro Frontends with Webpack Module Federation.
            </p>
            <p className={cn("description")}>
              I believe good frontend work starts before the first line of code: understanding the
              problem, planning the architecture, and keeping components reusable and easy for other
              teams to adopt. I take ownership of features from requirements and technical planning
              through backend integration, testing, and production release, working closely with
              backend developers, QA engineers, and designers. I care about reliability as much as
              speed — for example, I raised Jest test coverage of an authorization application used
              by 10+ other apps to about 90%, helping prevent regressions.
            </p>
            <p className={cn("description")}>
              I also use AI tools like Cursor and Claude Code in my daily workflow and completed an
              AI-Assisted Development course in 2026 — this portfolio, built with Next.js, is one of
              the projects where I put that approach into practice.
            </p>
          </div>
          <ActionPanel download label="Download Resume" href={RESUME_URL} icon={downloadSVG} />
        </div>
      </div>
      <Image
        src={portraitSmiling}
        placeholder="blur"
        loading="eager"
        className={cn("photo")}
        alt={AUTHOR_NAME}
      />
    </section>
  );
}
