import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import usePageMeta from "../hooks/usePageMeta";
import { projects } from "../data/projects";
import { getAccent } from "../lib/accents";

/** Dense archive view — the "project folder" on the desk opens this. */
export default function ProjectArchive() {
  usePageMeta({
    title: "Project Archive",
    description: "The complete project archive of Adarsh's Dev Workspace — every case study in one folder.",
    path: "/projects/archive",
  });

  return (
    <PageShell
      wide
      eyebrow="Project folder · complete archive"
      title="The full archive"
      body="Every project in the workspace, indexed. Open a row to read the complete case study."
    >
      <Reveal>
        <p className="mb-5 font-mono text-[11px] tracking-wide text-muted">
          {projects.length} records · sorted by archive order · external links pending
        </p>

        {/* desktop table */}
        <div className="card hidden overflow-hidden md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-desk/60 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                <th className="px-5 py-3.5 font-semibold">Project</th>
                <th className="px-5 py-3.5 font-semibold">Categories</th>
                <th className="px-5 py-3.5 font-semibold">Stack</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">
                  <span className="sr-only">Open</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const a = getAccent(p.accent);
                return (
                  <tr key={p.slug} className="group border-b border-line/60 last:border-0 hover:bg-desk/40">
                    <td className="px-5 py-4">
                      <Link to={`/projects/${p.slug}`} className="flex items-center gap-3">
                        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${a.tile}`}>
                          <Icon name={p.icon} size={16} />
                        </span>
                        <span>
                          <span className="block font-extrabold text-ink group-hover:text-blue-ink">{p.title}</span>
                          <span className="block font-mono text-[10.5px] text-muted">{p.slug}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {p.categories.map((c) => (
                          <span key={c} className="chip !px-2 !py-0.5 !text-[10px]">
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-[11.5px] text-muted">{p.stack.join(", ")}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold text-muted">
                        <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        to={`/projects/${p.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-ink hover:underline"
                      >
                        Open <Icon name="ArrowRight" size={13} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* mobile cards */}
        <div className="space-y-3 md:hidden">
          {projects.map((p) => {
            const a = getAccent(p.accent);
            return (
              <Link key={p.slug} to={`/projects/${p.slug}`} className="card block p-5">
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${a.tile}`}>
                    <Icon name={p.icon} size={18} />
                  </span>
                  <div>
                    <p className="font-extrabold text-ink">{p.title}</p>
                    <p className="font-mono text-[10px] text-muted">{p.status}</p>
                  </div>
                  <Icon name="ArrowRight" size={15} className="ml-auto text-muted" />
                </div>
                <p className="mt-3 font-mono text-[11px] text-muted">{p.stack.join(" · ")}</p>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </PageShell>
  );
}