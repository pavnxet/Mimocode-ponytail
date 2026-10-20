# Agent Portability

Ponytail is an agent-portable skill distribution. The skills in `skills/` hold
the core behavior; host-specific files are adapters that make that behavior easy
to load in a given agent. This repository is tuned for MiMo Code, but the core
files stay portable.

## Supported Adapters

| Host | Files | Notes |
|------|-------|-------|
| MiMo Code | `AGENTS.md`, `.mimocode/skills/`, `.mimocode/commands/`, `mimocode.json`, `.mimocode/plugin/ponytail.mjs` | Rules always-on from `AGENTS.md`; skills discovered on demand; commands in the TUI; the plugin adds level switching and subagent injection. See [mimocode.md](mimocode.md). |
| Generic agents | `AGENTS.md` or `skills/*/SKILL.md` | Copy the compact rule file, or load the skill files directly. |

## Adapter Rule

Keep adapters thin. When a host supports skills, point it at the existing
`skills/` files. When a host only supports project instructions, keep its copied
rule text aligned with `AGENTS.md`.

`.mimocode/skills/` is generated from `skills/` by
`node scripts/build-mimocode-skills.js`; `scripts/check-rule-copies.js` fails CI
if the two drift, so `skills/` stays the single source of truth.

## Portable Behavior

- `skills/ponytail/SKILL.md`: lazy senior dev mode
- `skills/ponytail-review/SKILL.md`: quality review of a change
- `skills/ponytail-audit/SKILL.md`: whole-repo quality audit
- `skills/ponytail-debt/SKILL.md`: harvest `shortcut:` comments into a tracked ledger
- `skills/ponytail-gain/SKILL.md`: measured impact scoreboard
- `skills/ponytail-help/SKILL.md`: quick reference
- `AGENTS.md`: compact always-on instruction set for agents without skill support
