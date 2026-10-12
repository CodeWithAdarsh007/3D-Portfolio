import { Hero } from "@/components/main/hero";
import { Skills } from "@/components/main/skills";
import { Projects } from "@/components/main/projects";
import { Encryption } from "@/components/main/encryption";

export default function Home() {
  return (
    <main className="h-full w-full overflow-x-hidden">
      <Hero />
      <section id="skills" className="scroll-mt-24">
        <Skills />
      </section>
      <section id="projects" className="scroll-mt-24">
        <Projects />
      </section>
      <section id="contact" className="scroll-mt-24">
        <Encryption />
      </section>
    </main>
  );
}
