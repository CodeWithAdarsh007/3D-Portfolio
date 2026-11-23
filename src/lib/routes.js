import { lazy } from "react";

const loaders = {
  "/": () => import("../pages/Home"),
  "/about": () => import("../pages/About"),
  "/projects": () => import("../pages/Projects"),
  "/projects/archive": () => import("../pages/ProjectArchive"),
  "/projects/:slug": () => import("../pages/ProjectDetail"),
  "/ai-lab": () => import("../pages/AILab"),
  "/research": () => import("../pages/Research"),
  "/skills": () => import("../pages/Skills"),
  "/journey": () => import("../pages/Journey"),
  "/achievements": () => import("../pages/Achievements"),
  "/contact": () => import("../pages/Contact"),
  "*": () => import("../pages/NotFound"),
};

export const routes = Object.entries(loaders).map(([path, load]) => ({ path, Page: lazy(load) }));

export function preloadDestination(to) {
  const load = loaders[to.split("#")[0]];
  // Navigation retries a failed speculative request through React.lazy.
  load?.().catch(() => {});
}
