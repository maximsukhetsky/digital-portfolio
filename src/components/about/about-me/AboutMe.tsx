import Image from "next/image";
import { AUTHOR_NAME, RESUME_URL } from "@/constants/common";
import { downloadSVG } from "@/constants/icons";
import ActionPanel from "@/components/ui/action-panel/ActionPanel";
import classNames from "classnames/bind";
import styles from "./AboutMe.module.scss";
import portraitSmiling from "@/assets/images/portrait-smiling.webp";

const cn = classNames.bind(styles);

export default function AboutMe() {
  return (
    <section className={cn("about-me", "wrapper")}>
      <div className={cn('inner')}>
          <h1 className={cn("title")}>About Me</h1>
          <div className={cn("content")}>
              <div className={cn("text")}>
                  <p className={cn("lead")}>Frontend Engineer who turns complex requirements into clear, maintainable, and fast interfaces.</p>
                  <p className={cn("description")}>
                      I started with HTML email templates in 2018 and grew into building complex, data-driven React and TypeScript applications, including Micro Frontends with Webpack Module Federation. I believe good frontend work starts before the first line of code: understanding the problem, planning the architecture, and keeping components reusable and easy for other teams to adopt. I focus on performance where it matters to users — for example, progressive data loading that reduced a scheduling app’s initial load from 40–50 seconds to about 10.
                  </p>
              </div>
              <ActionPanel label="Download Resume" href={RESUME_URL} icon={downloadSVG} download />
          </div>
      </div>
      <Image src={portraitSmiling} placeholder="blur" loading="eager" className={cn("photo")} alt={AUTHOR_NAME} />
    </section>
  );
}
