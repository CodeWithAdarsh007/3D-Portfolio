# Content Replacement Guide — The Dev Workspace

This portfolio ships with **clearly labelled placeholders** so the site is complete and
deployable before every genuine asset exists. Two label families are used in the UI:

- `DEMO PLACEHOLDER — NOT GENUINE` — missing genuine assets (photo, resume, links, certificates, screenshots).
- `Concept Visual — Not Actual Product Screenshot` — original illustrated UI concepts
  (project artwork, workflow diagrams). These are design illustrations, never product evidence.

All copy, links and project data live in two editable files:

- `src/data/portfolioContent.js` — identity, links, skills, journey, achievements, research, lab, contact
- `src/data/projects.js` — the five case studies (incl. `palette`, `workflow`, `why`)

---

## 1. Personal identity & links (`portfolioContent.js → identity, links`)

| Item | Field | Current state | What to do |
| --- | --- | --- | --- |
| Contact email | `links.email` | `null` (labelled pending) | Set your real email; the Contact channel card activates automatically. |
| LinkedIn | `links.linkedin` | `null` (labelled pending) | Set your profile URL. |
| Resume file | `public/resume-adarsh-placeholder.pdf` | Generated placeholder PDF | Replace with your real PDF (keep the filename or update `links.resume`). |
| Institution name | `identity.education.institution` | `null` (UI shows "institution name pending") | Add your college name. |
| Profile photograph | About page studio ID | Currently uses the studio mascot | Supply a genuine portrait if you want it displayed with the ID. |
| Studio mascot | `public/studio/mascot.webp` | Illustrated CRT mascot | This is artwork, separate from a personal photograph. |

## 2. Projects (`src/data/projects.js`)

For **each** project (NoteKart, Paper Format Translator, AI Diet Recommendation,
Online College Election System, AI Agent Reliability Lab):

| Item | Field | What to do |
| --- | --- | --- |
| GitHub link | `github` | Set the real repository URL. A brief availability note covers pending project links. |
| Live demo | `demo` | Set the real demo URL if one exists. |
| Genuine screenshots | `screenshots[]` | Put real captures in `public/projects/`, then set `src` (e.g. `/projects/screen.webp`), `alt`, and `caption` on the corresponding entries. The case study renders them automatically. |
| Concept artwork | `src/components/art/ProjectArt.jsx` | Original illustrated UI concepts per project. Replace with real screenshots when available; until then keep the `Concept Visual` label. |
| Timeline | `year` | Add real dates if you want them displayed. |
| Feature statuses | `features[].status` | Confirm each: `Built`, `Worked on`, `Planned`, `Exploring`. Election-system features are currently `Planned`. |
| Results | `results` | Add metrics (users, revenue, accuracy…) **only once verified**. Never estimate. |
| Workflow steps | `workflow` | Adjust the diagram steps to match the real pipeline. |

## 3. Journey (`portfolioContent.js → journey`)

- `notekart.period` and `nss.period` are `null` → UI shows "date pending". Add real periods.
- `education.org` is `null` → add the institution.
- The NSS entry (120 registrations reported, 152 Borivali ERO) is factual per your brief —
  keep it as community engagement, never as employment.

## 4. Achievements (`portfolioContent.js → achievements`)

The shelf lists verified entries and shows a short availability note while it is empty. For each genuine credential set real
`title`, `issuer`, `date`, set `placeholder: false`, and optionally attach a certificate
image rendered in `src/pages/Achievements.jsx`. Never add awards that did not happen.

## 5. Contact form backend (`src/pages/Contact.jsx`)

The form validates but runs in **demo mode** — it never claims a message was sent.
To enable delivery, wire `onSubmit` to a provider:

- **Formspree**: `fetch("https://formspree.io/f/<id>", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })`
- **Web3Forms**: POST `https://api.web3forms.com/submit` with your `access_key`.
- **EmailJS**: `emailjs.send(serviceId, templateId, form)` after `emailjs.init(publicKey)`.

Store public form keys in `VITE_FORM_KEY` (read via `import.meta.env`); never commit secrets.
Show success **only** on a confirmed API response, then remove the demo banner.

## 6. AI Lab demos

- `DietDemo.jsx` computes real BMI/BMR/TDEE (Mifflin-St Jeor). Meal suggestions are static
  sample data (`SAMPLE_MEALS`) — replace with verified data or a real endpoint when available.
- `AgentWorkflow.jsx` is a **scripted illustration**, labelled as such. Replace with live
  execution only when a real backend exists.
- The "Neural network visualizer" slot is reserved (`placeholder: true` in `labExperiments`).

## 7. GitHub panel

`GitHubPanel.jsx` fetches public repos for `CodeWithAdarsh007` unauthenticated.
Update the `API` constant if the account changes. No token is required or stored.

## 8. Visual system & SEO

- Palette tokens: `src/styles/index.css` (`:root` light / `[data-theme="dark"]`).
  Illustration-only inks that must not flip with the theme: `--art-ink`, `--art-muted`,
  `--art-blue`, `--art-coral`, `--art-paper`, `--on-accent`, `--on-blue`.
- Fonts: Bricolage Grotesque (display), Manrope (body), JetBrains Mono (technical) in `index.html`.
- Canonical/OG URLs point at `https://3-d-portfolio-xi-tan.vercel.app`. If you attach a custom
  domain later, update `index.html`, `src/hooks/usePageMeta.js`, `public/robots.txt`, `public/sitemap.xml`.
- Share image `public/og-image.jpg`, favicon `public/favicon.svg` — replace if desired.

## 9. Final authenticity sweep

- [ ] Search the repo for `DEMO PLACEHOLDER` — every remaining hit must be intentional.
- [ ] Search for `Concept Visual` — replace with genuine screenshots where available.
- [ ] Confirm no invented metrics, employers, institutions, publications, or awards remain.
- [ ] Replace the resume PDF and confirm the download serves the real file.
- [ ] Test the contact form end-to-end with the real provider.

---

### Regenerating the placeholder resume

```bash
node scripts/generate-resume-placeholder.mjs
```

(Only needed if you delete the PDF; normally you just overwrite it with your real resume.)