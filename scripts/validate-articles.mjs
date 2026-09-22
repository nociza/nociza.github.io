import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const rows = JSON.parse(await readFile(new URL("../public/data/articles.json", import.meta.url), "utf8"));
assert.ok(Array.isArray(rows), "Articles must be an array");
const slugs = new Set();
for (const row of rows) {
  assert.deepEqual(Object.keys(row).sort(), ["body", "format", "slug", "title"]);
  assert.equal(row.format, "smc-article-v1");
  assert.match(row.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(row.slug.length <= 160 && !slugs.has(row.slug), "Article slugs must be unique");
  slugs.add(row.slug);
  assert.ok(typeof row.title === "string" && row.title.trim() && row.title.length <= 240);
  assert.ok(typeof row.body === "string" && row.body.trim() && row.body.length <= 100000);
  assert.ok(!/<\s*\/?\s*[a-z!]|javascript:|data:|\/Users\/|\/Volumes\/|smc_key/i.test(row.body), "No executable content or private evidence");
}
console.log(`Validated ${rows.length} public articles. Private drafts are never read by this site.`);
