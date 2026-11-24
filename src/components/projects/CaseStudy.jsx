import Icon from "../common/Icon";
import Reveal from "../common/Reveal";
import { getAccent } from "../../lib/accents";

export function CaseSection({ icon, title, children, delay = 0, tint }) {
  return (
    <Reveal delay={delay}>
      <section className={`card h-full border border-line p-6 sm:p-8 ${tint || ""}`}>
        <h2 className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-sunshine text-plum shadow-sticker-sm">
            <Icon name={icon} size={16} />
          </span>
          {title}
        </h2>
        <div className="mt-4 text-sm font-medium leading-relaxed text-muted">{children}</div>
      </section>
    </Reveal>
  );
}

const STATUS_STYLES = {
  Built: "bg-leaf text-plum",
  "Worked on": "bg-turquoise text-plum",
  Planned: "bg-sunshine text-plum",
  Exploring: "bg-lavender text-plum",
};

export function FeatureStatus({ status }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border border-line px-2.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide shadow-sticker-sm ${
        STATUS_STYLES[status] || STATUS_STYLES.Exploring
      }`}
    >
      {status}
    </span>
  );
}

/** Animated workflow diagram built from each project's real step list. */
export function WorkflowDiagram({ steps, accent = "blue" }) {
  const a = getAccent(accent);
  const fields = ["var(--sunshine)", "var(--turquoise)", "var(--coral)", "var(--lavender)", "var(--leaf)", "var(--tangerine)"];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-raised p-6 shadow-sticker-sm">
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
        <defs>
          <pattern id="wf-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0v26" fill="none" stroke={a.field} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wf-grid)" />
      </svg>
      <ol className="relative flex flex-wrap items-center justify-center gap-y-6">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-2 px-1">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line font-mono text-sm font-semibold text-plum shadow-sticker-sm"
                style={{ background: fields[i % fields.length] }}
              >
                {i + 1}
              </span>
              <span className="max-w-[110px] text-center font-mono text-[10.5px] font-bold leading-tight text-ink">
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <svg width="34" height="16" viewBox="0 0 34 16" className="mx-0.5 shrink-0" aria-hidden="true">
                <path d="M2 8h24m-7 -6 l7 6 -7 6" fill="none" stroke={a.field} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flow-dash" />
              </svg>
            )}
          </li>
        ))}
      </ol>
      <p className="relative mt-5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
        workflow concept · illustrative
      </p>
    </div>
  );
}