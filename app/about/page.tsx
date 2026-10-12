import { WEB_SKILLS } from "@/constants";
import { BIO_TEXT, AI_ML_SKILLS } from "@/config/site";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20 pb-20 px-5">
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-[40px] font-bold mb-12">
          <span className="text-gradient-primary">About</span>
        </h1>

        {/* Bio */}
        <section className="mb-16">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-text-secondary leading-relaxed">
              {BIO_TEXT}
            </p>
          </div>
        </section>

        {/* Quick facts */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">Quick Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-bg-surface border border-border">
              <div className="text-accent-primary text-sm mb-1">Location</div>
              <div className="text-text-primary font-medium">India · Works globally</div>
            </div>
            <div className="p-4 rounded-lg bg-bg-surface border border-border">
              <div className="text-accent-primary text-sm mb-1">Response time</div>
              <div className="text-text-primary font-medium">Replies within 24 hours</div>
            </div>
            <div className="p-4 rounded-lg bg-bg-surface border border-border">
              <div className="text-accent-primary text-sm mb-1">Available</div>
              <div className="text-text-primary font-medium">Q1 2026</div>
            </div>
            <div className="p-4 rounded-lg bg-bg-surface border border-border">
              <div className="text-accent-primary text-sm mb-1">Focus</div>
              <div className="text-text-primary font-medium">AI/ML & Full-Stack</div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI/ML */}
            <div>
              <h3 className="text-accent-primary mb-4">AI / Machine Learning</h3>
              <div className="flex flex-wrap gap-2">
                {AI_ML_SKILLS.slice(0, 10).map((skill) => (
                  <span
                    key={skill.skill_name}
                    className="px-3 py-1 rounded-full bg-accent-primary-soft text-accent-primary text-sm"
                  >
                    {skill.skill_name}
                  </span>
                ))}
              </div>
            </div>
            {/* Web */}
            <div>
              <h3 className="text-accent-secondary mb-4">Web / Full-Stack</h3>
              <div className="flex flex-wrap gap-2">
                {WEB_SKILLS.map((skill) => (
                  <span
                    key={skill.skill_name}
                    className="px-3 py-1 rounded-full bg-accent-secondary-soft text-accent-secondary text-sm"
                  >
                    {skill.skill_name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How I work */}
        <section>
          <h2 className="text-xl font-semibold mb-6">How I work</h2>
          <div className="space-y-4">
            {[
              { num: "01", title: "Discovery", desc: "I start by understanding your goals, users, and constraints." },
              { num: "02", title: "Planning", desc: "A clear roadmap with milestones and deliverables." },
              { num: "03", title: "Build", desc: "Iterative development with regular updates and feedback." },
              { num: "04", title: "Launch", desc: "Deployment, monitoring, and ongoing support." },
            ].map((step) => (
              <div key={step.num} className="flex gap-4 p-4 rounded-lg bg-bg-surface border border-border">
                <div className="text-accent-primary font-mono text-sm shrink-0">{step.num}</div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-text-secondary text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
