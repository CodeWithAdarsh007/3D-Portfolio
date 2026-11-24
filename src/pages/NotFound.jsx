import { Link } from "react-router-dom";
import PageTransition from "../components/common/PageTransition";
import Icon from "../components/common/Icon";
import { ButtonLink } from "../components/common/Buttons";

export default function NotFound() {
  return (
    <PageTransition className="page-top flex flex-1 items-center justify-center px-5 pb-20">
      <div className="w-full max-w-lg text-center">
        <img src="/studio/mascot.webp" width="152" height="152" alt="" className="mx-auto rounded-3xl" />
        <p className="mt-5 font-mono text-sm text-blue-ink">404</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink">
          This object isn&apos;t in the studio.
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm font-semibold leading-relaxed text-muted">
          The page you&apos;re looking for was moved, renamed, or never existed. The desk is still here.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/" icon="Home">
            Back to the desk
          </ButtonLink>
          <ButtonLink to="/projects" variant="ghost" icon="Laptop">
            Browse projects
          </ButtonLink>
        </div>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-muted hover:text-blue-ink"
        >
          <Icon name="Mail" size={12} />
          report a broken link
        </Link>
      </div>
    </PageTransition>
  );
}