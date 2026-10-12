import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";

export default function WorkPage() {
  return (
    <main className="min-h-screen pt-20 pb-20 px-5">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-[40px] font-bold mb-12">
          <span className="text-gradient-primary">Selected Work</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.title}
              src={project.image}
              title={project.title}
              description={project.description}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
