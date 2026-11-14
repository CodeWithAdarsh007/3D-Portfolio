import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
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
import { getAccent } from "../lib/accents";

const HERO_CHIPS = ["AI/ML Student", "Aspiring AI Engineer", "AI Agent Developer", "Product Builder", "Entrepreneur"];
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
  const reduce = useReducedMotion();
  const featured = FEATURED.map((slug) => projects.find((p) => p.slug === slug));

  return (
    <PageTransition className="pt-20 sm:pt-24">
      {/* ---------------------------------------------------------- hero desk */}
      <section className="relative mx-auto max-w-7xl px-3 sm:px-8" aria-label="Interactive workspace">
        <div className="flex items-center justify-between gap-3 px-2 pb-2 sm:px-0">
          <p className="eyebrow">The Dev Workspace · interactive portfolio</p>
          {introDone ? (
            <button
              type="button"
              onClick={replay}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-raised px-3.5 py-1.5 font-mono text-[11px] font-semibold text-muted transition-colors hover:border-blue hover:text-blue-ink"
            >
              <Icon name="RotateCcw" size={12} />
              Replay intro
            </button>
          ) : (
            <button
              type="button"
              onClick={skip}
              className="btn-primary inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold"
            >
              <Icon name="SkipForward" size={12} />
              Skip animation
            </button>
          )}
        </div>

        <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-desk">
          {isMobile ? (
            <MobileDesk screenState={screenState} introDone={introDone} />
          ) : (
            <DesktopDesk screenState={screenState} introDone={introDone} />
          )}
        </div>

        {/* greeting console */}
        <div className="relative z-10 mx-auto mt-4 max-w-3xl px-2 sm:-mt-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="card rounded-2xl p-6 text-center shadow-desk sm:p-8"
          >
            <p className="inline-flex items-center gap-2 rounded-full bg-desk px-3 py-1 font-mono text-[10.5px] font-semibold tracking-wide text-muted">
              <span className={`h-1.5 w-1.5 rounded-full ${introDone ? "bg-sage" : "bg-amber"}`} />
              {introDone ? "workspace ready · 8 objects online" : "assembling workspace…"}
            </p>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              <Typewriter text={identity.greeting} start={step >= 3} />
            </h1>

            <motion.p
              initial={false}
              animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 8 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base"
            >
              {identity.tagline}
            </motion.p>

            <motion.div
              initial={false}
              animate={{ opacity: introDone ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 flex flex-wrap justify-center gap-2"
            >
              {HERO_CHIPS.map((chip) => (
                <span key={chip} className="chip">
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3"
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
              className="mt-5 inline-flex items-center gap-2 font-mono text-[11.5px] font-semibold tracking-wide text-blue-ink"
            >
              <span className="relative flex h-2 w-2">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-blue" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
              </span>
              Explore my workspace — click any object on the desk.
            </motion.p>
            <p className="mt-2 font-mono text-[10px] text-muted">
              resume file is a labelled placeholder
            </p>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------ object legend */}
      <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8" aria-label="Desk object shortcuts">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow mb-2">Prefer buttons?</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Every desk object, one click</h2>
          </div>
          <p className="max-w-xs text-sm text-muted">
            The illustration is fully keyboard-accessible too — tab to any object and press Enter.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {deskObjects.map((obj, i) => (
            <Reveal key={obj.id} delay={i * 0.05}>
              <Link
                to={obj.to}
                className="card group flex h-full items-center gap-3 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue/50 hover:shadow-lift"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-desk text-blue-ink transition-colors group-hover:bg-blue/15">
                  <Icon name={obj.icon} size={18} />
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-ink">{obj.label}</span>
                  <span className="block text-[11.5px] font-medium text-muted">{obj.desc}</span>
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
          title="What I'm currently building"
          body="Three threads run through my workspace at the moment — a product, an agent lab, and a research question."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {currentFocus.map((item, i) => {
            const a = getAccent(item.accent);
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <Link
                  to={item.to}
                  className={`card group block h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-desk ${a.border}`}
                >
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${a.tile}`}>
                    <Icon name={item.icon} size={20} />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                  <span className={`mt-4 inline-flex items-center gap-1 text-xs font-bold ${a.text}`}>
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
            title="Projects from the workspace"
            body="Product building, research engineering, and agent experiments — each with an honest case study."
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
          <div className="relative overflow-hidden rounded-3xl border border-line bg-desk p-8 sm:p-12">
            <div
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-25"
              style={{ background: "radial-gradient(circle, var(--blue), transparent 70%)" }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, var(--amber), transparent 70%)" }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="eyebrow mb-2">The thinking behind the builds</p>
                <h2 className="max-w-md text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  Curious how I approach problems?
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                  Read the research notes, or start a conversation — both are open.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink to="/research" variant="ghost" icon="BookOpen">
                  Research & Learning
                </ButtonLink>
                <ButtonLink to="/contact" icon="Mail">
                  Contact Me
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}