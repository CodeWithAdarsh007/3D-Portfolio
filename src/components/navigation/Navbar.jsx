import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { nav, links } from "../../data/portfolioContent";
import { useTheme } from "../../context/ThemeContext";
import { useTerminal } from "../../context/TerminalContext";
import useMediaQuery from "../../hooks/useMediaQuery";
import Icon from "../common/Icon";

export function LogoMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="34" height="23" rx="5" fill="var(--ink)" />
      <rect x="6" y="9" width="28" height="17" rx="3" fill="var(--blue)" />
      <path d="M12 15l4 3-4 3" stroke="#FFF5E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 21h7" stroke="#FFD34E" strokeWidth="2" strokeLinecap="round" />
      <rect x="15" y="29" width="10" height="3" rx="1.5" fill="var(--tangerine)" />
      <rect x="11" y="32" width="18" height="3" rx="1.5" fill="var(--ink)" />
    </svg>
  );
}

const ACTIVE_BG = ["bg-sunshine", "bg-turquoise", "bg-coral", "bg-lavender", "bg-leaf", "bg-tangerine", "bg-turquoise", "bg-sunshine", "bg-coral"];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { toggle: toggleTerminal } = useTerminal();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const menuButton = useRef(null);
  const desktop = useMediaQuery("(min-width: 1280px)");

  useEffect(() => {
    setMenuOpen(false);
  }, [location.key, desktop]);

  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [menuOpen]);

  const skipLink = (
    <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-blue focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white dark:focus:text-plum"
      >
        Skip to content
      </a>
  );
  if (location.pathname === "/") return skipLink;

  return (
    <>
      {skipLink}
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[4px] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, var(--tangerine), var(--sunshine), var(--leaf), var(--turquoise), var(--blue), var(--lavender), var(--coral))",
        }}
        aria-hidden="true"
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-ink/10 bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-1 px-2 min-[375px]:gap-3 min-[375px]:px-4 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-1.5 sm:gap-2.5" aria-label="The Dev Workspace — home">
            <LogoMark />
            <span className="leading-none">
              <span className="block font-display text-[15px] font-extrabold tracking-tight text-ink">
                The Dev Workspace
              </span>
              <span className="mt-0.5 block font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
                by Adarsh
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {nav.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-full border-2 px-2.5 py-1.5 text-[13px] font-extrabold transition-all duration-200 ${
                    isActive
                      ? `border-ink ${ACTIVE_BG[i % ACTIVE_BG.length]} text-plum shadow-sticker-sm`
                      : "border-transparent text-muted hover:bg-desk hover:text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-0 min-[375px]:gap-1.5">
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border-2 border-transparent p-2 text-muted transition-colors hover:border-ink hover:bg-sunshine hover:text-plum sm:block"
              aria-label="GitHub profile"
            >
              <Icon name="Github" size={17} />
            </a>
            <button
              type="button"
              onClick={() => { setMenuOpen(false); toggleTerminal(); }}
              className="rounded-full border-2 border-transparent p-2 text-muted transition-colors hover:border-ink hover:bg-lavender hover:text-plum"
              aria-label="Toggle terminal (Ctrl + backtick)"
              title="Terminal (Ctrl + `)"
            >
              <Icon name="SquareTerminal" size={17} />
            </button>
            <button
              type="button"
              onClick={toggle}
              className="rounded-full border-2 border-transparent p-2 text-muted transition-colors hover:border-ink hover:bg-turquoise hover:text-plum"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              <Icon name={theme === "dark" ? "Sun" : "Moon"} size={17} />
            </button>
            <a
              href={links.resume}
              download
              className="btn-primary ml-1 hidden items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-extrabold md:inline-flex"
            >
              <Icon name="Download" size={14} />
              {links.resumePlaceholder ? "Résumé sample" : "Résumé"}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-full border-2 border-ink bg-sunshine p-2 text-plum shadow-sticker-sm xl:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              ref={menuButton}
              aria-controls={menuOpen ? "mobile-navigation" : undefined}
              aria-expanded={menuOpen}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              onBlur={(event) => {
                if (event.relatedTarget && !event.currentTarget.parentElement.contains(event.relatedTarget)) setMenuOpen(false);
              }}
              onClick={() => setMenuOpen(false)}
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t-2 border-ink/10 bg-bg xl:hidden"
              aria-label="Mobile"
            >
              <div className="grid grid-cols-2 gap-2 px-5 py-4">
                {nav.map((item, i) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `rounded-xl border-2 px-4 py-3 text-sm font-extrabold ${
                        isActive
                          ? `border-ink ${ACTIVE_BG[i % ACTIVE_BG.length]} text-plum shadow-sticker-sm`
                          : "border-ink/15 bg-surface text-ink"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <a
                  href={links.resume}
                  download
                  className="btn-primary col-span-2 mt-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold"
                >
                  <Icon name="Download" size={15} />
                  {links.resumePlaceholder ? "Résumé sample (PDF)" : "Download résumé"}
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}