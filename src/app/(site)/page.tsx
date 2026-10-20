import AboutMe from "@/components/pages/home/about-me/AboutMe";
import FeaturedProjects from "@/components/pages/home/featured-projects/FeaturedProjects";
import HeroSection from "@/components/pages/home/hero-section/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <AboutMe />
    </main>
  );
}
