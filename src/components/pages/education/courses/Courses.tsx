import classNames from "classnames/bind";
import { COURSES } from "@/lib/education/constants";
import CourseCard from "./course-card/CourseCard";
import styles from "./Courses.module.scss";

const cn = classNames.bind(styles);

export default function Courses() {
  return (
    <section className={cn("courses", "wrapper")}>
      <h2 className={cn("title")}>Courses & Certificates</h2>
      <ul className={cn("cards")}>
        {COURSES.map((course) => (
          <CourseCard key={course.provider} {...course} />
        ))}
      </ul>
    </section>
  );
}
