#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const collectionPath = path.join(root, "public", "data", "sips.json");
const allowedTopLevel = new Set([
  "id",
  "slug",
  "title",
  "kind",
  "excerpt",
  "body",
  "image",
  "observedAt",
  "publishedAt",
  "subject",
  "brew",
  "tastingNotes",
  "rating",
  "tags",
]);
const allowedSubject = new Set(["name", "producer", "origin", "variety", "process", "style"]);
const allowedBrew = new Set(["method", "temperature_c", "dose_g", "water_g", "steep_seconds", "grind", "infusions"]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(message) {
  console.error(`Siplogue collection invalid: ${message}`);
  process.exit(1);
}

function isTimestamp(value) {
  return typeof value === "string" && value.trim() !== "" && !Number.isNaN(Date.parse(value));
}

function assertFlatObject(value, label, allowedKeys) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label} must be an object`);
  }
  for (const [key, item] of Object.entries(value)) {
    if (!allowedKeys.has(key)) fail(`${label}.${key} is not supported`);
    if (item !== null && typeof item !== "string" && typeof item !== "number") {
      fail(`${label}.${key} must be a string, number, or null`);
    }
  }
}

if (!fs.existsSync(collectionPath)) fail(`missing ${path.relative(root, collectionPath)}`);

let entries;
try {
  entries = JSON.parse(fs.readFileSync(collectionPath, "utf8"));
} catch (error) {
  fail(`cannot parse JSON: ${error.message}`);
}

if (!Array.isArray(entries)) fail("root must be an array");

const ids = new Set();
const slugs = new Set();
let previousPublishedAt = Number.POSITIVE_INFINITY;

for (const [index, entry] of entries.entries()) {
  const label = `entry ${index}`;
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) fail(`${label} must be an object`);
  for (const key of Object.keys(entry)) {
    if (!allowedTopLevel.has(key)) fail(`${label}.${key} is not a public schema field`);
  }
  for (const key of ["id", "slug", "title", "kind", "excerpt", "body", "observedAt", "publishedAt"]) {
    if (typeof entry[key] !== "string" || entry[key].trim() === "") fail(`${label}.${key} must be a non-empty string`);
  }
  if (!slugPattern.test(entry.slug) || entry.slug.length > 120) fail(`${label}.slug is invalid`);
  if (!['tea', 'coffee'].includes(entry.kind)) fail(`${label}.kind must be tea or coffee`);
  if (entry.title.length > 140 || entry.excerpt.length > 320 || entry.body.length > 12000) fail(`${label} exceeds a text limit`);
  if (!isTimestamp(entry.observedAt) || !isTimestamp(entry.publishedAt)) fail(`${label} has an invalid timestamp`);
  if (ids.has(entry.id)) fail(`${label}.id is duplicated`);
  if (slugs.has(entry.slug)) fail(`${label}.slug is duplicated`);
  ids.add(entry.id);
  slugs.add(entry.slug);

  const publishedAt = Date.parse(entry.publishedAt);
  if (publishedAt > previousPublishedAt) fail("entries must be ordered newest first");
  previousPublishedAt = publishedAt;

  if (!entry.image || typeof entry.image !== "object" || Array.isArray(entry.image)) fail(`${label}.image must be an object`);
  if (typeof entry.image.src !== "string" || !entry.image.src.startsWith("/images/sips/")) fail(`${label}.image.src must use /images/sips/`);
  if (typeof entry.image.alt !== "string" || entry.image.alt.trim() === "") fail(`${label}.image.alt must be present`);
  const mediaPath = path.resolve(root, "public", entry.image.src.replace(/^\/+/, ""));
  const mediaRoot = path.resolve(root, "public", "images", "sips");
  if (!mediaPath.startsWith(`${mediaRoot}${path.sep}`) || !fs.existsSync(mediaPath)) fail(`${label}.image.src does not resolve to a public image`);

  assertFlatObject(entry.subject, `${label}.subject`, allowedSubject);
  assertFlatObject(entry.brew, `${label}.brew`, allowedBrew);
  for (const key of ["tastingNotes", "tags"]) {
    if (!Array.isArray(entry[key]) || entry[key].some((item) => typeof item !== "string" || item.trim() === "")) {
      fail(`${label}.${key} must be an array of non-empty strings`);
    }
  }
  if (entry.rating !== null && (typeof entry.rating !== "number" || entry.rating < 0 || entry.rating > 10)) {
    fail(`${label}.rating must be null or a number from 0 to 10`);
  }
}

console.log(`Validated ${entries.length} Siplogue ${entries.length === 1 ? "entry" : "entries"}.`);
