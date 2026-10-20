// Ponytail — MiMo Code plugin.
//
// MiMo Code (a fork of OpenCode) discovers plugins under .mimocode/plugin(s)/
// and loads them as ES modules. This one:
//
//   1. Injects the ponytail ruleset into the system prompt on every turn, at
//      the active level, so the rules hold even in subagents that do not read
//      AGENTS.md.
//   2. Persists `/ponytail <lite|full|ultra|off>` switches to a state file, so
//      the level survives session resume.
//
// It reuses AGENTS.md as the single source of the ruleset, so the rule file,
// the skills and the plugin never drift.
//
// The ruleset is already loaded as always-on instructions via mimocode.json
// (`instructions: ["AGENTS.md"]`); this plugin adds level switching and the
// subagent guarantee on top. If it ever misbehaves, delete this file — the
// skills and commands keep working on their own.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const LEVELS = ['lite', 'full', 'ultra', 'off'];
const DEFAULT_LEVEL = 'full';

const configDir = () =>
  path.join(process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config'), 'ponytail');

const statePath = () => path.join(configDir(), '.mimocode-mode');

function readDefault() {
  const env = (process.env.PONYTAIL_DEFAULT_MODE || '').trim();
  if (LEVELS.includes(env)) return env;
  try {
    const cfg = JSON.parse(fs.readFileSync(path.join(configDir(), 'config.json'), 'utf8'));
    if (LEVELS.includes(cfg.defaultMode)) return cfg.defaultMode;
  } catch {
    // no config file, or unreadable — fall through to the default
  }
  return DEFAULT_LEVEL;
}

function readMode() {
  try {
    const m = fs.readFileSync(statePath(), 'utf8').trim();
    if (LEVELS.includes(m)) return m;
  } catch {
    // no saved level yet
  }
  return readDefault();
}

function writeMode(mode) {
  if (!LEVELS.includes(mode)) return false;
  fs.mkdirSync(configDir(), { recursive: true });
  fs.writeFileSync(statePath(), mode);
  return true;
}

function ruleset(root) {
  for (const p of [path.join(root, 'AGENTS.md'), path.join(process.cwd(), 'AGENTS.md')]) {
    try {
      const text = fs.readFileSync(p, 'utf8').trim();
      if (text) return text;
    } catch {
      // try the next location
    }
  }
  return '';
}

const HEADERS = {
  lite: 'Ponytail (lite): build what was asked, and name the smaller option in one line so the user can pick.',
  full: 'Ponytail (full): the ladder is enforced. Standard library and native first, the shortest working diff, the shortest explanation.',
  ultra: 'Ponytail (ultra): YAGNI extremist. Deletion before addition. Question the request before building it.',
};

// V1 plugin shape: `server` returns the Hooks object, `detect` names the plugin.
export const server = async ({ directory } = {}) => {
  const root = directory || process.cwd();
  return {
    'experimental.chat.system.transform': async (_input, output) => {
      const mode = readMode();
      if (mode === 'off') return;
      const rules = ruleset(root);
      if (!rules) return;
      output.system = output.system || [];
      output.system.push(`# Ponytail\n${HEADERS[mode] || HEADERS.full}\n\n${rules}`);
    },

    'command.execute.before': async (input) => {
      const name = String(input && input.command ? input.command : '').replace(/^\//, '');
      if (name !== 'ponytail') return;
      const arg = String(input && input.arguments ? input.arguments : '').trim().toLowerCase();
      if (arg) writeMode(arg);
    },

    event: async () => {},
  };
};

export const detect = () => ({ name: 'ponytail' });

export default { id: 'ponytail', server, detect };
