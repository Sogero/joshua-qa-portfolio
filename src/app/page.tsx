import { About } from "@/components/About";
import { CaseStudies } from "@/components/CaseStudies";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/Interactive";
import { Hero } from "@/components/Hero";
import { Intro, Marquee } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { Awards, Philosophy } from "@/components/Philosophy";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Intro />
        <Skills />
        <Experience />
        <Projects />
        <CaseStudies />
        <Philosophy />
        <Awards />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
