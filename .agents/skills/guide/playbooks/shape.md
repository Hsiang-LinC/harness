---
id: shape
mode: An idea that can be settled with the human in one session
---

**Settle one idea with the human in this session, and stop once the decision is a fact. Shape decides; it builds nothing.**

1. If the idea is tracked, `harness work read` for its facts.
2. `/grill-with-docs` until every question is answered. It is user-only: ask the user to start it (`$grill-with-docs` in Codex), even for a Spec request; never run `grilling` or your own questions instead, and never answer them yourself.
3. When a question needs a runnable answer, `/handoff` out to a fresh session.
4. There, `/prototype` to answer it with throwaway code, and `/handoff` back what it learned.
5. Continue `/grill-with-docs` here with that file. The idea's own thread stays in this context window until Shape exits.
6. When the idea needs more than one session, stop and switch to Wayfinder.
7. Confirm the outcome with the human. An inner gate, not the exit.
8. Make the outcome a fact by the first branch that fits:
   1. A build needing a Spec, on the idea's issue (an untracked idea is first `harness issue intake --role none`): `/to-spec`, passing a record candidate and Prepare's [record-review.md](../../implement/record-review.md) when it will be built without tickets. On its `pass`: `harness spec track --issue <issue> --path <Spec> --branch <feature branch> --target <final target>`; post its report on the issue; `harness review record --issue <issue> --review spec --candidate <blob> --verdict pass --report-url <comment URL>`, adding `--record <contextDigest>` for a record; push the grilling's glossary or ADR edits to an existing feature branch; `harness spec publish --issue <issue> --file <Spec>`; delete the working copy elsewhere.
   2. A build one ticket can hold: [Prepare](../procedures/prepare.md), with `entryMethod: "implement"` in the record.
   3. Nothing to build: `/domain-modeling` for an ADR or glossary entry, or an alignment record entry; commit it.
9. At most three review rounds in step 8. When they run out, or the human's answer changes the destination, go to Scope change or `harness work escalate`.

**Exit** when one of these facts holds:

- `harness work read` shows a passing `spec` review on the tracked Spec, and its feature branch holds that reviewed blob (`spec publish` done).
- `harness work read` shows the issue `ready-for-agent` with a bound record.
- A commit adds the ADR, glossary or alignment entry, and no issue was opened to build it.

**Reply:** one line naming the fact, its link, and the playbook that takes over (Feature, Small change, or none).
