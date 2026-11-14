# Content Replacement Guide — The Dev Workspace

This portfolio ships with **clearly labelled placeholders** so the site is complete and
deployable before every genuine asset exists. Every placeholder is visibly marked
`DEMO PLACEHOLDER — NOT GENUINE` in the UI.

Work through this checklist before treating the site as final. All content lives in two
editable files unless noted otherwise:

- `src/data/portfolioContent.js` — identity, links, skills, journey, achievements, research, lab, contact
- `src/data/projects.js` — the five project case studies

---

## 1. Personal identity & links (`portfolioContent.js → identity, links`)

| Item | Field | Current state | What to do |
| --- | --- | --- | --- |
| Contact email | `links.email` | `null` (placeholder) | Set your real email; the Contact page channel card activates automatically. |
| LinkedIn | `links.linkedin` | `null` (placeholder) | Set your profile URL. |
| Resume file | `public/resume-adarsh-placeholder.pdf` | Generated placeholder PDF | Replace with your real PDF. Keep the filename, or update `links.resume`. |
| Institution name | `identity.education.institution` | `null` (labelled) | Add your college name; also set `institutionPlaceholder: false`. |
| Profile photograph | `src/pages/About.jsx` photo block | Labelled placeholder | Add the image to `src/assets/images/`, import it in `About.jsx`, and replace the `<Placeholder …>` block with an `<img>` (keep meaningful `alt` text). |
| Illustrated avatar | `src/components/profile/AvatarIllustration.jsx` | Original placeholder art | Keep as stylized art, or replace with your own illustration. It is intentionally **not** a photo. |

## 2. Projects (`src/data/projects.js`)

For **each** of the five projects (NoteKart, Paper Format Translator, AI Diet Recommendation,
Online College Election System, AI Agent Reliability Lab):

| Item | Field | What to do |
| --- | --- | --- |
| GitHub link | `github` | Set the real repository URL (currently `null` → labelled placeholder chip). |
| Live demo | `demo` | Set the real demo URL if one exists. |
| Screenshots | `screenshots[]` | Add images to `src/assets/images/projects/`, then render them in `ProjectDetail.jsx` in place of the `<Placeholder>` blocks (captions already exist). |
| Timeline | `year` | Add real dates; the detail page shows a labelled "add dates" chip until then. |
| Feature statuses | `features[].status` | Confirm each item: `Built`, `Worked on`, `Planned`, `Exploring`. The election system's features are currently all `Planned` — update as you confirm implementation. |
| Results | `results` | Only add metrics (users, revenue, accuracy…) once **verified**. Never estimate. |

## 3. Journey (`portfolioContent.js → journey`)

- `notekart.period` and `nss.period` are `null` → labelled date chips. Add real periods.
- `education.org` is `null` → add the institution (same value as `identity.education.institution`).
- The NSS entry (120 registrations reported, 152 Borivali ERO) is factual per your brief — keep or
  refine wording, but do not reframe it as employment.

## 4. Achievements (`portfolioContent.js → achievements`)

All three slots are placeholders. For each genuine credential:

1. Set `title`, `issuer`, `date` to real values.
2. Set `placeholder: false`.
3. Optionally add a certificate image and render it in `src/pages/Achievements.jsx`.

Do **not** add awards, certificates, or wins that did not happen.

## 5. Contact form backend (`src/pages/Contact.jsx`)

The form validates input but runs in **demo mode** — it never claims a message was sent.
To enable real delivery, pick one provider and wire the `onSubmit` handler:

- **Formspree**: create a form, then `fetch("https://formspree.io/f/<id>", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })`.
- **Web3Forms**: POST to `https://api.web3forms.com/submit` with your `access_key`.
- **EmailJS**: `emailjs.send(serviceId, templateId, form)` after `emailjs.init(publicKey)`.

Store any public form key in an env var (`VITE_FORM_KEY`) and read it via
`import.meta.env.VITE_FORM_KEY`; never commit secret keys. After wiring, remove the demo
banner and the `demoSubmitted` state, and show success **only** on a confirmed API response.

## 6. AI Lab demos (`src/data/portfolioContent.js → labExperiments`)

- The diet demo computes real BMI/BMR/TDEE (Mifflin-St Jeor). Its meal suggestions are static
  sample data in `src/components/lab/DietDemo.jsx → SAMPLE_MEALS` — replace with verified data
  or a real model endpoint when available.
- The agent workflow (`src/components/lab/AgentWorkflow.jsx`) is a **scripted illustration**.
  Replace with live execution only when a real backend exists.
- The "Neural network visualizer" slot is reserved (`placeholder: true`). Plug a real demo in
  when a model file/endpoint is configured.

## 7. GitHub panel

`src/components/projects/GitHubPanel.jsx` fetches public repos for `CodeWithAdarsh007`
unauthenticated. If you rename the account or want a different user, update the `API` constant.
No token is required or stored.

## 8. SEO & domain

- Canonical/OG URLs point at `https://3-d-portfolio-xi-tan.vercel.app` (the existing deployment).
  If you attach a custom domain later, update: `index.html`, `src/hooks/usePageMeta.js`,
  `public/robots.txt`, `public/sitemap.xml`.
- Social share image: `public/og-image.jpg` (1200×630). Replace with your own if desired.
- Favicon: `public/favicon.svg`.

## 9. Final authenticity sweep

Before sharing the site publicly:

- [ ] Search the repo for `DEMO PLACEHOLDER` — every remaining hit must be intentional.
- [ ] Search for `placeholder: true` / `Placeholder` usages and confirm each is still honest.
- [ ] Confirm no invented metrics, employers, institutions, publications, or awards remain.
- [ ] Replace the resume PDF and confirm the download serves the real file.
- [ ] Test the contact form end-to-end with the real provider.

---

### Regenerating the placeholder resume

```bash
node scripts/generate-resume-placeholder.mjs
```

(Only needed if you delete the PDF; normally you just overwrite it with your real resume.)