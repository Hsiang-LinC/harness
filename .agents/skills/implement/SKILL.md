---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: false
---

Implement the work described by the user in the spec or tickets.

If the user passes a ticket reference, run `harness claim <issue>` and state its title before starting. If the reference is ambiguous, ask.

Call the Skill tool with "tdd" where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Commit your work to the current branch.

Once done, call the Skill tool with "code-review" to review the work, at most three rounds. On `fail`, fix, commit and review again. Whoever arranged each review saves its reports with `harness review save`.
