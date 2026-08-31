#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const collectionPath = path.join(root, "public", "data", "brew-setups.json");
const allowed = new Set(["id", "slug", "name", "summary", "description", "image", "methods", "tools", "tags", "receivedAt", "publishedAt", "updatedAt"]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(message) {
  console.error(`Brew setup collection invalid: ${message}`);
  process.exit(1);
}

function isTimestamp(value) {
  return typeof value === "string" && value.trim() !== "" && !Number.isNaN(Date.parse(value));
}

let setups;
try {
  setups = JSON.parse(fs.readFileSync(collectionPath, "utf8"));
} catch (error) {
  fail(`cannot parse ${path.relative(root, collectionPath)}: ${error.message}`);
}
if (!Array.isArray(setups)) fail("root must be an array");

const ids = new Set();
const slugs = new Set();
for (const [index, setup] of setups.entries()) {
  const label = `setup ${index}`;
  if (!setup || typeof setup !== "object" || Array.isArray(setup)) fail(`${label} must be an object`);
  for (const key of Object.keys(setup)) if (!allowed.has(key)) fail(`${label}.${key} is not supported`);
  for (const key of ["id", "slug", "name", "summary", "description"]) {
    if (typeof setup[key] !== "string" || setup[key].trim() === "") fail(`${label}.${key} must be a non-empty string`);
  }
  if (!slugPattern.test(setup.id) || !slugPattern.test(setup.slug)) fail(`${label} has an invalid ID or slug`);
  if (ids.has(setup.id) || slugs.has(setup.slug)) fail(`${label} duplicates an ID or slug`);
  ids.add(setup.id);
  slugs.add(setup.slug);
  if (!setup.image || typeof setup.image !== "object" || typeof setup.image.src !== "string" || typeof setup.image.alt !== "string") fail(`${label}.image is invalid`);
  if (!setup.image.src.startsWith("/images/brew-setups/")) fail(`${label}.image.src must use /images/brew-setups/`);
  const media = path.resolve(root, "public", setup.image.src.replace(/^\/+/, ""));
  const mediaRoot = path.resolve(root, "public", "images", "brew-setups");
  if (!media.startsWith(`${mediaRoot}${path.sep}`) || !fs.existsSync(media)) fail(`${label}.image.src does not resolve to a public image`);
  for (const key of ["methods", "tags"]) {
    if (!Array.isArray(setup[key]) || setup[key].some((item) => typeof item !== "string" || !item.trim())) fail(`${label}.${key} must be a string array`);
  }
  if (!Array.isArray(setup.tools) || setup.tools.some((tool) => !tool || typeof tool !== "object" || Array.isArray(tool) || typeof tool.name !== "string" || !tool.name.trim())) fail(`${label}.tools must contain named objects`);
  for (const tool of setup.tools) {
    for (const key of Object.keys(tool)) if (!["name", "role", "notes"].includes(key)) fail(`${label}.tools has an unsupported field`);
    for (const key of ["role", "notes"]) if (tool[key] !== null && typeof tool[key] !== "string") fail(`${label}.tools.${key} must be a string or null`);
  }
  for (const key of ["receivedAt", "publishedAt", "updatedAt"]) if (!isTimestamp(setup[key])) fail(`${label}.${key} must be a timestamp`);
}

console.log(`Validated ${setups.length} brew ${setups.length === 1 ? "setup" : "setups"}.`);
