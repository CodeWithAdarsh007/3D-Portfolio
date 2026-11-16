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
      accent="tangerine"
      second="coral"
      eyebrow="Timeline · my journey"
      eyebrowColor="var(--tangerine-ink)"
      title="The path so far"
      body="Education, product building, and community work — presented as they are. No internships or employment are invented."
    >
      <ol className="relative mx-auto max-w-5xl space-y-12 border-l-4 border-dashed border-tangerine pl-10 sm:pl-14">
        {journey.map((entry, i) => {
          const a = getAccent(entry.accent);
          return (
            <Reveal as="li" key={entry.id} delay={i * 0.1} className="relative">
                <span
                  className={`absolute -left-[54px] top-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink ${a.solid} text-plum shadow-sticker-sm sm:-left-[70px]`}
                  aria-hidden="true"
                >
                  <Icon name={entry.icon} size={16} />
                </span>

                <article
                  className={`card border-2 border-ink p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-desk sm:p-8`}
                  style={{ transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)` }}
                >
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className={`sticker ${a.solid} !px-3 !py-1 !text-[9.5px]`}>{entry.kind}</span>
                    <span className="font-mono text-[11px] font-bold text-muted">
                      {entry.period || "date pending"}
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink">{entry.title}</h2>
                  <p className="mt-1 text-sm font-extrabold text-muted">
                    {entry.org || "institution name pending"}
                  </p>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-muted">{entry.body}</p>

                  {entry.to && (
                    <Link to={entry.to} className={`mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold ${a.text} hover:underline`}>
                      See the project
                      <Icon name="ArrowRight" size={13} />
                    </Link>
                  )}
                </article>
            </Reveal>
          );
        })}
      </ol>

      <Reveal className="mt-12">
        <p className="rounded-2xl border-2 border-dashed panel-leaf p-5 font-mono text-[11px] font-semibold leading-relaxed text-leaf-ink">
          note: the NSS voter-registration camp is community engagement with the 152 Borivali
          Electoral Registration Office (120 student registrations reported) — not corporate
          employment.
        </p>
      </Reveal>
    </PageShell>
  );
}