# Breakdown batch format

`harness breakdown digest --file <batch>` prints the digest the breakdown
review records; `harness breakdown publish --parent <UUID> --file <batch>`
publishes it. The parent is a Spec issue or an issue without a Spec.

```json
{
  "expectedSource": "<Spec blob on its feature branch, or the parent's sourceDigest>",
  "create":   [{ "id": "<new issue UUID>", "record": <record candidate> }],
  "rewrite":  [{ "id": "<child UUID>", "from": "<its contextDigest>", "record": <record candidate> }],
  "restamp":  [{ "id": "<child UUID>", "from": "<its contextDigest>", "record": <its unchanged candidate> }],
  "withdraw": [{ "id": "<child UUID>", "from": "<its contextDigest>" }],
  "edges":    [{ "blocker": "<UUID>", "blocked": "<UUID>" }]
}
```

`expectedSource` comes from `harness work read --issue <parent>`
(`source.sourceDigest`) or, for a Spec, from `git hash-object --no-filters -- <Spec file>` of
the published file.

A **record candidate** is a record without `source`; publishing stamps
`source: {kind: "breakdown", parentId, batch, spec | parent}` with this batch's
digest:

```json
{ "title": "…", "summary": "…", "entryMethod": "implement",
  "intentBasis": "<one line: why this work is wanted>", "acceptanceSource": "record",
  "sourceBranch": "<optional>", "mergeTarget": "<optional branch>",
  "acceptanceCriteria": ["…"],
  "authoritativeContext": [{ "repoPath": "docs/specs/<slug>.md", "note": "…" }, { "url": "https://…", "note": "…" }] }
```

- The issue template's "What to build" becomes `summary` and its criteria
  `acceptanceCriteria`. Use `acceptanceSource: "spec"` only under a Spec
  parent, when the Spec's acceptance is the contract.
- Generate each new issue UUID yourself; a rerun with the same batch reuses it.
- Omit an effect that is empty. The batch names 1–50 tickets and at most 200
  acyclic edges among the tickets it keeps.
- `edges` is the whole blocking graph among created, rewritten and restamped
  tickets: a relation between them that is not listed is deleted. Never add a
  blocker to a ticket that may already be executing.
- `from` is the `contextDigest` on the first line of the ticket's description.
  Every open child appears in exactly one effect; closed children stay out.
- A `restamp` keeps the record unchanged except its stamped source; anything
  more is a `rewrite`. Delivered work is kept; a fix is a new ticket.
- The digest covers every byte: change anything and review again.

## Feature-branch Spec delivery

Under a Spec parent, every internal ticket targets the Spec's feature branch
(`mergeTarget`). Exactly one final ticket has `sourceBranch` the feature branch
and `mergeTarget` the final target, and every kept ticket reaches it through
the edges. `completed: [{id, from}]` names each completed child as a fixed
reference, never rewritten. An open pull request whose target changes is
listed in `retarget: [{issueId, number, source, head, from, to}]` beside that
child's `rewrite`.
