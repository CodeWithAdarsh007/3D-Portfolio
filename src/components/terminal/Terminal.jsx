import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useTerminal } from "../../context/TerminalContext";
import { useTheme } from "../../context/ThemeContext";
import { identity, links } from "../../data/portfolioContent";
import { projects } from "../../data/projects";
import Icon from "../common/Icon";

const ROUTES = {
  home: "/",
  about: "/about",
  projects: "/projects",
  archive: "/projects/archive",
  "ai-lab": "/ai-lab",
  research: "/research",
  skills: "/skills",
  journey: "/journey",
  achievements: "/achievements",
  contact: "/contact",
};

const COMMANDS = [
  "help", "about", "projects", "ai-lab", "skills", "journey", "contact",
  "research", "achievements", "home", "clear", "ls", "whoami", "theme",
  "open", "resume", "echo", "date", "neofetch", "sudo", "exit",
];

const BANNER = [
  { kind: "ok", text: "The Dev Workspace — interactive terminal v1.0" },
  { kind: "dim", text: "Type `help` to list commands. Tab completes, ↑/↓ recall history." },
];

const HELP = [
  { kind: "out", text: "Available commands:" },
  { kind: "out", text: "  help                 show this list" },
  { kind: "out", text: "  about                who is Adarsh?" },
  { kind: "out", text: "  projects             list the project archive" },
  { kind: "out", text: "  ai-lab               open the AI & Agent Lab" },
  { kind: "out", text: "  skills               technical skills" },
  { kind: "out", text: "  journey              education & community timeline" },
  { kind: "out", text: "  contact              contact channels" },
  { kind: "out", text: "  research             research & learning archive" },
  { kind: "out", text: "  achievements         achievements wall" },
  { kind: "out", text: "  open <page|slug>     navigate (e.g. open notekart)" },
  { kind: "out", text: "  ls                   list objects on the desk" },
  { kind: "out", text: "  whoami               current user" },
  { kind: "out", text: "  theme [dark|light]   switch workspace lighting" },
  { kind: "out", text: "  resume               download resume (placeholder)" },
  { kind: "out", text: "  neofetch             workspace info card" },
  { kind: "out", text: "  echo <text>          repeat text · date · clear · exit" },
];

const NEOFETCH = [
  { kind: "ok", text: "        _________________" },
  { kind: "ok", text: "       |  ___________  |     adarsh@dev-workspace" },
  { kind: "ok", text: "       | |           | |     -------------------" },
  { kind: "ok", text: "       | |  >_       | |     OS: Student, CSE (AI/ML), year 3" },
  { kind: "ok", text: "       | |___________| |     Shell: curiosity 5.0" },
  { kind: "ok", text: "       |_______________|     Uptime: learning by building" },
  { kind: "ok", text: "          _[_______]_        Focus: agents · products · ML" },
  { kind: "ok", text: "      ___/_________\\___    Palette: cream / ink / sage" },
  { kind: "dim", text: "  \"Building intelligent systems. Turning ideas into meaningful products.\"" },
];

export default function Terminal() {
  const { isOpen, close, toggle } = useTerminal();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        toggle();
      } else if (e.key === "Escape" && isOpen) {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, toggle, close]);

  useEffect(() => {
    if (isOpen) {
      if (lines.length === 0) setLines(BANNER);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen, lines.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const append = useCallback((newLines) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const run = useCallback(
    (raw) => {
      const trimmed = raw.trim();
      append([{ kind: "in", text: trimmed }]);
      if (!trimmed) return;

      setHistory((prev) => [...prev, trimmed]);
      setHistIdx(-1);

      const [cmd, ...args] = trimmed.split(/\s+/);
      const arg = args.join(" ");
      const lower = cmd.toLowerCase();

      const go = (path, label) => {
        navigate(path);
        return [{ kind: "ok", text: `→ opening ${label} (${path})` }];
      };

      let out;
      switch (lower) {
        case "help":
          out = HELP;
          break;
        case "about":
          out = [
            { kind: "out", text: identity.greeting },
            { kind: "out", text: identity.positioning },
            { kind: "dim", text: "Roles: " + identity.roles.join(" · ") },
            ...go("/about", "About"),
          ];
          break;
        case "projects":
          out = [
            { kind: "out", text: `Project archive (${projects.length}):` },
            ...projects.map((p) => ({
              kind: "out",
              text: `  ${p.slug.padEnd(28)} ${p.tagline}`,
            })),
            { kind: "dim", text: "Try: open notekart · open archive" },
            ...go("/projects", "Projects"),
          ];
          break;
        case "ai-lab":
          out = go("/ai-lab", "AI & Agent Lab");
          break;
        case "skills":
          out = [
            { kind: "out", text: "Programming: Python · Java · PHP" },
            { kind: "out", text: "Development: Django · Streamlit" },
            { kind: "out", text: "Databases: MySQL" },
            ...go("/skills", "Skills"),
          ];
          break;
        case "journey":
          out = go("/journey", "Journey");
          break;
        case "contact":
          out = [
            { kind: "out", text: `GitHub: ${links.github}` },
            { kind: "dim", text: "Email & LinkedIn: placeholders — see /contact" },
            ...go("/contact", "Contact"),
          ];
          break;
        case "research":
          out = go("/research", "Research & Learning");
          break;
        case "achievements":
          out = [
            { kind: "dim", text: "Achievements wall is placeholder-labelled until genuine credentials are added." },
            ...go("/achievements", "Achievements"),
          ];
          break;
        case "home":
          out = go("/", "Home");
          break;
        case "open": {
          const target = arg.toLowerCase();
          if (!target) {
            out = [{ kind: "err", text: "usage: open <page|project-slug> — e.g. open ai-lab" }];
          } else if (ROUTES[target]) {
            out = go(ROUTES[target], target);
          } else if (projects.some((p) => p.slug === target)) {
            out = go(`/projects/${target}`, target);
          } else {
            out = [
              { kind: "err", text: `unknown target: ${target}` },
              { kind: "dim", text: `pages: ${Object.keys(ROUTES).join(", ")}` },
            ];
          }
          break;
        }
        case "ls":
          out = [
            { kind: "out", text: "desk/  monitor  laptop  ai-chip  notebook  folder  id-card  trophy  envelope" },
            { kind: "dim", text: "Every object is clickable on the home desk." },
          ];
          break;
        case "whoami":
          out = [{ kind: "out", text: "adarsh — CSE (AI/ML) student · aspiring AI engineer · product builder" }];
          break;
        case "theme": {
          const want = arg.toLowerCase();
          if (want === "dark" || want === "light") {
            setTheme(want);
            out = [{ kind: "ok", text: `workspace lighting → ${want}` }];
          } else if (!want || want === "toggle") {
            const next = theme === "dark" ? "light" : "dark";
            setTheme(next);
            out = [{ kind: "ok", text: `workspace lighting → ${next}` }];
          } else {
            out = [{ kind: "err", text: "usage: theme [dark|light|toggle]" }];
          }
          break;
        }
        case "resume": {
          const a = document.createElement("a");
          a.href = links.resume;
          a.download = "";
          document.body.appendChild(a);
          a.click();
          a.remove();
          out = [
            { kind: "ok", text: "downloading resume-adarsh-placeholder.pdf" },
            { kind: "dim", text: "DEMO PLACEHOLDER — NOT GENUINE. Replace with the real resume." },
          ];
          break;
        }
        case "echo":
          out = [{ kind: "out", text: arg || "" }];
          break;
        case "date":
          out = [{ kind: "out", text: new Date().toString() }];
          break;
        case "neofetch":
          out = NEOFETCH;
          break;
        case "sudo":
          out = [{ kind: "err", text: "permission denied: this workspace runs on curiosity, not root." }];
          break;
        case "clear":
          setLines([]);
          return;
        case "exit":
          close();
          return;
        default:
          out = [
            { kind: "err", text: `command not found: ${cmd}` },
            { kind: "dim", text: "Type `help` for the command list." },
          ];
      }
      append(out);
    },
    [append, navigate, close, setTheme, theme],
  );

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      if (parts.length <= 1) {
        const match = COMMANDS.find((c) => c.startsWith(parts[0].toLowerCase()) && parts[0]);
        if (match) setInput(match + " ");
      } else if (parts[0] === "open") {
        const targets = [...Object.keys(ROUTES), ...projects.map((p) => p.slug)];
        const match = targets.find((t) => t.startsWith(parts[1].toLowerCase()) && parts[1]);
        if (match) setInput(`open ${match}`);
      }
    }
  };

  const kindClass = {
    in: "text-[#87a5ff]",
    out: "text-[#fff5e9]",
    ok: "text-[#70d6a7]",
    err: "text-[#ff91aa]",
    dim: "text-[#d0c5da]",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[80] flex h-[340px] flex-col overflow-hidden rounded-2xl border border-[#554a68] bg-[#201d2b] shadow-desk sm:inset-x-auto sm:right-6 sm:bottom-6 sm:h-[400px] sm:w-[620px]"
          role="dialog"
          aria-label="Workspace terminal"
        >
          <header className="flex items-center justify-between border-b border-[#554a68] bg-[#2a2538] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff91aa]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffd45b]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#70d6a7]" />
              <span className="ml-2 font-mono text-[11px] text-[#d0c5da]">
                adarsh@dev-workspace: ~
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden font-mono text-[10px] text-[#9a8fb0] sm:block">
                ctrl + ` to toggle
              </span>
              <button
                type="button"
                onClick={close}
                className="rounded-md p-1 text-[#d0c5da] transition-colors hover:bg-[#554a68] hover:text-white"
                aria-label="Close terminal"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          </header>

          <div
            ref={scrollRef}
            className="terminal-scroll flex-1 overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed"
            aria-live="polite"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <p key={i} className={`whitespace-pre-wrap ${kindClass[line.kind] || kindClass.out}`}>
                {line.kind === "in" && <span className="text-[#70d6a7]">➜ ~ </span>}
                {line.text}
              </p>
            ))}
            <div className="flex items-center">
              <span className="shrink-0 text-[#70d6a7]">➜ ~ </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="ml-1 w-full bg-transparent text-[#fff5e9] caret-[#70d6a7] outline-none"
                aria-label="Terminal command input"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}