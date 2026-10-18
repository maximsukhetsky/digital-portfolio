import classNames from "classnames/bind";
import { EDUCATION } from "@/lib/education/constants";
import PageTitle from "@/components/ui/page-title/PageTitle";
import EducationItem from "./education-item/EducationItem";
import styles from "./AcademicHistory.module.scss";

const cn = classNames.bind(styles);

export default function AcademicHistory() {
  return (
    <section className={cn("academic-history", "wrapper")}>
      <PageTitle lines={["My Education"]} className={cn("title")} />
      <ul className={cn("entries")}>
        {EDUCATION.map((entry) => (
          <EducationItem key={entry.institution} {...entry} />
        ))}
      </ul>
    </section>
  );
}
