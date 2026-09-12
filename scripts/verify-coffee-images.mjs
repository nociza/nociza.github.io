import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = (path) => readFileSync(resolve(root, path), "utf8");
const coffees = JSON.parse(read("public/data/coffee.json"));
const sips = JSON.parse(read("public/data/sips.json"));
const archive = read("out/coffee/index.html");
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
let photos = 0;
let placeholders = 0;

for (const coffee of coffees) {
  const sip = sips.find((entry) => entry.kind === "coffee" && entry.id === coffee.id);
  assert.ok(sip, `Missing Siplogue media mapping for ${coffee.name}`);
  const detail = read(`out/coffee/${coffee.id}/index.html`);
  const placeholder = sip.image.src.endsWith("/archive-coffee.svg");

  for (const [label, html] of [["archive", archive], ["detail", detail]]) {
    if (placeholder) {
      assert.ok(html.includes("Original photograph unavailable"), `Missing honest placeholder in ${label}: ${coffee.name}`);
      continue;
    }
    const image = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0])
      .find((tag) => tag.includes(`alt="${escapeHtml(sip.image.alt)}"`));
    assert.ok(image, `Photo is not rendered in ${label}: ${coffee.name}`);
    const src = image.match(/\bsrc="([^"]+)"/)?.[1];
    assert.ok(src?.startsWith("/images/"), `Photo must be locally hosted: ${src}`);
    assert.ok(existsSync(resolve(root, `out${src}`)), `Missing exported image: ${src}`);
    if (label === "detail") {
      assert.ok(image.includes('loading="eager"'), `Detail photo should load eagerly: ${coffee.name}`);
    }
  }
  if (placeholder) placeholders += 1;
  else photos += 1;
}

console.log(`Verified ${photos} saved coffee photos and ${placeholders} explicit placeholders across the archive and ${coffees.length} detail pages.`);
