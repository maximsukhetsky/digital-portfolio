import HeroSection from "@/components/home/hero-section/HeroSection";
import FeaturedProjects from "@/components/home/featured-projects/FeaturedProjects";
import AboutMe from "@/components/home/about-me/AboutMe";
import ContactSection from "@/components/home/contact-section/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <AboutMe />
      <ContactSection />
    </main>
  );
}
