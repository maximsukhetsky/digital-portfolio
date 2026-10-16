import type { Metadata } from "next";
import AboutMe from "@/components/about/about-me/AboutMe";
import Capabilities from "@/components/about/capabilities/Capabilities";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <main>
      <AboutMe />
      <Capabilities />
    </main>
  );
}
