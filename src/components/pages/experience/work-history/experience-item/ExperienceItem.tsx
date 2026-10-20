import classNames from "classnames/bind";
import type { ExperienceEntry } from "@/lib/experience/types";
import styles from "./ExperienceItem.module.scss";

const cn = classNames.bind(styles);

type ExperienceItemProps = ExperienceEntry;

export default function ExperienceItem({
  role,
  company,
  period,
  summary,
  achievements,
}: ExperienceItemProps) {
  return (
    <li className={cn("experience-item")}>
      <div className={cn("heading")}>
        <h2 className={cn("role")}>{role}</h2>
        <p className={cn("period")}>{period}</p>
        <p className={cn("company")}>{company}</p>
      </div>
      <p className={cn("summary")}>{summary}</p>
      <ul className={cn("achievements")}>
        {achievements.map((achievement) => (
          <li key={achievement} className={cn("achievement")}>
            {achievement}
          </li>
        ))}
      </ul>
    </li>
  );
}
