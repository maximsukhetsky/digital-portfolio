import HeroSection from "@/components/home/hero-section/HeroSection";
import FeaturedProjects from "@/components/home/featured-projects/FeaturedProjects";
import AboutMe from "@/components/home/about-me/AboutMe";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <AboutMe />
    </main>
  );
}
