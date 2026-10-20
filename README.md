<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.png">
    <img src="assets/logo.png" width="220" alt="Ponytail, the lazy senior dev">
  </picture>
</p>

<h1 align="center">Ponytail for MiMo Code</h1>

<p align="center">
  <em>He says nothing. He writes one line. It works.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/pavnxet/Mimocode-ponytail?style=flat-square&color=111111&label=stars" alt="Stars">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT license">
  <img src="https://img.shields.io/badge/works%20with-MiMo%20Code-111111?style=flat-square" alt="Works with MiMo Code">
</p>

<p align="center">
  <strong>-53% code &middot; -41% time &middot; -26% cost &middot; -45% tokens</strong><br>
  <sub>Ponytail 5's published agentic benchmark: 39 tasks, Opus 5.5, 5 runs each, against the same agent without the skill. <a href="benchmarks/">Reproduce it yourself.</a></sub>
</p>

---

You know him. Long ponytail. Oval glasses. Has been at the company longer than the version control. You show him fifty lines; he looks at them, says nothing, and replaces them with one.

Ponytail puts him inside your AI agent — here, inside [MiMo Code](https://mimo.xiaomi.com/mimocode).

## Before / after

You ask for a date picker. Your agent installs a library, writes a wrapper component, adds a stylesheet, and starts a discussion about timezones.

With ponytail:

```html
<!-- ponytail: browser has one -->
<input type="date">
```

More survivors in [examples/](examples/).

## How it works

The ladder runs *after* it understands the problem, not instead of it. Before writing code, the agent stops at the first rung that holds:

```
1. Does this need to exist?         → no: skip it (YAGNI)
2. Already in this codebase?        → use the helper, component or pattern that's there
3. Stdlib or native platform?       → use it
4. Installed dependency?            → use it
5. One line a reader gets?          → one line
6. Only then: the minimum that works
```

Lazy, not negligent: trust-boundary validation, data-loss handling, security, accessibility, and the calibration real hardware needs are never on the chopping block. Logic with a branch, a loop, a parser, money or security leaves one small test behind.

## Install

Ponytail for MiMo Code is a set of skills, six slash commands, and an always-on rule file.

### Per project (no install)

Clone this repo and run MiMo Code from within it:

```bash
git clone https://github.com/pavnxet/Mimocode-ponytail.git
cd Mimocode-ponytail
mimo
```

MiMo Code reads `AGENTS.md` as always-on instructions, discovers the six skills in `.mimocode/skills/`, and registers the six commands from `.mimocode/commands/`.

### System-wide (one-time)

```bash
git clone https://github.com/pavnxet/Mimocode-ponytail.git
cd Mimocode-ponytail
./install.sh    # Linux / macOS
install.bat     # Windows
```

This copies the skills to `~/.config/mimocode/skills/` and the commands to `~/.config/mimocode/commands/`. Works in any project after a restart.

## How MiMo Code loads it

| Piece | Path | What MiMo Code does |
|-------|------|---------------------|
| Always-on rules | `AGENTS.md` (+ `mimocode.json` `instructions`) | Injected into the session |
| Skills | `.mimocode/skills/**/SKILL.md` | Listed in the `skill` tool, loaded on demand |
| Commands | `.mimocode/commands/*.md` | Slash commands in the TUI |
| Config | `mimocode.json` | Allows the `ponytail*` skills |

`skills/` at the repo root is the canonical source; `.mimocode/skills/` is generated from it by `node scripts/build-mimocode-skills.js` so MiMo Code finds it with zero setup. `scripts/check-rule-copies.js` fails CI if the two drift.

## Commands

| Command | What it does |
|---------|--------------|
| `/ponytail [lite \| full \| ultra \| off]` | Set the intensity, or turn it off. No argument keeps the current level. |
| `/ponytail-review` | Quality review of the current change: bugs, security, load, missing tests, speed, then what to cut. Name a target in plain words (`uncommitted`, `staged`, `branch`, a PR link) to narrow or widen it. |
| `/ponytail-audit` | The same review for the whole repo, ranked, most important first. |
| `/ponytail-debt` | Harvest the `shortcut:` comments you've deferred into a ledger, so "later" doesn't become "never". |
| `/ponytail-gain` | The measured impact scoreboard (less code, less cost, more speed) from the benchmark. |
| `/ponytail-help` | Quick reference for the commands above. |

## Intensity levels

| Level | What changes |
|-------|--------------|
| **lite** | Build what's asked, but name the lazier alternative in one line. User picks. |
| **full** | The ladder enforced. Stdlib and native first. Shortest diff, shortest explanation. Default. |
| **ultra** | YAGNI extremist. Deletion before addition. Ship the one-liner and challenge the rest of the requirement in the same breath. |

## Configuration

Set the default intensity with an environment variable:

```bash
export PONYTAIL_DEFAULT_MODE=full   # lite | full | ultra | off
```

Or a config file at `~/.config/ponytail/config.json` (`%APPDATA%\ponytail\config.json` on Windows):

```json
{ "defaultMode": "full" }
```

Resolution order: environment variable, then config file, then `full`.

## Examples

```python
# Email validation
# ponytail: stdlib has this
import re
re.match(r'^[^@]+@[^@]+$', email) is not None

# Date input
# ponytail: browser has one
# <input type="date">

# Memoization
# ponytail: stdlib has functools.lru_cache
```

## Development

```bash
node scripts/build-mimocode-skills.js   # regenerate .mimocode/skills/ from skills/
node scripts/check-rule-copies.js       # verify frontmatter + copies
npm test                                # run the test suite
```

## FAQ

**Does it need a config file?**
No. `mimocode.json` ships only to allow the `ponytail*` skills; an optional `~/.config/ponytail/config.json` or `PONYTAIL_DEFAULT_MODE` sets the default level.

**What if I really need the 120-line cache class?**
You don't. Insist anyway and he'll build it. Slowly. Correctly. While looking at you.

**Does it scale?**
The code you never wrote scales infinitely. Zero bugs, zero CVEs, 100% uptime since forever.

**Why "ponytail"?**
You know exactly why.

## License

[MIT](LICENSE). The shortest license that works.

## Credits

Based on [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail), adapted for [MiMo Code](https://github.com/XiaomiMiMo/MiMo-Code).
