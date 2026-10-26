---
id: acceptance
mode: Check an installed candidate against journeys a person wrote; no change is made to the product
---

**The journeys and their expectations are the person's intent: never write them yourself. The verdict binds to one named candidate.**

1. Without a bound record, build it with the person who wrote the journeys, holding what `/acceptance` asks of its record, then [Prepare](../procedures/prepare.md) with `entryMethod: "acceptance"` and that section passed to the record review.
2. [Execute](../procedures/execute.md) the ticket. `/acceptance` installs, drives and judges; Execute files its findings and ends the ticket on the verdict.
3. A rejected `FAIL` waits in `ready-for-human` until the person resumes it with a new candidate in its record (Execute step 1, after the record is rewritten), or files a new acceptance issue; never rerun the same candidate.
4. A finding is never fixed in this run. Fixing one is a new Bug fix or Small change from its intake issue.

**Exit** when Execute's exit holds: the ticket resolved on `PASS`, or `ready-for-human` with the verdict to accept or reject.

**Reply:** Execute's reply.
