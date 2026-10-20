#!/usr/bin/env node
// Generate MiMo Code skill copies from the canonical skills/ directory.
//
// MiMo Code discovers skills at .mimocode/skills/**/SKILL.md (plus a few
// compatibility dirs). The canonical source of truth stays at skills/ so the
// repo works with any agent; this script mirrors it into .mimocode/skills/ so
// MiMo Code picks it up with zero setup. Run: node scripts/build-mimocode-skills.js
//
// The generated copies are committed. scripts/check-rule-copies.js fails CI if
// they drift from skills/.

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'skills');
const dest = path.join(root, '.mimocode', 'skills');

function build() {
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  const names = fs.readdirSync(src).filter((n) =>
    fs.statSync(path.join(src, n)).isDirectory(),
  );
  for (const name of names) {
    const skillFile = path.join(src, name, 'SKILL.md');
    if (!fs.existsSync(skillFile)) continue;
    const outDir = path.join(dest, name);
    fs.mkdirSync(outDir, { recursive: true });
    fs.copyFileSync(skillFile, path.join(outDir, 'SKILL.md'));
  }
  return names;
}

if (require.main === module) {
  const names = build();
  console.log(`Built ${names.length} MiMo Code skills into .mimocode/skills/`);
}

module.exports = { build };
