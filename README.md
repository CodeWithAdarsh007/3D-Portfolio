# The Dev Workspace — by Adarsh

> Building intelligent systems. Turning ideas into meaningful products.

An interactive personal portfolio built as a **developer workspace**: an original illustrated
2.5D desk where every object opens a part of the story — projects, the AI & Agent Lab, research,
achievements, and contact.

**Live:** https://3-d-portfolio-xi-tan.vercel.app

---

## Experience

- **Cinematic opening** (~3.6s): the workspace assembles, the monitor boots a terminal sequence,
  and the greeting types in. Skippable, replayable on demand, never auto-replayed on navigation,
  instant under `prefers-reduced-motion`, simplified on mobile.
- **Interactive desk** — 8 clickable objects (monitor, laptop, AI chip, notebook, project folder,
  ID card, trophy, envelope) with hover tooltips, keyboard access, and a button-based legend so
  navigation never depends on the illustration alone. A separate compact composition serves mobile.
- **Working terminal** (`Ctrl + `` ` or the navbar button): `help`, `about`, `projects`, `ai-lab`,
  `skills`, `journey`, `contact`, `open <page>`, `theme`, `neofetch`, history recall, Tab completion.
- **Dark / light theme** persisted locally, with the whole desk re-lighting via CSS variables.
- **AI & Agent Lab** — honest interactives: a live BMI/BMR/TDEE calculator (real formulas, labelled
  sample meal data) and a scripted agent-workflow walkthrough. Nothing fakes a trained model.
- **Project case studies** with search, category filters, sorting, a dense archive table, and
  reusable detail components. Feature statuses distinguish built / worked-on / planned / exploring.
- **Live GitHub panel** — public repository data straight from the GitHub API, no credentials.
- **Authenticity policy** — every missing or sample asset is visibly labelled
  `DEMO PLACEHOLDER — NOT GENUINE`. See [CONTENT_REPLACEMENT_GUIDE.md](./CONTENT_REPLACEMENT_GUIDE.md).

## Sections

Home · About · Projects (+ archive + 5 case studies) · AI & Agent Lab · Research & Learning ·
Skills · Journey · Achievements · Contact · 404

## Tech stack

- **React 19 + Vite 7** (JavaScript)
- **Tailwind CSS 4** with a token-based warm-cream / deep-ink design system
- **Motion** (Framer Motion) for choreography and page transitions
- **Lucide** icons · **React Router 7** (SPA, Vercel rewrites)
- Original hand-built SVG illustration — **no Three.js, no heavy 3D**
- Deployed on **Vercel** from this repository (`vercel.json` pins the Vite build + SPA rewrites)

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build
npm run lint       # eslint
```

## Editing content

All copy, links, skills, journey entries, achievements, and lab content live in:

- `src/data/portfolioContent.js`
- `src/data/projects.js`

Placeholder replacement checklist: [CONTENT_REPLACEMENT_GUIDE.md](./CONTENT_REPLACEMENT_GUIDE.md).

## Structure

```
src/
  components/
    animations/   Typewriter, (intro choreography lives in hooks/useIntro)
    common/       Buttons, Icon, PageShell, PageTransition, Placeholder, Reveal, SectionHeading
    desk/         DeskScene (desktop + mobile), objects.jsx (SVG illustration library)
    lab/          AgentWorkflow, DietDemo
    navigation/   Navbar, Footer
    profile/      AvatarIllustration
    projects/     ProjectCard, CaseStudy, GitHubPanel
    terminal/     Terminal
  context/        ThemeContext, TerminalContext
  data/           portfolioContent.js, projects.js
  hooks/          useIntro, useMediaQuery, usePageMeta
  lib/            accents.js
  pages/          Home, About, Projects, ProjectArchive, ProjectDetail, AILab,
                  Research, Skills, Journey, Achievements, Contact, NotFound
  styles/         index.css (design tokens, themes, scrollbars, motion)
public/           favicon.svg, og-image.jpg, robots.txt, sitemap.xml, resume placeholder
scripts/          generate-resume-placeholder.mjs
```

## License

MIT © Adarsh