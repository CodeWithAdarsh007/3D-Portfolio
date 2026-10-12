# Adarsh Pandey — Portfolio

A personal portfolio for **Adarsh Pandey** — AI/ML engineer and full-stack
developer, Co-Founder & CTO of [NoteKart](https://www.notekart.co.in/).

Live: [https://3-d-portfolio-xi-tan.vercel.app](https://3-d-portfolio-xi-tan.vercel.app)

---

## What's inside

- **Home** — Hero, skills preview, selected work, closing CTA
- **/work** — All projects index
- **/work/[slug]** — Individual case studies (NoteKart, E4A Solution, ANAV Lifespaces)
- **/services** — Six services with deliverables and timelines
- **/about** — Bio, skills, and how I work
- **/contact** — Contact form + direct channels

Each project card includes a **live embedded preview** of the actual site,
plus a full-screen preview modal.

---

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **React 19**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Three.js** + **@react-three/fiber** + **@react-three/drei** for the 3D background
- **react-intersection-observer** for scroll-triggered reveals

---

## Local development

Prerequisites: **Node 20+** and **npm**.

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

### Project structure

```
.
├── app/                    # App Router routes
│   ├── layout.tsx          # Root layout (Navbar + Background + Footer)
│   ├── page.tsx            # Home
│   ├── work/               # Work index + [slug] case studies
│   ├── services/           # Services page
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── not-found.tsx       # Custom 404
│   └── globals.css         # Theme tokens + type scale
├── components/
│   ├── main/               # Hero, Skills, Projects, Navbar, Footer, 3D background
│   └── sub/                # LiveSiteViewer, ProjectPreviewModal, ProjectCard, etc.
├── config/
│   └── index.ts            # Site metadata, hero copy, socials
├── constants/
│   └── index.ts            # Projects, skills, services, nav links
├── lib/                    # Utilities, motion helpers
└── public/                 # Static assets (images, icons, videos)
```

### Editing content

Everything user-facing lives in two files:

| What to change | Where |
|----------------|-------|
| Name, email, socials, hero copy | `config/index.ts` |
| Projects, skills, services, nav links | `constants/index.ts` |

No JSX knowledge needed. Just edit the values.

### Adding real project screenshots

The portfolio uses live iframes for project previews, but screenshots are
still used as fallbacks when a site blocks framing. Drop them at:

- `public/projects/project-1.png` — NoteKart
- `public/projects/project-2.png` — E4A Solution
- `public/projects/project-3.png` — ANAV Lifespaces

Recommended size: 1440×900.

### Personal photo

Place at `public/portrait.jpg` (800×1000 recommended).

### Deployment

The site deploys to Vercel with zero configuration:

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js
4. Click Deploy

### Embedded-site headers

Three sites are embedded as live iframes inside the project cards:

- https://www.notekart.co.in/
- https://www.e4asolution.com/
- https://www.anavlifespaces.com/

Each of those sites sets a Content-Security-Policy: frame-ancestors
header that allows the portfolio's domains. If the portfolio URL changes,
update the frame-ancestors value on each of those sites to include the
new domain, otherwise live previews will be blocked.

### Acknowledgements

The 3D background and initial project scaffold were inspired by
[space-portfolio](https://github.com/sanidhyy/space-portfolio) by
Sanidhya. The portfolio has been
substantially redesigned — new palette, neural-grid 3D scene, multi-page
routing, live site previews, and full content replacement — but the
original repo was a valuable starting point. Thank you.

### License

The underlying template is MIT licensed (see upstream repo). This
portfolio's content, project data, and customizations are © 2025
Adarsh Pandey.