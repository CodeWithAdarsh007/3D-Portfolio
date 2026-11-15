import { useEffect, useState } from "react";
import Icon from "../common/Icon";
import { links } from "../../data/portfolioContent";

const CACHE_KEY = "tdw-gh-repos";
const API = "https://api.github.com/users/CodeWithAdarsh007/repos?sort=pushed&per_page=6";

function timeAgo(iso) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return months < 12 ? `${months}mo ago` : `${Math.floor(months / 12)}y ago`;
}

/** Live public GitHub data (no credentials). Degrades gracefully offline. */
export default function GitHubPanel() {
  const [state, setState] = useState({ status: "loading", repos: [] });

  useEffect(() => {
    let cancelled = false;
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        setState({ status: "ready", repos: JSON.parse(cached) });
        return;
      }
    } catch {
      /* fall through to fetch */
    }
    fetch(API, { headers: { Accept: "application/vnd.github+json" } })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
        return res.json();
      })
      .then((repos) => {
        if (cancelled) return;
        const slim = repos.map((r) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          language: r.language,
          stars: r.stargazers_count,
          url: r.html_url,
          pushedAt: r.pushed_at,
          fork: r.fork,
        }));
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(slim));
        } catch {
          /* cache is optional */
        }
        setState({ status: "ready", repos: slim });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", repos: [] });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-desk text-ink">
            <Icon name="Github" size={19} />
          </span>
          <div>
            <h2 className="font-display text-base font-extrabold text-ink">Live from GitHub</h2>
            <p className="font-mono text-[10.5px] tracking-wide text-muted">
              api.github.com · public repos · no credentials
            </p>
          </div>
        </div>
        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-ink hover:underline"
        >
          View profile <Icon name="ArrowUpRight" size={13} />
        </a>
      </div>

      <div className="mt-6">
        {state.status === "loading" && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading repositories">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-desk" />
            ))}
          </div>
        )}

        {state.status === "error" && (
          <div className="rounded-xl border border-line bg-desk/60 p-5 text-sm text-muted">
            <p className="flex items-center gap-2 font-semibold text-ink">
              <Icon name="AlertTriangle" size={15} className="text-warning" />
              Couldn&apos;t reach the GitHub API right now.
            </p>
            <p className="mt-1.5 text-xs leading-relaxed">
              This panel shows live public repository data. Browse the profile directly instead —
              the curated case studies above are always available.
            </p>
          </div>
        )}

        {state.status === "ready" && state.repos.length === 0 && (
          <p className="rounded-xl border border-line bg-desk/60 p-5 text-sm text-muted">
            No public repositories found on this account yet.
          </p>
        )}

        {state.status === "ready" && state.repos.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {state.repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-line bg-raised p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue/50 hover:shadow-lift"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-mono text-[12.5px] font-bold text-ink group-hover:text-blue-ink">
                    {repo.name}
                  </p>
                  <Icon name="ArrowUpRight" size={13} className="shrink-0 text-muted group-hover:text-blue-ink" />
                </div>
                <p className="mt-1.5 line-clamp-2 min-h-[2rem] text-xs leading-relaxed text-muted">
                  {repo.description || "No description provided."}
                </p>
                <div className="mt-3 flex items-center gap-3 font-mono text-[10px] text-muted">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-leaf" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Icon name="Star" size={11} /> {repo.stars}
                  </span>
                  <span className="ml-auto">{timeAgo(repo.pushedAt)}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}