/**
 * Folds the Plans-page Vite build into one self-contained HTML file for
 * publishing as an Artifact. Same shape as inline.mjs.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const dist = new URL("./dist-plans/", import.meta.url).pathname;
const assets = join(dist, "assets");
const files = readdirSync(assets);
const js = files.find((f) => f.endsWith(".js"));
const css = files.find((f) => f.endsWith(".css"));

let html = readFileSync(join(dist, "plans.html"), "utf8");
html = html.replace(
  /<script[^>]*src="[^"]*"[^>]*><\/script>/,
  () => `<script type="module">\n${readFileSync(join(assets, js), "utf8")}\n</script>`,
);
html = html.replace(
  /<link rel="stylesheet"[^>]*href="\.?\/assets\/[^"]*"[^>]*>/,
  () => `<style>\n${readFileSync(join(assets, css), "utf8")}\n</style>`,
);

// public/ assets are referenced by path; the published page is one file.
const mime = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml" };
for (const dir of ["brand", "art"]) {
  if (!existsSync(join(dist, dir))) continue;
  for (const name of readdirSync(join(dist, dir))) {
    const type = mime[extname(name).toLowerCase()];
    if (!type) continue;
    const data = readFileSync(join(dist, dir, name)).toString("base64");
    html = html.split(`/${dir}/${name}`).join(`data:${type};base64,${data}`);
  }
}

// The Artifact host supplies the document skeleton, so publish the page body.
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1];
const keep = head
  .split("\n")
  .filter((l) => !/<meta /.test(l))
  .join("\n")
  .trim();
const scriptMatch = keep.match(/<script type="module">[\s\S]*?<\/script>/);
const headOnly = scriptMatch ? keep.replace(scriptMatch[0], "").trim() : keep;
const out = new URL("./plans-page.html", import.meta.url).pathname;
writeFileSync(out, `${headOnly}\n${body.trim()}\n${scriptMatch ? scriptMatch[0] : ""}\n`);
console.log(`inlined → ${out} (${Math.round(html.length / 1024)} KB)`);
