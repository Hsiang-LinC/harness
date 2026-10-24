# Project policy template

Setup drafts `docs/agents/harness-policy.json` with the other files the user
confirms. The Harness CLI reads only this file for destinations, and refuses
it (`POLICY_INVALID`) when any field is missing, malformed or unknown.
It holds no permissions. Publication proceeds once the method's own approval
step has passed (a reviewed Spec, an approved breakdown, a bound record); only a
merge into the default branch needs the person's explicit request in the
session. Write this into `docs/agents/issue-tracker.md` as it stands here,
never as "ask before every publication".

```json
{
  "version": 1,
  "github": { "owner": "<owner>", "repo": "<repo>" },
  "linear": { "teamId": "<team UUID>", "projectId": "<project UUID>" },
  "labels": {
    "needsTriage": "<label UUID>", "needsInfo": "<label UUID>",
    "readyForAgent": "<label UUID>", "readyForHuman": "<label UUID>",
    "wontfix": "<label UUID>"
  },
  "categories": { "bug": "<label UUID>", "enhancement": "<label UUID>" },
  "states": {
    "canceled": "<workflow state UUID>", "ready": "<workflow state UUID>",
    "started": "<workflow state UUID>", "completed": "<workflow state UUID>"
  }
}
```

- `github`: from the `origin` remote of the repository.
- `linear`: the team and project named in `docs/agents/issue-tracker.md`,
  read with the connector.
- `labels`: the five triage-role labels named in
  `docs/agents/triage-labels.md`, read or created with the connector.
- `categories`: the two category-role labels named in
  `docs/agents/triage-labels.md`, distinct from each other and from `labels`.
- `states.canceled`: the team's workflow state of type `canceled`; if the team
  has more than one, ask the user which. `states.ready`, `states.started` and
  `states.completed`: the team's states of type `unstarted` (the column agents
  pick work from), `started` and `completed`, chosen the same way.
- For a team repository, recommend branch protection on the default branch:
  Harness is not a security boundary.
- Never change an existing policy as an implicit part of repair or upgrade.
