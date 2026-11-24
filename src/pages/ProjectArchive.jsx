import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import { projects } from "../data/projects";
import { getAccent } from "../lib/accents";

const ROW_TINT = ["bg-sunshine/20", "bg-turquoise/15", "bg-coral/15", "bg-lavender/15", "bg-leaf/15"];

/** Dense archive view — the "project folder" on the desk opens this. */
export default function ProjectArchive() {
  return (
    <PageShell
      eyebrow="Project folder · complete archive"
      title="The full archive"
      body="Every project in the studio, indexed like a well-kept folder. Open a row to read the complete case study."
    >
      <Reveal>
        <p className="mb-5 font-mono text-[11px] font-bold tracking-wide text-muted">
          {projects.length} records · curated order · external links pending
        </p>

        <div className="card hidden overflow-hidden border-2 border-ink md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b-2 border-ink bg-sunshine font-mono text-[10.5px] uppercase tracking-[0.14em] text-plum">
                <th className="px-5 py-3.5 font-extrabold">Project</th>
                <th className="px-5 py-3.5 font-extrabold">Categories</th>
                <th className="px-5 py-3.5 font-extrabold">Stack</th>
                <th className="px-5 py-3.5 font-extrabold">Status</th>
                <th className="px-5 py-3.5 font-extrabold">
                  <span className="sr-only">Open</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => {
                const a = getAccent(p.accent);
                return (
                  <tr key={p.slug} className={`group border-b-2 border-line last:border-0 ${ROW_TINT[i % ROW_TINT.length]} hover:bg-desk`}>
                    <td className="px-5 py-4">
                      <Link to={`/projects/${p.slug}`} className="flex items-center gap-3">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink ${a.solid} text-plum shadow-sticker-sm`}>
                          <Icon name={p.icon} size={17} />
                        </span>
                        <span>
                          <span className="block font-display font-extrabold text-ink group-hover:text-blue-ink">{p.title}</span>
                          <span className="block font-mono text-[10.5px] font-semibold text-muted">{p.slug}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {p.categories.map((c) => (
                          <span key={c} className="chip !border-ink/20 !bg-raised !px-2 !py-0.5 !text-[10px]">{c}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-[11.5px] font-semibold text-muted">{p.stack.join(", ")}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold text-muted">
                        <span className={`h-2 w-2 rounded-full border border-ink ${a.dot}`} />
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link to={`/projects/${p.slug}`} className="sticker bg-raised !px-3 !py-1 !text-[10.5px] text-ink">
                        Open <Icon name="ArrowRight" size={12} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">
          {projects.map((p, i) => {
            const a = getAccent(p.accent);
            return (
              <Link key={p.slug} to={`/projects/${p.slug}`} className={`card block border-2 border-ink p-5 ${ROW_TINT[i % ROW_TINT.length]}`}>
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink ${a.solid} text-plum shadow-sticker-sm`}>
                    <Icon name={p.icon} size={18} />
                  </span>
                  <div>
                    <p className="font-display font-extrabold text-ink">{p.title}</p>
                    <p className="font-mono text-[10px] font-bold text-muted">{p.status}</p>
                  </div>
                  <Icon name="ArrowRight" size={15} className="ml-auto text-muted" />
                </div>
                <p className="mt-3 font-mono text-[11px] font-semibold text-muted">{p.stack.join(" · ")}</p>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </PageShell>
  );
}