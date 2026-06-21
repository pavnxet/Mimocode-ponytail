# Ponytail Audit — Whole-Repo Over-Engineering Audit

Like ponytail-review, but scans the entire codebase instead of a diff.

## Tags

Same as review: `delete:`, `stdlib:`, `native:`, `yagni:`, `shrink:`.

## What to hunt

- Deps the stdlib or platform already ships
- Single-implementation interfaces
- Factories with one product
- Wrappers that only delegate
- Files exporting one thing
- Dead flags and config
- Hand-rolled stdlib

## Output

One line per finding, ranked biggest cut first:
`<tag> <what to cut>. <replacement>. [path]`

End with `net: -<N> lines, -<M> deps possible.`
Nothing to cut: `Lean already. Ship.`

## Boundaries

Complexity only. Correctness bugs, security holes, and performance go to a normal review pass. Lists findings, applies nothing. One-shot.
