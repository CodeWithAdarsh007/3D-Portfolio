import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Icon from "../common/Icon";

const STEPS = [
  {
    id: "task",
    icon: "ClipboardCheck",
    title: "User Task",
    desc: "A goal arrives in plain language.",
    log: "task received: \"summarize today's experiment runs\"",
  },
  {
    id: "agent",
    icon: "Bot",
    title: "AI Agent",
    desc: "The agent picks up the task and its constraints.",
    log: "agent online · context loaded · constraints: 3",
  },
  {
    id: "plan",
    icon: "ListChecks",
    title: "Planning",
    desc: "The task is decomposed into ordered sub-steps.",
    log: "plan: fetch runs → filter failures → draft summary",
  },
  {
    id: "tools",
    icon: "Wrench",
    title: "Tool Execution",
    desc: "Tools are called and their outputs captured.",
    log: "tool: run_history.query() → 14 records · tool: logs.read() → ok",
  },
  {
    id: "validate",
    icon: "ShieldCheck",
    title: "Validation",
    desc: "Results are checked before anyone trusts them.",
    log: "validate: 12/14 consistent · 2 flagged for review",
  },
  {
    id: "result",
    icon: "Sparkles",
    title: "Final Result",
    desc: "A reviewed answer — with its evidence attached.",
    log: "result delivered · reviewer notes attached · run archived",
  },
];

const STEP_FIELDS = ["var(--sunshine)", "var(--lavender)", "var(--turquoise)", "var(--tangerine)", "var(--coral)", "var(--leaf)"];

/**
 * Illustrative agent loop. Scripted on purpose — this visualizes the workflow
 * Adarsh studies in the Reliability Lab; it is NOT a live execution engine.
 */
export default function AgentWorkflow() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(-1);
  const [running, setRunning] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const play = () => {
    clearInterval(timer.current);
    setActive(0);
    setRunning(true);
    let i = 0;
    timer.current = setInterval(() => {
      i += 1;
      if (i >= STEPS.length) {
        clearInterval(timer.current);
        setRunning(false);
        setActive(STEPS.length); // all complete
      } else {
        setActive(i);
      }
    }, reduce ? 350 : 1100);
  };

  const reset = () => {
    clearInterval(timer.current);
    setRunning(false);
    setActive(-1);
  };

  const complete = active >= STEPS.length;
  const visibleLogs = STEPS.slice(0, active >= STEPS.length ? STEPS.length : active + 1).filter(
    (_, i) => active >= 0 && i <= active,
  );

  return (
    <div className="rounded-2xl border border-line bg-raised p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-tangerine-ink">
          Illustrative workflow — scripted demo, not live execution
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={play}
            disabled={running}
            className="btn-primary inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold disabled:opacity-60"
          >
            <Icon name="Play" size={13} />
            {running ? "Running…" : complete ? "Run again" : "Run walkthrough"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-bold text-muted transition-colors hover:text-ink"
          >
            <Icon name="RefreshCw" size={13} />
            Reset
          </button>
        </div>
      </div>

      <ol className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step, i) => {
          const isActive = active === i && running;
          const isDone = active > i || complete;
          const field = STEP_FIELDS[i % STEP_FIELDS.length];
          return (
            <motion.li
              key={step.id}
              animate={
                reduce
                  ? {}
                  : {
                      scale: isActive ? 1.03 : 1,
                      borderColor: isActive
                        ? "var(--ink)"
                        : isDone
                          ? "var(--leaf)"
                          : "var(--line)",
                    }
              }
              transition={{ duration: 0.3 }}
              className={`rounded-xl border-2 bg-surface p-4 ${
                isActive ? "border-ink shadow-sticker-sm" : isDone ? "border-leaf/60" : "border-line"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-ink text-plum shadow-sticker-sm"
                  style={{ background: isDone ? "var(--leaf)" : field }}
                >
                  <Icon name={isDone ? "Check" : step.icon} size={16} />
                </span>
                <span className="font-mono text-[10px] font-bold text-muted">0{i + 1}</span>
              </div>
              <p className="mt-3 font-display text-sm font-extrabold text-ink">{step.title}</p>
              <p className="mt-1 text-xs font-medium leading-relaxed text-muted">{step.desc}</p>
            </motion.li>
          );
        })}
      </ol>

      <div className="mt-5 rounded-xl bg-[#241d33] p-4 font-mono text-[11px] leading-relaxed">
        <p className="mb-2 text-[9.5px] uppercase tracking-[0.18em] text-[#8d81ab]">
          scripted run log
        </p>
        {active < 0 ? (
          <p className="text-[#bfb3d6]">press “Run walkthrough” to step through the loop…</p>
        ) : (
          visibleLogs.map((step) => (
            <p key={step.id} className="text-[#63d3a2]">
              <span className="text-[#8d81ab]">[{step.id}]</span> {step.log}
            </p>
          ))
        )}
        {complete && <p className="mt-1 text-[#ffd34e]">run complete — reliability is measured, not assumed.</p>}
      </div>
    </div>
  );
}