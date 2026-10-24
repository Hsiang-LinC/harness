---
name: acceptance
description: "Check an installed candidate of a product against journeys a person wrote, and record the verdict. Use for an issue whose record enters by acceptance, or for \"accept this release\", \"run the acceptance journeys\". No change is made to the product."
disable-model-invocation: false
---

# Acceptance

Check one candidate of the product against the journeys a person wrote, and end the issue on the verdict. This method changes no product code: what it finds becomes new issues.

Work on an issue goes through the `harness` CLI. `harness work read --issue <uuid>` lists which edges are available and why not. Every step reads its progress back from Linear, the record's report location and the clone, so after an interruption start again at step 1, unless the report location already holds this run's verdict: then rerun only step 8, whose edges finish an interrupted write themselves and need no admission.

## The record

An acceptance issue is Headless from filing: its record holds everything an agent with no session history needs to install the candidate, drive it and judge it. `entryMethod` is `acceptance`. Its record review is [record-review.md](../implement/record-review.md) with this section passed as part of the request, and it fails a record that leaves any of these to the session:

- `summary`: the candidate, named so the verdict binds to it (a version, a commit or a built package), and what the journeys are for.
- `acceptanceCriteria`: one criterion per expectation of a journey step, each observable from outside the product, then the verdict rule as the last criterion: `PASS` only when every other criterion holds.
- `authoritativeContext`: how to install the candidate fresh, and where the report and evidence go, at a place that gives the report an https URL.

A request with no such record is not ready. With the person who wrote the journeys, build the record, review it with a fresh subagent and bind it as `implement` describes for a request this session takes straight to bind, with `entryMethod: "acceptance"`. Never write the journeys or their expectations yourself: they are the person's intent.

## Steps

1. `harness ticket read --issue <uuid>`. If `admission` is refused, report its code and stop; never work around it.
2. `harness work claim --issue <uuid> --owner <host>:<identifier>`. Run it again to renew before a write more than 30 minutes after the last claim. On `CLAIM_HELD`, report who holds it and until when, and stop.
3. **Install.** Give a fresh subagent the record and nothing else, and have it prepare a fresh install of the candidate in a new disposable clone outside every working tree, following `authoritativeContext` exactly. It returns the clone's path, the installed candidate's identity as the product reports it, and every command it ran with its output. If the identity differs from the candidate in `summary`, the verdict is `FAIL`: skip steps 4 and 5 and continue at step 6.
4. **Drive.** Give a second fresh subagent, one that neither built nor installed the candidate, the record, the clone's path and the [verifier prompt](verifier.md). It drives each journey as a user would and returns a verdict per criterion with its evidence. The installer's or your own belief that a journey works is not evidence.
5. **Judge.** Check every criterion has a verdict and evidence from step 4; rerun step 4 with a new subagent for any that has none, at most twice. The run's verdict is the record's verdict rule applied to them:
   - `PASS`: every criterion holds and nothing else was found.
   - `PASS+NOTES`: every criterion holds, but the verifier found a defect or doubt no criterion names.
   - `FAIL`: a criterion does not hold, or could not be checked.
6. **Findings.** Write a new UUID for each defect into the report location before filing it, and on a rerun reuse the UUIDs already there, so no finding is filed twice. Each defect becomes one issue: `harness issue intake --issue <its UUID> --file <request>` with its default role, `needs-triage`, its text the verifier's reproduction and evidence. Never fix one in this run.
7. **Report.** Put the report (candidate, verdict, each criterion with its verdict and evidence, finding issues) and the evidence where `authoritativeContext` says, then remove the clone.
8. **End.**
   - `PASS`: `harness work resolve --issue <uuid> --file <resolution> --claim <token>`, the resolution `{"resolution": "<verdict, the candidate it judged, the report URL>"}`.
   - `FAIL` or `PASS+NOTES`: `harness work escalate --issue <uuid> --reason judgment --decision "<verdict> for <candidate>: accept or reject" --pointer <report URL> [--pointer <finding URL>…]`, then `harness work release --issue <uuid> --claim <token>`. The person who wrote the journeys decides; never the verifier or you. After a rejected `FAIL`, the issue waits in `ready-for-human` until the person resumes it (`harness work resume`) with a new candidate in its record, or files a new acceptance issue.

## Products that are agents

When the product is an agent plugin, the verifier drives the host CLI non-interactively in the clone, as a user's session would: `claude -p` from Claude Code and `codex exec` from Codex, or the other host when a journey names it. Each journey starts a new session, so one journey's context cannot carry into the next.

Never push, merge or change Linear outside these steps without the user's authorization.
