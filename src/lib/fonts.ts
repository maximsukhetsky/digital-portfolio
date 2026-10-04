import { Manrope, Bebas_Neue, Inter } from "next/font/google";

export const bebasNeueFont = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--bebas-neue-font",
});

export const interFont = Inter({
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--inter-font",
});

export const manropeFont = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--manrope-font",
});
