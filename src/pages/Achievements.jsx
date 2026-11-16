import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import usePageMeta from "../hooks/usePageMeta";
import { achievements, PLACEHOLDER_LABEL } from "../data/portfolioContent";

const FRAME_COLORS = ["var(--sunshine)", "var(--turquoise)", "var(--coral)"];

/** Certificate-style frames. Empty slots stay honestly labelled. */
export default function Achievements() {
  usePageMeta({
    title: "Achievements",
    description:
      "Adarsh's achievements wall. Missing credentials are clearly labelled placeholders until genuine details are supplied — nothing is invented.",
    path: "/achievements",
  });

  return (
    <PageShell
      accent="sunshine"
      second="coral"
      eyebrow="Trophy shelf · achievements"
      eyebrowColor="var(--sunshine-ink)"
      title="The trophy shelf"
      body="This shelf is honest: genuine credentials will appear here once supplied. Until then, every empty frame is visibly labelled — no fake awards, certificates, or wins."
    >
      <Reveal>
        <div
          className="mb-10 flex flex-col items-start gap-5 rounded-3xl border-2 border-ink p-7 shadow-sticker sm:flex-row sm:items-center"
          style={{ background: "linear-gradient(120deg, color-mix(in srgb, var(--leaf) 30%, var(--surface)), color-mix(in srgb, var(--turquoise) 24%, var(--surface)))" }}
        >
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-ink bg-leaf text-plum shadow-sticker-sm">
            <Icon name="HeartHandshake" size={28} />
          </span>
          <div className="flex-1">
            <p className="font-mono text-[10px] font-extrabold uppercase tracking-[0.16em] text-leaf-ink">
              Verified community contribution
            </p>
            <h2 className="mt-1.5 font-display text-xl font-extrabold text-ink">
              NSS voter-registration camp — 120 student registrations reported
            </h2>
            <p className="mt-1.5 text-sm font-semibold leading-relaxed text-muted">
              Conducted with the 152 Borivali Electoral Registration Office at Thakur Shyamnarayan
              Engineering College. Community engagement through the National Service Scheme.
            </p>
          </div>
          <Link to="/journey" className="sticker bg-raised text-ink shrink-0">
            See the journey
            <Icon name="ArrowRight" size={13} />
          </Link>
        </div>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-3">
        {achievements.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.08}>
            <div
              className="relative rounded-2xl border-4 border-ink bg-raised p-3 shadow-sticker transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-0"
              style={{ transform: `rotate(${[-1.5, 1, -0.8][i]}deg)` }}
            >
              <div
                className="relative flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center"
                style={{ borderColor: FRAME_COLORS[i], background: `color-mix(in srgb, ${FRAME_COLORS[i]} 20%, var(--surface))` }}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink text-plum shadow-sticker-sm"
                  style={{ background: FRAME_COLORS[i] }}
                >
                  <Icon name={item.icon} size={24} />
                </span>
                <p className="font-display text-base font-extrabold text-ink">{item.title}</p>
                <p className="font-mono text-[10px] font-bold text-muted">
                  {item.issuer} · {item.date}
                </p>
                <span className="placeholder-label">{PLACEHOLDER_LABEL}</span>
                {/* certificate corner flourishes */}
                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M4 14 V4 H14" fill="none" stroke={FRAME_COLORS[i]} strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  <path d="M96 86 V96 H86" fill="none" stroke={FRAME_COLORS[i]} strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
              <p className="px-2 py-3 text-center font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-muted">
                frame {String(i + 1).padStart(2, "0")} · awaiting genuine credential
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <div className="rounded-2xl border-2 border-dashed panel-sunshine p-6 text-sm font-semibold leading-relaxed text-muted">
          <p className="flex items-center gap-2 font-display text-base font-extrabold text-ink">
            <Icon name="Info" size={16} className="text-sunshine-ink" />
            How this shelf fills up
          </p>
          <p className="mt-2">
            Each frame becomes a real certificate or milestone only when genuine details are
            supplied. Nothing here will ever invent an award on your behalf — the shelf stays
            honestly labelled until then.
          </p>
        </div>
      </Reveal>
    </PageShell>
  );
}