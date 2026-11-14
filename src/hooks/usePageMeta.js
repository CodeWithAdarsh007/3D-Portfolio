import { useEffect } from "react";

const BASE_URL = "https://3-d-portfolio-xi-tan.vercel.app";
const SITE = "The Dev Workspace | Adarsh";

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/** Per-route document title, description, canonical and Open Graph sync. */
export default function usePageMeta({ title, description, path = "/" }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE}` : SITE;
    document.title = fullTitle;
    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[property="og:url"]', "content", `${BASE_URL}${path}`);
    setMeta('link[rel="canonical"]', "href", `${BASE_URL}${path}`);
  }, [title, description, path]);
}