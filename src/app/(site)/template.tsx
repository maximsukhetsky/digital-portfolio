import type { ReactNode } from "react";
import SiteFooter from "@/components/site-footer/SiteFooter";

type SiteTemplateProps = {
  children: ReactNode;
};

export default function SiteTemplate({ children }: SiteTemplateProps) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  );
}
