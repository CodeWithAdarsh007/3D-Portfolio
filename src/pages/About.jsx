import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import Placeholder from "../components/common/Placeholder";
import { ButtonAnchor } from "../components/common/Buttons";
import AvatarIllustration from "../components/profile/AvatarIllustration";
import usePageMeta from "../hooks/usePageMeta";
import { bio, identity, links } from "../data/portfolioContent";

function FactRow({ icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-desk text-blue-ink">
        <Icon name={icon} size={15} />
      </span>
      <div>
        <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
        <div className="mt-1 text-sm font-semibold text-ink">{children}</div>
      </div>
    </div>
  );
}

export default function About() {
  usePageMeta({
    title: "About",
    description:
      "Adarsh — third-year Computer Science Engineering (AI/ML) student building software, experimenting with intelligent systems, and turning ideas into practical products.",
    path: "/about",
  });

  return (
    <PageShell
      eyebrow="ID card · about me"
      title="The person behind the desk"
      body="Student, builder, and experimenter — here's the honest version, with placeholders where real details are still on the way."
    >
      <div className="grid gap-10 lg:grid-cols-[340px_1fr]">
        {/* ------------------------------------------------ identity column */}
        <div className="space-y-6">
          <Reveal>
            <Placeholder
              icon="User"
              title="Profile photograph"
              minHeight={380}
              note="DEMO PLACEHOLDER — NOT GENUINE — REPLACE WITH ADARSH'S REAL PHOTO. Drop the image into src/assets/images and update this block."
              className="aspect-[3/4]"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card flex flex-col items-center gap-3 p-6">
              <AvatarIllustration size={190} />
              <p className="text-center font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                Illustrated avatar · placeholder identity art
              </p>
              <p className="text-center text-xs text-muted">
                Original illustration — intentionally not a photograph of Adarsh.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="card p-6">
              <ButtonAnchor href={links.resume} download icon="Download" className="w-full">
                Download Resume
              </ButtonAnchor>
              <p className="mt-3 text-center font-mono text-[10px] leading-relaxed text-muted">
                DEMO PLACEHOLDER — NOT GENUINE
                <br />
                replace public/resume-adarsh-placeholder.pdf
              </p>
            </div>
          </Reveal>
        </div>

        {/* ---------------------------------------------------- bio column */}
        <div className="space-y-8">
          <Reveal>
            <div className="card space-y-4 p-7 sm:p-8">
              <p className="eyebrow">Introduction</p>
              {bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[15px] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="card grid gap-6 p-7 sm:grid-cols-2 sm:p-8">
              <FactRow icon="GraduationCap" label="Education">
                {identity.education.degree}
                <span className="block text-xs font-medium text-muted">{identity.education.year}</span>
                <span className="mt-1.5 inline-block">
                  <span className="placeholder-label !text-[9px]">institution: add in portfolioContent.js</span>
                </span>
              </FactRow>
              <FactRow icon="Target" label="Career interests">
                <ul className="space-y-1">
                  {identity.careerInterests.map((interest) => (
                    <li key={interest} className="flex items-center gap-2 text-sm">
                      <span className="h-1 w-1 rounded-full bg-amber" />
                      {interest}
                    </li>
                  ))}
                </ul>
              </FactRow>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card p-7 sm:p-8">
              <p className="eyebrow mb-4">Technical interests</p>
              <div className="flex flex-wrap gap-2">
                {identity.technicalInterests.map((interest) => (
                  <span key={interest} className="chip">
                    <Icon name="Sparkles" size={12} className="text-sage-ink" />
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card p-7 sm:p-8">
              <p className="eyebrow mb-4">Currently exploring</p>
              <ul className="space-y-3">
                {identity.currentlyExploring.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                    <Icon name="Compass" size={16} className="mt-0.5 shrink-0 text-blue-ink" />
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