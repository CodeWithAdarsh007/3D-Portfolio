import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/** Types text out once `start` is true; reserves layout to avoid shifts. */
export default function Typewriter({ text, start, speed = 42, className = "", cursorClass = "bg-sage" }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setCount(text.length);
      return;
    }
    setCount(0);
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speed);
    return () => window.clearInterval(id);
  }, [start, text, speed, reduce]);

  const done = count >= text.length;

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="invisible">{text}</span>
      <span className="absolute inset-0" aria-hidden="true">
        {text.slice(0, count)}
        {!done && start && (
          <span className={`cursor-blink ml-0.5 inline-block h-[0.9em] w-[0.5ch] translate-y-[0.12em] ${cursorClass}`} />
        )}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}