import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const files = await readdir(root, { recursive: true });
let verified = 0;
for (const file of files.filter(file => file.endsWith(".html"))) {
  // A sentinel is required by static export while no brew setups exist.
  // It intentionally renders notFound and is never linked or in the sitemap.
  if (file === "sips/setups/_empty/index.html") continue;
  const html = await readFile(path.join(root, file), "utf8");
  assert.ok(!html.includes('id="__next_error__"'), `${file}: error-only export`);
  assert.ok(html.includes('aria-label="Main navigation"'), `${file}: missing navigation`);
  assert.ok(html.includes('id="site-content"'), `${file}: missing skip target`);
  verified++;
}
const index = await readFile(path.join(root, "index.html"), "utf8");
assert.match(index, /http-equiv="refresh" content="0;url=\/me\/"/i);
assert.ok(index.includes("Continue to my website"), "Homepage needs a no-JavaScript fallback");
console.log(`Verified ${verified} exported pages and the native homepage redirect.`);
