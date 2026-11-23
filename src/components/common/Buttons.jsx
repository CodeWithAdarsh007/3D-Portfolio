import { Link } from "react-router-dom";
import Icon from "./Icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-[color,background-color,transform] duration-150 motion-safe:active:scale-[0.98] select-none";

const variants = {
  primary: "btn-primary shadow-lift",
  ghost: "border border-line bg-raised text-ink hover:border-blue hover:text-blue-ink",
  soft: "bg-desk text-ink hover:bg-line",
};

function Inner({ icon, iconRight, children }) {
  return (
    <>
      {icon && <Icon name={icon} size={16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={16} />}
    </>
  );
}

export function ButtonLink({ to, variant = "primary", className = "", icon, iconRight, children, ...rest }) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner icon={icon} iconRight={iconRight}>
        {children}
      </Inner>
    </Link>
  );
}

export function ButtonAnchor({ href, variant = "primary", className = "", icon, iconRight, children, ...rest }) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner icon={icon} iconRight={iconRight}>
        {children}
      </Inner>
    </a>
  );
}

export function Button({ variant = "primary", className = "", type = "button", icon, iconRight, children, ...rest }) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      <Inner icon={icon} iconRight={iconRight}>
        {children}
      </Inner>
    </button>
  );
}