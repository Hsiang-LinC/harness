# Issue tracker: Linear

Work, plans and Spec tracking issues for this repo live in Linear team `<team name>` (`<team key>`),
in the project `<project name>`.
Git/GitHub owns code delivery; a PR is not a work item. Each write below names
its current path: the Harness CLI where it has the operation, otherwise the
Linear connector. When the CLI gains an operation, change its line here.

Authority: publication proceeds once the method's own approval step has
passed; only a merge into the default branch needs the person's explicit
request in the session. Setup grants no permission.

The team, project, triage-label, category-label and workflow-state UUIDs live only in
`docs/agents/harness-policy.json`, read from Linear on `<date>`; the Harness
CLI and connector operations both take them from there.

## Conventions

- **Capture a request**: `harness issue intake --issue <stable UUID> --file
  <request.json>` with `{title, description}`; add `--role none` only for a request
  this session takes straight to bind; a capture for later keeps the default
  `needs-triage`. Reuse that identity across methods.
- **Bind a record**: `harness work bind` with a reviewed record candidate
  (`review record --review record` or `triage`); it is the only way an issue
  becomes `ready-for-agent`. Do not publish a duplicate ticket.
- **Prepare a Spec**: `harness spec track` on the existing issue with its
  feature authority, independent review, then `spec publish`.
- **Publish a task graph**: `harness breakdown publish --parent <issue>` with a
  reviewed batch, under a Spec issue or an issue without one.
- **Publish plain work**: `harness issue publish` for maps/decision issues and
  native parents/blockers. No connector publication path.
- **Read work**: `harness work read`; active tickets use `harness ticket read`
  for current admission/delivery. Use connector reads for queries/comments as needed.
- **List issues**: `list_issues`, filtered by team, label and state.
- **Make an issue a sub-issue of a parent**: Linear's native parent relation.
- **Blocking**: Linear's native `blocks` relation. A ticket is unblocked only as its CLI admission reports, not by treating
  every canceled/duplicate blocker as delivered.
- **Comment, apply / remove labels, assign, change state or close an already
  published issue**: the Linear connector, unless the Harness CLI has the
  operation. Pause, resume and escalate a Harness ticket with `harness work
  pause`, `resume` and `escalate`, and set a category with `harness issue
  categorize`; its record, parent and blockers change only
  through the Harness CLI.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(PRs are code delivery for Linear work here.)_

## When a skill says "publish to the issue tracker"

Publish through the Harness CLI, as in **Publish plain work** above.

## When a skill says "fetch the relevant ticket"

Read it as in **Read work** above.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes /
  Decisions-so-far / Fog body.
- **Child ticket**: a sub-issue of the map, labelled `wayfinder:<type>`
  (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is
  assigned to the driving dev.
- **Blocking**: native `blocks` relations, as in **Conventions**.
- **Frontier query**: the map's open sub-issues with no open blocker and no
  assignee; first in map order wins.
- **Claim**: set the assignee to the driving dev, the session's first write.
- **Resolve**: `harness work resolve --issue <uuid> --file <{"resolution": …}>`
  comments the answer and closes the issue; then append a context pointer
  (gist + link) to the map's Decisions-so-far.

Creating the map, its sub-issues, their `wayfinder:*` labels and blockers is
publication through `harness issue publish`. The other writes follow
**Conventions**.
