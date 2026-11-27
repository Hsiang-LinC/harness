---
id: bug-fix
mode: Something broken, throwing, failing or slow
---

1. **Reproduce.** Entry: a failure report. Skills: diagnosing-bugs. Output: the reproduction, saved as a comment first and put in the PR body when the PR opens.
2. **Find the root cause.** Entry: it reproduces. Output: the cause, stated.
3. **Fix with a regression test.** Entry: the cause is known. Skills: tdd. Output: the fix and a regression test that failed before it.
4. **Code review.** Use Feature section 4. Repeat the original reproduction on the fixed version before delivery; this can run before, during or after review.
5. **Deliver.** Use Feature section 5.

**Exit:** as Feature. Report the reproduction, the root cause and how the fix was verified.
