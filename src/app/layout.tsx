import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { AUTHOR_NAME } from "@/constants/common";
import { bebasNeueFont, interFont, manropeFont } from "@/lib/fonts";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: {
    default: `Digital Portfolio | ${AUTHOR_NAME}`,
    template: `%s | ${AUTHOR_NAME}`,
  },
  description: `${AUTHOR_NAME} is a Frontend Engineer with 5+ years of commercial experience building scalable web applications with React, TypeScript, and JavaScript. Experienced in Micro Frontend architecture, state management, API integration, and performance optimization.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebasNeueFont.variable} ${interFont.variable} ${manropeFont.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
