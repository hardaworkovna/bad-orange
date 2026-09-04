/**
 * Folds the Vite build into one self-contained HTML file so it can be published
 * as an Artifact (which forbids external scripts and stylesheets).
 * Run through `npm run reference`.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dist = new URL("./dist/", import.meta.url).pathname;
const assets = join(dist, "assets");
const files = readdirSync(assets);
const js = files.find((f) => f.endsWith(".js"));
const css = files.find((f) => f.endsWith(".css"));

let html = readFileSync(join(dist, "index.html"), "utf8");
html = html.replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/, () => {
  return `<script type="module">\n${readFileSync(join(assets, js), "utf8")}\n</script>`;
});
html = html.replace(/<link rel="stylesheet"[^>]*href="\.?\/assets\/[^"]*"[^>]*>/, () => {
  return `<style>\n${readFileSync(join(assets, css), "utf8")}\n</style>`;
});

// Logos are referenced by public-folder path; the published page is a single
// file, so fold them in as data URIs.
for (const name of readdirSync(join(dist, "brand"))) {
  const data = readFileSync(join(dist, "brand", name)).toString("base64");
  html = html.split(`/brand/${name}`).join(`data:image/png;base64,${data}`);
}

// The Artifact host supplies the document skeleton, so publish the page body:
// <title>, the Google Fonts link, the inlined stylesheet, the root and the script.
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1];
const keep = head
  .split("\n")
  .filter((l) => !/<meta /.test(l))
  .join("\n")
  .trim();
const out = new URL("./design-system.html", import.meta.url).pathname;
// keep the module script last, after #root exists
const scriptMatch = keep.match(/<script type="module">[\s\S]*?<\/script>/);
const headOnly = scriptMatch ? keep.replace(scriptMatch[0], "").trim() : keep;
writeFileSync(out, `${headOnly}\n${body.trim()}\n${scriptMatch ? scriptMatch[0] : ""}\n`);
console.log(`inlined → ${out} (${Math.round(html.length / 1024)} KB)`);
