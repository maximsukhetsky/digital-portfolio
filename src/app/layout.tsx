import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Digital Portfolio | Maxim Sukhetsky",
    description: "Maxim Sukhetsky is a Frontend Engineer with 5+ years of commercial experience building scalable web applications with React, TypeScript, and JavaScript. Experienced in Micro Frontend architecture, state management, API integration, and performance optimization.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
