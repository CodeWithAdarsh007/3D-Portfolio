import { useState } from "react";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import usePageMeta from "../hooks/usePageMeta";
import { contact, links, PLACEHOLDER_LABEL } from "../data/portfolioContent";

const initialForm = { name: "", email: "", subject: "", message: "" };

function ChannelCard({ icon, title, value, href, placeholder, note }) {
  const inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-desk text-blue-ink">
        <Icon name={icon} size={19} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-extrabold text-ink">{title}</span>
        <span className="block truncate text-xs font-medium text-muted">{value}</span>
        {placeholder && (
          <span className="placeholder-label mt-1.5 inline-block !px-2 !py-0.5 !text-[8px]">
            {PLACEHOLDER_LABEL}
          </span>
        )}
        {note && <span className="mt-1 block text-[10.5px] text-muted">{note}</span>}
      </span>
    </>
  );

  const cls =
    "card flex h-full items-start gap-3.5 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue/50 hover:shadow-lift";

  return href && !placeholder ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls} aria-disabled={placeholder ? "true" : undefined}>
      {inner}
    </div>
  );
}

export default function Contact() {
  usePageMeta({
    title: "Contact",
    description:
      "Get in touch with Adarsh — GitHub, contact form, and resume. The form runs in clearly labelled demo mode until a submission provider is connected.",
    path: "/contact",
  });

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const setField = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
    setDemoSubmitted(false);
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please add your name.";
    if (!form.email.trim()) next.email = "Please add your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "That email doesn't look valid.";
    if (!form.subject.trim()) next.subject = "Please add a subject.";
    if (!form.message.trim()) next.message = "Please write a message.";
    return next;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      // Demo mode: no backend is configured. We never claim the message was sent.
      setDemoSubmitted(true);
    }
  };

  const inputCls = (field) =>
    `w-full rounded-xl border bg-raised px-4 py-3 text-sm font-medium text-ink placeholder:text-muted/60 transition-colors focus:border-blue ${
      errors[field] ? "border-danger" : "border-line"
    }`;

  return (
    <PageShell
      eyebrow="Envelope · contact"
      title={contact.heading}
      body={contact.body}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* ------------------------------------------------------- channels */}
        <div className="space-y-4">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ChannelCard icon="Github" title="GitHub" value="CodeWithAdarsh007" href={links.github} />
              <ChannelCard
                icon="Linkedin"
                title="LinkedIn"
                value="profile link pending"
                placeholder
                note="add URL in portfolioContent.js → links"
              />
              <ChannelCard
                icon="AtSign"
                title="Email"
                value="address pending"
                placeholder
                note="add address in portfolioContent.js → links"
              />
              <ChannelCard
                icon="FileText"
                title="Resume"
                value="download placeholder PDF"
                href={links.resume}
                placeholder
                note="replace public/resume-adarsh-placeholder.pdf"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-desk/50 p-5 font-mono text-[11px] leading-relaxed text-muted">
              <p className="font-bold text-ink">response style</p>
              <p className="mt-1.5">
                I read everything. Expect a thoughtful reply, not an autoresponder — once the email
                channel above is connected.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ----------------------------------------------------------- form */}
        <Reveal delay={0.05}>
          <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber/50 bg-amber/10 p-4">
              <Icon name="AlertTriangle" size={17} className="mt-0.5 shrink-0 text-amber-ink" />
              <p className="text-xs leading-relaxed text-muted">
                <span className="font-extrabold text-amber-ink">Demo mode — messages are NOT sent.</span>{" "}
                No form backend is configured yet. To enable real delivery, connect a provider
                (Formspree, Web3Forms, EmailJS…) — see CONTENT_REPLACEMENT_GUIDE.md.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-extrabold text-ink">Name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={setField("name")}
                  placeholder="Your name"
                  className={inputCls("name")}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <span className="mt-1 block text-[11px] font-bold text-danger">{errors.name}</span>}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-extrabold text-ink">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={setField("email")}
                  placeholder="you@example.com"
                  className={inputCls("email")}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className="mt-1 block text-[11px] font-bold text-danger">{errors.email}</span>}
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-extrabold text-ink">Subject</span>
              <input
                type="text"
                value={form.subject}
                onChange={setField("subject")}
                placeholder="What's this about?"
                className={inputCls("subject")}
                aria-invalid={Boolean(errors.subject)}
              />
              {errors.subject && <span className="mt-1 block text-[11px] font-bold text-danger">{errors.subject}</span>}
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-extrabold text-ink">Message</span>
              <textarea
                rows={5}
                value={form.message}
                onChange={setField("message")}
                placeholder="Tell me about the idea, problem, or collaboration…"
                className={`${inputCls("message")} resize-y`}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && <span className="mt-1 block text-[11px] font-bold text-danger">{errors.message}</span>}
            </label>

            <button
              type="submit"
              className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold sm:w-auto"
            >
              <Icon name="Send" size={15} />
              Send message (demo)
            </button>

            {demoSubmitted && (
              <div
                className="mt-5 rounded-xl border border-warning/50 bg-warning/10 p-4"
                role="status"
                aria-live="polite"
              >
                <p className="flex items-center gap-2 text-sm font-extrabold text-warning">
                  <Icon name="Info" size={15} />
                  Demo mode — this message was NOT sent.
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  Validation passed, so in a live setup this would be delivered. Nothing left your
                  browser. Connect a form provider to enable real submissions.
                </p>
                <p className="mt-2 font-mono text-[10px] text-muted">
                  preview → from: {form.name} &lt;{form.email}&gt; · subject: {form.subject}
                </p>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </PageShell>
  );
}