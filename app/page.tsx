import { Hero } from "@/components/main/hero";
import { Skills } from "@/components/main/skills";
import { Projects } from "@/components/main/projects";
import { Encryption } from "@/components/main/encryption";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <section id="home">
          <Hero />
        </section>
        <section>
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section>
          <Encryption />
        </section>
      </div>
    </main>
  );
}
