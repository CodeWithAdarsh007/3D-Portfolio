import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import Placeholder from "../components/common/Placeholder";
import { ButtonAnchor } from "../components/common/Buttons";
import AvatarIllustration from "../components/profile/AvatarIllustration";
import { bio, identity, links } from "../data/portfolioContent";

const INTEREST_COLORS = ["bg-sunshine", "bg-turquoise", "bg-lavender", "bg-coral", "bg-leaf", "bg-tangerine", "bg-blue", "bg-sunshine"];

export default function About() {
  return (
    <PageShell
      accent="coral"
      second="sunshine"
      eyebrow="ID card · about me"
      eyebrowColor="var(--coral-ink)"
      title="The person behind the desk"
      body="I study Computer Science Engineering with a focus on AI and ML. My projects bring together software, research questions, and the practical work of building a product."
    >
      <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
        {/* --------------------------------------------- identity column */}
        <div className="space-y-8">
          <Reveal>
            <div className="tape card relative rotate-[-1.5deg] border-2 border-ink p-6 shadow-desk">
              <div className="flex items-center justify-between">
                <span className="sticker bg-coral !text-[10px]">workspace ID</span>
                <Icon name="Sparkles" size={18} className="text-tangerine" />
              </div>
              <div className="mt-5 flex justify-center">
                <AvatarIllustration size={180} />
              </div>
              <p className="mt-4 text-center font-display text-2xl font-extrabold text-ink">Adarsh</p>
              <p className="mt-1 text-center font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-muted">
                CSE (AI/ML) · third year
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-1.5">
                {identity.careerInterests.map((c, i) => (
                  <span key={c} className={`sticker ${INTEREST_COLORS[i]} !px-2.5 !py-1 !text-[9.5px]`}>
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-center font-mono text-[9.5px] font-semibold text-muted">
                illustrated avatar · placeholder identity art
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Placeholder
              icon="User"
              title="Profile photograph"
              minHeight={110}
              note="A profile photograph has yet to be added."
            />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="card border-2 border-ink p-6">
              <ButtonAnchor href={links.resume} download icon="Download" className="w-full">
                {links.resumePlaceholder ? "Résumé sample (PDF)" : "Download résumé"}
              </ButtonAnchor>
              <p className="mt-3 text-center font-mono text-[10px] font-semibold text-muted">
                DEMO PLACEHOLDER — NOT GENUINE
              </p>
            </div>
          </Reveal>
        </div>

        {/* -------------------------------------------------- bio column */}
        <div className="space-y-8">
          <Reveal>
            <div className="card paper-lines border-2 border-ink p-7 sm:p-9">
              <p className="eyebrow mb-5" style={{ "--eyebrow-color": "var(--coral-ink)" }}>Introduction</p>
              {bio.map((paragraph, i) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className={`mb-4 text-[15px] font-medium leading-[28px] text-muted last:mb-0 ${
                    i === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:font-extrabold first-letter:leading-[0.9] first-letter:text-coral-ink" : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="h-full rounded-2xl border-2 border-ink panel-sunshine p-6 shadow-sticker-sm">
                <p className="flex items-center gap-2 font-mono text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink/70">
                  <Icon name="GraduationCap" size={14} /> Education
                </p>
                <p className="mt-3 font-display text-base font-extrabold leading-snug text-ink">
                  {identity.education.degree}
                </p>
                <p className="mt-1 text-xs font-bold text-muted">{identity.education.year}</p>
                <p className="mt-2 font-mono text-[9.5px] font-semibold text-muted">
                  institution name pending
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border-2 border-ink panel-turquoise p-6 shadow-sticker-sm">
                <p className="flex items-center gap-2 font-mono text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink/70">
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
            <div className="card border-2 border-ink p-7">
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
            <div className="rounded-3xl border-2 border-ink panel-lavender p-7 shadow-sticker-sm">
              <p className="flex items-center gap-2 font-mono text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink/70">
                <Icon name="Compass" size={14} /> Currently exploring
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {identity.currentlyExploring.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 rounded-xl border-2 border-ink/15 bg-raised p-3.5 text-sm font-semibold leading-relaxed text-muted">
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