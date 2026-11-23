import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import { futureResearch, learningNotes, research } from "../data/portfolioContent";
import { getAccent } from "../lib/accents";

export default function Research() {
  return (
    <PageShell
      accent="leaf"
      second="turquoise"
      eyebrow="Notebook · research & learning"
      eyebrowColor="var(--leaf-ink)"
      title="Questions I'm working through"
      body="My working notebook on document conversion, agent reliability, and applied machine learning. These entries follow experiments in progress."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {research.map((item, i) => {
          const a = getAccent(item.accent);
          return (
            <Reveal key={item.id} delay={i * 0.08}>
              <article
                className={`tape card paper-lines relative flex h-full flex-col border-2 border-ink p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-desk`}
                style={{ transform: `rotate(${[-0.8, 0.6, -0.5][i]}deg)` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`sticker ${a.solid} !px-2.5 !py-1 !text-[9px]`}>{item.type}</span>
                  <span className="font-mono text-[10px] font-bold text-muted">{item.status}</span>
                </div>
                <h2 className="mt-4 font-display text-lg font-extrabold leading-snug tracking-tight text-ink">
                  {item.title}
                </h2>
                <p className="mt-2.5 flex-1 text-sm font-medium leading-[26px] text-muted">{item.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="chip !border-ink/20 !bg-raised !text-[10px]">{tag}</span>
                  ))}
                </div>
                <Link
                  to={item.to}
                  className={`mt-5 inline-flex items-center gap-1.5 border-t-2 border-line pt-4 text-xs font-extrabold ${a.text} hover:underline`}
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
          <div className="card h-full border-2 border-ink p-7">
            <h2 className="flex items-center gap-2.5 font-display text-lg font-extrabold text-ink">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-ink bg-leaf text-plum shadow-sticker-sm">
                <Icon name="BookOpen" size={16} />
              </span>
              Learning log
            </h2>
            <p className="mt-2 text-xs font-bold text-muted">What currently has my attention.</p>
            <ul className="mt-5 space-y-3">
              {learningNotes.map((note) => (
                <li key={note} className="flex items-start gap-3 rounded-xl border-2 border-line bg-raised p-3.5 text-sm font-semibold leading-relaxed text-muted">
                  <Icon name="CircleDot" size={15} className="mt-0.5 shrink-0 text-leaf-ink" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full rounded-3xl border-2 border-ink panel-turquoise p-7 shadow-sticker-sm">
            <h2 className="flex items-center gap-2.5 font-display text-lg font-extrabold text-ink">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-ink bg-raised text-plum shadow-sticker-sm">
                <Icon name="Compass" size={16} />
              </span>
              Future research interests
            </h2>
            <p className="mt-2 text-xs font-bold text-muted">Directions I want to explore next.</p>
            <ul className="mt-5 space-y-3">
              {futureResearch.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-ink">
                  <Icon name="Sparkles" size={15} className="mt-0.5 shrink-0 text-turquoise-ink" />
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