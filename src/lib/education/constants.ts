import danItCertificate from "@/assets/images/education/DANIT_certificate.webp";
import hillelCertificate from "@/assets/images/education/Hillel_IT_School_certificate.webp";
import kneuDiploma from "@/assets/images/education/Kyiv_National_University_of_Economics_diploma.webp";
import type { Course, EducationEntry } from "./types";

export const EDUCATION: readonly EducationEntry[] = [
  {
    degree: "Bachelor's Degree in Information Technology in Economics",
    institution: "Kyiv National University of Economics",
    location: "Kyiv",
    period: "2018 — 2020",
    diploma: {
      image: kneuDiploma,
    },
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
    certificate: {
      url: "https://certificate.ithillel.ua/view/81574247",
      image: hillelCertificate,
    },
  },
  {
    title: "Frontend Development Course",
    provider: "DAN.IT",
    location: "Kyiv",
    period: "2020 — 2021",
    certificate: {
      url: "https://certificates.dan-it.com.ua/certificates/frontend/sukhetskyi-maksym",
      image: danItCertificate,
    },
  },
];
