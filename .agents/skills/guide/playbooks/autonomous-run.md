---
id: autonomous-run
mode: Run my own tickets to done without stopping ("run until done", "work through these")
---

**Drive your own tickets, one at a time, to a predicate stated up front. No queue, no workers: that is Orchestra's job.**

1. With the user, state the exit predicate as facts (for example: these issues completed) and which writes they authorize for the run: push, PR, merge.
2. Take the next ticket whose blockers are done, in the order the user gave. Run it by its playbook, or `/implement` when no playbook fits.
3. After each ticket, read the predicate's facts again with `harness work read`.
4. A ticket that stops through Scope change or `harness work escalate` stays stopped. Report it and go on with the next independent ticket; never relax the predicate.
5. Stop when the predicate holds, or when every ticket left is stopped or blocked by a stopped one.

**Exit** when `harness work read` shows the predicate's facts, or shows every remaining ticket `ready-for-human`, `needs-triage` or blocked by one of those.

**Reply:** the predicate, each ticket with its PR and state, and what waits on whom.
