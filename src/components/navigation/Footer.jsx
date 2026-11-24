import { Link } from "react-router-dom";
import { identity, links, nav } from "../../data/portfolioContent";
import Icon from "../common/Icon";
import { LogoMark } from "./Navbar";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface text-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark size={28} />
            <span className="font-display text-base font-extrabold tracking-tight">The Dev Workspace</span>
          </div>
          <p className="mt-4 max-w-sm text-sm font-semibold leading-relaxed text-muted">
            {identity.tagline}
          </p>

        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-blue-ink">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {nav.slice(1).map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm font-semibold text-muted hover:text-blue-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-blue-ink">Connect</h2>
          <ul className="mt-4 space-y-2.5 text-sm font-bold">
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
            <li><Link to="/contact" className="text-muted hover:text-blue-ink">Contact details</Link></li>
            <li>
              <a
                href={links.resume}
                download
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-blue-ink"
              >
                <Icon name="FileText" size={15} /> {links.resumePlaceholder ? "Résumé sample" : "Résumé"}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-center font-mono text-[11px] text-muted sm:flex-row sm:px-8 sm:text-left">
          <p>© 2026 Adarsh · The Dev Workspace</p>
          <Link to="/" className="hover:text-blue-ink">Return to the desk ↑</Link>
        </div>
      </div>
    </footer>
  );
}