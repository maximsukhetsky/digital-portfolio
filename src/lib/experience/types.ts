export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  summary: string;
  achievements: string[];
};

export type Recommendation = {
  name: string;
  initials: string;
  headline: string;
  relationship: string;
  date: string;
  text: string[];
  linkedinUrl: string;
};
