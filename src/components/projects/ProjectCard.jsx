import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import Icon from "../common/Icon";
import ProjectArt, { ConceptTag } from "../art/ProjectArt";
import { getAccent } from "../../lib/accents";

/**
 * Individually composed project card: large original concept artwork,
 * project-specific palette, sticker metadata. `featured` renders a wide
 * gallery hero composition.
 */
export default function ProjectCard({ project, index = 0, featured = false }) {
  const a = getAccent(project.accent);

  const art = (
    <div className={`relative overflow-hidden ${featured ? "h-56 sm:h-full sm:min-h-[280px]" : "h-44"}`}>
      <ProjectArt
        slug={project.slug}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
      />
      <ConceptTag className="absolute left-3 top-3" />
    </div>
  );

  const body = (
    <div className={`flex flex-1 flex-col p-6 ${featured ? "sm:p-8" : ""}`}>
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full border border-ink ${a.dot}`} />
        <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted">
          {project.status}
        </p>
      </div>
      <h2 className={`mt-2.5 font-display font-extrabold tracking-tight text-ink ${featured ? "text-3xl" : "text-xl"}`}>
        {project.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>
      {featured && (
        <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-muted">
          {project.description}
        </p>
      )}

      <div className="my-4 flex flex-wrap gap-1.5">
        {project.categories.slice(0, featured ? 3 : 2).map((c) => (
          <span key={c} className={`chip !border-ink/20 ${a.tile}`}>
            {c}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t-2 border-line pt-4">
        <span className="min-w-0 truncate font-mono text-[11px] font-semibold text-muted">
          {project.stack.slice(0, 3).join(" · ")}
        </span>
        <span className={`sticker shrink-0 ${a.solid} !px-3.5 !py-1.5 !text-[11px]`}>
          Case study
          <Icon name="ArrowRight" size={12} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );

  return (
    <Reveal delay={index * 0.04}
      className={featured ? "md:col-span-2" : ""}
    >
      <Link
        to={`/projects/${project.slug}`}
        className={`card group flex h-full overflow-hidden border border-line transition-all duration-300 hover:-translate-y-1 hover:shadow-desk ${
          featured ? "flex-col sm:flex-row" : "flex-col"
        }`}
      >
        {featured ? (
          <>
            <div className="sm:w-[55%]">{art}</div>
            {body}
          </>
        ) : (
          <>
            {art}
            {body}
          </>
        )}
      </Link>
    </Reveal>
  );
}