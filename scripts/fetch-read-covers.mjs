import { access, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const dataPath = resolve(projectRoot, "public/data/reads.json");
const coversDirectory = resolve(projectRoot, "public/images/reads");
const force = process.argv.includes("--force");
const entries = JSON.parse(await readFile(dataPath, "utf8"));

if (!Array.isArray(entries)) throw new Error("reads.json must contain an array");

await mkdir(coversDirectory, { recursive: true });

const candidates = entries.filter(
  (entry) =>
    entry?.kind === "book" &&
    ["active", "completed"].includes(entry.status) &&
    (entry.identifiers?.isbn13 || entry.identifiers?.isbn10),
);

let downloaded = 0;
let missing = 0;
let reused = 0;

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function pause(milliseconds) {
  await new Promise((resolvePause) => setTimeout(resolvePause, milliseconds));
}

async function fetchCover(url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "nociza.com cover cache (https://nociza.com)" },
        redirect: "follow",
      });
      if (![429, 500, 502, 503, 504].includes(response.status) || attempt === 3) return response;
    } catch (error) {
      lastError = error;
      if (attempt === 3) throw error;
    }
    await pause(attempt * 1_000);
  }
  throw lastError ?? new Error("Cover request failed");
}

for (const [index, entry] of candidates.entries()) {
  const isbn = String(entry.identifiers.isbn13 ?? entry.identifiers.isbn10).replace(/[^0-9X]/gi, "");
  const publicPath = `/images/reads/${entry.id}.jpg`;
  const filePath = resolve(coversDirectory, `${entry.id}.jpg`);

  if (!force && await fileExists(filePath)) {
    entry.cover = publicPath;
    reused += 1;
    continue;
  }

  const url = `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbn)}-M.jpg?default=false`;
  const response = await fetchCover(url);

  if (response.status === 404) {
    delete entry.cover;
    missing += 1;
  } else if (!response.ok) {
    throw new Error(`Open Library returned ${response.status} for ${entry.title} (${isbn})`);
  } else {
    const bytes = new Uint8Array(await response.arrayBuffer());
    const contentType = response.headers.get("content-type") ?? "";
    const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;

    if (!contentType.startsWith("image/") || !jpeg || bytes.length < 1_000) {
      throw new Error(`Unexpected cover response for ${entry.title} (${isbn})`);
    }

    const temporaryPath = `${filePath}.tmp`;
    await writeFile(temporaryPath, bytes);
    await rename(temporaryPath, filePath);
    entry.cover = publicPath;
    downloaded += 1;
  }

  process.stdout.write(`\rChecked ${index + 1}/${candidates.length} ISBN covers`);
  await pause(350);
}

process.stdout.write("\n");
await writeFile(dataPath, `${JSON.stringify(entries, null, 2)}\n`);

console.log(`Saved ${downloaded} covers; reused ${reused}; ${missing} unavailable.`);
