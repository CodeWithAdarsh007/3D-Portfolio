import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, eyebrowColor, title, body, align = "left" }) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : ""}>
      {eyebrow && (
        <p className="eyebrow mb-3" style={{ "--eyebrow-color": eyebrowColor || "var(--blue-ink)" }}>
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {body && (
        <p className={`mt-4 max-w-2xl text-base font-medium leading-relaxed text-muted ${centered ? "mx-auto" : ""}`}>
          {body}
        </p>
      )}
    </Reveal>
  );
}