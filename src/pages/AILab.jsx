import { useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import Placeholder from "../components/common/Placeholder";
import AgentWorkflow from "../components/lab/AgentWorkflow";
import DietDemo from "../components/lab/DietDemo";
import usePageMeta from "../hooks/usePageMeta";
import { labCategories, labExperiments } from "../data/portfolioContent";
import { getAccent } from "../lib/accents";

const STATUS_BG = {
  "Interactive demo": "bg-turquoise",
  Illustrative: "bg-sunshine",
  Notes: "bg-leaf",
  Experiment: "bg-lavender",
  "Sample data": "bg-coral",
  Planned: "bg-desk",
};

function Constellation() {
  const nodes = [
    [60, 40, "var(--sunshine)"], [180, 90, "var(--coral)"], [320, 30, "var(--turquoise)"],
    [460, 80, "var(--lavender)"], [600, 40, "var(--leaf)"], [720, 90, "var(--tangerine)"],
  ];
  return (
    <svg viewBox="0 0 780 130" className="h-24 w-full sm:h-28" aria-hidden="true">
      <g stroke="var(--lavender)" strokeWidth="2.5" fill="none" className="flow-dash" opacity="0.8">
        {nodes.slice(0, -1).map((n, i) => (
          <path key={i} d={`M${n[0]} ${n[1]} Q ${(n[0] + nodes[i + 1][0]) / 2} ${Math.min(n[1], nodes[i + 1][1]) - 26} ${nodes[i + 1][0]} ${nodes[i + 1][1]}`} />
        ))}
      </g>
      {nodes.map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="16" fill={c} stroke="var(--ink)" strokeWidth="2.5" />
          <circle cx={x} cy={y} r="24" fill="none" stroke={c} strokeWidth="2" opacity="0.5" className="neural-node" />
        </g>
      ))}
    </svg>
  );
}

export default function AILab() {
  usePageMeta({
    title: "AI & Agent Lab",
    description:
      "Adarsh's AI laboratory: machine learning, deep learning, AI agents, and data science — with honest interactive demos and clearly labelled illustrative content.",
    path: "/ai-lab",
  });

  const [active, setActive] = useState("ai-agents");
  const category = labCategories.find((c) => c.id === active);
  const experiments = labExperiments.filter((e) => e.category === active);
  const a = getAccent(category.accent);

  return (
    <PageShell
      wide
      accent="lavender"
      second="turquoise"
      eyebrow="AI chip · the laboratory"
      eyebrowColor="var(--lavender-ink)"
      title="AI & Agent Lab"
      body="Where intelligent systems get tested, not just admired. Real interactive demos run on honest math; everything scripted or planned is labelled — no fake model predictions."
    >
      <Reveal className="mb-8">
        <Constellation />
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[270px_1fr]">
        <Reveal>
          <div className="lg:sticky lg:top-24">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1" role="tablist" aria-label="Lab categories">
              {labCategories.map((c) => {
                const ca = getAccent(c.accent);
                const selected = c.id === active;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(c.id)}
                    className={`rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                      selected
                        ? "border-ink bg-raised shadow-sticker"
                        : "border-ink/20 bg-surface hover:-translate-y-0.5 hover:border-ink"
                    }`}
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink ${ca.solid} text-plum shadow-sticker-sm`}>
                      <Icon name={c.icon} size={18} />
                    </span>
                    <span className="mt-2.5 block font-display text-sm font-extrabold text-ink">{c.label}</span>
                    <span className="mt-1 hidden text-[11px] font-semibold leading-relaxed text-muted lg:block">
                      {c.blurb}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 hidden rounded-2xl border-2 border-dashed border-lavender bg-lavender/15 p-4 font-mono text-[10px] font-bold leading-relaxed text-lavender-ink lg:block">
              lab rule #1: a demo must never pretend to be a trained model it isn&apos;t.
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal key={active}>
            <div className="mb-6 flex items-center gap-3">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink ${a.solid} text-plum shadow-sticker-sm`}>
                <Icon name={category.icon} size={22} />
              </span>
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">{category.label}</h2>
                <p className="text-sm font-semibold text-muted">{category.blurb}</p>
              </div>
            </div>

            <div className="space-y-6">
              {experiments.map((exp) => (
                <div key={exp.id} className="card overflow-hidden border-2 border-ink">
                  <div className={`flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink px-6 py-4 ${a.tile}`}>
                    <h3 className="font-display text-base font-extrabold text-ink">{exp.title}</h3>
                    <span className={`rounded-full border-2 border-ink px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wide text-plum shadow-sticker-sm ${STATUS_BG[exp.status] || "bg-desk"}`}>
                      {exp.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-medium leading-relaxed text-muted">{exp.body}</p>

                    {exp.demo === "agent" && <div className="mt-5"><AgentWorkflow /></div>}
                    {exp.demo === "diet" && <div className="mt-5"><DietDemo /></div>}
                    {exp.placeholder && (
                      <div className="mt-5">
                        <Placeholder
                          icon="FlaskConical"
                          title="Demo slot reserved"
                          minHeight={150}
                          note="This playground slot will host a real model demo once an endpoint or model file is configured. Nothing here fakes a prediction."
                        />
                      </div>
                    )}
                    {exp.to && (
                      <Link to={exp.to} className={`mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold ${a.text} hover:underline`}>
                        Open the related case study
                        <Icon name="ArrowRight" size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </PageShell>
  );
}