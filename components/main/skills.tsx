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

      {/* AI / ML Skills */}
      <div>
        <h3 className="text-lg font-semibold text-text-secondary mb-6">AI / ML</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8">
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
                className="w-12 h-12 md:w-14 md:h-14 object-contain transition-transform hover:scale-110"
                loading="lazy"
              />
              <span className="text-xs text-text-secondary whitespace-nowrap text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Web / Full-Stack Skills */}
      <div>
        <h3 className="text-lg font-semibold text-text-secondary mb-6">Web / Full-Stack</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8">
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
                className="w-12 h-12 md:w-14 md:h-14 object-contain transition-transform hover:scale-110"
                loading="lazy"
              />
              <span className="text-xs text-text-secondary whitespace-nowrap text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
