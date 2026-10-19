import HeroSection from "@/components/pages/home/hero-section/HeroSection";
import FeaturedProjects from "@/components/pages/home/featured-projects/FeaturedProjects";
import AboutMe from "@/components/pages/home/about-me/AboutMe";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <AboutMe />
    </main>
  );
}
