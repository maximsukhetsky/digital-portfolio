import { LINKEDIN_URL } from "@/constants/common";
import type { ExperienceEntry, Recommendation } from "./types";

export const LINKEDIN_RECOMMENDATIONS_URL = `${LINKEDIN_URL}/details/recommendations/`;

export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    role: "Frontend Developer",
    company: "SeaRates",
    period: "Apr 2023 — Aug 2026",
    summary:
      "Built customer-facing and internal React and TypeScript applications for logistics and supply chain workflows — from Micro Frontend architecture and integration contracts to performance-critical, data-heavy interfaces.",
    achievements: [
      "Developed and maintained customer-facing and internal web applications for logistics and supply chain workflows using React and TypeScript.",
      "Prepared applications for Micro Frontend integration using Webpack Module Federation, defined integration contracts and configuration through props, and documented integration guidelines for other teams.",
      "Developed a Freight Index interface with advanced filters, region autocomplete, and subscription-based features.",
      "Built a full-screen calendar from scratch using a custom data model and list virtualization to improve scrolling performance and reduce unnecessary re-renders.",
      "Optimized data loading in a scheduling application by progressively displaying initial results while loading remaining data in the background, reducing initial loading time from 40–50 seconds to approximately 10 seconds.",
      "Increased Jest unit test coverage of an authorization application integrated with 10+ other applications to approximately 90%, helping prevent regressions.",
      "Implemented role-based access and tailored interfaces for different user roles.",
      "Took ownership of frontend features from requirements and technical planning through implementation, backend integration, testing, and production release, collaborating with backend developers, QA engineers, designers, and other teams.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Genesis",
    period: "Jan 2022 — Feb 2023",
    summary:
      "Moved from markup into product development: built a React-based HTML email editor, campaign management tables and forms, and data-collection tooling for the marketing team.",
    achievements: [
      "Developed an HTML email editor with reusable React components and rich editing functionality.",
      "Built data tables for displaying and managing email campaigns using Redux and Semantic UI React.",
      "Built complex forms with React Hook Form and integrated frontend applications with REST APIs.",
      "Developed LinkedIn data parsers using Selenium and Cheerio, including proxy and user-agent rotation.",
    ],
  },
  {
    role: "HTML Coder",
    company: "Genesis",
    period: "Sep 2019 — Jan 2022",
    summary:
      "Owned responsive landing pages and HTML email templates that render consistently across browsers and email clients, and helped grow the team through interviews and mentoring.",
    achievements: [
      "Developed responsive landing pages and HTML email templates, ensuring cross-browser and email client compatibility.",
      "Maintained and optimized existing email templates, resolving rendering and production issues.",
      "Conducted technical interviews for HTML Developer and trainee positions and mentored new team members through onboarding, code reviews, and technical guidance.",
    ],
  },
  {
    role: "HTML Coder",
    company: "Aurora Technologies",
    period: "Aug 2018 — Aug 2019",
    summary:
      "Started my career building and maintaining responsive HTML email templates for marketing campaigns.",
    achievements: [
      "Developed and maintained responsive HTML email templates.",
      "Maintained and improved existing email campaigns, resolving markup and rendering issues.",
    ],
  },
];

export const RECOMMENDATIONS: readonly Recommendation[] = [
  {
    name: "Mykhailo Kazymyrskyi",
    initials: "MK",
    headline: "Senior software engineer",
    relationship: "Worked with Maxim on the same team",
    date: "July 2026",
    text: [
      "I have worked alongside Maxim for the past three years, and during this time, he has consistently proven himself to be an exceptionally skilled and driven Frontend Developer. He is a professional who never stops growing, continuously sharpening his skills and staying at the forefront of modern web technologies. His technical core in React, GraphQL, RESTlike APIs, and Micro-Frontend architecture is top-notch.",
      "What distinguishes Maxim is his deep sense of responsibility and commitment to code quality. He takes tasks seriously, always aiming to deliver clean, well-structured, maintainable, and scalable solutions. Crucially, he approaches every feature not just from an engineering perspective, but also through the lens of the end user, ensuring a seamless user experience alongside technical excellence.",
      "His continuous drive for improvement, combined with his high standards for execution, makes him a powerful addition to any modern engineering team. I highly recommend Maxim to anyone seeking a thoughtful, reliable, and high-caliber frontend specialist.",
    ],
    linkedinUrl: "https://www.linkedin.com/in/kazymyrskyi",
  },
  {
    name: "Anastasiia Matsyievska",
    initials: "AM",
    headline: "UX/UI Designer",
    relationship: "Worked with Maxim on a related team",
    date: "July 2026",
    text: [
      "I had the pleasure of working with Maxim at SeaRates by DP World, where I collaborated with him as a UX/UI Designer.",
      "Maxim approaches every task in a structured and thoughtful way. He carefully analyzes requirements, considers different user states and edge cases, and pays attention to details that can significantly affect the final experience.",
      "Working with him is always based on clear communication, transparency, and mutual understanding. He explains technical constraints clearly, actively discusses possible solutions, and helps keep the collaboration between design and development efficient and predictable.",
      "Maxim is a reliable and detail-oriented Frontend Engineer, and I would gladly recommend him to any team looking for a strong professional who values both product quality and effective teamwork.",
    ],
    linkedinUrl: "https://www.linkedin.com/in/anastasia-matsievskaya",
  },
];
