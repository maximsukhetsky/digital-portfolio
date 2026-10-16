export type EducationEntry = {
  degree: string;
  institution: string;
  location: string;
  period: string;
};

export type Certificate = {
  url: string;
  image: string;
  width: number;
  height: number;
};

export type Course = {
  title: string;
  provider: string;
  location: string;
  period: string;
  certificate?: Certificate;
};
