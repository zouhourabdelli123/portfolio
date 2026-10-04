// Verifies that every locale file has exactly the same keys (and array lengths) as en.json.
import { readFileSync } from "node:fs";

const load = (l) => JSON.parse(readFileSync(new URL(`../messages/${l}.json`, import.meta.url), "utf8"));
const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) return [`${key}[${v.length}]`, ...v.flatMap((x, i) => (typeof x === "object" ? flatten(x, `${key}.${i}`) : []))];
    return v && typeof v === "object" ? flatten(v, key) : [key];
  });

const base = new Set(flatten(load("en")));
let ok = true;
for (const locale of ["fr", "ar"]) {
  const keys = new Set(flatten(load(locale)));
  const missing = [...base].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !base.has(k));
  if (missing.length || extra.length) {
    ok = false;
    console.error(`${locale}: missing ${JSON.stringify(missing)} extra ${JSON.stringify(extra)}`);
  }
}
console.log(ok ? "messages: all locales in sync" : "messages: mismatch");
process.exit(ok ? 0 : 1);
