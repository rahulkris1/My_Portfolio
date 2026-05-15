import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="divider-line" />
      <About />
      <div className="divider-line" />
      <Skills />
      <div className="divider-line" />
      <Experience />
      <div className="divider-line" />
      <Projects />
      <div className="divider-line" />
      <Education />
      <div className="divider-line" />
      <Contact />
    </>
  );
}
