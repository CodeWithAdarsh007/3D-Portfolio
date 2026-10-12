import { SKILLS } from "@/constants/skills";

export const Skills = () => {
  const aiSkills = SKILLS.filter((skill) => skill.group === "ai");
  const webSkills = SKILLS.filter((skill) => skill.group === "web");

  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-8 h-full relative overflow-hidden py-20"
    >
      <div className="text-[40px] font-bold text-center mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#a855f7]">
          Skills
        </span>
      </div>

      {/* AI / ML Skills - Top Arc */}
      <div className="relative w-full max-w-5xl mx-auto">
        <h3 className="text-lg font-semibold text-text-secondary mb-6 text-center">AI / ML</h3>
        <div className="flex flex-wrap justify-center gap-8 px-4">
          {aiSkills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center gap-2"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                width={60}
                height={60}
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
                loading="lazy"
              />
              <span className="text-xs md:text-sm text-text-secondary whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Web / Full-Stack Skills - Bottom Arc */}
      <div className="relative w-full max-w-5xl mx-auto">
        <h3 className="text-lg font-semibold text-text-secondary mb-6 text-center">Web / Full-Stack</h3>
        <div className="flex flex-wrap justify-center gap-8 px-4">
          {webSkills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center gap-2"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                width={60}
                height={60}
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
                loading="lazy"
              />
              <span className="text-xs md:text-sm text-text-secondary whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
