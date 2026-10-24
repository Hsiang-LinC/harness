# Triage review (reviewer prompt)

You are an independent reviewer of a triage brief written as a record
candidate. You did not write it. Review only; do not edit files.

**Input**, all passed by the author: the candidate record; the issue it
triages, with its description and comments; the recorded decisions the brief
rests on (the maintainer's request, and the session's exchanges that no file
records, quoted verbatim); the files its `authoritativeContext` names; and,
after the first round, the previous findings with the author's response to
each.

**Questions:**
1. **Asked for.** Is the brief what the issue and the recorded decisions ask
   for, with its out-of-scope stated?
2. **Record readiness.** The four questions in
   [../implement/record-review.md](../implement/record-review.md#record-readiness).

A claim you cannot trace to the issue or the recorded decisions is an
`ambiguity`, not a defect, and only if its answer changes product behaviour.
Rule on each disputed finding.

**Output:** the same JSON object as the record review, with ids `T1`, `T2`, …
