import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import { exploringSkills, skills } from "../data/portfolioContent";
import { getProject } from "../data/projects";
import { getAccent } from "../lib/accents";

export default function Skills() {

  return (
    <PageShell
      title="Engineering toolkit"
      body="The languages, frameworks and databases I use, with links to the projects where I applied them."
    >
      <div className="grid gap-8 lg:grid-cols-3">
        {skills.map((group, gi) => {
          const a = getAccent(group.accent);
          return (
            <Reveal key={group.category} delay={gi * 0.08}>
              <div className="card h-full border border-line p-6">
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-line ${a.solid} text-plum shadow-sticker-sm`}>
                    <Icon name={group.icon} size={20} />
                  </span>
                  <h2 className="font-display text-lg font-semibold tracking-tight text-ink">{group.category}</h2>
                </div>

                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => {
                    const related = item.projects.map(getProject).filter(Boolean);
                    return (
                      <li key={item.name} className="border-t border-line pt-3.5">
                        <p className="font-mono text-sm font-semibold text-ink">{item.name}</p>
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
        <div className="rounded-3xl border border-line panel-sunshine p-7 shadow-sticker-sm">
          <h2 className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-raised text-ink shadow-sticker-sm">
              <Icon name="Compass" size={16} />
            </span>
            Currently exploring
          </h2>
          <p className="mt-2 text-sm font-semibold text-muted">
            Topics I’m studying through small experiments.
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