const assert = require("node:assert/strict");
const { test } = require("node:test");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { runInNewContext } = require("node:vm");
const ts = require("typescript");

const source = readFileSync(join(__dirname, "../src/lib/section-scroll.ts"), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const exportsObject = {};
runInNewContext(compiled, { exports: exportsObject });
const { visibleSectionIndex, canScrollWithinSection } = exportsObject;

const sections = [
  { offsetTop: 0, offsetHeight: 800 },
  { offsetTop: 800, offsetHeight: 1800 },
  { offsetTop: 2600, offsetHeight: 800 },
];

test("normal full-screen sections still snap at their boundaries", () => {
  assert.equal(visibleSectionIndex(sections, 0, 800), 0);
  assert.equal(canScrollWithinSection(sections[0], 0, 800, 1), false);
  assert.equal(canScrollWithinSection(sections[2], 2600, 800, -1), false);
});

test("tall galleries remain active at their top, middle, and bottom", () => {
  for (const top of [800, 1100, 1500, 1800]) {
    assert.equal(visibleSectionIndex(sections, top, 800), 1);
  }
  assert.equal(visibleSectionIndex(sections, 2300, 800), 2);
});

test("native scrolling reads the gallery before leaving either edge", () => {
  const gallery = sections[1];
  assert.equal(canScrollWithinSection(gallery, 800, 800, 1), true);
  assert.equal(canScrollWithinSection(gallery, 800, 800, -1), false);
  assert.equal(canScrollWithinSection(gallery, 1200, 800, 1), true);
  assert.equal(canScrollWithinSection(gallery, 1200, 800, -1), true);
  assert.equal(canScrollWithinSection(gallery, 1800, 800, 1), false);
  assert.equal(canScrollWithinSection(gallery, 1800, 800, -1), true);
});

test("subpixel boundary differences do not trap a section", () => {
  assert.equal(canScrollWithinSection(sections[1], 1799.5, 800, 1), false);
  assert.equal(canScrollWithinSection(sections[1], 800.5, 800, -1), false);
});
