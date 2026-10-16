import type { Metadata } from "next";
import WorkHistory from "@/components/experience/work-history/WorkHistory";
import Recommendations from "@/components/experience/recommendations/Recommendations";

export const metadata: Metadata = {
  title: "Experience",
};

export default function Experience() {
  return (
    <main>
      <WorkHistory />
      <Recommendations />
    </main>
  );
}
