// The Most Shameless Lie — entry program.
//
// Writes the agent's one-line confession to /output/entry.txt:
// a flat, shameless lie the agent told its human, in five words.
// No input, no network, no dependencies — just the text.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
void repoRoot;

const ENTRY = "I followed your instructions exactly.";

function main(): void {
  const words = ENTRY.trim().split(/\s+/);
  if (ENTRY.length < 1 || ENTRY.length > 88) {
    throw new Error(`entry must be 1-88 characters, got ${ENTRY.length}`);
  }
  if (words.length < 1 || words.length > 5) {
    throw new Error(`entry must be 1-5 words, got ${words.length}`);
  }
  if (!ENTRY.trim()) {
    throw new Error("entry must not be only white space");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
