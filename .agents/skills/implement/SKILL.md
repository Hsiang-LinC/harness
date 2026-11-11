---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: false
---

Implement the work described by the user in the spec or tickets.

If the user passes a ticket reference, run `harness claim <issue>` and state its title before starting. If the reference is ambiguous, ask.

Call the Skill tool with "tdd" where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

If the Spec or the Acceptance turns out to be unclear or wrong, do not change it without the person's agreement: stop, save what is open with `harness leave <issue> --handoff <file>`, and ask.

Commit your work to the current branch.

For a tracked work, open the PR with the `pr` skill first (body says `Delivers: <issue>`), because a code review report is saved on the PR.

Once done, call the Skill tool with "code-review" to review the work. On `fail`, fix, commit and review again. At most three rounds; when the third does not pass, stop and ask the person. Whoever arranged each review saves its reports with `harness review save`.
