import { Link } from "react-router-dom";
import { identity, links, nav, PLACEHOLDER_LABEL } from "../../data/portfolioContent";
import Icon from "../common/Icon";
import { LogoMark } from "./Navbar";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-desk/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark size={28} />
            <span className="text-base font-extrabold tracking-tight text-ink">
              The Dev Workspace
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{identity.tagline}</p>
          <p className="mt-4 font-mono text-[11px] tracking-wide text-muted">
            adarsh@dev-workspace ~ $ keep building
            <span className="cursor-blink ml-1 inline-block h-3 w-[7px] translate-y-[2px] bg-sage" />
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="eyebrow mb-4">Explore</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {nav.slice(1).map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm font-semibold text-muted transition-colors hover:text-blue-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow mb-4">Connect</h3>
          <ul className="space-y-2.5 text-sm font-semibold">
            <li>
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-blue-ink"
              >
                <Icon name="Github" size={15} /> GitHub
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-muted">
              <Icon name="Linkedin" size={15} /> LinkedIn
              <span className="placeholder-label !px-2 !py-0.5 !text-[9px]">placeholder</span>
            </li>
            <li className="inline-flex items-center gap-2 text-muted">
              <Icon name="AtSign" size={15} /> Email
              <span className="placeholder-label !px-2 !py-0.5 !text-[9px]">placeholder</span>
            </li>
            <li>
              <a
                href={links.resume}
                download
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-blue-ink"
              >
                <Icon name="FileText" size={15} /> Resume
                <span className="placeholder-label !px-2 !py-0.5 !text-[9px]">placeholder</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-center font-mono text-[11px] text-muted sm:flex-row sm:px-8 sm:text-left">
          <p>© 2026 Adarsh · The Dev Workspace</p>
          <p>
            Unverified content is labelled{" "}
            <span className="text-amber-ink">{PLACEHOLDER_LABEL}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}