---
name: guide
description: Which playbook or method fits the work. A selector over the Harness work modes; use it before a request that changes this repository or moves tracked work, or when unsure what comes next.
disable-model-invocation: false
---

# Guide

## What Harness is

Harness is an installed SWE system, separate from the repository you work in. It brings:
- **Methods**: skills that do one kind of engineering work, beside this guide in `../<name>/SKILL.md`.
- **Journeys**: playbooks in `playbooks/` that compose methods, CLI edges and procedures into one route to an exit.
- **The `harness` CLI**: the only writer of tracked work in Linear.

The repository supplies the code; Linear holds work state; GitHub holds code delivery. Harness connects them; it does not replace the repository's own conventions.

## Before any work

- **Repository not set up:** run `/setup` first. It configures the tracker, triage labels, doc layout and Harness policy everything here assumes. `/setup` is not a journey.
- **Invoke this guide** (`/harness:guide` in Claude Code, `$guide` in Codex) to choose a route, at the start or mid-task. Without a goal, use the current conversation.
- **Reassess** against the person's current goal and the recorded work facts. Keep existing decisions, constraints and permissions in force.

## Choosing a route

- Find the row in **Work modes** that fits, then open its playbook or load its method.
- Read the playbook or the method's `SKILL.md` before stating what it does or skipping a step. Rows are for choosing only.
- No row fits: see **No row fits**.

## Bound record before the first repository write

Nothing enforces this; you hold it.
- **What:** the reviewed acceptance criteria and context of the work, stored on its Linear issue by `harness work bind`.
- **Why:** code review, acceptance, session handoff and Linear tracking all check against it. A write before it has no reference and is invisible.
- **When:** in a journey, run [Prepare](procedures/prepare.md) before the first write to the repository.
- **Not writes:** reading code, proposing a change.
- **Not bound:** `/setup`; it is not a journey and needs no bound record.

## Tracked work goes through the CLI

- Every read and write of tracked work uses `harness`. `--issue` takes a UUID or an identifier such as `DANNY-319`.
- `harness work read --issue <id>` lists the open edges and why the others are closed.
- **On a refusal or error:** take the remedy it names (e.g. ask to run outside the sandbox on `CREDENTIAL_MISSING`).
- **Never** reach the same data another way, such as the Linear connector in place of a `harness` read.
- The CLI never chooses the mode; you do, from **Work modes**.

## Files

- **CLI input and review output** (records, batches, requests, verdicts, transcripts): write to `$TMPDIR` (else `/tmp`) at an absolute path. Never in the repository; Linear keeps what the CLI writes from them.
- **Repository content a method changes on purpose** (`GLOSSARY.md`, an ADR): commit on the work's branch.

## Running a playbook

- Copy its steps verbatim into your session todo list.
- A skipped step stays as `skip: <reason>`. The last step counts as much as the first.
- It ends only when its **Exit** fact holds **and** you have sent its **Reply** line, even if the last question was only whether anything is left.
- The list is for the human; durable progress lives in Linear and GitHub.

## Structure of journeys

- Journeys share five procedures in `procedures/`. **Work modes** never opens one directly.
  - [Prepare](procedures/prepare.md): makes a bound record.
  - [Break down](procedures/break-down.md): publishes a reviewed ticket graph under a parent.
  - [Execute](procedures/execute.md): runs one ticket's method under a claim.
  - [Deliver](procedures/deliver.md): takes the reviewed head to a merged PR.
  - [Stop](procedures/stop.md): leaves claimed work stopped.
- Each playbook step names one method, one CLI edge or one procedure.
- At a phase boundary (grilling, implementation, QA), choose how to carry context with [PHASE-BOUNDARIES.md](PHASE-BOUNDARIES.md).

## Methods

- Every method a playbook names ships with Harness.
- **Load** one when the person names it or asks for what it produces.
- **A playbook runs it after earlier steps** (Shape runs `/to-spec` after `/grill-with-docs`): asking for its output opens the playbook. "Get a proper Spec" is Shape, not `/to-spec`.
- **Fits but not asked:** propose it and wait.
- **Cannot load it yourself:** it is user-only, never missing. Ask the person to start it (`/name` in Claude Code, `$name` in Codex), then follow its `SKILL.md`.
- **Never** substitute a similar method from Harness or another plugin: `grilling` is not `grill-with-docs`.

## After Bug fix or Feature

- Worth looking back on (a recurring bug pattern, a build that went sideways): end the reply with one line suggesting `/retro` (`$retro` in Codex) and why.
- Otherwise say nothing about it. Retro is the person's call, never a step; nothing waits on it.
- No one in the session: put the suggestion in a closing comment on the PR or issue; the issue's state does not change.

## Work modes

| Work | Open |
| --- | --- |
| An idea to settle with the human in one session, including a design question that needs a runnable answer | [Shape](playbooks/shape.md) |
| Work still too unclear to settle in one session. Distinct from Shape: needs a map of decisions across sessions; never for a well-scoped feature | [Wayfinder](playbooks/wayfinder.md) |
| New or changed behaviour that a reviewed Spec describes, built through tickets or, with no tickets, directly on the Spec's own issue ("no tickets" skips only the breakdown, never the Spec's issue) | [Feature](playbooks/feature.md) |
| A small change one ticket holds, with no Spec ("just fix this line", "rename this flag"). Distinct from Feature: no Spec. It still becomes an issue with a bound record first | [Small change](playbooks/small-change.md) |
| Something broken, throwing, failing or slow | [Bug fix](playbooks/bug-fix.md) |
| Check an installed candidate against journeys a person wrote. Distinct from Bug fix and `/code-review`: no change is made | [Acceptance](playbooks/acceptance.md) |
| A behaviour-preserving change to structure, or upkeep that deepens modules | [Refactoring](playbooks/refactoring.md) |
| A throwaway program to answer one design question. Distinct from Shape: no idea is being shaped around it; inside one, Shape runs the prototype | `/prototype` |
| Raw issues you did not create: bug reports, incoming requests. Distinct from Bug fix: triage decides whether and how an issue is worked; Bug fix works one now. Never the tickets `/to-tickets` produced | [Triage](playbooks/triage.md) |
| Mid-work, the task no longer fits its record or Spec | [Scope change](playbooks/scope-change.md) |
| A ticket's open PR in this session's hands: answer review comments, get it green, merge it ("babysit", "ship it"). Distinct from Session pickup: no other session's work to take over | [Small change](playbooks/small-change.md) |
| Run my own tickets to done without stopping | [Autonomous run](playbooks/autonomous-run.md) |
| Resume or take over work another session started | [Session pickup](playbooks/session-pickup.md) |
| Stop in-flight work cleanly so another session can resume it | [Pause](playbooks/pause.md) |

## No row fits

Design the walk yourself. Name the exit as a fact the CLI, Linear or `gh` can show, compose the methods that reach it in order, bound every loop, and copy those steps into your todo list as you would a playbook's. Say in your reply that no row fitted and why.
