import type { ReactNode } from "react";
import SiteHeader from "@/components/site-header/SiteHeader";

type SiteLayoutProps = {
  children: ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
