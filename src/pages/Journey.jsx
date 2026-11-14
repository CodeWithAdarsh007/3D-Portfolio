import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import usePageMeta from "../hooks/usePageMeta";
import { journey } from "../data/portfolioContent";
import { getAccent } from "../lib/accents";

export default function Journey() {
  usePageMeta({
    title: "My Journey",
    description:
      "Adarsh's journey so far: CSE (AI/ML) education, NoteKart product building, and NSS community engagement — a factual, editable timeline with no invented employment.",
    path: "/journey",
  });

  return (
    <PageShell
      eyebrow="Timeline · my journey"
      title="The path so far"
      body="Education, product building, and community work — presented as they are. No internships or employment are invented; missing dates are marked for editing."
    >
      <ol className="relative ml-3 space-y-10 border-l-2 border-line pl-8 sm:ml-6 sm:pl-12">
        {journey.map((entry, i) => {
          const a = getAccent(entry.accent);
          return (
            <Reveal key={entry.id} delay={i * 0.1}>
              <li className="relative">
                <span
                  className={`absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-bg sm:-left-[57px] ${a.dot}`}
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-raised" />
                </span>

                <article className={`card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-desk sm:p-7 ${a.border}`}>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wide ${a.tile}`}>
                      <Icon name={entry.icon} size={12} />
                      {entry.kind}
                    </span>
                    {entry.period ? (
                      <span className="font-mono text-[11px] font-semibold text-muted">{entry.period}</span>
                    ) : (
                      <span className="placeholder-label !text-[8.5px]">date: add in portfolioContent.js</span>
                    )}
                  </div>

                  <h2 className="mt-3.5 text-xl font-extrabold tracking-tight text-ink">{entry.title}</h2>
                  <p className="mt-1 text-sm font-bold text-muted">
                    {entry.org || (
                      <span className="placeholder-label !text-[8.5px]">institution: add in portfolioContent.js</span>
                    )}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{entry.body}</p>

                  {entry.to && (
                    <Link
                      to={entry.to}
                      className={`mt-4 inline-flex items-center gap-1.5 text-xs font-bold ${a.text} hover:underline`}
                    >
                      See the project
                      <Icon name="ArrowRight" size={13} />
                    </Link>
                  )}
                </article>
              </li>
            </Reveal>
          );
        })}
      </ol>

      <Reveal className="mt-12">
        <p className="rounded-xl border border-line bg-desk/50 p-5 font-mono text-[11px] leading-relaxed text-muted">
          note: the NSS voter-registration camp is community engagement with the 152 Borivali
          Electoral Registration Office (120 student registrations reported) — not corporate
          employment. All entries are editable in src/data/portfolioContent.js → journey.
        </p>
      </Reveal>
    </PageShell>
  );
}