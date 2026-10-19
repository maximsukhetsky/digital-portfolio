import classNames from "classnames/bind";
import { EXPERIENCE } from "@/lib/experience/constants";
import ExperienceItem from "./experience-item/ExperienceItem";
import styles from "./WorkHistory.module.scss";

const cn = classNames.bind(styles);

export default function WorkHistory() {
  return (
    <section className={cn("work-history", "wrapper")}>
      <h1 className={cn("title")}>My Experience</h1>
      <ul className={cn("entries")}>
        {EXPERIENCE.map((entry) => (
          <ExperienceItem key={`${entry.company}-${entry.period}`} {...entry} />
        ))}
      </ul>
    </section>
  );
}
