---
id: bug-fix
mode: Something is broken, throwing, failing or slow, and should behave as it did or as specified
---

**No fix before a loop that goes red on this bug. The reproduction is the contract.**

1. Entry is a bound record whose acceptance includes a test that goes red on this bug. Without one, the bug becomes a bound record first through [Prepare](../procedures/prepare.md), with `entryMethod: "diagnosing-bugs"` in the record (a playbook id is not a method), and categorized with `harness issue categorize --category bug`. No reproduction or test is built before that, not even in a copy outside the repository; a request to stop at a failing test stops through [Stop](../procedures/stop.md) once claimed.
2. [Execute](../procedures/execute.md) the record. `/diagnosing-bugs` builds the red loop before any fix; when it cannot, it returns what it needs and Execute stops for the person.
3. A cause outside the record's acceptance, or one only a person can decide: go to Scope change. When no good seam can lock the bug down, that seam is a Refactoring candidate: intake it.

**Exit** when `harness ticket read` shows the ticket in a completed state.

**Reply:** Execute's completion reply.
