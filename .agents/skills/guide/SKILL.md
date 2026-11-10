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
- A reference is not a shortcut. Required independent reviews, evidence and human decision points stay.

## Authorization

- Propose first before creating or arranging works, or changing an agreed Deliverable or Acceptance. Do what is already confirmed.
- Merging and extra review rounds need the person's explicit authorization.

## Commands

- Consequential operations go through the `harness` CLI. A plain discussion comment may use the Linear connector.
- Find the CLI in this order:
  1. `harness` on the host PATH.
  2. The absolute path a hook injected.
  3. `bin/harness` under the plugin root: from any loaded skill's folder, `../../../bin/harness`.

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
