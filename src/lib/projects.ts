import type { StaticImageData } from "next/image";
import digitalCafeMenu from "@/assets/images/featured-projects/digital-cafe-menu.webp";
import writingAiTool from "@/assets/images/featured-projects/writing-ai-tool.webp";

type ExternalUrl = `https://${string}` | `http://${string}`;

type BaseProject = {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  year: number;
  role: string;
  liveUrl: ExternalUrl;
};

export type Project = BaseProject &
  ({ isCommercial: true } | { isCommercial: false; githubUrl: ExternalUrl });

export const PROJECTS: readonly Project[] = [
  {
    id: "digital-cafe-menu",
    title: "Scalable digital menu platform for cafes",
    description:
      "Built a scalable, mobile-first digital menu platform designed to support multiple customizable templates and managed through an admin panel. Optimized for smartphones, where guests browse the menu at the table, it delivers a localized experience with dish selection and real-time order total calculation, providing a flexible solution that can adapt to different cafes and dining businesses.",
    image: digitalCafeMenu,
    imageAlt: "Digital Cafe Menu",
    year: 2026,
    role: "Front-end Developer",
    liveUrl: "https://menu.flavortech.co/ISem5NIG#/",
    isCommercial: true,
  },
  {
    id: "writing-ai-tool",
    title: "AI writing assistant powered by Claude",
    description:
      "Built an AI writing assistant that rewrites text with Claude and streams the result in real time. Six modes cover everything from polishing and translation to emails, LinkedIn posts and technical writing. It features magic-link and Google sign-in, a daily usage quota, generation history and saved custom instructions per mode, all built on Next.js, Supabase with Row Level Security and the Anthropic API.",
    image: writingAiTool,
    imageAlt: "Writing AI Tool",
    year: 2026,
    role: "Front-end Developer",
    liveUrl: "https://writing-ai-tool.vercel.app/",
    isCommercial: false,
    githubUrl: "https://github.com/maximsukhetsky/writing-ai-tool",
  },
];
