---
id: bug-fix
mode: Something is broken, throwing, failing or slow, and should behave as it did or as specified
---

**No fix before a loop that goes red on this bug. The reproduction is the contract.**

1. Entry is a bound record whose acceptance includes a test that goes red on this bug. Without one, the bug becomes a bound record first through [Prepare](../procedures/prepare.md), with `entryMethod: "implement"` in the record (a playbook id is not a method), and categorized with `harness issue categorize --category bug`. No reproduction or test is built before that, not even in a copy outside the repository; a request to stop at a failing test stops through [Stop](../procedures/stop.md) once claimed.
2. [Execute](../procedures/execute.md) the record. On its branch, `/diagnosing-bugs` Phase 1 builds the red loop before any fix (if no loop can be built, it says what to ask the user for; go to Scope change), then Phase 2 onwards finds the cause and the fix. The PR body carries `## Root cause` and `## Regression test`; `harness work merge` refuses a bug without them.
3. A cause outside the record's acceptance, or one only a person can decide: go to Scope change. When no good seam can lock the bug down, that seam is a Refactoring candidate: intake it.

**Exit** when `harness ticket read` shows the ticket in a completed state.

**Reply:** Execute's completion reply.
