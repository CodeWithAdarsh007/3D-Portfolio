import { Link } from "react-router-dom";
import PageTransition from "../components/common/PageTransition";
import Icon from "../components/common/Icon";
import { ButtonLink } from "../components/common/Buttons";
import usePageMeta from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta({ title: "Page not found", description: "This page isn't on the desk.", path: "/404" });

  return (
    <PageTransition className="flex flex-1 items-center justify-center px-5 pt-28 pb-20">
      <div className="text-center">
        <div className="mx-auto w-fit rounded-2xl border-4 border-ink bg-[var(--screen)] px-10 py-8 shadow-desk">
          <p className="font-mono text-5xl font-bold text-[#e08a84]">404</p>
          <p className="mt-2 font-mono text-[11px] text-[#8a93a8]">
            segment not found on this desk
            <span className="cursor-blink ml-1 inline-block h-3 w-[7px] translate-y-[2px] bg-[#8fc4a8]" />
          </p>
        </div>
        <h1 className="mt-8 text-2xl font-extrabold tracking-tight text-ink">
          This object isn&apos;t on the workspace.
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
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
          className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-muted hover:text-blue-ink"
        >
          <Icon name="Mail" size={12} />
          report a broken link
        </Link>
      </div>
    </PageTransition>
  );
}