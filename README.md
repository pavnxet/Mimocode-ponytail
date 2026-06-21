<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.png">
    <img src="assets/logo.png" width="220" alt="Ponytail, the lazy senior dev">
  </picture>
</p>

<h1 align="center">Ponytail</h1>

<p align="center">
  <em>He says nothing. He writes one line. It works.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/pavnxet/Mimocode-ponytail?style=flat-square&color=111111&label=stars" alt="Stars">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT license">
</p>

<p align="center">
  <strong>80-94% less code &middot; 3-6&times; faster &middot; 47-77% cheaper</strong><br>
  <sub>Median of 10 runs across Haiku, Sonnet, and Opus. <a href="benchmarks/">Reproduce it yourself.</a></sub>
</p>

---

You know him. Long ponytail. Oval glasses. Has been at the company longer than the version control. You show him fifty lines; he looks at them, says nothing, and replaces them with one.

Ponytail puts him inside your AI agent.

## Before / after

You ask for a date picker. Your agent installs flatpickr, writes a wrapper component, adds a stylesheet, and starts a discussion about timezones.

With ponytail:

```html
<!-- ponytail: browser has one -->
<input type="date">
```

More survivors in [examples/](examples/).

## How it works

Before writing code, the agent stops at the first rung that holds:

```
1. Does this need to exist?   → no: skip it (YAGNI)
2. Stdlib does it?            → use it
3. Native platform feature?   → use it
4. Installed dependency?      → use it
5. One line?                  → one line
6. Only then: the minimum that works
```

Lazy, not negligent: trust-boundary validation, data-loss handling, security, and accessibility are never on the chopping block.

## Install

### System-wide (one-time)

Clone and run the install script:

```bash
git clone https://github.com/pavnxet/Mimocode-ponytail.git
cd Mimocode-ponytail
./install.sh    # Linux/Mac
install.bat     # Windows
```

This copies the skills to `~/.codex/skills/`. Works in any project after restart.

### Per-project (no install)

Clone this repo and run mimocode from within it:

```bash
git clone https://github.com/pavnxet/Mimocode-ponytail.git
cd Mimocode-ponytail
mimocode
```

mimocode automatically reads `AGENTS.md` and loads the ponytail skills from the `skills/` directory.

### How it works

1. **Always-on rules**: mimocode reads `AGENTS.md` at the repo root, which contains the lazy senior dev rules
2. **Skills on demand**: Use the `skill` tool to load ponytail skills:
   - `ponytail` - Lazy senior dev mode (default behavior)
   - `ponytail-review` - Review diffs for over-engineering
   - `ponytail-audit` - Audit entire repo for bloat
   - `ponytail-debt` - Track deferred shortcuts
   - `ponytail-gain` - Show the measured impact scoreboard
   - `ponytail-help` - Quick reference

### Configuration

Set the default intensity level with an environment variable:

```bash
export PONYTAIL_DEFAULT_MODE=full  # lite | full | ultra | off
```

Or create `~/.config/ponytail/config.json` (`%APPDATA%\ponytail\config.json` on Windows):

```json
{ "defaultMode": "full" }
```

## Commands

| Command | What it does |
|---------|--------------|
| `/ponytail [lite \| full \| ultra \| off]` | Set the intensity, or turn it off. No argument reports the current level. |
| `/ponytail-review` | Review the current diff for over-engineering, hands back a delete-list. |
| `/ponytail-audit` | Audit the whole repo for over-engineering, not just the diff. |
| `/ponytail-debt` | Harvest the `ponytail:` shortcuts you've deferred into a ledger, so "later" doesn't become "never". |
| `/ponytail-gain` | Show the measured impact scoreboard (less code, less cost, more speed) from the benchmark. |
| `/ponytail-help` | Quick reference for the commands above. |

## Intensity levels

| Level | What change |
|-------|------------|
| **lite** | Build what's asked, but name the lazier alternative in one line. User picks. |
| **full** | The ladder enforced. Stdlib and native first. Shortest diff, shortest explanation. Default. |
| **ultra** | YAGNI extremist. Deletion before addition. Ship the one-liner and challenge the rest of the requirement in the same breath. |

## Examples

```python
# Email validation
# ponytail: stdlib has this
import re
re.match(r'^[^@]+@[^@]+$', email) is not None

# Date input
# ponytail: browser has one
# <input type="date">

# Debounce
# ponytail: stdlib has functools.lru_cache for memoization
```

## Development

```bash
npm test
```

## FAQ

**Does it need a config file?**
No. An optional `~/.config/ponytail/config.json` or `PONYTAIL_DEFAULT_MODE` env var can set the default level, but nothing is required.

**What if I really need the 120-line cache class?**
You don't. Insist anyway and he'll build it. Slowly. Correctly. While looking at you.

**Does it scale?**
The code you never wrote scales infinitely. Zero bugs, zero CVEs, 100% uptime since forever.

**Why "ponytail"?**
You know exactly why.

## License

[MIT](LICENSE). The shortest license that works.

## Credits

Based on [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail).
