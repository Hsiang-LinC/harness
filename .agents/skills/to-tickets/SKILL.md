---
name: to-tickets
description: Break a plan, spec, or the current conversation into a set of tracer-bullet tickets, each declaring its blocking edges, published to the configured tracker (edges as text in one file per ticket locally, or native blocking links on a real tracker). Use when the user asks to split work into tickets, or once the user agrees it needs a breakdown.
disable-model-invocation: false
---

# To Tickets

Break a plan, spec, or conversation into a set of **tickets**: tracer-bullet vertical slices, each declaring the tickets that **block** it.

The issue tracker and triage label vocabulary should have been provided to you. If not, tell the user to run `/setup`.

## Process

### 1. Gather context

Work from whatever is already in the conversation context. If the user passes a reference (a spec path, an issue number or URL) as an argument, fetch it and read its full body and comments.

### 2. Explore the codebase (optional)

If you have not already explored the codebase, do so to understand the current state of the code. Ticket titles and descriptions should use the project's domain glossary vocabulary, and respect ADRs in the area you're touching.

Look for opportunities to prefactor the code to make the implementation easier. "Make the change easy, then make the easy change."

### 3. Draft vertical slices

Break the work into **tracer bullet** tickets.

<vertical-slice-rules>

- Each slice cuts a narrow but COMPLETE path through every layer (schema, API, UI, tests): vertical, NOT a horizontal slice of one layer
- A completed slice is demoable or verifiable on its own
- Each slice is sized to fit in a single fresh context window
- Any prefactoring should be done first

</vertical-slice-rules>

Give each ticket its **blocking edges**: the other tickets that must complete before it can start. A ticket with no blockers can start immediately.

**Wide refactors are the exception to vertical slicing.** A **wide refactor** is one mechanical change (rename a column, retype a shared symbol) whose **blast radius** fans across the whole codebase, so a single edit breaks thousands of call sites at once and no vertical slice can land green. Don't force it into a tracer bullet; sequence it as **expand–contract**. First expand: add the new form beside the old so nothing breaks. Then migrate the call sites over in batches sized by blast radius (per package, per directory), each batch its own ticket blocked by the expand, keeping CI green batch to batch because the old form still exists. Finally contract: delete the old form once no caller remains, in a ticket blocked by every migrate batch. When even the batches can't stay green alone, keep the sequence but let them share an integration branch that all block a final integrate-and-verify ticket; green is promised only there.

### 4. Review the breakdown independently

Write the breakdown as a batch file in the batch format the caller passes you, which the CLI owns: each ticket a record candidate, its blocking edges in `edges`. Give a fresh subagent the [breakdown review prompt](breakdown-review.md), the batch and its source. It answers the questions the user would have been asked (granularity, blocking edges, merge or split) and returns `pass` or `fail`. Fix its findings and review again with a new subagent, at most three rounds; a `fail` after the third, or a question the recorded intent cannot answer, goes to the user. Never review your own breakdown: if no fresh subagent is available, say so and stop.

Return the batch, the final verdict and the final report body. Recording the review and publishing the batch are the caller's; publishing reads every write back, so the caller reruns the same batch after an interruption.

After a Spec revision, republish: decide every open child as `restamp` (unchanged), `rewrite` or `withdraw`, add new work as `create`, review the new batch, then return it. A child whose Spec or parent changed cannot be claimed until then.

Work the **frontier**: any ticket whose blockers are all done. For a purely linear chain that means top to bottom.

Do NOT close or modify any parent issue.

In the summary and acceptance criteria, avoid specific file paths or code snippets (they belong in `authoritativeContext`): they go stale fast. Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline it and note briefly that it came from a prototype. Trim to the decision-rich parts, not a working demo, just the important bits.
