import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { pageMeta, publicPaths } from "../src/data/pageMeta.js";

const xml = await readFile("dist/sitemap.xml", "utf8");
test("sitemap covers each public route once", () => {
  const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => new URL(url).pathname);
  assert.deepEqual(paths.sort(), [...publicPaths].sort());
});

for (const path of [...publicPaths, "/404"]) {
  test(`share metadata and entry bundle for ${path}`, async () => {
    const file = path === "/" ? "index.html" : path.slice(1) + ".html";
    const html = await readFile(`dist/${file}`, "utf8");
    const meta = pageMeta(path);
    assert.ok(html.includes(`<link rel="canonical" href="${meta.canonical}"`));
    assert.ok(html.includes(`<meta name="robots" content="${meta.robots}"`));
    assert.ok(html.includes(`<title>${meta.title.replaceAll("&", "&amp;")}</title>`));
    assert.ok(html.includes(`property="og:url" content="${meta.canonical}"`));
    const [, script] = html.match(/<script type="module" crossorigin src="([^"]+)"/);
    assert.ok((await readFile(`dist${script}`)).length > 0);
  });
}
