---
name: acceptance
description: "Check an installed candidate of a product against journeys a person wrote, and return the verdict. Use for an issue whose record enters by acceptance, or for \"accept this release\", \"run the acceptance journeys\". No change is made to the product."
disable-model-invocation: false
---

# Acceptance

Check one candidate of the product against the journeys a person wrote. This method changes no product code: what it finds is returned as findings, never fixed in this run. The caller passes the bound record and files and ends the issue on the result.

## The record

An acceptance record is Headless from filing: it holds everything an agent with no session history needs to install the candidate, drive it and judge it. `entryMethod` is `acceptance`. Its record review is [record-review.md](../implement/record-review.md) with this section passed as part of the request, and it fails a record that leaves any of these to the session:

- `summary`: the candidate, named so the verdict binds to it (a version, a commit or a built package), and what the journeys are for.
- `acceptanceCriteria`: one criterion per expectation of a journey step, each observable from outside the product, then the verdict rule as the last criterion: `PASS` only when every other criterion holds.
- `authoritativeContext`: how to install the candidate fresh, and where the report and evidence go, at a place that gives the report an https URL.

Never write the journeys or their expectations yourself: they are the person's intent.

## Steps

If the report location already holds this run's verdict, return it and stop: a rerun after an interruption repeats nothing.

1. **Install.** Give a fresh subagent the record and nothing else, and have it prepare a fresh install of the candidate in a new disposable clone outside every working tree, following `authoritativeContext` exactly. It returns the clone's path, the installed candidate's identity as the product reports it, and every command it ran with its output. If the identity differs from the candidate in `summary`, the verdict is `FAIL`: skip steps 2 and 3 and continue at step 4.
2. **Drive.** Give a second fresh subagent, one that neither built nor installed the candidate, the record, the clone's path and the [verifier prompt](verifier.md). It drives each journey as a user would and returns a verdict per criterion with its evidence. The installer's or your own belief that a journey works is not evidence.
3. **Judge.** Check every criterion has a verdict and evidence from step 2; rerun step 2 with a new subagent for any that has none, at most twice. The run's verdict is the record's verdict rule applied to them:
   - `PASS`: every criterion holds and nothing else was found.
   - `PASS+NOTES`: every criterion holds, but the verifier found a defect or doubt no criterion names.
   - `FAIL`: a criterion does not hold, or could not be checked.
4. **Report.** Give each defect a new UUID, reusing the UUIDs already in the report on a rerun, and write a request for it, `{title, description}`, the description holding the verifier's reproduction and evidence. Put the report (candidate, verdict, each criterion with its verdict and evidence, each finding with its UUID) and the evidence where `authoritativeContext` says, then remove the clone.

Return the verdict, the candidate, the report URL and the findings with their UUIDs and requests. The person who wrote the journeys decides on a `FAIL` or `PASS+NOTES`; never the verifier or you.

## Products that are agents

When the product is an agent plugin, the verifier drives the host CLI non-interactively in the clone, as a user's session would: `claude -p` from Claude Code and `codex exec` from Codex, or the other host when a journey names it. Each journey starts a new session, so one journey's context cannot carry into the next.
