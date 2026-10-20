# Install

Ponytail for MiMo Code is an always-on rule file, six skills and six slash commands. Two ways to install.

## Per project (no install)

Clone this repo and run MiMo Code from inside it:

```bash
git clone https://github.com/pavnxet/Mimocode-ponytail.git
cd Mimocode-ponytail
mimo
```

MiMo Code reads `AGENTS.md` as instructions, discovers the skills in
`.mimocode/skills/`, registers the commands from `.mimocode/commands/`, and
applies `mimocode.json`.

## System-wide (one-time)

```bash
git clone https://github.com/pavnxet/Mimocode-ponytail.git
cd Mimocode-ponytail
./install.sh     # Linux / macOS
install.bat      # Windows
```

This copies the skills to `~/.config/mimocode/skills/` and the commands to
`~/.config/mimocode/commands/`. Restart MiMo Code to pick them up.

## What gets installed where

| Piece | Project path | Global path |
|-------|--------------|-------------|
| Rules | `AGENTS.md` | `~/.config/mimocode/AGENTS.md` (copy it yourself) |
| Skills | `.mimocode/skills/` | `~/.config/mimocode/skills/` |
| Commands | `.mimocode/commands/` | `~/.config/mimocode/commands/` |

MiMo Code also reads skills from the `.claude`, `.agents`, `.codex` and
`.opencode` compatibility directories, so an existing skills setup keeps working.

## Verify

In a MiMo Code session, type `/` and confirm the six commands appear, or ask it
to list available skills — `ponytail`, `ponytail-review`, `ponytail-audit`,
`ponytail-debt`, `ponytail-gain`, `ponytail-help`.

## Uninstall

Remove the copied files:

```bash
rm -rf ~/.config/mimocode/skills/ponytail*
rm -f  ~/.config/mimocode/commands/ponytail*.md
rm -f  ~/.config/ponytail/.mimocode-mode
```

The plugin and level state live under `~/.config/ponytail/`; deleting
`.mimocode-mode` resets the level to the default.
