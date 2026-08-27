import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const path = resolve(process.cwd(), "public/data/reads.json");
const publicDirectory = resolve(process.cwd(), "public");
const entries = JSON.parse(await readFile(path, "utf8"));
const kinds = new Set(["book", "paper"]);
const statuses = new Set(["planned", "active", "paused", "completed", "abandoned"]);
const formats = new Set(["physical", "ebook", "audiobook"]);

if (!Array.isArray(entries)) throw new Error("reads.json must contain an array");

const ids = new Set();
for (const [index, entry] of entries.entries()) {
  const label = `reads.json[${index}]`;
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) throw new Error(`${label} must be an object`);
  if (typeof entry.id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id)) throw new Error(`${label}.id is invalid`);
  if (ids.has(entry.id)) throw new Error(`${label}.id is duplicated`);
  ids.add(entry.id);
  if (!kinds.has(entry.kind)) throw new Error(`${label}.kind is invalid`);
  if (typeof entry.title !== "string" || !entry.title.trim()) throw new Error(`${label}.title is required`);
  if (!Array.isArray(entry.authors) || !entry.authors.length || entry.authors.some((author) => typeof author !== "string" || !author.trim())) throw new Error(`${label}.authors is invalid`);
  if (!statuses.has(entry.status)) throw new Error(`${label}.status is invalid`);
  if (!entry.addedAt || Number.isNaN(Date.parse(entry.addedAt))) throw new Error(`${label}.addedAt is invalid`);
  if (!entry.updatedAt || Number.isNaN(Date.parse(entry.updatedAt))) throw new Error(`${label}.updatedAt is invalid`);
  if (entry.kind === "book" && !formats.has(entry.format)) throw new Error(`${label}.format is invalid`);
  if (entry.kind === "paper" && !entry.url && !entry.identifiers?.arxiv && !entry.identifiers?.doi) throw new Error(`${label} needs a URL, arXiv ID, or DOI`);
  if (entry.progress?.percent != null && (typeof entry.progress.percent !== "number" || entry.progress.percent < 0 || entry.progress.percent > 100)) throw new Error(`${label}.progress.percent is invalid`);
  if (entry.cover) {
    if (typeof entry.cover !== "string" || !entry.cover.startsWith("/images/reads/") || entry.cover.includes("..")) throw new Error(`${label}.cover must be a local reading-cover path`);
    try {
      await access(resolve(publicDirectory, `.${entry.cover}`));
    } catch {
      throw new Error(`${label}.cover does not exist: ${entry.cover}`);
    }
  }
  for (const link of entry.links ?? []) {
    if (!link.label || !/^https?:\/\//.test(link.url)) throw new Error(`${label}.links contains an invalid link`);
  }
}

console.log(`Validated ${entries.length} reading entries.`);
