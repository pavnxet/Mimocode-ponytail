#!/bin/sh
set -e

DEST="$HOME/.codex/skills"

if [ ! -d "$DEST" ]; then
  mkdir -p "$DEST"
fi

echo "Installing ponytail skills to: $DEST"

for skill in skills/*/; do
  name=$(basename "$skill")
  echo "  -> $name"
  cp -r "$skill" "$DEST/"
done

echo "Done. Restart codex to use ponytail."
