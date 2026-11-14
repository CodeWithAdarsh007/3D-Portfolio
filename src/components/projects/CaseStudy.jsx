import Icon from "../common/Icon";
import Reveal from "../common/Reveal";
import { PLACEHOLDER_LABEL } from "../../data/portfolioContent";

export function CaseSection({ icon, title, children, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <section className="card p-6 sm:p-8">
        <h2 className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-desk text-blue-ink">
            <Icon name={icon} size={15} />
          </span>
          {title}
        </h2>
        <div className="mt-4 text-sm leading-relaxed text-muted">{children}</div>
      </section>
    </Reveal>
  );
}

const STATUS_STYLES = {
  Built: "bg-success/15 text-sage-ink border-success/40",
  "Worked on": "bg-blue/12 text-blue-ink border-blue/40",
  Planned: "bg-warning/15 text-warning border-warning/40",
  Exploring: "bg-sage/15 text-sage-ink border-sage/40",
};

export function FeatureStatus({ status }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide ${
        STATUS_STYLES[status] || STATUS_STYLES.Exploring
      }`}
    >
      {status}
    </span>
  );
}

/** Honest stand-in for a missing GitHub / live-demo URL. Never navigates. */
export function LinkPlaceholder({ icon, label }) {
  return (
    <span
      className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-line bg-desk/60 px-4 py-2.5 text-sm font-bold text-muted"
      title={`Add the real ${label} URL in src/data/projects.js`}
    >
      <Icon name={icon} size={15} />
      {label}
      <span className="placeholder-label !px-2 !py-0.5 !text-[8.5px]">{PLACEHOLDER_LABEL}</span>
    </span>
  );
}