---
id: feature
mode: New or changed behaviour that a reviewed Spec describes
---

**Build a reviewed Spec. You choose the order; each method owns its own steps.**

1. `harness work read` on the Spec's issue. Without a passing `spec` review, or with the reviewed blob not yet on the feature branch, go back to Shape.
2. A Spec reviewed with a record is built directly: `harness work bind` the Spec's own issue with that record (`source: {kind: "spec", path, branch, blob}`), then [Execute](../procedures/execute.md) it. Otherwise [Break down](../procedures/break-down.md) the Spec's issue, in this context window while the grilling and Spec are still in it (no clear, compact or handoff since), else from the Spec. Then build its frontier with Execute per ticket, clearing context between tickets, or `/implement-spec` for the whole graph in one run.
3. A Spec that turns out wrong: revise it through Shape's Spec step, then Break down again, which rewrites, re-stamps or withdraws each open ticket. A finding outside the Spec, or exhausted review rounds: go to Scope change.

**Exit** when the Spec's issue is in a completed Linear state; `harness work complete` completes it with the final merge.

**Reply:** one line with the Spec's issue, the PR or PRs and their merge state, and any intake opened along the way.
