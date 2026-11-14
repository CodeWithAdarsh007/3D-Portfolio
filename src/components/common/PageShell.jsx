import { Link } from "react-router-dom";
import PageTransition from "./PageTransition";
import Reveal from "./Reveal";
import Icon from "./Icon";

/** Standard sub-page layout: fixed-navbar offset, heading, content container. */
export default function PageShell({ eyebrow, title, body, children, wide = false }) {
  return (
    <PageTransition className="pt-28 pb-20 sm:pt-32">
      <div className={`mx-auto px-5 sm:px-8 ${wide ? "max-w-7xl" : "max-w-6xl"}`}>
        <header className="mb-12">
          <Reveal>
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-1.5 font-mono text-[11.5px] font-semibold tracking-wide text-muted transition-colors hover:text-blue-ink"
            >
              <Icon name="ArrowLeft" size={13} />
              back to the desk
            </Link>
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {title}
            </h1>
            {body && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{body}</p>}
          </Reveal>
        </header>
        {children}
      </div>
    </PageTransition>
  );
}