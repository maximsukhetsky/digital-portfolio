import { Inter, Sofia_Sans_Condensed } from "next/font/google";

export const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  display: "swap",
  variable: "--heading-font",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--text-font",
});
