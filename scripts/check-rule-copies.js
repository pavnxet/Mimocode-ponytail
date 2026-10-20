#!/usr/bin/env node
// Guard the copied rules and generated skill mirrors against drift.
//
// Checks:
//   1. Every skills/<name>/SKILL.md has valid frontmatter (name + description).
//   2. .mimocode/skills/<name>/SKILL.md is byte-identical to skills/<name>/SKILL.md
//      (regenerate with scripts/build-mimocode-skills.js).
//   3. AGENTS.md exists and is non-empty.
//
// Exit code 1 on any failure so CI fails loudly.

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const failures = [];

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2];
  }
  return out;
}

const skillsDir = path.join(root, 'skills');
const mirrorDir = path.join(root, '.mimocode', 'skills');

const names = fs
  .readdirSync(skillsDir)
  .filter((n) => fs.statSync(path.join(skillsDir, n)).isDirectory());

for (const name of names) {
  const srcFile = path.join(skillsDir, name, 'SKILL.md');
  if (!fs.existsSync(srcFile)) {
    failures.push(`missing skills/${name}/SKILL.md`);
    continue;
  }
  const src = fs.readFileSync(srcFile, 'utf8');
  const fm = parseFrontmatter(src);
  if (!fm) failures.push(`skills/${name}/SKILL.md has no YAML frontmatter`);
  else {
    if (!fm.name) failures.push(`skills/${name}/SKILL.md frontmatter missing 'name'`);
    if (!fm.description) failures.push(`skills/${name}/SKILL.md frontmatter missing 'description'`);
    if (fm.name && fm.name !== name)
      failures.push(`skills/${name}/SKILL.md name '${fm.name}' does not match folder '${name}'`);
  }

  const mirrorFile = path.join(mirrorDir, name, 'SKILL.md');
  if (!fs.existsSync(mirrorFile)) {
    failures.push(`.mimocode/skills/${name}/SKILL.md is missing (run scripts/build-mimocode-skills.js)`);
  } else if (fs.readFileSync(mirrorFile, 'utf8') !== src) {
    failures.push(`.mimocode/skills/${name}/SKILL.md drifted from skills/${name}/SKILL.md`);
  }
}

const agents = path.join(root, 'AGENTS.md');
if (!fs.existsSync(agents) || fs.readFileSync(agents, 'utf8').trim() === '') {
  failures.push('AGENTS.md is missing or empty');
}

if (failures.length) {
  console.error('check-rule-copies: FAILED');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(`check-rule-copies: OK (${names.length} skills verified)`);
