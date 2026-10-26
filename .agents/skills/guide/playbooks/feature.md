---
id: feature
mode: New or changed behaviour that a reviewed Spec describes
---

**Build a reviewed Spec. You choose the order; each method owns its own steps.**

1. `harness work read` on the Spec's issue. Without a passing `spec` review, or with the reviewed blob not yet on the feature branch, go back to Shape.
2. If `/to-spec` chose to implement the Spec directly, [Execute](../procedures/execute.md) the Spec's own issue as `/to-spec` says. Otherwise `/to-tickets`, in this context window while the grilling and Spec are still in it (no clear, compact or handoff since), else from the Spec. Then build its frontier with Execute per ticket, clearing context between tickets, or `/implement-spec` for the whole graph in one run.
3. A finding outside the Spec, a Spec that turns out wrong, or exhausted review rounds: go to Scope change.

**Exit** when the Spec's issue is in a completed Linear state; `harness work complete` completes it with the final merge.

**Reply:** one line with the Spec's issue, the PR or PRs and their merge state, and any intake opened along the way.
