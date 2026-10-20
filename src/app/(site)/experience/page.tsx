import type { Metadata } from "next";
import Recommendations from "@/components/pages/experience/recommendations/Recommendations";
import WorkHistory from "@/components/pages/experience/work-history/WorkHistory";

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
