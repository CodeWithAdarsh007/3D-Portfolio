import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Icon from "../common/Icon";
import { getAccent } from "../../lib/accents";

/** Project preview card with an original generated cover (not a fake screenshot). */
export default function ProjectCard({ project, index = 0 }) {
  const a = getAccent(project.accent);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className={`card group block overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-desk ${a.border}`}
      >
        <div className={`relative flex h-32 items-center justify-center overflow-hidden ${a.tile}`}>
          <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden="true">
            <defs>
              <pattern id={`grid-${project.slug}`} width="22" height="22" patternUnits="userSpaceOnUse">
                <path d="M22 0H0v22" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${project.slug})`} />
          </svg>
          <Icon name={project.icon} size={44} strokeWidth={1.6} className="relative transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute right-3 top-3 rounded-full bg-raised/80 px-2.5 py-1 font-mono text-[9.5px] font-semibold tracking-wide text-muted">
            {project.slug}
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
              {project.status}
            </p>
          </div>
          <h3 className="mt-2.5 text-xl font-extrabold tracking-tight text-ink transition-colors group-hover:text-blue-ink">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.categories.slice(0, 2).map((c) => (
              <span key={c} className="chip !px-2.5 !py-1 !text-[10.5px]">
                {c}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
            <span className="min-w-0 truncate font-mono text-[11px] text-muted">{project.stack.slice(0, 3).join(" · ")}</span>
            <span className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-bold ${a.text}`}>
              Case study
              <Icon name="ArrowRight" size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}