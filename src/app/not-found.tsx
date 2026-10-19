import type { Metadata } from "next";
import NotFound from "@/components/pages/not-found/NotFound";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFoundPage() {
  return (
    <main>
      <NotFound />
    </main>
  );
}
