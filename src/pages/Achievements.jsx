import { Link } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import { achievements } from "../data/portfolioContent";

export default function Achievements() {
  const credentials = achievements.filter(item => !item.placeholder);
  return (
    <PageShell
      title="Contributions & milestones"
      body="Community work and milestones from my engineering journey."
    >
      <Reveal>
        <div
          className="mb-10 flex flex-col items-start gap-5 rounded-3xl border border-line p-7 shadow-sticker sm:flex-row sm:items-center"
          style={{ background: "linear-gradient(120deg, color-mix(in srgb, var(--leaf) 30%, var(--surface)), color-mix(in srgb, var(--turquoise) 24%, var(--surface)))" }}
        >
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-line bg-leaf text-plum shadow-sticker-sm">
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

      <section className="credential-register">
        <h2 className="font-display text-2xl font-bold">Awards and certificates</h2>
        {credentials.length ? (
          <ul className="mt-4 space-y-3">
            {credentials.map(item => <li key={item.id}><strong>{item.title}</strong> · {item.issuer} · {item.date}</li>)}
          </ul>
        ) : (
          <p className="mt-2 text-muted">Verified certificates have yet to be added to the shelf.</p>
        )}
        <Link className="mt-5 inline-flex items-center gap-2 font-bold text-blue-ink" to="/projects">Explore my project work <Icon name="ArrowRight" size={16} /></Link>
      </section>
    </PageShell>
  );
}