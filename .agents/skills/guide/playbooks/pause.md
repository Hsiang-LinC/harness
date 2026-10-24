---
id: pause
mode: Stop in-flight work cleanly so another session can resume it (an explicit pause, going offline)
---

**Leave a clean stop: progress as facts in Linear and GitHub, context in a handoff. Only on an explicit pause; "keep going" is not one.**

1. Stop at a safe boundary: finish or back out of the current step, and start nothing new.
2. Commit work in progress to the ticket's branch and push it, as `/implement` does.
3. Anything learned that is not yet a fact becomes one: `harness issue intake` for new work, `harness work escalate` for a decision a person must make.
4. If this session holds a claim, release it the way `/implement` stops: `harness work escalate --reason human-needed` with the PR, else the pushed branch, as pointer unless step 3 already escalated with it, then `harness work release`.
5. `/handoff` for the context a cold session needs. It holds no progress and no todo list.

**Exit** when the `/handoff` file exists and `harness work read` shows no live claim of this session, with `ready-for-human` on a ticket it held.

**Reply:** one line with the stop point, the handoff path, the PR if any, and the first action on resume.
