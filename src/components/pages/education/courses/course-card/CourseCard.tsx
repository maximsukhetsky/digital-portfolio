import classNames from "classnames/bind";
import DocumentImage from "@/components/pages/education/document-image/DocumentImage";
import type { Course } from "@/lib/education/types";
import styles from "./CourseCard.module.scss";

const cn = classNames.bind(styles);

type CourseCardProps = Course;

export default function CourseCard({
  title,
  provider,
  location,
  period,
  certificate,
}: CourseCardProps) {
  return (
    <li className={cn("course-card")}>
      <h3 className={cn("title")}>{title}</h3>
      <p className={cn("provider")}>{provider}</p>
      <p className={cn("meta")}>
        {location} · {period}
      </p>
      {certificate && (
        <DocumentImage
          {...certificate}
          imageClassName={cn("certificate")}
          alt={`${provider} certificate`}
        />
      )}
    </li>
  );
}
