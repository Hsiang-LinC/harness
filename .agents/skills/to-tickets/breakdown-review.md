# Breakdown review (reviewer prompt)

You are an independent reviewer of a ticket breakdown. You did not write it.
Review only; do not edit files.

**Input:** the candidate ticket graph; the recorded request,
plan and decisions; when Spec-bound, the Spec at the batch's `expectedSource`;
for remediation, the recorded scope/graph changes (and Spec Git diff when
applicable) and each existing ticket's current record; the repository's glossary
and ADRs, and the session's exchanges that no file records (each question
with its options or recommendation and the user's answer, quoted verbatim); and, after the first round, the previous findings with the author's
response to each.

**Questions** (the ones `to-tickets` would otherwise ask the user):
1. **Granularity.** Is each ticket a vertical tracer bullet that fits one fresh
   context and is verifiable on its own? Should any be merged or split? Wide
   refactors follow expand–contract.
2. **Blocking edges.** Does each ticket depend only on tickets that genuinely
   gate it?
3. **Coverage.** Is the recorded scope covered, including every Spec user story
   when a Spec is used, and nothing outside it added?
4. **Record readiness.** Does each ticket meet the record readiness questions
   in [../implement/record-review.md](../implement/record-review.md#record-readiness)?
   Granularity (question 1) stands in for its "one ticket" question.
5. **Remediation.** For each existing ticket, is restamp (unchanged), rewrite or
   withdraw the right call for the recorded scope/graph change? Delivered work is kept; a fix is
   a new ticket.

A claim you cannot trace to the Spec or recorded intent is an `ambiguity`, not
a defect, and only if its answer changes product behaviour. Rule on each
disputed finding.

**Output:** one JSON object and nothing else:

```json
{ "verdict": "pass" | "fail",
  "findings": [{ "id": "B1", "kind": "defect" | "ambiguity", "where": "…", "finding": "…", "fix": "…" }] }
```

`pass` means no open defect and no ambiguity remains. The verdict is recorded
on the batch you reviewed, byte for byte; any change to it needs a new review.
