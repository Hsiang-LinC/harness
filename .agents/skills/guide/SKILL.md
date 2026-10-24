---
name: guide
description: Which playbook or method fits the work. A selector over the Harness work modes; use it before a request that changes this repository or moves tracked work, or when unsure what comes next.
disable-model-invocation: false
---

# Guide

Invoke `/harness:guide` in Claude Code or `$guide` in Codex whenever you want to choose the next route, including mid-task. Give it a goal, or invoke it alone to use the current conversation. Reassess the route against the person's current goal and the recorded work facts; keep existing decisions, constraints and permissions in force.

Find the row that fits the work, then open its playbook, or load its method, and follow that. Read the playbook or the method's SKILL.md before stating what it does or skipping a step of it: the rows here are for choosing only.

- Work on an issue goes through the `harness` CLI, the only writer of tracked work. `--issue` takes the issue's UUID or the identifier a person names, such as `DANNY-319`. `harness work read --issue <id>` lists which edges are open on an issue now and why the others are not; every refusal names what resolves it. The CLI never chooses the mode; you do, from this table.
- On a CLI error, take the remedy the error names, such as asking to run outside the sandbox on `CREDENTIAL_MISSING`. Never reach the same data another way, such as the Linear connector in place of a `harness` read.
- Files you write only as CLI input or review output (records, batches, requests, verdicts, transcripts) go in the OS temp directory (`$TMPDIR`, falling back to `/tmp`), at an absolute path your later `harness` calls can read, never in the repository. They are scratch: Linear holds what the CLI writes from them. Repository content a method changes on purpose, such as `GLOSSARY.md` or an ADR, is committed on the work's branch.
- Once a playbook is chosen, copy its steps verbatim into your session todo list. A step you skip stays in the list as `skip: <reason>`. The last step counts as much as the first. A playbook ends only when its **Exit** fact holds and you have sent its **Reply** line: the reply is part of the exit, even when the user's last question was only whether anything is left. The list is for the human to read; durable progress lives in Linear and GitHub.
- Load a method when the user names it or asks for what it produces. When a playbook runs that method only after earlier steps, as Shape runs `/to-spec` after `/grill-with-docs`, asking for what it produces opens the playbook, not the method: "get a proper Spec" is Shape, not `/to-spec`. When one fits but the user has not asked, propose it and wait. Every method a playbook names ships with Harness, beside this guide in `../<name>/SKILL.md`. One you cannot load yourself is user-only, never missing: ask the user to start it, `/name` in Claude Code or `$name` in Codex, and once they have, follow that `SKILL.md`. Never load a similar method in its place, whether it ships with Harness or another plugin: `grilling` is not `grill-with-docs`.
- After Bug fix or Feature, when the work is worth looking back on (a bug pattern that could recur, a build that went sideways), end the reply with one line suggesting `/retro` (`$retro` in Codex) and why. Otherwise say nothing about it: retro is the person's call, never a step, and nothing waits on it. With no one in the session, the suggestion is a closing comment on the PR or the issue, and the issue's state does not change.
- Before the first engineering flow in a repository, `/setup` configures the tracker, triage labels, doc layout and Harness policy everything here assumes.
- At a boundary between phases of work (grilling, implementation, QA), choose how to carry context with [PHASE-BOUNDARIES.md](PHASE-BOUNDARIES.md).

## Work modes

| Work | Open |
| --- | --- |
| An idea to settle with the human in one session, including a design question that needs a runnable answer | [Shape](playbooks/shape.md) |
| Work still too unclear to settle in one session. Distinct from Shape: needs a map of decisions across sessions; never for a well-scoped feature | [Wayfinder](playbooks/wayfinder.md) |
| New or changed behaviour that a reviewed Spec describes, built through tickets or, with no tickets, directly on the Spec's own issue ("no tickets" skips only the breakdown, never the Spec's issue) | [Feature](playbooks/feature.md) |
| A small change one ticket holds, with no Spec ("just fix this line", "rename this flag"). Distinct from Feature: no Spec. It still becomes an issue with a bound record first | `/implement` |
| Something broken, throwing, failing or slow | [Bug fix](playbooks/bug-fix.md) |
| Check an installed candidate against journeys a person wrote. Distinct from Bug fix and `/code-review`: no change is made | `/acceptance` |
| A behaviour-preserving change to structure, or upkeep that deepens modules | [Refactoring](playbooks/refactoring.md) |
| A throwaway program to answer one design question. Distinct from Shape: no idea is being shaped around it; inside one, Shape runs the prototype | `/prototype` |
| Raw issues you did not create: bug reports, incoming requests. Distinct from Bug fix: triage decides whether and how an issue is worked; Bug fix works one now. Never the tickets `/to-tickets` produced | `/triage` |
| Mid-work, the task no longer fits its record or Spec | [Scope change](playbooks/scope-change.md) |
| A ticket's open PR in this session's hands: answer review comments, get it green, merge it ("babysit", "ship it"). Distinct from Session pickup: no other session's work to take over | `/implement` |
| Run my own tickets to done without stopping | [Autonomous run](playbooks/autonomous-run.md) |
| Resume or take over work another session started | [Session pickup](playbooks/session-pickup.md) |
| Stop in-flight work cleanly so another session can resume it | [Pause](playbooks/pause.md) |

## No row fits

Design the walk yourself. Name the exit as a fact the CLI, Linear or `gh` can show, compose the methods that reach it in order, bound every loop, and copy those steps into your todo list as you would a playbook's. Say in your reply that no row fitted and why.
