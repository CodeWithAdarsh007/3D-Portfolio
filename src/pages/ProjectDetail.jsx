import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import PageTransition from "../components/common/PageTransition";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import ProjectArt, { ConceptTag } from "../components/art/ProjectArt";
import ProjectCard from "../components/projects/ProjectCard";
import { CaseSection, FeatureStatus, WorkflowDiagram } from "../components/projects/CaseStudy";
import { getProject, getRelated, projects } from "../data/projects";
import { getAccent } from "../lib/accents";
import NotFound from "./NotFound";

function CaseFact({ label, value }) {
  return <div><dt>{label}</dt><dd>{value}</dd></div>;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) return <NotFound />;

  const a = getAccent(project.accent);
  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const related = getRelated(slug);
  const screenshots = project.screenshots.filter(shot => shot.src);

  return (
    <PageTransition className="page-top pb-20">
      {/* ------------------------------------------------------ hero panel */}
      <div className="case-cover">
        <div className="shell">
          <Reveal>
            <Link
              to="/projects"
              className="mb-3 inline-flex items-center gap-1.5 font-mono text-[11.5px] font-bold tracking-wide text-muted transition-colors hover:text-blue-ink"
            >
              <Icon name="ArrowLeft" size={13} />
              back to the gallery
            </Link>

            <div className="case-intro">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
                <div>
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((c, i) => (
                      <span key={c} className={`sticker ${["bg-sunshine", "bg-turquoise", "bg-coral"][i % 3]} !text-[11px]`}>
                        {c}
                      </span>
                    ))}
                  </div>
                  <h1 className="mt-5 [overflow-wrap:anywhere] font-display text-[clamp(1.7rem,8vw,2.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
                    {project.title}
                  </h1>
                  <p className="mt-4 max-w-xl text-base font-semibold leading-relaxed text-muted sm:text-lg">
                    {project.tagline}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold">
                        <Icon name="Github" size={15} /> GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="sticker bg-raised text-ink">
                        <Icon name="ExternalLink" size={15} /> Live demo
                      </a>
                    )}
                    {(!project.github || !project.demo) && (
                      <p className="flex items-center gap-2 text-xs font-semibold text-muted">
                        <Icon name="Info" size={15} className="shrink-0" />
                        {project.github ? "Live demo link pending." : project.demo ? "Repository link pending." : "Repository and live demo links pending."}
                      </p>
                    )}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="overflow-hidden rounded-2xl border border-line">
                    <ProjectArt slug={project.slug} className="h-auto w-full" />
                  </div>
                  <ConceptTag className="absolute -bottom-3 left-6" />
                </motion.div>
              </div>

              <dl className="case-facts">
                <CaseFact label="Status" value={project.status} />
                <CaseFact label="My role" value={project.role} />
                <CaseFact label="Stack" value={project.stack.slice(0, 3).join(" · ")} />
              </dl>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="shell">
        {/* ------------------------------------------------ overview + why */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <section className="card h-full border border-line p-7 sm:p-9">
              <p className="eyebrow mb-4" style={{ "--eyebrow-color": a.ink }}>Overview</p>
              <p className="font-display text-xl font-semibold leading-relaxed text-ink sm:text-2xl">
                {project.description}
              </p>
              {project.disclaimer && (
                <p className="mt-5 flex items-start gap-2 rounded-xl border-2 border-sunshine bg-sunshine/25 p-4 text-xs font-bold leading-relaxed text-sunshine-ink">
                  <Icon name="AlertTriangle" size={15} className="mt-0.5 shrink-0" />
                  {project.disclaimer}
                </p>
              )}
            </section>
          </Reveal>
          <Reveal delay={0.08}>
            <section
              className="h-full rounded-3xl border border-line p-7 shadow-sticker-sm sm:p-9"
              style={{ background: `color-mix(in srgb, ${a.field} 18%, var(--surface))` }}
            >
              <p className="font-mono text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink/85">
                Why it matters
              </p>
              <p className="mt-4 font-display text-lg font-bold leading-relaxed text-ink">
                “{project.why}”
              </p>
            </section>
          </Reveal>
        </div>

        {/* -------------------------------------------- problem + contribution */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <CaseSection icon="Target" title="The problem" tint="panel-coral">
            <p>{project.problem}</p>
          </CaseSection>
          <CaseSection icon="Wrench" title="My contribution" delay={0.06} tint="panel-turquoise">
            <p>{project.contribution}</p>
          </CaseSection>
        </div>

        {/* ------------------------------------------------------- workflow */}
        <Reveal className="mt-10">
          <h2 className="mb-5 flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-lavender text-plum shadow-sticker-sm">
              <Icon name="GitBranch" size={16} />
            </span>
            How it flows
          </h2>
          <WorkflowDiagram steps={project.workflow} accent={project.accent} />
        </Reveal>

        {/* ------------------------------------------------------- features */}
        <Reveal className="mt-10">
          <section className="card border border-line p-7 sm:p-9">
            <h2 className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-ink">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-leaf text-plum shadow-sticker-sm">
                <Icon name="ListChecks" size={16} />
              </span>
              Features & areas of work
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.features.map((f) => (
                <li
                  key={f.name}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-raised px-4 py-3"
                >
                  <span className="flex items-center gap-2 text-[13.5px] font-bold text-ink">
                    <Icon name="Check" size={14} className={a.text} />
                    {f.name}
                  </span>
                  <FeatureStatus status={f.status} />
                </li>
              ))}
            </ul>
            <p className="mt-5 font-mono text-[10px] font-semibold leading-relaxed text-muted">
              statuses: built · worked on · planned · exploring — planned items are intended, not
              confirmed production features.
            </p>
          </section>
        </Reveal>

        {/* ------------------------------------------ challenges + learnings */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <CaseSection icon="AlertTriangle" title="Technical challenges" tint="panel-sunshine">
            <p>{project.challenges}</p>
          </CaseSection>
          <CaseSection icon="Lightbulb" title="Solution approach" delay={0.06} tint="panel-lavender">
            <p>{project.approach}</p>
          </CaseSection>
        </div>

        <Reveal className="mt-6">
          <section
            className="rounded-3xl border border-line p-7 shadow-sticker-sm sm:p-9"
            style={{ background: "linear-gradient(120deg, color-mix(in srgb, var(--leaf) 20%, var(--surface)), color-mix(in srgb, var(--turquoise) 16%, var(--surface)))" }}
          >
            <h2 className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-ink">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-raised text-ink shadow-sticker-sm">
                <Icon name="Sparkles" size={16} />
              </span>
              What I learned
            </h2>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-ink">{project.learnings}</p>
            <p className="mt-4 flex items-start gap-2 rounded-xl border border-ink/20 bg-raised/70 p-4 text-xs font-bold leading-relaxed text-muted">
              <Icon name="Info" size={14} className="mt-0.5 shrink-0 text-blue-ink" />
              {project.results}
            </p>
          </section>
        </Reveal>

        {/* ---------------------------------------------------- screenshots */}
        <Reveal className="mt-10">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-tangerine text-plum shadow-sticker-sm">
              <Icon name="Eye" size={16} />
            </span>
            Interface previews
          </h2>
          {screenshots.length ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {screenshots.map(shot => (
                <figure key={shot.id} className="card overflow-hidden">
                  <img src={shot.src} alt={shot.alt || shot.caption} loading="lazy" className="h-auto w-full" />
                  <figcaption className="p-4 text-sm text-muted">{shot.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              The cover illustrates the interface concept. Product screenshots have yet to be published.
            </p>
          )}
        </Reveal>

        {/* ------------------------------------------------------ related */}
        {related.length > 0 && (
          <Reveal className="mt-14">
            <h2 className="font-display text-xl font-extrabold tracking-tight text-ink">Related work</h2>
            <div className={`mt-5 grid gap-6 ${related.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {related.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} featured={related.length === 1} />
              ))}
            </div>
          </Reveal>
        )}

        <Reveal className="mt-12">
          <div className="flex items-center justify-between gap-4 border-t-2 border-line pt-6">
            <Link
              to={`/projects/${prev.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-blue-ink"
            >
              <Icon name="ArrowLeft" size={15} className="transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">{prev.title}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
            <Link to="/projects/archive" className="sticker bg-sunshine">
              <Icon name="FolderArchive" size={14} />
              Full archive
            </Link>
            <Link
              to={`/projects/${next.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-blue-ink"
            >
              <span className="hidden sm:inline">{next.title}</span>
              <span className="sm:hidden">Next</span>
              <Icon name="ArrowRight" size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}