import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { pageMeta, publicPaths } from "../src/data/pageMeta.js";

const template = await readFile("dist/index.html", "utf8");
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const manifest = JSON.parse(await readFile("dist/.vite/manifest.json", "utf8"));
const pageChunks = new Map(Object.entries(manifest)
  .filter(([key]) => key.startsWith("src/pages/"))
  .map(([key, chunk]) => [basename(key, ".jsx").toLowerCase(), chunk]));

function routePreloads(path) {
  const slug = path.slice(1).replaceAll(/[-/]/g, "");
  const name = path === "/" ? "home" : path === "/404" ? "notfound" :
    path === "/projects/archive" ? "projectarchive" : path.startsWith("/projects/") ? "projectdetail" : slug;
  const files = new Set();
  function collect(chunk) {
    if (!chunk || files.has(chunk.file) || template.includes(`"/${chunk.file}"`)) return;
    files.add(chunk.file);
    for (const dependency of chunk.imports || []) collect(manifest[dependency]);
  }
  collect(pageChunks.get(name));
  return [...files].map(file => `<link rel="modulepreload" crossorigin href="/${file}" />`).join("\n    ");
}

for (const path of [...publicPaths, "/404"]) {
  const { title, description, canonical, robots } = pageMeta(path);
  const values = { description, robots, "og:title": title, "twitter:title": title,
    "og:description": description, "twitter:description": description, "og:url": canonical };
  const html = template
    .replace("</head>", () => `    ${routePreloads(path)}\n  </head>`)
    .replace(/<title>.*?<\/title>/, () => `<title>${escape(title)}</title>`)
    .replace(/<meta\s+(?:name|property)="([^"]+)"\s+content="[^"]*"\s*\/?>/g, (tag, key) =>
      Object.hasOwn(values, key) ? tag.replace(/content="[^"]*"/, () => `content="${escape(values[key])}"`) : tag)
    .replace(/(<link rel="canonical" href=")[^"]+/, (_, prefix) => prefix + escape(canonical));
  const file = join("dist", path === "/" ? "index.html" : path.slice(1) + ".html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}
