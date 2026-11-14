import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import Placeholder from "../components/common/Placeholder";
import usePageMeta from "../hooks/usePageMeta";
import { achievements } from "../data/portfolioContent";

export default function Achievements() {
  usePageMeta({
    title: "Achievements",
    description:
      "Adarsh's achievements and certifications wall. Missing credentials are clearly labelled placeholders until genuine details are supplied.",
    path: "/achievements",
  });

  return (
    <PageShell
      eyebrow="Trophy shelf · achievements"
      title="The trophy shelf"
      body="This shelf is honest: genuine credentials will appear here once supplied. Until then, every empty slot is visibly labelled — no fake awards, certificates, or wins."
    >
      {/* One genuine, factual highlight */}
      <Reveal>
        <div className="card mb-8 flex flex-col items-start gap-5 border-sage/50 p-7 sm:flex-row sm:items-center">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sage/15 text-sage-ink">
            <Icon name="HeartHandshake" size={26} />
          </span>
          <div className="flex-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-sage-ink">
              Verified community contribution
            </p>
            <h2 className="mt-1.5 text-lg font-extrabold text-ink">
              NSS voter-registration camp — 120 student registrations reported
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Conducted with the 152 Borivali Electoral Registration Office at Thakur Shyamnarayan
              Engineering College. Community engagement through the National Service Scheme.
            </p>
          </div>
          <Link
            to="/journey"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-raised px-4 py-2 text-xs font-bold text-ink transition-colors hover:border-sage hover:text-sage-ink"
          >
            See the journey
            <Icon name="ArrowRight" size={13} />
          </Link>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {achievements.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.08}>
            <div className="card h-full p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-desk text-muted">
                  <Icon name={item.icon} size={20} />
                </span>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                  Slot {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="mt-5">
                <Placeholder icon={item.icon} minHeight={170} title={item.title}>
                  <p className="text-xs text-muted">
                    {item.issuer} · {item.date}
                  </p>
                </Placeholder>
              </div>
              <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted">
                add genuine details in portfolioContent.js → achievements
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <div className="rounded-2xl border border-line bg-desk/50 p-6 text-sm leading-relaxed text-muted">
          <p className="flex items-center gap-2 font-extrabold text-ink">
            <Icon name="Info" size={16} className="text-blue-ink" />
            How to fill this shelf
          </p>
          <p className="mt-2">
            Replace each placeholder entry in <code className="font-mono text-xs">src/data/portfolioContent.js</code>{" "}
            with a real title, issuer, and date, set <code className="font-mono text-xs">placeholder: false</code>,
            and (optionally) attach a certificate image in <code className="font-mono text-xs">src/assets/images</code>.
            The full checklist lives in <code className="font-mono text-xs">CONTENT_REPLACEMENT_GUIDE.md</code>.
          </p>
        </div>
      </Reveal>
    </PageShell>
  );
}