import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";

export const Projects = () => {
  return (
    <div className="h-full w-full flex flex-col md:flex-row gap-10">
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
  );
};
