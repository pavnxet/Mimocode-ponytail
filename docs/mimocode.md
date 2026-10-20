# MiMo Code integration

Ponytail for MiMo Code is three things that reinforce each other: an always-on rule file, six on-demand skills, and six slash commands. A small plugin adds level switching and the subagent guarantee.

## What MiMo Code loads, and from where

| Piece | Path | Mechanism |
|-------|------|-----------|
| Always-on rules | `AGENTS.md` | Loaded as instructions (declared in `mimocode.json` `instructions`) |
| Skills | `.mimocode/skills/**/SKILL.md` | Discovered on demand, listed in the `skill` tool |
| Commands | `.mimocode/commands/*.md` | Slash commands in the TUI |
| Permissions | `mimocode.json` | `permission.skill` allows the `ponytail*` skills |
| Plugin | `.mimocode/plugin/ponytail.mjs` | Injects the ruleset each turn, persists the level |

MiMo Code discovers skills from `.mimocode/skills/**/SKILL.md` (and the `.claude`, `.agents`, `.codex`, `.opencode` compatibility dirs). The canonical skills live at `skills/` in this repo; `.mimocode/skills/` is generated from them by `scripts/build-mimocode-skills.js`, and `scripts/check-rule-copies.js` fails CI if they drift.

## Frontmatter

MiMo Code reads only three frontmatter fields from a `SKILL.md`: `name`, `description` (both required) and optional `hidden`. The extra `argument-hint` and `license` fields in these skills are ignored by MiMo Code and kept for other agents.

## Levels and persistence

The active level is stored at `~/.config/ponytail/.mimocode-mode` (or `%APPDATA%\ponytail\` on Windows). Resolution order for the starting level:

1. `PONYTAIL_DEFAULT_MODE` environment variable
2. `defaultMode` in `~/.config/ponytail/config.json`
3. `full`

`/ponytail lite|full|ultra|off` switches the level; the plugin writes it so it survives a session resume.

## Persistent memory

MiMo Code keeps project memory in `MEMORY.md` and per-task logs under `tasks/<id>/progress.md`. `/ponytail-debt` can write its shortcut ledger into project memory so deferred shortcuts are re-injected when a session resumes instead of rotting. Ask it to persist, and it appends the ledger under a `## Ponytail debt` heading.

## Subagents

MiMo Code runs `general` and `explore` subagents, and custom subagents you define. The plugin injects the ponytail ruleset into every turn, including subagent turns, so delegated work stays lazy. To scope that, use MiMo Code's `permission.task` to control which subagents a primary agent may spawn.

## Compose mode

MiMo Code's `compose` agent drives the `compose-next` skill (grill → spec → implement → verify → review → finish). Ponytail pairs with it: run in `full` or `ultra` so each implementation step takes the smallest complete change, and use `/ponytail-review` as the review step's second pair of eyes. Do not run ponytail and compose as competing prompts — keep ponytail as the ruleset and let compose own the phase sequence.

## Config

`mimocode.json` ships with the repo:

```json
{
  "$schema": "https://mimo.xiaomi.com/mimocode/config.json",
  "instructions": ["AGENTS.md"],
  "permission": {
    "skill": { "*": "allow", "ponytail": "allow", "ponytail-*": "allow" }
  }
}
```

To hide a specific skill, add a later matching rule, e.g. `"ponytail-audit": "deny"` — the last matching pattern wins.
