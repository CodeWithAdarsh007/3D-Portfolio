import { Projects } from "@/components/main/projects";
import { HERO_CONTENT, AI_ML_SKILLS, WEB_SKILLS } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center min-h-[90vh] pt-20 px-5"
      >
        <div className="h-full w-full flex flex-col items-center justify-center text-center">
          {/* Availability Badge */}
          <div className="mb-6 px-4 py-2 rounded-full bg-accent-primary-soft border border-accent-primary">
            <span className="text-sm text-accent-primary">{HERO_CONTENT.availabilityBadge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-[40px] md:text-[60px] font-bold mb-4">
            <span>{HERO_CONTENT.headline1}</span>
            <br />
            <span className="text-gradient-primary">{HERO_CONTENT.headline2}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-text-secondary text-lg md:text-xl max-w-[700px] mb-8">
            {HERO_CONTENT.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={HERO_CONTENT.primaryCTA.href}
              className="px-6 py-3 rounded-full bg-accent-primary text-bg-base font-semibold hover:bg-[#00B8D9] transition"
            >
              {HERO_CONTENT.primaryCTA.label}
            </Link>
            <Link
              href={HERO_CONTENT.secondaryCTA.href}
              className="px-6 py-3 rounded-full border border-border text-text-primary hover:bg-bg-elevated transition"
            >
              {HERO_CONTENT.secondaryCTA.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section
        id="skills"
        className="py-20 px-5 bg-bg-surface border-y border-border"
      >
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[32px] font-bold text-center mb-10">
            <span className="text-gradient-primary">Skills</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI/ML Skills */}
            <div className="p-6 rounded-lg bg-bg-base border border-border">
              <h3 className="text-xl font-semibold text-accent-primary mb-4">AI / Machine Learning</h3>
              <div className="flex flex-wrap gap-2">
                {AI_ML_SKILLS.slice(0, 6).map((skill) => (
                  <span
                    key={skill.skill_name}
                    className="px-3 py-1 rounded-full bg-accent-primary-soft text-accent-primary text-sm"
                  >
                    {skill.skill_name}
                  </span>
                ))}
              </div>
            </div>

            {/* Web Development Skills */}
            <div className="p-6 rounded-lg bg-bg-base border border-border">
              <h3 className="text-xl font-semibold text-accent-secondary mb-4">Web / Full-Stack</h3>
              <div className="flex flex-wrap gap-2">
                {WEB_SKILLS.slice(0, 6).map((skill) => (
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
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-20 px-5">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[32px] font-bold">
              <span className="text-gradient-primary">Selected Work</span>
            </h2>
            <Link
              href="/work"
              className="text-accent-primary hover:underline text-sm"
            >
              View all →
            </Link>
          </div>
          <Projects />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 px-5 bg-bg-surface border-t border-border">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-[32px] font-bold mb-4">Have a project in mind?</h2>
          <p className="text-text-secondary mb-8">Let's build something great together.</p>
          <Link
            href="/contact"
            className="inline-flex px-6 py-3 rounded-full bg-accent-primary text-bg-base font-semibold hover:bg-[#00B8D9] transition"
          >
            Let's talk →
          </Link>
        </div>
      </section>
    </main>
  );
}
