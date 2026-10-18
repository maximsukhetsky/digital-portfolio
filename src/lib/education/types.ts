import type { StaticImageData } from "next/image";

export type EducationEntry = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  diploma?: ScannedDocument;
};

export type ScannedDocument = {
  image: StaticImageData;
  url?: string;
};

export type Course = {
  title: string;
  provider: string;
  location: string;
  period: string;
  certificate?: ScannedDocument;
};
