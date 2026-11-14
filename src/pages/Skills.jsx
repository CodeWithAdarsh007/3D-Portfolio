import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import usePageMeta from "../hooks/usePageMeta";
import { exploringSkills, skills } from "../data/portfolioContent";
import { getProject } from "../data/projects";
import { getAccent } from "../lib/accents";

export default function Skills() {
  usePageMeta({
    title: "Technical Skills",
    description:
      "Adarsh's technical skills grouped by category — Python, Java, PHP, Django, Streamlit, MySQL — each linked to the projects where it was used. No invented proficiency percentages.",
    path: "/skills",
  });

  return (
    <PageShell
      eyebrow="Toolbox · technical skills"
      title="Tools I actually use"
      body="Skills are grouped by category and linked to the projects where they show up. No progress bars, no invented percentages — the work is the evidence."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {skills.map((group, i) => {
          const a = getAccent(group.accent);
          return (
            <Reveal key={group.category} delay={i * 0.08}>
              <div className={`card h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-desk ${a.border}`}>
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${a.tile}`}>
                    <Icon name={group.icon} size={20} />
                  </span>
                  <h2 className="text-lg font-extrabold tracking-tight text-ink">{group.category}</h2>
                </div>
                <ul className="mt-6 space-y-4">
                  {group.items.map((item) => {
                    const related = item.projects.map(getProject).filter(Boolean);
                    return (
                      <li key={item.name} className="rounded-xl border border-line bg-raised p-4">
                        <p className="font-mono text-sm font-bold text-ink">{item.name}</p>
                        {related.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                            {related.map((p) => (
                              <Link
                                key={p.slug}
                                to={`/projects/${p.slug}`}
                                className={`inline-flex items-center gap-1 text-[11px] font-bold ${a.text} hover:underline`}
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
        <div className="card p-7">
          <h2 className="flex items-center gap-2.5 text-lg font-extrabold text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-desk text-amber-ink">
              <Icon name="Compass" size={15} />
            </span>
            Currently exploring
          </h2>
          <p className="mt-2 text-sm text-muted">
            Areas I&apos;m actively learning — listed as interests, not claimed expertise.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {exploringSkills.map((skill) => (
              <span key={skill} className="chip">
                <Icon name="Sparkles" size={12} className="text-amber-ink" />
                {skill}
              </span>
            ))}
          </div>
          <p className="mt-5 font-mono text-[10.5px] leading-relaxed text-muted">
            edit this list in src/data/portfolioContent.js → skills / exploringSkills
          </p>
        </div>
      </Reveal>
    </PageShell>
  );
}