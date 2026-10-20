#!/bin/sh
set -e

SKILL_DEST="$HOME/.config/mimocode/skills"
CMD_DEST="$HOME/.config/mimocode/commands"

mkdir -p "$SKILL_DEST" "$CMD_DEST"

echo "Installing ponytail skills to: $SKILL_DEST"
for skill in skills/*/; do
  name=$(basename "$skill")
  echo "  -> $name"
  cp -r "$skill" "$SKILL_DEST/"
done

echo "Installing ponytail commands to: $CMD_DEST"
cp .mimocode/commands/*.md "$CMD_DEST/"

echo "Done. Restart MiMo Code to use ponytail."
