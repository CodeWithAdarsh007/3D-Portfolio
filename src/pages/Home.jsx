import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import PageTransition from "../components/common/PageTransition";
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import { ButtonAnchor, ButtonLink } from "../components/common/Buttons";
import { DesktopDesk, MobileDesk } from "../components/desk/DeskScene";
import Typewriter from "../components/animations/Typewriter";
import ProjectCard from "../components/projects/ProjectCard";
import useIntro from "../hooks/useIntro";
import useMediaQuery from "../hooks/useMediaQuery";
import usePageMeta from "../hooks/usePageMeta";
import { currentFocus, deskObjects, identity, links } from "../data/portfolioContent";
import { projects } from "../data/projects";
import { getAccent, wash } from "../lib/accents";

const ROLE_STICKERS = [
  { label: "AI/ML Student", bg: "bg-sunshine" },
  { label: "Aspiring AI Engineer", bg: "bg-turquoise" },
  { label: "AI Agent Developer", bg: "bg-lavender" },
  { label: "Product Builder", bg: "bg-coral" },
  { label: "Entrepreneur", bg: "bg-leaf" },
];
const FEATURED = ["notekart", "ai-agent-reliability-lab", "paper-format-translator"];
const TILE_BG = ["bg-sunshine/30", "bg-turquoise/25", "bg-lavender/25", "bg-coral/25", "bg-leaf/25", "bg-tangerine/25", "bg-blue/20", "bg-sunshine/30"];

function Doodles() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -70]);
  const y2 = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 50]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.svg style={{ y: y1 }} className="drifty absolute left-[4%] top-24 h-10 w-10 text-coral" viewBox="0 0 40 40">
        <path d="M20 2l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" fill="currentColor" />
      </motion.svg>
      <motion.svg style={{ y: y2 }} className="drifty absolute right-[6%] top-40 h-12 w-12 text-turquoise" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="5" />
      </motion.svg>
      <motion.svg style={{ y: y1 }} className="drifty absolute left-[38%] top-10 h-8 w-16 text-lavender" viewBox="0 0 64 32">
        <path d="M2 24 Q 12 6 22 24 T 42 24 T 62 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </motion.svg>
      <motion.svg style={{ y: y2 }} className="drifty absolute right-[30%] top-64 h-8 w-8 text-sunshine" viewBox="0 0 40 40">
        <rect x="8" y="8" width="24" height="24" rx="6" fill="currentColor" transform="rotate(18 20 20)" />
      </motion.svg>
    </div>
  );
}

export default function Home() {
  usePageMeta({
    title: "",
    description:
      "Explore Adarsh's personal developer workspace, featuring AI/ML experiments, AI agent development, software projects, research, and product-building experiences.",
    path: "/",
  });
  const { step, introDone, skip, replay, screenState } = useIntro();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduce = useReducedMotion();
  const featured = FEATURED.map((slug) => projects.find((p) => p.slug === slug));

  return (
    <PageTransition className="pt-20 sm:pt-24">
      {/* ---------------------------------------------------------- hero */}
      <section className="relative" style={wash("tangerine", "coral")} aria-label="Interactive workspace">
        <Doodles />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-8">
          <div className="flex items-center justify-between gap-3 pb-4">
            <p className="eyebrow" style={{ "--eyebrow-color": "var(--tangerine-ink)" }}>
              The Dev Workspace · a colourful developer studio
            </p>
            {introDone ? (
              <button
                type="button"
                onClick={replay}
                className="sticker bg-raised text-ink"
              >
                <Icon name="RotateCcw" size={13} />
                Replay intro
              </button>
            ) : (
              <button type="button" onClick={skip} className="sticker bg-sunshine">
                <Icon name="SkipForward" size={13} />
                Skip animation
              </button>
            )}
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[minmax(340px,410px)_1fr]">
            {/* greeting composition */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: reduce ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="sticker bg-coral text-plum">
                  <Icon name="Sparkles" size={14} />
                  welcome to my studio
                </span>
                <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl">
                  <Typewriter text="Hello, I'm" start={step >= 4} />
                  <br />
                  <span className="squiggle text-blue-ink">Adarsh.</span>
                </h1>
                <motion.p
                  initial={false}
                  animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 8 }}
                  transition={{ duration: 0.5 }}
                  className="mt-5 text-base font-semibold leading-relaxed text-muted sm:text-lg"
                >
                  {identity.tagline}
                </motion.p>

                <motion.div
                  initial={false}
                  animate={{ opacity: introDone ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-6 flex flex-wrap gap-2.5"
                >
                  {ROLE_STICKERS.map((r, i) => (
                    <span
                      key={r.label}
                      className={`sticker ${r.bg}`}
                      style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
                    >
                      {r.label}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 10 }}
                  transition={{ duration: 0.5, delay: 0.18 }}
                  className="mt-8 flex flex-wrap items-center gap-3"
                >
                  <ButtonLink to="/projects" icon="Rocket">
                    Explore Projects
                  </ButtonLink>
                  <ButtonAnchor href={links.resume} download variant="ghost" icon="Download">
                    Download Resume
                  </ButtonAnchor>
                </motion.div>

                <motion.p
                  initial={false}
                  animate={{ opacity: introDone ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] font-bold tracking-wide text-tangerine-ink"
                >
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-tangerine" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-tangerine" />
                  </span>
                  Explore my workspace — click any object in the room.
                </motion.p>
                <p className="mt-2 font-mono text-[10px] text-muted">
                  resume file is a labelled placeholder
                </p>
              </motion.div>
            </div>

            {/* the room */}
            <div className="order-1 overflow-hidden rounded-3xl border-2 border-ink bg-surface shadow-desk lg:order-2">
              {isMobile ? (
                <MobileDesk screenState={screenState} introDone={introDone} step={step} />
              ) : (
                <DesktopDesk screenState={screenState} introDone={introDone} step={step} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ object legend */}
      <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8" aria-label="Desk object shortcuts">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow mb-2" style={{ "--eyebrow-color": "var(--leaf-ink)" }}>Prefer buttons?</p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink">Every object, one click</h2>
          </div>
          <p className="max-w-xs text-sm font-medium text-muted">
            Fully keyboard-accessible too — tab to any object and press Enter.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {deskObjects.map((obj, i) => (
            <Reveal key={obj.id} delay={i * 0.05}>
              <Link
                to={obj.to}
                className={`group flex h-full items-center gap-3 rounded-2xl border-2 border-ink p-4 shadow-sticker-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-sticker ${TILE_BG[i % TILE_BG.length]}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-raised text-ink transition-transform group-hover:rotate-6">
                  <Icon name={obj.icon} size={18} />
                </span>
                <span>
                  <span className="block font-display text-sm font-extrabold text-ink">{obj.label}</span>
                  <span className="block text-[11.5px] font-semibold text-ink">{obj.desc}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ current focus */}
      <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8" aria-label="Current focus">
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
      <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8" aria-label="Selected projects">
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
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
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