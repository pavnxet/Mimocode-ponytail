#!/bin/sh
set -e

# Find mimocode skills directory
if [ -n "$XDG_DATA_HOME" ]; then
  DEST="$XDG_DATA_HOME/mimocode/compose/0.1.0/skills"
elif [ "$(uname)" = "Darwin" ]; then
  DEST="$HOME/Library/Application Support/mimocode/compose/0.1.0/skills"
elif [ -n "$APPDATA" ]; then
  DEST="$APPDATA/mimocode/compose/0.1.0/skills"
else
  DEST="$HOME/.local/share/mimocode/compose/0.1.0/skills"
fi

echo "Installing ponytail skills to: $DEST"
mkdir -p "$DEST"

for skill in skills/*/; do
  name=$(basename "$skill")
  echo "  → $name"
  cp -r "$skill" "$DEST/"
done

echo "Done. Restart mimocode to use ponytail."
