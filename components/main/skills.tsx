import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";
import { WEB_SKILLS, AI_ML_SKILLS } from "@/constants";

export const Skills = () => {
  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
    >
      <SkillText />

      {/* AI/ML Skills */}
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {AI_ML_SKILLS.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image || ""}
            name={skill.skill_name}
            width={80}
            height={80}
            index={i}
          />
        ))}
      </div>

      {/* Web Skills */}
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {WEB_SKILLS.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>
    </section>
  );
};
