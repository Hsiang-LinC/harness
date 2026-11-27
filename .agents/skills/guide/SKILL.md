---
name: guide
description: Start here for tracked work. Says how to start or continue a work with the harness CLI and which playbook or skill fits; use it when unsure what comes next.
disable-model-invocation: false
---

# Guide

## One loop

- Start or continue a work with `harness claim <issue>`. To only look, use `harness read <issue>`.
- The CLI reports what is missing and what to do next. Follow it back to the path.

## Choosing

- When the goal is clear but the activities are not, use a playbook as a reference. When the gap and the activities are already clear, pick the skill directly. When neither fits, plan it yourself; the same CLI boundaries apply.
- A method the person names is used as delegated. If it does not fit, say so.
- A reference is not a shortcut. Whatever the route, a pull request gets its independent code or document review, a breakdown gets its breakdown review, and the points where a person decides stay. Other reviews are your judgment.

## Verify behavior

For a change to observable behavior, identify the affected user entry point and expected result from Acceptance. Use the matching project verifier or existing repo command. Drive the changed version through that surface, check the result and relevant side effects, and include the version, command and evidence in the PR. If the outcome cannot be observed, record the attempted path and missing prerequisite; save the gap in the handoff and keep delivery pending until the path can be verified or the person changes the agreed Acceptance. Recheck affected evidence after a fix.

If no verifier exists, use the available tools for this task. Suggest explicitly invoking `create-verification-skill` when a recipe warrants reuse. If an existing feature map has drifted, suggest `maintain-verification-skill`. Use `principle-build-the-lever` when a repeatable tool would make the work easier to check. Release acceptance still uses the candidate and journeys specified for that work.

## Authorization

- Propose first before arranging works, or changing an agreed Deliverable or Acceptance. A new `needs-triage` work that records a request is itself a proposal; starting it needs the person's agreement. Do what is already confirmed.
- Merging needs the person's explicit authorization.
- A review gets at most three rounds on a work. A round is one run of that review ending in a verdict (the two code axes together are one run); a new head does not restart the count. When the third round does not pass, stop, say what is stuck and let the person decide.

## Commands

- When the `harness` CLI has the operation, use it (`harness --help`). The rest, such as a plain discussion comment, may use the Linear connector or `gh`.
- Find the CLI in this order:
  1. `harness` on the host PATH.
  2. `node <path>`, with the absolute path a hook injected.
  3. `lib/harness.mjs` under the plugin root, three folders above any loaded skill's `SKILL.md` (`<skill folder>/../../../lib/harness.mjs`).
- Unless `harness` is on PATH, run each `harness <command>` in the Harness skills as `node <path> <command>`, with the path from step 2 or 3.

## Pull requests

One work has one open PR at a time. A piece that is delivered separately becomes its own work.

## Playbooks

| When | Playbook |
| --- | --- |
| An idea or decision to settle, ending in a document | [Shaping](playbooks/shaping.md) |
| New or changed behavior | [Feature](playbooks/feature.md) |
| Something broken | [Bug fix](playbooks/bug-fix.md) |
| Behavior-preserving change to structure | [Refactoring](playbooks/refactoring.md) |
| Run the child works of a parent without stopping | [Autonomous run](playbooks/autonomous-run.md) |
