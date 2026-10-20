#!/usr/bin/env node
// Guards the MiMo Code wiring: skill frontmatter, the generated skill mirror,
// the command set, the config, the always-on rule file and the plugin.
// Runs with node:test — no dependencies, no API key.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.join(__dirname, '..');
const skillsDir = path.join(root, 'skills');
const mirrorDir = path.join(root, '.mimocode', 'skills');
const commandsDir = path.join(root, '.mimocode', 'commands');

const EXPECTED = [
  'ponytail',
  'ponytail-audit',
  'ponytail-debt',
  'ponytail-gain',
  'ponytail-help',
  'ponytail-review',
];

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2];
  }
  return out;
}

test('skills/ holds the six ponytail skills', () => {
  const dirs = fs
    .readdirSync(skillsDir)
    .filter((n) => fs.statSync(path.join(skillsDir, n)).isDirectory())
    .sort();
  assert.deepEqual(dirs, [...EXPECTED].sort());
});

test('every skill has name + description frontmatter matching its folder', () => {
  for (const name of EXPECTED) {
    const text = fs.readFileSync(path.join(skillsDir, name, 'SKILL.md'), 'utf8');
    const fm = frontmatter(text);
    assert.ok(fm, `${name}: no frontmatter`);
    assert.ok(fm.name, `${name}: missing name`);
    assert.ok(fm.description, `${name}: missing description`);
    assert.equal(fm.name, name, `${name}: name does not match folder`);
  }
});

test('.mimocode/skills mirrors skills/ byte-for-byte', () => {
  for (const name of EXPECTED) {
    const src = fs.readFileSync(path.join(skillsDir, name, 'SKILL.md'), 'utf8');
    const mirror = path.join(mirrorDir, name, 'SKILL.md');
    assert.ok(fs.existsSync(mirror), `missing ${mirror}`);
    assert.equal(
      fs.readFileSync(mirror, 'utf8'),
      src,
      `${name}: mirror drifted (run scripts/build-mimocode-skills.js)`,
    );
  }
});

test('every skill ships a matching .mimocode/commands/<name>.md', () => {
  for (const name of EXPECTED) {
    const file = path.join(commandsDir, `${name}.md`);
    assert.ok(fs.existsSync(file), `missing ${file}`);
    const fm = frontmatter(fs.readFileSync(file, 'utf8'));
    assert.ok(fm && fm.description, `${name}.md: missing description frontmatter`);
  }
});

test('mimocode.json is valid and allows the ponytail skills', () => {
  const cfg = JSON.parse(fs.readFileSync(path.join(root, 'mimocode.json'), 'utf8'));
  assert.equal(cfg.$schema, 'https://mimo.xiaomi.com/mimocode/config.json');
  assert.ok(cfg.permission && cfg.permission.skill, 'no permission.skill');
  assert.equal(cfg.permission.skill['ponytail'], 'allow');
  assert.ok(Array.isArray(cfg.instructions) && cfg.instructions.includes('AGENTS.md'));
});

test('AGENTS.md exists and is not empty', () => {
  const text = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8');
  assert.ok(text.trim().length > 0);
});

test('the MiMo Code plugin parses as an ES module', () => {
  const plugin = path.join(root, '.mimocode', 'plugin', 'ponytail.mjs');
  assert.ok(fs.existsSync(plugin), 'missing .mimocode/plugin/ponytail.mjs');
  execFileSync(process.execPath, ['--check', plugin], { stdio: 'pipe' });
});
