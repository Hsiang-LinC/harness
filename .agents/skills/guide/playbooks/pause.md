---
id: pause
mode: Stop in-flight work cleanly so another session can resume it (an explicit pause, going offline)
---

**Leave a clean stop: progress as facts in Linear and GitHub, context in a handoff. Only on an explicit pause; "keep going" is not one.**

1. Stop at a safe boundary: finish or back out of the current step, start nothing new, and commit and push work in progress to the ticket's branch.
2. Anything learned that is not yet a fact becomes one: `harness issue intake` for new work; a decision a person must make is [Stop](../procedures/stop.md) with `judgment`, claimed or not.
3. If this session still holds a claim, [Stop](../procedures/stop.md) with `human-needed` and the pause as the decision.
4. `/handoff` for the context a cold session needs. It holds no progress and no todo list.

**Exit** when the `/handoff` file exists and `harness work read` shows no live claim of this session, with `ready-for-human` on a ticket it held.

**Reply:** one line with the stop point, the handoff path, the PR if any, and the first action on resume.
