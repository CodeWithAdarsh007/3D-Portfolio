import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { nav, links } from "../../data/portfolioContent";
import { useTheme } from "../../context/ThemeContext";
import { useTerminal } from "../../context/TerminalContext";
import Icon from "../common/Icon";

export function LogoMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="34" height="23" rx="4" fill="var(--ink)" />
      <rect x="6" y="9" width="28" height="17" rx="2" fill="var(--blue)" />
      <path d="M12 15l4 3-4 3" stroke="#F5F1E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 21h7" stroke="#F5F1E9" strokeWidth="2" strokeLinecap="round" />
      <rect x="15" y="29" width="10" height="3" rx="1.5" fill="var(--amber)" />
      <rect x="11" y="32" width="18" height="3" rx="1.5" fill="var(--ink)" />
    </svg>
  );
}

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { toggle: toggleTerminal } = useTerminal();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = ({ isActive }) =>
    `rounded-full px-2.5 py-1.5 text-[13px] font-semibold transition-colors duration-200 ${
      isActive ? "bg-desk text-blue-ink" : "text-muted hover:bg-desk/60 hover:text-ink"
    }`;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-blue focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, var(--blue), var(--sage), var(--amber))",
        }}
        aria-hidden="true"
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="The Dev Workspace — home">
            <LogoMark />
            <span className="leading-none">
              <span className="block text-[15px] font-extrabold tracking-tight text-ink">
                The Dev Workspace
              </span>
              <span className="mt-0.5 block font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
                by Adarsh
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full p-2 text-muted transition-colors hover:bg-desk hover:text-ink sm:block"
              aria-label="GitHub profile"
            >
              <Icon name="Github" size={17} />
            </a>
            <button
              type="button"
              onClick={toggleTerminal}
              className="rounded-full p-2 text-muted transition-colors hover:bg-desk hover:text-ink"
              aria-label="Toggle terminal (Ctrl + backtick)"
              title="Terminal (Ctrl + `)"
            >
              <Icon name="SquareTerminal" size={17} />
            </button>
            <button
              type="button"
              onClick={toggle}
              className="rounded-full p-2 text-muted transition-colors hover:bg-desk hover:text-ink"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              <Icon name={theme === "dark" ? "Sun" : "Moon"} size={17} />
            </button>
            <a
              href={links.resume}
              download
              className="btn-primary ml-1 hidden items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-bold md:inline-flex"
            >
              <Icon name="Download" size={14} />
              Resume
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-full p-2 text-ink transition-colors hover:bg-desk lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-line bg-bg lg:hidden"
              aria-label="Mobile"
            >
              <div className="grid grid-cols-2 gap-1.5 px-5 py-4">
                {nav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-bold ${
                        isActive ? "bg-desk text-blue-ink" : "bg-surface text-ink"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <a
                  href={links.resume}
                  download
                  className="btn-primary col-span-2 mt-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
                >
                  <Icon name="Download" size={15} />
                  Download Resume (placeholder)
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}