import { Link } from "react-router-dom";
import PageTransition from "../components/common/PageTransition";
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import { ButtonAnchor, ButtonLink } from "../components/common/Buttons";
import { DesktopDesk, MobileDesk } from "../components/desk/DeskScene";
import ProjectCard from "../components/projects/ProjectCard";
import useIntro from "../hooks/useIntro";
import useMediaQuery from "../hooks/useMediaQuery";
import usePageMeta from "../hooks/usePageMeta";
import { currentFocus, identity, links } from "../data/portfolioContent";
import { projects } from "../data/projects";
import { getAccent, wash } from "../lib/accents";

const FEATURED = ["notekart", "ai-agent-reliability-lab", "paper-format-translator"];

export default function Home() {
  usePageMeta({
    title: "",
    description:
      "Explore Adarsh's personal developer workspace, featuring AI/ML experiments, AI agent development, software projects, research, and product-building experiences.",
    path: "/",
  });
  const { step, introDone, skip, replay, screenState } = useIntro();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const featured = FEATURED.map((slug) => projects.find((p) => p.slug === slug));

  return (
    <PageTransition className="page-top">
      {/* ---------------------------------------------------- the room hero */}
      <section className="room-hero shell relative pb-4" style={wash("tangerine", "coral")} aria-label="The illustrated developer room">
        <div className="absolute right-3 top-3 z-20">
          {introDone ? (
            <button type="button" onClick={replay} className="sticker bg-raised text-ink !px-3 !py-1.5 !text-[10.5px]">
              <Icon name="RotateCcw" size={12} />
              Replay intro
            </button>
          ) : (
            <button type="button" onClick={skip} className="sticker bg-sunshine !px-3 !py-1.5 !text-[10.5px]">
              <Icon name="SkipForward" size={12} />
              Skip animation
            </button>
          )}
        </div>

        <div className="room-frame relative overflow-hidden rounded-3xl border-2 border-ink bg-surface shadow-desk">
          {isMobile ? (
            <MobileDesk screenState={screenState} introDone={introDone} step={step} />
          ) : (
            <DesktopDesk screenState={screenState} introDone={introDone} step={step} />
          )}
        </div>
      </section>

      {/* ------------------------------------------- personal introduction */}
      <section className="shell pt-6" aria-label="Introduction">
        <Reveal>
          <div className="card flex flex-col items-start justify-between gap-6 border-2 border-ink p-6 sm:p-8 md:flex-row md:items-center">
            <div>
              <p className="eyebrow mb-2" style={{ "--eyebrow-color": "var(--tangerine-ink)" }}>
                The Dev Workspace · by Adarsh
              </p>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Hello, I&apos;m <span className="text-blue-ink">Adarsh.</span>
              </h1>
              <p className="mt-2 max-w-xl text-sm font-semibold leading-relaxed text-muted sm:text-base">
                {identity.tagline}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink to="/projects" icon="Rocket">
                Explore Projects
              </ButtonLink>
              <ButtonAnchor href={links.resume} download variant="ghost" icon="Download">
                Download Resume
              </ButtonAnchor>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------ current focus */}
      <section className="shell pt-16" aria-label="Current focus">
        <SectionHeading
          eyebrow="Right now"
          eyebrowColor="var(--coral-ink)"
          title="What I'm currently building"
          body="Three threads run through my studio at the moment — a product, an agent lab, and a research question."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {currentFocus.map((item, i) => {
            const a = getAccent(item.accent);
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <Link
                  to={item.to}
                  className={`tape card group block h-full p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-desk ${a.border}`}
                  style={{ transform: `rotate(${[-1.2, 0.8, -0.6][i]}deg)` }}
                >
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink ${a.solid} text-plum shadow-sticker-sm`}>
                    <Icon name={item.icon} size={22} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-extrabold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                  <span className={`mt-4 inline-flex items-center gap-1 text-xs font-extrabold ${a.text}`}>
                    Follow this thread
                    <Icon name="ArrowRight" size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------- selected work */}
      <section className="shell pt-20" aria-label="Selected projects">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Selected work"
            eyebrowColor="var(--lavender-ink)"
            title="Projects from the studio"
            body="Product building, research engineering, and agent experiments — each with its own visual identity and an honest case study."
          />
          <Reveal delay={0.15}>
            <ButtonLink to="/projects" variant="ghost" iconRight="ArrowRight">
              View all projects
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA band */}
      <section className="shell py-20">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border-2 border-ink p-8 shadow-desk sm:p-12"
            style={{
              background:
                "linear-gradient(120deg, var(--blue) 0%, var(--lavender) 45%, var(--coral) 100%)",
            }}
          >
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-sunshine opacity-30" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-turquoise opacity-30" aria-hidden="true" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/90 dark:text-plum/80">
                  The thinking behind the builds
                </p>
                <h2 className="mt-2 max-w-md font-display text-3xl font-extrabold tracking-tight text-white dark:text-plum sm:text-4xl">
                  Curious how I approach problems?
                </h2>
                <p className="mt-2 max-w-md text-sm font-semibold leading-relaxed text-white/85 dark:text-plum/80">
                  Read the research notes, or start a conversation — both are open.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/research" className="sticker bg-sunshine">
                  <Icon name="BookOpen" size={15} />
                  Research & Learning
                </Link>
                <Link to="/contact" className="sticker bg-raised text-ink">
                  <Icon name="Mail" size={15} />
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}