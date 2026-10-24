---
name: implement-spec
description: "Implement the result of /to-spec and /to-tickets in code."
disable-model-invocation: false
---

You have been provided a spec. This spec should have tickets associated with it, describing how to implement the spec.

The issue tracker should have been provided to you. If not, tell the user to run `/setup`. Run this only in an interactive session with the user; the pushes, pull requests and merges the implementer subagents make each need the user's authorization.

The goal is the entire spec delivered: every ticket merged into a single **integration branch** through Harness, and the final ticket delivering that branch, which completes the Spec's issue.

The tickets are not a list of steps. They are a **task graph** with blocking relationships between them. This means there is always a **frontier** of tickets which are ready to be grabbed.

Communication to and from subagents should be sparse. Communicate primarily through **context pointers**: to the spec, tickets, research notes, and previous commits. Don't duplicate information already available via pointers.

**Implementer subagents** should be run in the background where possible for maximum concurrency.

## Steps

1. Read the spec and tickets to understand the task graph.

2. (optional) Use an **exploration subagent** to conduct any exploration required by the tickets - relevant codebase files or external documentation. Ensure the exploration subagent can save files - it should save its markdown notes in a directory outside the repo, accessible by all future subagents. This lets **implementer subagents** focus on implementation rather than exploration.

3. The integration branch is the Spec's feature branch, recorded by `harness spec track`; do not create another. Each ticket's `harness ticket read` names its branch and base: internal tickets merge into the feature branch, and the one final ticket delivers it to the final target.

4. Use **implementer subagents** to implement each ticket on the frontier. Give each subagent only its ticket's issue UUID and tell it to call the Skill tool with `implement`; it runs every step itself, from `harness work claim` through its own worktree, `tdd`, the pull request, `code-review` and `harness work merge` or `harness work complete`. Get the user's authorization for those pushes, pull requests and merges before dispatching, and pass it on; a subagent that still needs a person, such as on `PERMISSION_MISSING`, escalates and releases as `implement` says instead of waiting.

5. Once an **implementer subagent** reports, run `harness ticket read` on its ticket. The ticket is done only in a completed state. One stopped at its pull request waits for the person it escalated to; once `pull.merged` is true, run `harness work complete --issue <uuid>` on it yourself.

6. If this changes the **frontier** of available tickets, kick off more **implementer subagents** to work on the new tickets. This allows for maximum concurrency.

7. The final ticket's `code-review` covers the whole feature branch against the final target, and its `harness work complete` also completes the Spec's issue. Report the final pull request and the Spec issue's state.

8. Clean up the worktrees the **implementer subagents** created.
