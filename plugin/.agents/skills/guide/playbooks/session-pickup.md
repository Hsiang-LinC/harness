---
id: session-pickup
mode: Resume or take over work another session started
---

**Facts decide where you resume; the handoff only gives context. Do not redo what the facts show done.**

1. Read the `/handoff` file, if there is one, for context: intent, decisions, gotchas. It never states progress.
2. `harness work read` or `harness ticket read` on the issue, and `gh pr view` on its PR, for the facts.
3. Pick the playbook or method for what remains, as `guide` would. Build the todo from its steps, marking done the steps the facts already satisfy.
4. Take its first CLI edge. On `ready-for-human`, `work read` lists every open escalation; `harness work resume --file` must answer each, so resume only when the person present has answered each one (a request to continue work stopped at its PR answers that stop, in their words), then `harness work claim` as the method says. Otherwise the work waits for its person.

**Exit** when that first edge succeeds: `harness work read` shows this session's live claim. Already-completed delivery exits after `/implement` obtains `Completed` and sends its completion reply. Work that holds no claim, such as Shape or Wayfinder, exits once routed.

**Reply:** for ongoing work, one line with where the work stood, the playbook or method taking over, and the step it resumes at; for already-completed delivery, `/implement`'s completion reply.
