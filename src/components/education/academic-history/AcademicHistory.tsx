import classNames from "classnames/bind";
import { EDUCATION } from "@/lib/education/constants";
import EducationItem from "./education-item/EducationItem";
import styles from "./AcademicHistory.module.scss";

const cn = classNames.bind(styles);

export default function AcademicHistory() {
  return (
    <section className={cn("academic-history", "wrapper")}>
      <h1 className={cn("title")}>My Education</h1>
      <ul className={cn("entries")}>
        {EDUCATION.map((entry) => (
          <EducationItem key={entry.institution} {...entry} />
        ))}
      </ul>
    </section>
  );
}
