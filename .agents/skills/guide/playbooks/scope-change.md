---
id: scope-change
mode: Mid-work, the task turns out not to fit its record or Spec, from any playbook
---

**Make the misfit a fact on an existing edge before you go on. Never widen the work to fit it.**

1. `harness work read` on the issue in hand: its record, review and claim.
2. Tell the case apart, by the first that fits:
   1. Extra work, while the record is still right: `harness issue intake` a new issue with its default role, link it from the PR or the issue, and carry on with the current work.
   2. The record's contract is wrong: a fresh subagent judges the record; record its failing verdict yourself, under your claim, with `harness review record --review record` on the bound `contextDigest` from `work read`, then `harness work release`. Review first: releasing first leaves the ticket ready for another worker.
   3. A decision only a person can make, including the user saying the call belongs to someone else ("a product call for Mei, leave it for her"), in any state, even work already released or `ready-for-human` for another reason, since escalations accumulate: commits the person needs to read go to the branch `ticket read` names, pushed as `/implement` does; then `harness work escalate --reason judgment` with the decision and its pointers, naming where the commits are, then `harness work release` if you hold the claim. Saying the decision is someone else's without the escalate leaves the issue `ready-for-agent` for the next worker.
3. In cases 2 and 3, stop work on this issue. Its next step comes from `work read` once a person or triage has acted.

**Exit** on the fact the case produced:

- Case 1: `harness work read` on the new issue shows it with `needs-triage`.
- Case 2: `harness work read` shows the issue with `needs-triage` and no live claim.
- Case 3: `harness work read` shows `ready-for-human` and no live claim.

**Reply:** one line naming the case, the issue it touched or created, and what now waits on whom.
