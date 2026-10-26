---
id: execute
mode: Procedure, called by journeys and never selected by the guide. Run one bound ticket's method under a claim and end it on the result; the only claimable and delegable unit
---

**Whoever runs Execute holds the claim. It is the same for every `entryMethod`; after an interruption, restart at step 1.**

1. `harness work read --issue <uuid>`. Completed: a ticket with a PR goes to [Deliver](deliver.md)'s last step; any other replies with its resolution. `ready-for-human`, on the person's go-ahead: `harness work resume --issue <uuid> --file <answers>`, answering each open escalation in their words.
2. `harness ticket read --issue <uuid>`. A refused `admission`: report its code and stop. A merged `pull`: `harness work complete --issue <uuid>`, then [Deliver](deliver.md)'s last step.
3. `harness work claim --issue <uuid> --owner <host>:<identifier>`; rerun it to renew before a write more than 30 minutes after the last. On `CLAIM_HELD`, report the holder and stop.
4. A method that changes the repository works on the `branch` `ticket read` names (from `base` if absent) in its own tree: a worktree already holding it (`git worktree list`), a runtime-isolated checkout, or `git worktree add` when this checkout may be shared, keeping its path and a checkout outside it.
5. Unless a method with a head has `code.current` passing (then go to Deliver), run the record's `entryMethod`, passing the record, its acceptance source (the Spec when `acceptanceSource` is `spec`), and `branch` and `base` when step 4 applies.
6. A result with a head goes to [Deliver](deliver.md). A result without one, from a method that delivers no change, carries its verdict, report URL and findings:
   1. File each finding not yet filed: `harness issue intake --issue <its UUID from the report> --file <request>`, default role.
   2. `PASS`: `harness work resolve --issue <uuid> --file <resolution> --claim <token>`, the resolution `{"resolution": "<verdict, candidate, report URL>"}`.
   3. Otherwise [Stop](stop.md) with `judgment`, the decision `<verdict> for <candidate>: accept or reject`, and the report URL and each finding's URL as pointers.

Stopping claimed work is [Stop](stop.md); a refusal before the claim only reports. A request to implement authorizes these steps as written and nothing beyond them. To delegate, give a subagent the issue UUID and this procedure.

**Exit** on `Completed` from Deliver or `work resolve`, or Stop's exit.

**Reply:** Deliver's reply, or the verdict, the candidate, the report URL and each finding filed.
