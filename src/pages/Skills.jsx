import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import usePageMeta from "../hooks/usePageMeta";
import { exploringSkills, skills } from "../data/portfolioContent";
import { getProject } from "../data/projects";
import { getAccent } from "../lib/accents";

const SPINE_COLORS = ["var(--blue)", "var(--coral)", "var(--sunshine)", "var(--leaf)", "var(--lavender)", "var(--turquoise)", "var(--tangerine)"];

/** Skills as a studio bookshelf: each technology is a spine linked to real work. */
export default function Skills() {
  usePageMeta({
    title: "Technical Skills",
    description:
      "Adarsh's technical skills as a studio bookshelf — Python, Java, PHP, Django, Streamlit, MySQL — each linked to the projects where it was used. No invented proficiency percentages.",
    path: "/skills",
  });

  let spineIdx = 0;

  return (
    <PageShell
      accent="turquoise"
      second="sunshine"
      eyebrow="Toolbox · technical skills"
      eyebrowColor="var(--turquoise-ink)"
      title="The studio bookshelf"
      body="Skills live where they're used: every spine on this shelf links to the project that earned it. No progress bars, no invented percentages — the work is the evidence."
    >
      <div className="grid gap-8 lg:grid-cols-3">
        {skills.map((group, gi) => {
          const a = getAccent(group.accent);
          return (
            <Reveal key={group.category} delay={gi * 0.08}>
              <div className="card h-full border-2 border-ink p-6">
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-ink ${a.solid} text-plum shadow-sticker-sm`}>
                    <Icon name={group.icon} size={20} />
                  </span>
                  <h2 className="font-display text-lg font-extrabold tracking-tight text-ink">{group.category}</h2>
                </div>

                {/* shelf */}
                <div className="mt-6 flex items-end gap-2 border-b-4 border-ink px-2 pb-0">
                  {group.items.map((item) => {
                    const color = SPINE_COLORS[spineIdx++ % SPINE_COLORS.length];
                    const related = item.projects.map(getProject).filter(Boolean);
                    return (
                      <Link
                        key={item.name}
                        to={related[0] ? `/projects/${related[0].slug}` : "/projects"}
                        title={related.map((p) => p.title).join(", ")}
                        className="group relative flex w-14 flex-col items-center justify-end rounded-t-lg border-2 border-b-0 border-ink pb-2 pt-3 transition-transform duration-200 hover:-translate-y-2"
                        style={{ background: color, height: 120 + (spineIdx % 3) * 14 }}
                      >
                        <span className="font-mono text-[10px] font-extrabold text-plum [writing-mode:vertical-rl]">
                          {item.name}
                        </span>
                        <span className="mt-2 h-1.5 w-6 rounded-full bg-plum/25" />
                      </Link>
                    );
                  })}
                </div>

                <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                  {group.items.length} tools · linked to{" "}
                  {new Set(group.items.flatMap((it) => it.projects)).size} projects
                </p>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => {
                    const related = item.projects.map(getProject).filter(Boolean);
                    return (
                      <li key={item.name} className="rounded-xl border-2 border-line bg-raised p-3.5">
                        <p className="font-mono text-sm font-extrabold text-ink">{item.name}</p>
                        {related.length > 0 && (
                          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                            {related.map((p) => (
                              <Link
                                key={p.slug}
                                to={`/projects/${p.slug}`}
                                className={`inline-flex items-center gap-1 text-[11px] font-extrabold ${a.text} hover:underline`}
                              >
                                <Icon name="GitBranch" size={11} />
                                {p.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10">
        <div className="rounded-3xl border-2 border-ink panel-sunshine p-7 shadow-sticker-sm">
          <h2 className="flex items-center gap-2.5 font-display text-lg font-extrabold text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-ink bg-raised text-plum shadow-sticker-sm">
              <Icon name="Compass" size={16} />
            </span>
            Currently exploring
          </h2>
          <p className="mt-2 text-sm font-semibold text-muted">
            Areas I&apos;m actively learning — listed as interests, not claimed expertise.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {exploringSkills.map((skill, i) => (
              <span key={skill} className={`sticker ${["bg-turquoise", "bg-lavender", "bg-coral", "bg-leaf"][i % 4]}`}>
                <Icon name="Sparkles" size={13} />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </PageShell>
  );
}