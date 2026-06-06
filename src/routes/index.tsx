import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Tools } from "@/components/portfolio/Tools";
import { Experience } from "@/components/portfolio/Experience";
import { Services } from "@/components/portfolio/Services";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Particles } from "@/components/portfolio/Particles";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zanko — Developer, AI & Cybersecurity Specialist" },
      { name: "description", content: "Premium portfolio of Zanko — Developer, Cybersecurity Enthusiast, and AI & Automation Specialist building futuristic digital experiences." },
      { property: "og:title", content: "Zanko — Developer, AI & Cybersecurity Specialist" },
      { property: "og:description", content: "Premium portfolio of Zanko — building futuristic AI, web, and automation products." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <CursorGlow />
      <Particles />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Tools />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
