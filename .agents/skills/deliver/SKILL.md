---
name: deliver
description: Carry a pull request from passed review to completion. Clears threads and checks, asks for merge authorization, then merges and completes or leaves a handoff. Use when a work's PR has passed review, or the person says to merge it.
disable-model-invocation: false
---

# Deliver

Take a PR whose review passed to a merged PR and a completed work. Read progress back from GitHub and Linear each time; a rerun is a retry.

Start with `harness read <issue>`. Its conditions and facts name what is missing. Work through them:

1. **Review threads.** Answer each unresolved thread and resolve it. A request outside the work's Acceptance becomes a new `needs-triage` work; reply with its link. A change to the code needs review again on the new head.
2. **Checks.** Fix failing checks and wait for pending ones. If GitHub reports a conflict with the target, merge the target into the PR branch and push; a merge that leaves the diff unchanged keeps the reviews.
3. **Basis changes.** `read` lists what changed since the review: the work definition or the `Basis:` files. Judge whether the change needs the difference reviewed, and do that before asking.
4. **Authorization.** Tell the person what will be merged (the PR, its head, the review results, anything changed above) and ask them to authorize the merge. Quote their words; never infer authorization from silence or from approval of something else.
5. **With it**, run `harness complete <issue> --merge --authorized-by "<their words>"`. **Without it**, write a handoff file (`stoppedAt`: waiting for merge authorization, and `next`), run `harness leave <issue> --handoff <file>`, and wait. When the person answers, rerun from step 1.

If `complete` refuses, its output names the condition: fix that, then run the same command again. If a person already merged the PR, `harness complete <issue>` records the completion. Do not merge by any other route.
