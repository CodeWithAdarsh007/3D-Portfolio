import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import usePageMeta from "../hooks/usePageMeta";
import { futureResearch, learningNotes, research } from "../data/portfolioContent";
import { getAccent } from "../lib/accents";

export default function Research() {
  usePageMeta({
    title: "Research & Learning",
    description:
      "Adarsh's research archive: document-conversion evaluation, AI agent reliability experiments, applied ML, and ongoing learning notes. Unpublished work is labelled.",
    path: "/research",
  });

  return (
    <PageShell
      eyebrow="Notebook · research & learning"
      title="Questions I'm working through"
      body="An archive of experiments, evaluations, and learning notes. Nothing here is claimed as a formal publication — unpublished work is labelled as it is."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {research.map((item, i) => {
          const a = getAccent(item.accent);
          return (
            <Reveal key={item.id} delay={i * 0.08}>
              <article className={`card flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-desk ${a.border}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className={`rounded-full border px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wide ${a.tile}`}>
                    {item.type}
                  </span>
                  <span className="font-mono text-[10px] font-semibold text-muted">{item.status}</span>
                </div>
                <h2 className="mt-4 text-lg font-extrabold leading-snug tracking-tight text-ink">
                  {item.title}
                </h2>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="chip !px-2.5 !py-1 !text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={item.to}
                  className={`mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-xs font-bold ${a.text} hover:underline`}
                >
                  Read the case study
                  <Icon name="ArrowRight" size={13} />
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="card h-full p-7">
            <h2 className="flex items-center gap-2.5 text-lg font-extrabold text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-desk text-sage-ink">
                <Icon name="BookOpen" size={15} />
              </span>
              Learning log
            </h2>
            <p className="mt-2 text-xs text-muted">What currently has my attention.</p>
            <ul className="mt-5 space-y-3">
              {learningNotes.map((note) => (
                <li key={note} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <Icon name="CircleDot" size={14} className="mt-0.5 shrink-0 text-sage-ink" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="card h-full p-7">
            <h2 className="flex items-center gap-2.5 text-lg font-extrabold text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-desk text-blue-ink">
                <Icon name="Compass" size={15} />
              </span>
              Future research interests
            </h2>
            <p className="mt-2 text-xs text-muted">Directions I want to explore next.</p>
            <ul className="mt-5 space-y-3">
              {futureResearch.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <Icon name="Sparkles" size={14} className="mt-0.5 shrink-0 text-blue-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}