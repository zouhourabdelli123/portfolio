// Post-processing of the static export (`out/`) for GitHub Pages.
//
// 1. GitHub Pages picks the Content-Type from the file extension, but Next
//    writes generated Open Graph images without one: add ".png" and update
//    every reference in the exported HTML / RSC payloads.
// 2. Next writes per-segment RSC payloads as nested folders
//    (`__next.$d$locale/__PAGE__.txt`) while the client router requests
//    dot-joined names (`__next.$d$locale.__PAGE__.txt`). Without a server to
//    rewrite them, those requests 404 and every navigation degrades to a full
//    page load. Add dot-joined copies next to the folders.
import { copyFileSync, readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { basename, join, sep } from "node:path";

const OUT = "out";
const IMAGE_ROUTES = ["opengraph-image"];

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const files = walk(OUT);
let renamed = 0;
let rewritten = 0;
let flattened = 0;

// 1a. Image extensions
for (const file of files) {
  if (IMAGE_ROUTES.includes(basename(file))) {
    renameSync(file, `${file}.png`);
    renamed++;
  }
}

// 1b. References: "/opengraph-image" followed by a query string, quote, whitespace or escaped quote.
const pattern = /\/(opengraph-image)(?=[?"'\s\\])/g;
for (const file of files) {
  if (!/\.(html|txt|webmanifest)$/.test(file)) continue;
  const content = readFileSync(file, "utf8");
  const next = content.replace(pattern, "/$1.png");
  if (next !== content) {
    writeFileSync(file, next);
    rewritten++;
  }
}

// 2. Dot-joined copies of nested segment payloads
for (const file of walk(OUT)) {
  const parts = file.split(sep);
  const index = parts.findIndex((part, i) => part.startsWith("__next.") && i < parts.length - 1);
  if (index === -1) continue;
  const target = join(...parts.slice(0, index), parts.slice(index).join("."));
  copyFileSync(file, target);
  flattened++;
}

console.log(`postexport: ${renamed} images renamed, ${rewritten} files updated, ${flattened} segment payloads flattened`);
if (renamed === 0) process.exit(1);
