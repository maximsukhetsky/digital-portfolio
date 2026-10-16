import type { Course, EducationEntry } from "./types";

export const EDUCATION: readonly EducationEntry[] = [
  {
    degree: "Bachelor's Degree in Information Technology in Economics",
    institution: "Kyiv National University of Economics",
    location: "Kyiv",
    period: "2018 — 2020",
  },
  {
    degree: "Junior Specialist in Computer Science",
    institution: "Kyiv College of Information Systems and Technologies",
    location: "Kyiv",
    period: "2014 — 2018",
  },
];

export const COURSES: readonly Course[] = [
  {
    title: "Claude AI development for frontend developers",
    provider: "Hillel IT School",
    location: "Remote",
    period: "October 2026",
  },
  {
    title: "Frontend Development Course",
    provider: "Dan.IT",
    location: "Kyiv",
    period: "2020 — 2021",
    certificate: {
      url: "https://certificates.dan-it.com.ua/certificates/frontend/sukhetskyi-maksym",
      image: "/education/DANIT_certificate.webp",
      width: 1724,
      height: 1110,
    },
  },
];
