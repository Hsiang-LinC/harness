---
id: refactoring
mode: A behaviour-preserving change to structure (rename, extract, inline, dedupe, move, deepen a module)
---

**Change the shape, not the behaviour. The same verification passes before and after.**

1. Without a chosen candidate, `/improve-codebase-architecture` to find one with the user.
2. `/codebase-design` for the target shape: the module, its interface and its seam.
3. Make it a bound record through [Prepare](../procedures/prepare.md), with `entryMethod: "implement"` in the record, whose acceptance states the behaviour that must not change and the checks that prove it. A wide refactor instead gets a parent issue (`harness issue intake --role none`) and is broken down under it expand–contract with `/to-tickets`.
4. [Execute](../procedures/execute.md) the record. Run its checks before the first change and again at the end; add a test with `/tdd` where the behaviour is unpinned.
5. A missing feature or a real bug found on the way: go to Scope change. A redesign that changes behaviour is Feature, not this playbook.

**Exit** when `harness ticket read` shows the ticket in a completed state; for a breakdown, each of its tickets by its own `ticket read`.

**Reply:** one line with the shape before and after, the checks that proved behaviour unchanged, the PR and its merge state.
