import { useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import Placeholder from "../components/common/Placeholder";
import AgentWorkflow from "../components/lab/AgentWorkflow";
import DietDemo from "../components/lab/DietDemo";
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

export default function AILab() {
  const [active, setActive] = useState("ai-agents");
  const category = labCategories.find((c) => c.id === active);
  const experiments = labExperiments.filter((e) => e.category === active);
  const a = getAccent(category.accent);

  return (
    <PageShell
      title="AI & Agent Lab"
      body="Step through a scripted agent run, explore a formula-based calculator, and follow the projects behind the experiments."
    >
      <div className="space-y-8">
        <Reveal>
          <div className="lab-selector" role="tablist" aria-label="Lab categories">
              {labCategories.map((c, index) => {
                const selected = c.id === active;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    id={`lab-tab-${c.id}`}
                    aria-controls={selected ? "lab-panel" : undefined}
                    tabIndex={selected ? 0 : -1}
                    onKeyDown={(event) => {
                      const next = {
                        ArrowDown: index + 1, ArrowRight: index + 1,
                        ArrowUp: index - 1, ArrowLeft: index - 1,
                        Home: 0, End: labCategories.length - 1,
                      }[event.key];
                      if (next === undefined) return;
                      event.preventDefault();
                      const id = labCategories[(next + labCategories.length) % labCategories.length].id;
                      setActive(id);
                      document.getElementById(`lab-tab-${id}`)?.focus();
                    }}
                    aria-selected={selected}
                    onClick={() => setActive(c.id)}
                    className="lab-tab"
                  >
                    <Icon name={c.icon} size={18} />
                    {c.label}
                  </button>
                );
              })}
          </div>
        </Reveal>

        <div id="lab-panel" role="tabpanel" aria-labelledby={`lab-tab-${active}`} tabIndex={0}>
          <Reveal key={active}>
            <div className="mb-6 flex items-center gap-3">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-line ${a.solid} text-plum shadow-sticker-sm`}>
                <Icon name={category.icon} size={22} />
              </span>
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">{category.label}</h2>
                <p className="text-sm font-semibold text-muted">{category.blurb}</p>
              </div>
            </div>

            <div className="space-y-6">
              {experiments.map((exp) => (
                <div key={exp.id} className="card overflow-hidden border border-line">
                  <div className={`flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4 ${a.tile}`}>
                    <h3 className="font-display text-base font-semibold text-ink">{exp.title}</h3>
                    <span className={`rounded-full border border-line px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wide text-plum shadow-sticker-sm ${STATUS_BG[exp.status] || "bg-desk"}`}>
                      {exp.status}
                    </span>
                  </div>
                  <div className="p-4 sm:p-6">
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
                      <Link to={exp.to} className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${a.text} hover:underline`}>
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