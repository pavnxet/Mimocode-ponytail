# Ponytail Debt — Shortcut Ledger

Every deliberate ponytail shortcut is marked with a `ponytail:` comment naming its ceiling and upgrade path. This collects them into one ledger.

## Scan

Grep the repo for comment markers, skipping `node_modules`, `.git`, and build output:

```
grep -rnE '(#|//) ?ponytail:' .
```

## Output

One row per marker, grouped by file:

`<file>:<line> — <what was simplified>. ceiling: <the limit named>. upgrade: <the trigger to revisit>.`

Pull the ceiling and trigger straight from the comment. Optional: add `git blame -L<line>,<line>` for owner.

Flag `no-trigger` for markers that name no upgrade path — those silently rot.

End with `<N> markers, <M> with no trigger.`
Nothing found: `No ponytail: debt. Clean ledger.`

## Boundaries

Reads and reports only, changes nothing. One-shot.
