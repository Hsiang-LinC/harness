---
name: acceptance
description: "Check an installed candidate of a product against journeys a person wrote, and return the verdict. Use for an issue whose record enters by acceptance, or for \"accept this release\", \"run the acceptance journeys\". No change is made to the product."
disable-model-invocation: false
---

# Acceptance

Check one candidate of the product against the journeys a person wrote. Change no product code: findings are returned, never fixed in this run. The caller passes the bound record, files the findings and ends the issue on the result.

## The record

An acceptance record is Headless: it holds everything needed to install, drive and judge the candidate. `entryMethod` is `acceptance`. Review it with [record-review.md](../implement/record-review.md) plus this section; it fails a record that leaves any of these to the session:

- `summary`: the candidate, named so the verdict binds to it (a version, a commit or a built package), and what the journeys are for.
- `acceptanceCriteria`: one criterion per expectation of a journey step, each observable from outside the product, then the verdict rule as the last criterion: `PASS` only when every other criterion holds.
- `authoritativeContext`: how to install the candidate fresh, and where the report and evidence go, at a place that gives the report an https URL.

Never write the journeys or expectations yourself: they are the person's intent.

## Steps

If the report location already holds this run's verdict, return it and stop: a rerun repeats nothing.

1. **Install.** Have a fresh subagent, given only the record, install the candidate fresh in a new disposable clone outside every working tree, following `authoritativeContext` exactly. It returns the clone's path, the installed candidate's identity as the product reports it, the installed CLI's absolute path if any, the disposable resources it created, and every command it ran with its output. If the identity differs from the candidate in `summary`, the verdict is `FAIL`: skip steps 2 and 3 and continue at step 4.
2. **Drive.** Give the record, the clone's path, the CLI path and the [verifier prompt](verifier.md) to a second fresh subagent that neither built nor installed the candidate. It drives each journey as a user would and returns a verdict per criterion with evidence, and the resources it created. Belief that a journey works is not evidence.
3. **Judge.** Check every criterion has a verdict and evidence from step 2; rerun step 2 with a new subagent for any that has none, at most twice. The run's verdict is the record's verdict rule applied to them:
   - `PASS`: every criterion holds and nothing else was found.
   - `PASS+NOTES`: every criterion holds, but the verifier found a defect or doubt no criterion names.
   - `FAIL`: a criterion does not hold, or could not be checked.
4. **Report.** Give each defect a UUID (on a rerun, the report's) and a request `{title, description}` holding the verifier's reproduction and evidence. Put the report (candidate, verdict, each criterion with its verdict and evidence, each finding with its UUID) and the evidence where `authoritativeContext` says. Remove the clone and every resource steps 1 and 2 returned; list any you cannot, with what removes it, under **Cleanup**.

Return the verdict, candidate, report URL and findings with UUIDs and requests. The person who wrote the journeys decides on a `FAIL` or `PASS+NOTES`; never the verifier or you.

