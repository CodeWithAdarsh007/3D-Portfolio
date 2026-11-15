import { Link } from "react-router-dom";
import { identity, links, nav, PLACEHOLDER_LABEL } from "../../data/portfolioContent";
import Icon from "../common/Icon";
import { LogoMark } from "./Navbar";

const LINK_COLORS = ["hover:text-sunshine", "hover:text-turquoise", "hover:text-coral", "hover:text-lavender", "hover:text-leaf", "hover:text-tangerine", "hover:text-blue", "hover:text-sunshine"];

export default function Footer() {
  return (
    <footer className="border-t-4 border-ink bg-plum text-[#fff5e6]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark size={28} />
            <span className="font-display text-base font-extrabold tracking-tight">The Dev Workspace</span>
          </div>
          <p className="mt-4 max-w-sm text-sm font-semibold leading-relaxed text-[#fff5e6]/75">
            {identity.tagline}
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-wide text-[#fff5e6]/60">
            adarsh@dev-workspace ~ $ keep building
            <span className="cursor-blink ml-1 inline-block h-3 w-[7px] translate-y-[2px] bg-sunshine" />
          </p>
          <div className="mt-5 flex gap-2" aria-hidden="true">
            {["bg-coral", "bg-sunshine", "bg-leaf", "bg-turquoise", "bg-lavender", "bg-tangerine"].map((c) => (
              <span key={c} className={`h-2.5 w-8 rounded-full ${c}`} />
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-sunshine">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {nav.slice(1).map((item, i) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`text-sm font-bold text-[#fff5e6]/75 transition-colors ${LINK_COLORS[i % LINK_COLORS.length]}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-turquoise">Connect</h2>
          <ul className="mt-4 space-y-2.5 text-sm font-bold">
            <li>
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#fff5e6]/75 transition-colors hover:text-sunshine"
              >
                <Icon name="Github" size={15} /> GitHub
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-[#fff5e6]/75">
              <Icon name="Linkedin" size={15} /> LinkedIn
              <span className="rounded-full border border-sunshine/60 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-wide text-sunshine">pending</span>
            </li>
            <li className="inline-flex items-center gap-2 text-[#fff5e6]/75">
              <Icon name="AtSign" size={15} /> Email
              <span className="rounded-full border border-sunshine/60 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-wide text-sunshine">pending</span>
            </li>
            <li>
              <a
                href={links.resume}
                download
                className="inline-flex items-center gap-2 text-[#fff5e6]/75 transition-colors hover:text-coral"
              >
                <Icon name="FileText" size={15} /> Resume
                <span className="rounded-full border border-sunshine/60 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-wide text-sunshine">placeholder</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#fff5e6]/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-center font-mono text-[11px] text-[#fff5e6]/60 sm:flex-row sm:px-8 sm:text-left">
          <p>© 2026 Adarsh · The Dev Workspace</p>
          <p>
            Unverified content is labelled <span className="text-sunshine">{PLACEHOLDER_LABEL}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}