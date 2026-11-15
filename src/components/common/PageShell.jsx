import { Link } from "react-router-dom";
import PageTransition from "./PageTransition";
import Reveal from "./Reveal";
import Icon from "./Icon";
import { wash } from "../../lib/accents";

/** Sub-page layout with its own colour atmosphere and a back-to-desk link. */
export default function PageShell({ eyebrow, eyebrowColor, title, body, children, accent = "blue", second = "sunshine" }) {
  return (
    <PageTransition className="page-top pb-20">
      <div style={wash(accent, second)}>
        <div className="shell">
          <header className="mb-12">
            <Reveal>
              <Link
                to="/"
                className="mb-6 inline-flex items-center gap-1.5 font-mono text-[11.5px] font-bold tracking-wide text-muted transition-colors hover:text-blue-ink"
              >
                <Icon name="ArrowLeft" size={13} />
                back to the desk
              </Link>
              {eyebrow && (
                <p className="eyebrow mb-3" style={{ "--eyebrow-color": eyebrowColor || "var(--blue-ink)" }}>
                  {eyebrow}
                </p>
              )}
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                {title}
              </h1>
              {body && <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-muted">{body}</p>}
            </Reveal>
          </header>
          {children}
        </div>
      </div>
    </PageTransition>
  );
}