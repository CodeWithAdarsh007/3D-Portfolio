import { projects } from "./projects.js";

export const siteUrl = "https://3-d-portfolio-xi-tan.vercel.app";
const siteName = "The Dev Workspace | Adarsh";
const pages = {
  "/": {
    "title": "",
    "description": "Explore Adarsh's personal developer workspace, featuring AI/ML experiments, AI agent development, software projects, research, and product-building experiences."
  },
  "/about": {
    "title": "About",
    "description": "Adarsh — third-year Computer Science Engineering (AI/ML) student building software, experimenting with intelligent systems, and turning ideas into practical products."
  },
  "/achievements": {
    "title": "Achievements",
    "description": "Adarsh's achievements wall. Community work includes an NSS voter-registration camp. Awards and certificates are pending."
  },
  "/ai-lab": {
    "title": "AI & Agent Lab",
    "description": "Adarsh's AI laboratory: machine learning, deep learning, AI agents, and data science — with honest interactive demos and clearly labelled illustrative content."
  },
  "/contact": {
    "title": "Contact",
    "description": "Find Adarsh on GitHub and preview a collaboration enquiry in the workspace’s local-only form."
  },
  "/journey": {
    "title": "My Journey",
    "description": "Adarsh's journey so far: CSE (AI/ML) education, NoteKart product building, and NSS community engagement."
  },
  "/projects": {
    "title": "Projects",
    "description": "Adarsh's project gallery: NoteKart, Paper Format Translator, AI Diet Recommendation, Online College Election System, and the AI Agent Reliability Lab — each with its own visual identity."
  },
  "/projects/archive": {
    "title": "Project Archive",
    "description": "The complete project archive of Adarsh's Dev Workspace — every case study in one folder."
  },
  "/research": {
    "title": "Research & Learning",
    "description": "Adarsh's research notebook: document-conversion evaluation, AI agent reliability experiments, applied ML, and ongoing learning notes. Unpublished work is labelled."
  },
  "/skills": {
    "title": "Technical Skills",
    "description": "Adarsh's technical skills as a studio bookshelf — Python, Java, PHP, Django, Streamlit, MySQL — each linked to the projects where it was used."
  }
};

for (const project of projects) {
  pages[`/projects/${project.slug}`] = { title: project.title, description: project.tagline };
}

export const publicPaths = Object.keys(pages);

export function pageMeta(pathname) {
  const path = pathname.replace(/\/+$/, "").toLowerCase() || "/";
  const known = Object.hasOwn(pages, path);
  const page = known ? pages[path] : { title: "Page not found", description: "Explore Adarsh’s workspace or return to the project gallery." };
  return {
    title: page.title ? `${page.title} · ${siteName}` : siteName,
    description: page.description,
    canonical: siteUrl + (known ? path : "/404"),
    robots: known ? "index, follow" : "noindex, follow",
  };
}
