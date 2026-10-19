import type { Metadata } from "next";
import AcademicHistory from "@/components/pages/education/academic-history/AcademicHistory";
import Courses from "@/components/pages/education/courses/Courses";

export const metadata: Metadata = {
  title: "Education",
};

export default function Education() {
  return (
    <main>
      <AcademicHistory />
      <Courses />
    </main>
  );
}
