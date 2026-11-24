import { useState } from "react";
import PageShell from "../components/common/PageShell";
import Reveal from "../components/common/Reveal";
import Icon from "../components/common/Icon";
import { contact, links, PLACEHOLDER_LABEL } from "../data/portfolioContent";

const initialForm = { name: "", email: "", subject: "", message: "" };

function ChannelCard({ icon, title, value, href, placeholder, note, bg }) {
  const inner = (
    <>
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-ink ${bg} text-plum shadow-sticker-sm`}>
        <Icon name={icon} size={20} />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-sm font-extrabold text-ink">{title}</span>
        <span className="block truncate text-xs font-semibold text-muted">{value}</span>
        {placeholder && (
          <span className="placeholder-label mt-1.5 inline-block !px-2 !py-0.5 !text-[8px]">
            {PLACEHOLDER_LABEL}
          </span>
        )}
        {note && <span className="mt-1 block text-[10.5px] font-semibold text-muted">{note}</span>}
      </span>
    </>
  );

  const cls =
    "card flex h-full items-start gap-3.5 border-2 border-ink p-5";

  return href && !placeholder ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`${cls} transition-shadow hover:shadow-sticker`}>
      {inner}
    </a>
  ) : (
    <div className={cls} aria-disabled={placeholder ? "true" : undefined}>
      {inner}
    </div>
  );
}

export default function Contact() {
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
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) e.currentTarget.elements.namedItem(firstInvalid)?.focus();
    else {
      // Demo mode: no backend configured. Never claim the message was sent.
      setDemoSubmitted(true);
    }
  };

  const inputCls = (field) =>
    `w-full rounded-xl border-2 bg-raised px-4 py-3 text-sm font-semibold text-ink placeholder:text-muted/80 transition-colors focus:border-blue ${
      errors[field] ? "border-danger" : "border-ink/25"
    }`;

  return (
    <PageShell
      eyebrow="Envelope · contact"
      title={contact.heading}
      body={contact.body}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          <Reveal delay={0.05}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ChannelCard icon="Github" title="GitHub" value="CodeWithAdarsh007" href={links.github} bg="bg-sunshine" />
              <ChannelCard icon="Linkedin" title="LinkedIn" value={links.linkedin || "Profile pending"} href={links.linkedin} placeholder={!links.linkedin} bg="bg-turquoise" />
              <ChannelCard icon="AtSign" title="Email" value={links.email || "Address pending"} href={links.email ? `mailto:${links.email}` : undefined} placeholder={!links.email} bg="bg-coral" />
              <ChannelCard icon="FileText" title="Resume" value={links.resumePlaceholder ? "Sample PDF" : "Download PDF"} href={links.resume} placeholder={links.resumePlaceholder} bg="bg-lavender" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <form onSubmit={onSubmit} noValidate className="card paper-lines border-2 border-ink p-6 shadow-desk sm:p-8">
            <div className="mb-6 flex items-start gap-3 rounded-xl border-2 panel-sunshine p-4">
              <Icon name="AlertTriangle" size={17} className="mt-0.5 shrink-0 text-sunshine-ink" />
              <p className="text-xs font-bold leading-relaxed text-muted">
                <span className="font-extrabold text-sunshine-ink">Demo mode — messages are NOT sent.</span>{" "}
                You can preview a message here. Your entries stay in this browser tab.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-extrabold text-ink">Name</span>
                <input type="text" name="name" required autoComplete="name" aria-describedby={errors.name ? "name-error" : undefined} value={form.name} onChange={setField("name")} placeholder="Your name" className={inputCls("name")} aria-invalid={Boolean(errors.name)} />
                {errors.name && <span id="name-error" className="mt-1 block text-[11px] font-bold text-danger">{errors.name}</span>}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-extrabold text-ink">Email</span>
                <input type="email" name="email" required autoComplete="email" aria-describedby={errors.email ? "email-error" : undefined} value={form.email} onChange={setField("email")} placeholder="you@example.com" className={inputCls("email")} aria-invalid={Boolean(errors.email)} />
                {errors.email && <span id="email-error" className="mt-1 block text-[11px] font-bold text-danger">{errors.email}</span>}
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-extrabold text-ink">Subject</span>
              <input type="text" name="subject" required aria-describedby={errors.subject ? "subject-error" : undefined} value={form.subject} onChange={setField("subject")} placeholder="What's this about?" className={inputCls("subject")} aria-invalid={Boolean(errors.subject)} />
              {errors.subject && <span id="subject-error" className="mt-1 block text-[11px] font-bold text-danger">{errors.subject}</span>}
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-extrabold text-ink">Message</span>
              <textarea rows={5} name="message" required aria-describedby={errors.message ? "message-error" : undefined} value={form.message} onChange={setField("message")} placeholder="Tell me about the idea, problem, or collaboration…" className={`${inputCls("message")} resize-y`} aria-invalid={Boolean(errors.message)} />
              {errors.message && <span id="message-error" className="mt-1 block text-[11px] font-bold text-danger">{errors.message}</span>}
            </label>

            <button type="submit" className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold sm:w-auto">
              <Icon name="Send" size={15} />
              Preview message
            </button>

            {demoSubmitted && (
              <div className="mt-5 rounded-xl border-2 border-sunshine bg-sunshine/25 p-4" role="status" aria-live="polite">
                <p className="flex items-center gap-2 text-sm font-extrabold text-sunshine-ink">
                  <Icon name="Info" size={15} />
                  Demo mode — this message was NOT sent.
                </p>
                <p className="mt-1.5 text-xs font-semibold leading-relaxed text-muted">
                  Your draft is ready to review.
                </p>
                <p className="mt-2 font-mono text-[10px] font-semibold text-muted">
                  {form.name} &lt;{form.email}&gt; · {form.subject}
                </p>
                <blockquote className="mt-3 whitespace-pre-wrap break-words border-l-2 border-line pl-3 text-sm text-ink">{form.message}</blockquote>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </PageShell>
  );
}