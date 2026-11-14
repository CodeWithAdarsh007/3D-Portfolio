import { PLACEHOLDER_LABEL } from "../../data/portfolioContent";
import Icon from "./Icon";

/**
 * Honest placeholder block. Every fictional or missing asset renders with the
 * exact visible label "DEMO PLACEHOLDER — NOT GENUINE".
 */
export default function Placeholder({
  icon = "Package",
  title,
  note,
  minHeight = 180,
  className = "",
  children,
}) {
  return (
    <div className={`placeholder-block p-6 ${className}`} style={{ minHeight }}>
      <Icon name={icon} size={30} className="opacity-50" />
      {title && <p className="text-sm font-semibold text-ink">{title}</p>}
      {children}
      <span className="placeholder-label">{PLACEHOLDER_LABEL}</span>
      {note && <p className="max-w-xs text-xs leading-relaxed">{note}</p>}
    </div>
  );
}