import { Link, useParams } from "react-router-dom";
import PageTransition from "../components/common/PageTransition";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import Placeholder from "../components/common/Placeholder";
import { ButtonLink } from "../components/common/Buttons";
import ProjectCard from "../components/projects/ProjectCard";
import { CaseSection, FeatureStatus, LinkPlaceholder } from "../components/projects/CaseStudy";
import usePageMeta from "../hooks/usePageMeta";
import { getProject, getRelated, projects } from "../data/projects";
import { getAccent } from "../lib/accents";
import NotFound from "./NotFound";

function MetaItem({ label, children }) {
  return (
    <div className="rounded-xl border border-line bg-raised p-4">
      <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
      <div className="mt-1.5 text-sm font-bold text-ink">{children}</div>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  usePageMeta({
    title: project ? project.title : "Project",
    description: project ? project.tagline : "Project case study.",
    path: project ? `/projects/${project.slug}` : "/projects",
  });

  if (!project) return <NotFound />;

  const a = getAccent(project.accent);
  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const related = getRelated(slug);

  return (
    <PageTransition className="pt-28 pb-20 sm:pt-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <Link
            to="/projects"
            className="mb-8 inline-flex items-center gap-1.5 font-mono text-[11.5px] font-semibold tracking-wide text-muted transition-colors hover:text-blue-ink"
          >
            <Icon name="ArrowLeft" size={13} />
            back to projects
          </Link>

          {/* ------------------------------------------------------ hero */}
          <div className="flex flex-wrap gap-2">
            {project.categories.map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{project.tagline}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold">
                <Icon name="Github" size={15} /> GitHub
              </a>
            ) : (
              <LinkPlaceholder icon="Github" label="GitHub link" />
            )}
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line bg-raised px-5 py-2.5 text-sm font-bold text-ink hover:border-blue">
                <Icon name="ExternalLink" size={15} /> Live demo
              </a>
            ) : (
              <LinkPlaceholder icon="ExternalLink" label="Live demo" />
            )}
          </div>
        </Reveal>

        {/* ------------------------------------------------------ cover */}
        <Reveal delay={0.08} className="mt-10">
          <div className={`relative flex h-52 items-center justify-center overflow-hidden rounded-2xl border border-line sm:h-64 ${a.tile}`}>
            <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden="true">
              <defs>
                <pattern id={`cover-${project.slug}`} width="26" height="26" patternUnits="userSpaceOnUse">
                  <path d="M26 0H0v26" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#cover-${project.slug})`} />
            </svg>
            <Icon name={project.icon} size={72} strokeWidth={1.4} className="relative" />
            <span className="placeholder-label absolute bottom-4">
              visual preview · DEMO PLACEHOLDER — NOT GENUINE
            </span>
          </div>
        </Reveal>

        {/* ------------------------------------------------------- meta */}
        <Reveal delay={0.1} className="mt-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MetaItem label="Status">{project.status}</MetaItem>
            <MetaItem label="My role">{project.role}</MetaItem>
            <MetaItem label="Stack">
              <span className="font-mono text-xs">{project.stack.join(" · ")}</span>
            </MetaItem>
            <MetaItem label="Timeline">
              <span className="placeholder-label !text-[8.5px]">add dates in projects.js</span>
            </MetaItem>
          </div>
        </Reveal>

        {/* ---------------------------------------------------- content */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <CaseSection icon="FileText" title="Overview">
            <p>{project.description}</p>
            {project.disclaimer && (
              <p className="mt-4 flex items-start gap-2 rounded-xl border border-warning/40 bg-warning/10 p-3.5 text-xs font-semibold leading-relaxed text-warning">
                <Icon name="AlertTriangle" size={14} className="mt-0.5 shrink-0" />
                {project.disclaimer}
              </p>
            )}
          </CaseSection>
          <CaseSection icon="Target" title="Problem statement" delay={0.05}>
            <p>{project.problem}</p>
          </CaseSection>
          <CaseSection icon="Wrench" title="My contribution" delay={0.08}>
            <p>{project.contribution}</p>
          </CaseSection>
          <CaseSection icon="ListChecks" title="Features & areas of work" delay={0.1}>
            <ul className="space-y-2.5">
              {project.features.map((f) => (
                <li key={f.name} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-[13.5px] font-semibold text-ink">
                    <Icon name="Check" size={14} className={a.text} />
                    {f.name}
                  </span>
                  <FeatureStatus status={f.status} />
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted">
              statuses: built · worked on · planned · exploring — planned items are intended, not
              confirmed production features.
            </p>
          </CaseSection>
          <CaseSection icon="AlertTriangle" title="Challenges" delay={0.12}>
            <p>{project.challenges}</p>
          </CaseSection>
          <CaseSection icon="Lightbulb" title="Solution approach" delay={0.14}>
            <p>{project.approach}</p>
          </CaseSection>
          <CaseSection icon="BarChart3" title="Results" delay={0.16}>
            <p className="flex items-start gap-2.5 rounded-xl border border-blue/30 bg-blue/8 p-4 text-[13px] leading-relaxed">
              <Icon name="Info" size={15} className="mt-0.5 shrink-0 text-blue-ink" />
              {project.results}
            </p>
          </CaseSection>
          <CaseSection icon="Sparkles" title="What I learned" delay={0.18}>
            <p>{project.learnings}</p>
          </CaseSection>
        </div>

        {/* -------------------------------------------------- screenshots */}
        <Reveal className="mt-10">
          <h2 className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-desk text-blue-ink">
              <Icon name="Eye" size={15} />
            </span>
            Screenshots
          </h2>
          <p className="mt-2 text-sm text-muted">
            Real screenshots haven&apos;t been supplied yet — these slots are reserved and clearly labelled.
          </p>
          <div className={`mt-5 grid gap-4 ${project.screenshots.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {project.screenshots.map((shot) => (
              <Placeholder key={shot.id} icon="Monitor" title={shot.caption} minHeight={190} />
            ))}
          </div>
        </Reveal>

        {/* ------------------------------------------------------ related */}
        {related.length > 0 && (
          <Reveal className="mt-14">
            <h2 className="text-lg font-extrabold tracking-tight text-ink">Related work</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {related.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </Reveal>
        )}

        {/* -------------------------------------------------- prev / next */}
        <Reveal className="mt-12">
          <div className="flex items-center justify-between gap-4 border-t border-line pt-6">
            <Link
              to={`/projects/${prev.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-blue-ink"
            >
              <Icon name="ArrowLeft" size={15} className="transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">{prev.title}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
            <ButtonLink to="/projects/archive" variant="ghost" icon="FolderArchive">
              Full archive
            </ButtonLink>
            <Link
              to={`/projects/${next.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-blue-ink"
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