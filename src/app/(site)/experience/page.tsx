import type { Metadata } from "next";
import WorkHistory from "@/components/pages/experience/work-history/WorkHistory";
import Recommendations from "@/components/pages/experience/recommendations/Recommendations";

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
