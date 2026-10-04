import type { Metadata } from "next";
import SiteHeader from "@/components/site-header/SiteHeader";
import { bebasNeueFont, interFont, manropeFont } from "@/lib/fonts";
import "@/styles/globals.scss";

export const metadata: Metadata = {
    title: {
        default: "Digital Portfolio | Maxim Sukhetsky",
        template: "%s | Maxim Sukhetsky",
    },
    description: "Maxim Sukhetsky is a Frontend Engineer with 5+ years of commercial experience building scalable web applications with React, TypeScript, and JavaScript. Experienced in Micro Frontend architecture, state management, API integration, and performance optimization.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bebasNeueFont.variable} ${interFont.variable} ${manropeFont.variable}`}>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
