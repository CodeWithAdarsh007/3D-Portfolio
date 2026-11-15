import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import ProjectCard from "../components/projects/ProjectCard";
import GitHubPanel from "../components/projects/GitHubPanel";
import usePageMeta from "../hooks/usePageMeta";
import { projectCategories, projects } from "../data/projects";

export default function Projects() {
  usePageMeta({
    title: "Projects",
    description:
      "Adarsh's project gallery: NoteKart, Paper Format Translator, AI Diet Recommendation, Online College Election System, and the AI Agent Reliability Lab — each with its own visual identity.",
    path: "/projects",
  });

  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let list = projects.filter((p) => {
      const inCategory = category === "All" || p.categories.includes(category);
      const q = query.trim().toLowerCase();
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.stack.join(" ").toLowerCase().includes(q) ||
        p.categories.join(" ").toLowerCase().includes(q);
      return inCategory && inQuery;
    });
    if (sort === "name") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "category") list = [...list].sort((a, b) => a.categories[0].localeCompare(b.categories[0]));
    return list;
  }, [category, query, sort]);

  const isCurated = category === "All" && !query.trim() && sort === "default";

  return (
    <PageShell
      wide
      accent="tangerine"
      second="lavender"
      eyebrow="Laptop · the project gallery"
      eyebrowColor="var(--tangerine-ink)"
      title="A gallery of things I've built"
      body="Every project gets its own artwork, palette and case study — the problem, my contribution, the approach, and what I learned. Concept visuals are labelled; unverified links never pretend to work."
    >
      {/* --------------------------------------------------------- controls */}
      <Reveal className="mb-10 space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">Search projects</span>
            <Icon name="Search" size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, stack, or category…"
              className="w-full rounded-full border-2 border-ink bg-raised py-2.5 pl-11 pr-4 text-sm font-semibold text-ink shadow-sticker-sm placeholder:text-muted/70 focus:border-blue"
            />
          </label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 font-mono text-[11px] font-bold text-muted">
              sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border-2 border-ink bg-raised px-3 py-2 text-xs font-bold text-ink focus:border-blue"
              >
                <option value="default">Curated order</option>
                <option value="name">Name A–Z</option>
                <option value="category">Category</option>
              </select>
            </label>
            <Link to="/projects/archive" className="sticker bg-sunshine">
              <Icon name="FolderArchive" size={14} />
              Full archive
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {projectCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full border-2 px-4 py-2 text-xs font-extrabold transition-all duration-200 ${
                category === c
                  ? "border-ink bg-blue text-white dark:text-plum shadow-sticker-sm"
                  : "border-ink/25 bg-raised text-muted hover:-translate-y-0.5 hover:border-ink hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="font-mono text-[11px] font-bold tracking-wide text-muted" aria-live="polite">
          showing {filtered.length} of {projects.length} projects
          {category !== "All" && ` · ${category}`}
          {query.trim() && ` · “${query.trim()}”`}
        </p>
      </Reveal>

      {/* ---------------------------------------------------------- mosaic */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} featured={isCurated && i === 0} />
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center gap-4 border-2 border-ink p-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sunshine text-plum shadow-sticker-sm">
            <Icon name="FileSearch" size={26} />
          </span>
          <p className="font-display text-lg font-extrabold text-ink">No projects match that search.</p>
          <p className="max-w-sm text-sm font-medium text-muted">
            Try a different keyword or category — the gallery covers AI/ML, agents, software, web,
            entrepreneurship, and research.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="sticker bg-coral"
          >
            Reset filters
          </button>
        </div>
      )}

      <Reveal className="mt-14">
        <GitHubPanel />
      </Reveal>
    </PageShell>
  );
}