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

const STATUS_TONE = {
  "Interactive demo": "bg-blue/12 text-blue-ink border-blue/40",
  Illustrative: "bg-amber/18 text-amber-ink border-amber/50",
  Notes: "bg-sage/15 text-sage-ink border-sage/40",
  Experiment: "bg-blue/12 text-blue-ink border-blue/40",
  "Sample data": "bg-amber/18 text-amber-ink border-amber/50",
  Planned: "bg-desk text-muted border-line",
};

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
      eyebrow="AI chip · the laboratory"
      title="AI & Agent Lab"
      body="Where intelligent systems get tested, not just admired. Real interactive demos run on honest math; everything scripted or planned is labelled as such — no fake model predictions."
    >
      <div className="grid gap-8 lg:grid-cols-[270px_1fr]">
        {/* ---------------------------------------------------- category rail */}
        <Reveal>
          <div className="lg:sticky lg:top-24">
            <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-1" role="tablist" aria-label="Lab categories">
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
                    className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                      selected
                        ? "border-blue/50 bg-raised shadow-lift"
                        : "border-line bg-surface hover:border-blue/30 hover:bg-raised"
                    }`}
                  >
                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${ca.tile}`}>
                      <Icon name={c.icon} size={17} />
                    </span>
                    <span className="mt-2.5 block text-sm font-extrabold text-ink">{c.label}</span>
                    <span className="mt-1 hidden text-[11px] leading-relaxed text-muted lg:block">
                      {c.blurb}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 hidden rounded-xl border border-line bg-desk/50 p-4 font-mono text-[10px] leading-relaxed text-muted lg:block">
              playground rule #1: a demo must never pretend to be a trained model it isn&apos;t.
            </p>
          </div>
        </Reveal>

        {/* ------------------------------------------------------- content */}
        <div>
          <Reveal key={active}>
            <div className="mb-6 flex items-center gap-3">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${a.tile}`}>
                <Icon name={category.icon} size={20} />
              </span>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-ink">{category.label}</h2>
                <p className="text-sm text-muted">{category.blurb}</p>
              </div>
            </div>

            <div className="space-y-6">
              {experiments.map((exp) => (
                <div key={exp.id} className="card overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-desk/40 px-6 py-4">
                    <h3 className="text-base font-extrabold text-ink">{exp.title}</h3>
                    <span
                      className={`rounded-full border px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wide ${
                        STATUS_TONE[exp.status] || STATUS_TONE.Notes
                      }`}
                    >
                      {exp.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-muted">{exp.body}</p>

                    {exp.demo === "agent" && (
                      <div className="mt-5">
                        <AgentWorkflow />
                      </div>
                    )}
                    {exp.demo === "diet" && (
                      <div className="mt-5">
                        <DietDemo />
                      </div>
                    )}
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
                      <Link
                        to={exp.to}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-blue-ink hover:underline"
                      >
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