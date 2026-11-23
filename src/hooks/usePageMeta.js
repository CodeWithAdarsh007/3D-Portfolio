import { useEffect } from "react";

import { pageMeta } from "../data/pageMeta";

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/** Per-route document title, description, canonical and Open Graph sync. */
export default function usePageMeta(pathname) {
  useEffect(() => {
    const { title, description, canonical, robots } = pageMeta(pathname);
    document.title = title;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      setMeta(selector, "content", description);
    }
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('link[rel="canonical"]', "href", canonical);
    setMeta('meta[name="robots"]', "content", robots);
  }, [pathname]);
}
