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
      "Adarsh's project archive: NoteKart, Paper Format Translator, AI Diet Recommendation, Online College Election System, and the AI Agent Reliability Lab.",
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

  return (
    <PageShell
      wide
      eyebrow="Laptop · my projects"
      title="Things I've built and explored"
      body="Every project gets an honest case study — the problem, my contribution, the approach, and what I learned. Unverified links and screenshots are clearly labelled."
    >
      {/* --------------------------------------------------------- controls */}
      <Reveal className="mb-8 space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">Search projects</span>
            <Icon name="Search" size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, stack, or category…"
              className="w-full rounded-full border border-line bg-raised py-2.5 pl-11 pr-4 text-sm font-medium text-ink placeholder:text-muted/70 focus:border-blue"
            />
          </label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 font-mono text-[11px] font-semibold text-muted">
              sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-line bg-raised px-3 py-2 text-xs font-semibold text-ink focus:border-blue"
              >
                <option value="default">Archive order</option>
                <option value="name">Name A–Z</option>
                <option value="category">Category</option>
              </select>
            </label>
            <Link
              to="/projects/archive"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-raised px-4 py-2 text-xs font-bold text-ink transition-colors hover:border-blue hover:text-blue-ink"
            >
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
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
                category === c
                  ? "btn-primary shadow-lift"
                  : "border border-line bg-raised text-muted hover:border-blue/50 hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="font-mono text-[11px] tracking-wide text-muted" aria-live="polite">
          showing {filtered.length} of {projects.length} projects
          {category !== "All" && ` · ${category}`}
          {query.trim() && ` · “${query.trim()}”`}
        </p>
      </Reveal>

      {/* ------------------------------------------------------------ grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center gap-4 p-14 text-center">
          <Icon name="FileSearch" size={34} className="text-muted" />
          <p className="text-lg font-extrabold text-ink">No projects match that search.</p>
          <p className="max-w-sm text-sm text-muted">
            Try a different keyword or category — the archive covers AI/ML, agents, software, web,
            entrepreneurship, and research.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="btn-primary rounded-full px-5 py-2.5 text-sm font-bold"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* ---------------------------------------------------------- github */}
      <Reveal className="mt-14">
        <GitHubPanel />
      </Reveal>
    </PageShell>
  );
}