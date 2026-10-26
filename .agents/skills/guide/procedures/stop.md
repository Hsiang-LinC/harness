---
id: stop
mode: Procedure, called by journeys and never selected by the guide. Leave claimed work stopped as facts another session can resume
---

**Never release without the escalate: a bare release hides the work and puts the ticket back as `ready-for-agent`.**

1. If the work has a branch, commit what exists to the `branch` that `harness ticket read` names and push it.
2. `harness work escalate --issue <uuid> --reason <class> --decision <what the person must decide or check> --pointer <url>`, repeated for each pointer the caller passes, else the PR URL, else https://github.com/<owner>/<repo>/tree/<branch>, else the issue URL. The reason is `human-needed` for a stop the person asked for or a merge only they may make, `judgment` for a decision outside the record. Escalations accumulate: each new decision is its own escalate, even on a ticket already `ready-for-human`.
3. If this session holds the claim, `harness work release --issue <uuid> --claim <token>`. Never reclaim to keep the ticket In Progress.

**Exit** when `harness work read` lists the escalation open and no live claim of this session.

**Reply:** one line with the stop point, the pointer, and what the person must decide.
