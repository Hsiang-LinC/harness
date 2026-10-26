---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: false
---

Implement the work described by the user in the spec or tickets.

If the user passes a ticket reference, fetch it from the issue tracker and state its title before starting. If the reference is ambiguous, ask.

When a caller passes a ticket's record, its acceptance source, a branch and its base, work on that branch: the record and the files its `authoritativeContext` names are the whole brief.

Call the Skill tool with "tdd" where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Commit your work to the current branch.

Once done, call the Skill tool with "code-review" against the base, the acceptance source being the spec. At most three rounds, each with fresh subagents; on `fail`, fix, commit and review again. A `fail` after the third round, or a finding only a person can decide, goes back to the caller.

Return the head you reviewed, the final verdict and the final report body. Posting the report and recording the verdict are the caller's.
