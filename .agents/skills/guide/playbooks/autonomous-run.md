---
id: autonomous-run
mode: Run my own tickets to done without stopping: a list I name, or one Spec's ticket graph ("run until done", "work through these", "implement this spec")
---

**Drive tickets to a predicate stated up front, each through Execute. Parallel subagents inside this session are not Orchestra: no daemon, no queue, and the person stays present.**

1. Only in an interactive session. With the user, state the scope (a list they name, or one Spec's graph: the children of its issue), the exit predicate as facts (these issues completed; for a Spec, its issue completed), and which writes they authorize for the run: push, PR, merge.
2. Choose the order: one ticket at a time in the order given, or in parallel by frontier (every ticket whose blockers are done) when the user asks or `/implement-spec` started the run. A Spec's tickets merge into its feature branch, the one `spec track` recorded, never a new one; the single final ticket delivers that branch, its review covers the whole branch, and its completion completes the Spec's issue.
3. Run each ticket by its playbook, or Small change when none fits. In parallel, run implementer subagents in the background, each given only its issue UUID and the user's authorization, and told to run [Execute](../procedures/execute.md). Talk to subagents through context pointers (the Spec, the tickets, notes an optional exploration subagent saves outside the repository), never copies.
4. When a ticket reports, read the predicate's facts with `harness work read`: a ticket is done only in a completed state. One stopped at its PR for a merge waits for its person; once its PR is merged, Execute completes it. A changed frontier starts the next tickets.
5. A ticket that stops through Scope change or [Stop](../procedures/stop.md) stays stopped. Report it and go on with the next independent ticket; never relax the predicate.
6. Stop when the predicate holds, or when every ticket left is stopped or blocked by a stopped one. Clean up the worktrees the subagents added, as [Execute](../procedures/execute.md) does.

**Exit** when `harness work read` shows the predicate's facts, or shows every remaining ticket `ready-for-human`, `needs-triage` or blocked by one of those.

**Reply:** the predicate, each ticket with its PR and state, and what waits on whom; for a Spec, the final PR and the Spec issue's state.
