---
id: deliver
mode: Procedure, called by Execute and never selected by the guide. Take a reviewed head on a claimed ticket to a merged PR and completion
---

**The method reviewed the head; Deliver publishes it. Every step reads its progress back from GitHub and Linear.**

1. Push `branch`. With `pull` null, `gh pr create` from `branch` into `base`, the body from `/pr`; a `bug` body has `## Root cause` and `## Regression test`.
2. Post the method's report as a PR review, `harness ticket read --issue <uuid>` again for `candidate`, then `harness review record --issue <uuid> --review code --candidate <candidate> --verdict <verdict> --report-url <review URL> --claim <token>`. Skip when `code.current` is already passing. A `fail` the method could not repair goes to [Stop](stop.md).
3. If `base` moved past the reviewed head, merge it into `branch` and return to Execute step 5.
4. Resolve what `harness work read` lists unmet for `merge`: answer and resolve each review thread (a finding outside the record becomes `harness issue intake`, linked from the reply), and each other condition through the edge it names.
5. Integration target: `harness work merge --issue <uuid> --claim <token> --allow integration`. Default branch: `--allow default-branch` only if the person asked to merge in this session; otherwise [Stop](stop.md) with `human-needed` and `merge <PR URL>`. Once `pull.merged`, `harness work complete --issue <uuid>`, which needs no claim and is idempotent.
6. On `Completed`, remove a worktree Execute added only if the PR is merged, it holds the delivered head and `git status --porcelain --untracked-files=all --ignored=matching` is empty: `git worktree remove <path>` from the retained checkout. Never force or retry it.

**Exit** when `work merge` or `work complete` returns `Completed`, or Stop's exit holds.

**Reply:** the PR and its merge state; for a bug, the result's `rootCause` and `regressionTest`, a null one reported as missing evidence. Report any tree not removed, with `git worktree list`, `git worktree remove <path>` and `git worktree prune` as the hint.
