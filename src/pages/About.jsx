import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import { ButtonAnchor } from "../components/common/Buttons";
import { bio, identity, links } from "../data/portfolioContent";

const INTEREST_COLORS = ["bg-sunshine", "bg-turquoise", "bg-lavender", "bg-coral", "bg-leaf", "bg-tangerine", "bg-blue", "bg-sunshine"];

export default function About() {
  return (
    <PageShell
      title="Meet Adarsh"
      body="I study Computer Science Engineering with a focus on AI and ML. My projects bring together software, research questions, and the practical work of building a product."
    >
      <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
        {/* --------------------------------------------- identity column */}
        <div className="space-y-8">
          <Reveal>
            <div className="studio-id relative p-6">
              <p className="text-sm text-muted">Studio profile</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Adarsh</h2>
              <p className="mt-2 text-sm text-muted">{identity.education.year} · CSE (AI/ML)</p>
              <ul className="my-6 space-y-2 border-y border-line py-4">
                {identity.careerInterests.map(interest => (
                  <li key={interest} className="text-sm font-medium text-ink">{interest}</li>
                ))}
              </ul>
              <ButtonAnchor href={links.resume} download icon="Download">
                {links.resumePlaceholder ? "Résumé sample (PDF)" : "Download résumé"}
              </ButtonAnchor>
            </div>
          </Reveal>
        </div>

        {/* -------------------------------------------------- bio column */}
        <div className="space-y-8">
          <Reveal>
            <div className="card border border-line p-7 sm:p-9">
              <p className="eyebrow mb-5" style={{ "--eyebrow-color": "var(--coral-ink)" }}>Introduction</p>
              {bio.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="mb-4 max-w-prose text-base leading-relaxed text-muted last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="h-full rounded-2xl border border-line panel-sunshine p-6 shadow-sticker-sm">
                <p className="flex items-center gap-2 font-mono text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink/85">
                  <Icon name="GraduationCap" size={14} /> Education
                </p>
                <p className="mt-3 font-display text-base font-semibold leading-snug text-ink">
                  {identity.education.degree}
                </p>
                <p className="mt-1 text-xs font-bold text-muted">{identity.education.year}</p>
                <p className="mt-2 font-mono text-[9.5px] font-semibold text-muted">
                  institution name pending
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-line panel-turquoise p-6 shadow-sticker-sm">
                <p className="flex items-center gap-2 font-mono text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink/85">
                  <Icon name="Target" size={14} /> Career interests
                </p>
                <ul className="mt-3 space-y-1.5">
                  {identity.careerInterests.map((interest) => (
                    <li key={interest} className="flex items-center gap-2 text-sm font-bold text-ink">
                      <span className="h-2 w-2 rounded-full border border-ink bg-coral" />
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="card border border-line p-7">
              <p className="eyebrow mb-4" style={{ "--eyebrow-color": "var(--leaf-ink)" }}>Technical interests</p>
              <div className="flex flex-wrap gap-2">
                {identity.technicalInterests.map((interest, i) => (
                  <span key={interest} className={`sticker ${INTEREST_COLORS[i % INTEREST_COLORS.length]} !text-[11px]`}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line panel-lavender p-7 shadow-sticker-sm">
              <p className="flex items-center gap-2 font-mono text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink/85">
                <Icon name="Compass" size={14} /> Currently exploring
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {identity.currentlyExploring.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 rounded-xl border border-ink/15 bg-raised p-3.5 text-sm font-semibold leading-relaxed text-muted">
                    <Icon name="Sparkles" size={15} className="mt-0.5 shrink-0 text-lavender-ink" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </PageShell>
  );
}