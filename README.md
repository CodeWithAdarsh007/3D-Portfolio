# The Dev Workspace — by Adarsh

> Building intelligent systems. Turning ideas into meaningful products.

An interactive personal portfolio built as a **developer workspace**: an original illustrated
2.5D desk where every object opens a part of the story — projects, the AI & Agent Lab, research,
achievements, and contact.

**Live:** https://3-d-portfolio-xi-tan.vercel.app

---

## Experience

- **Full-screen studio** with separate landscape and portrait scenes, each illustrated in daylight and lamplight. The first viewport belongs to the room. The live wall clock shows India Standard Time.
- **Eight object links** open portfolio sections. The desk lamp switches lighting, the keyboard opens the terminal, and the brass drawer pull opens the studio index. Keyboard focus reveals each destination; reduced-motion navigation is immediate.
- **Working terminal** with command history, Tab completion, theme switching and project navigation. Open it from the keyboard on the desk, the studio index, the navbar, or the Ctrl + backtick shortcut.
- **AI & Agent Lab** — honest interactives: a live BMI/BMR/TDEE calculator (real formulas, labelled
  sample meal data) and a scripted agent-workflow walkthrough. Nothing fakes a trained model.
- **Project case studies** with search, category filters, sorting, a dense archive table, and
  reusable detail components. Feature statuses distinguish built / worked-on / planned / exploring.
- **Live GitHub panel** — public repository data straight from the GitHub API, no credentials.
- **Content status** distinguishes concept artwork, sample files, and pending links from published work. See [CONTENT_REPLACEMENT_GUIDE.md](./CONTENT_REPLACEMENT_GUIDE.md).

## Sections

Home · About · Projects (+ archive + 5 case studies) · AI & Agent Lab · Research & Learning ·
Skills · Journey · Achievements · Contact · 404

## Tech stack

- **React 19 + Vite 7** (JavaScript)
- **Tailwind CSS 4** with a token-based warm-cream / deep-ink design system
- **Motion** (Framer Motion) for choreography and page transitions
- **Lucide** icons · **React Router 7** (SPA, Vercel rewrites)
- ImageGen studio artwork served as WebP, with HTML controls and original SVG case-study illustrations
- Deployed on **Vercel** from this repository (`vercel.json` pins the Vite build and clean URLs)

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build
npm run lint       # eslint
npm test           # release checks against the production build
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
    animations/   Typewriter
    common/       Buttons, Icon, PageShell, PageTransition, Placeholder, Reveal, SectionHeading
    desk/         DeskScene and sceneLayout (composition-specific object coordinates)
    lab/          AgentWorkflow, DietDemo
    navigation/   Navbar, Footer
    projects/     ProjectCard, CaseStudy, GitHubPanel
    terminal/     Terminal
  context/        ThemeContext, TerminalContext
  data/           portfolioContent.js, projects.js
  hooks/          useMediaQuery, usePageMeta
  lib/            accents.js
  pages/          Home, About, Projects, ProjectArchive, ProjectDetail, AILab,
                  Research, Skills, Journey, Achievements, Contact, NotFound
  styles/         index.css (tokens and layout), studio.css (room and chapters)
public/studio/    furnished room scenes and illustrated studio mascot
public/           favicon.svg, og-image.jpg, robots.txt, sitemap.xml, resume placeholder
scripts/          generate-resume-placeholder.mjs
```

## License

MIT © Adarsh