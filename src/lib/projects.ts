import type { StaticImageData } from "next/image";
import digitalCafeMenu from "@/assets/images/featured-projects/digital-cafe-menu.webp";

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

export type Project = BaseProject & (
  | { isCommercial: true }
  | { isCommercial: false; githubUrl: ExternalUrl }
);

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
];
