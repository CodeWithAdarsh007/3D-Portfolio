import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";
import Link from "next/link";

// Generate static params
export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const project = PROJECTS.find(
    (p) => p.title.toLowerCase().replace(/[^a-z0-9]/g, "-") === slug
  );

  if (!project) {
    return (
      <main className="min-h-screen pt-20 pb-20 px-5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[32px] font-bold mb-4">Project not found</h1>
          <Link href="/work" className="text-accent-primary hover:underline">
            ← Back to all work
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-20 px-5">
      <div className="max-w-[1000px] mx-auto">
        {/* Back link */}
        <Link href="/work" className="text-accent-primary hover:underline text-sm mb-8 inline-block">
          ← All work
        </Link>

        {/* Project header */}
        <div className="mb-8">
          <h1 className="text-[40px] font-bold mb-2">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-text-secondary text-sm">
            <span>{project.role}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <Link href={project.link} target="_blank" rel="noreferrer noopener" className="text-accent-primary hover:underline">
              Visit live ↗
            </Link>
          </div>
        </div>

        {/* Live preview */}
        <div className="mb-10 rounded-lg overflow-hidden border border-border">
          <ProjectCard
            src={project.image}
            title={project.title}
            description={project.description}
            link={project.link}
          />
        </div>

        {/* Project details */}
        <div className="space-y-8">
          {/* The brief */}
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">The brief</h2>
            <p className="text-text-secondary">{project.longDescription}</p>
          </section>

          {/* What I built */}
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">What I built</h2>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-accent-primary mt-1">•</span>
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Stack */}
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-accent-primary-soft text-accent-primary text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Next project card */}
        <div className="mt-16 pt-10 border-t border-border">
          <h3 className="text-lg font-semibold mb-6">Check out more work</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.filter((p) => p.title !== project.title).map((p) => (
              <Link
                key={p.title}
                href={`/work/${p.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className="p-6 rounded-lg bg-bg-surface border border-border hover:border-accent-primary transition"
              >
                <h4 className="text-lg font-semibold mb-1">{p.title}</h4>
                <p className="text-text-secondary text-sm">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
