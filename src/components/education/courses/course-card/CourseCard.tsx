import classNames from "classnames/bind";
import type { Course } from "@/lib/education/types";
import DocumentImage from "@/components/education/document-image/DocumentImage";
import styles from "./CourseCard.module.scss";

const cn = classNames.bind(styles);

type CourseCardProps = Course;

export default function CourseCard({ title, provider, location, period, certificate }: CourseCardProps) {
  return (
    <li className={cn("course-card")}>
      <h3 className={cn("title")}>{title}</h3>
      <p className={cn("provider")}>{provider}</p>
      <p className={cn("meta")}>{location} · {period}</p>
      {certificate && <DocumentImage {...certificate} alt={`${provider} certificate`} />}
    </li>
  );
}
