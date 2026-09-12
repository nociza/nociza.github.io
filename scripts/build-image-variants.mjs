import { readFile, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

// Build derivatives only. Originals and published collection files are never changed.
const root = process.cwd();
const sips = JSON.parse(await readFile("public/data/sips.json", "utf8"));
const reads = JSON.parse(await readFile("public/data/reads.json", "utf8"));
const sources = new Set([...sips.map(entry => entry.image?.src), ...reads.map(entry => entry.cover)].filter(src => typeof src === "string" && src.startsWith("/images/") && /\.(jpe?g|png|webp)$/i.test(src)));
const manifest = {};
await mkdir("public/images/variants", { recursive: true });
await mkdir(".generated", { recursive: true });
for (const src of sources) {
  const originalPath = path.resolve(root, `public${src}`);
  if (!originalPath.startsWith(path.join(root, "public/images") + path.sep)) throw new Error("Invalid image source");
  const original = await readFile(originalPath);
  const hash = createHash("sha256").update(original).digest("hex").slice(0, 20);
  const metadata = await sharp(original).metadata();
  const width = metadata.autoOrient?.width || metadata.width;
  const height = metadata.autoOrient?.height || metadata.height;
  const variants = [];
  for (const target of [320, 640, 960].filter(size => size <= width)) {
    const url = `/images/variants/${hash}-${target}.webp`;
    const output = path.join(root, `public${url}`);
    if (!await stat(output).catch(() => null)) await sharp(original).rotate().resize({ width: target, withoutEnlargement: true }).webp({ quality: 78 }).toFile(output);
    variants.push({ src: url, width: target });
  }
  manifest[src] = { width, height, variants };
}
await writeFile(".generated/image-variants.json", JSON.stringify(manifest));
console.log(`Prepared responsive derivatives for ${Object.keys(manifest).length} images; originals unchanged.`);
