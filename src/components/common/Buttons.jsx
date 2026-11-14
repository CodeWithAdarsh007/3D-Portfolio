import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Icon from "./Icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-200 select-none";

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
    <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex">
      <Link to={to} className={`${base} ${variants[variant]} ${className}`} {...rest}>
        <Inner icon={icon} iconRight={iconRight}>
          {children}
        </Inner>
      </Link>
    </motion.span>
  );
}

export function ButtonAnchor({ href, variant = "primary", className = "", icon, iconRight, children, ...rest }) {
  return (
    <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex">
      <a href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
        <Inner icon={icon} iconRight={iconRight}>
          {children}
        </Inner>
      </a>
    </motion.span>
  );
}

export function Button({ variant = "primary", className = "", type = "button", icon, iconRight, children, ...rest }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      <Inner icon={icon} iconRight={iconRight}>
        {children}
      </Inner>
    </motion.button>
  );
}