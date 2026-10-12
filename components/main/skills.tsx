import { WEB_SKILLS } from "@/constants";

export const Skills = () => {
  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
    >
      <div className="text-[40px] font-bold text-center mb-10">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#a855f7]">
          Skills
        </span>
      </div>

      {/* AI/ML Skills - Text Pills */}
      <div className="flex flex-row justify-center flex-wrap mt-4 gap-3 items-center max-w-full overflow-hidden">
        <span className="text-sm text-text-secondary font-medium whitespace-nowrap">
          AI/ML:
        </span>
        {["Python", "PyTorch", "TensorFlow", "Scikit-learn", "NumPy", "Pandas", "OpenCV", "Hugging Face", "LangChain"].map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full border border-[#2A0E61] bg-[#1a0b3a]/60 text-purple-200 text-sm font-medium whitespace-nowrap"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Web/Full-Stack Skills - Icon Grid */}
      <div className="flex flex-row justify-around flex-wrap mt-6 gap-5 items-center">
        {WEB_SKILLS.map((skill, i) => (
          <div
            key={skill.skill_name}
            className="flex flex-col items-center gap-2"
          >
            <img
              src={skill.image}
              alt={skill.skill_name}
              width={skill.width}
              height={skill.height}
              className="object-contain"
            />
            <span className="text-xs text-text-secondary whitespace-nowrap">{skill.skill_name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
