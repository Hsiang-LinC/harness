---
name: setup
description: "Configure this repo for Harness: its Linear issue tracker, triage label vocabulary and domain doc layout. Run once before first use of the other engineering skills, and again to refresh."
disable-model-invocation: false
---

# Setup

Scaffold the per-repo configuration that the engineering skills assume:

- **Issue tracker**: Linear for work, GitHub for delivery
- **Triage labels**: the strings used for the five canonical state roles, the two category roles and the wayfinder labels
- **Domain docs**: where `GLOSSARY.md` and ADRs live, the consumer rules for reading them, and the document directories the `harness` CLI reads
- **Agent skills block**: the marked block in `AGENTS.md` or `CLAUDE.md` that points agents at the `guide` skill

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write. Setup writes no permission sentence and no workflow configuration; the `harness` CLI resolves the team, project and labels by name.

## Process

### 1. Explore

Look at the current repo to understand its starting state. Read whatever exists; don't assume:

- `git remote -v` and `.git/config`: is this a GitHub repo? Which one?
- `AGENTS.md` and `CLAUDE.md` at the repo root: does either exist? Is there an `## Agent skills` section in either, and is it between the `harness` markers?
- `GLOSSARY.md` and `GLOSSARY-MAP.md` at the repo root
- `docs/adr/`, a Specs directory, and any `src/*/docs/adr/` directories
- `docs/agents/`: does this skill's prior output already exist? An old Harness policy JSON file there is a v1.1 leftover.
- Monorepo signals: a `pnpm-workspace.yaml`, a `workspaces` field in `package.json`, or a populated `packages/*` with its own `src/`. These are present only in a genuinely large multi-package repo; their absence means single-context, which is almost every repo.

Then check Linear through the connector: the team and the project exist, and the team has every label in the triage-label tables. List what is missing. Create a missing team, project or label only after the user confirms the exact name.

### 2. Present findings and ask

Summarise what's present and what's missing. Then take the sections in order. One section, one answer, then the next.

Lead each section with the recommended answer so the user can accept it in a word. Give a one-line explainer only when the choice genuinely branches; skip the section entirely when exploration already settled it (Section C when there's no monorepo).

**Section A: Issue tracker.**

> Explainer: Harness tracks work in Linear and delivers through GitHub. Skills like `to-tickets`, `triage` and `to-spec` read and write Linear.

Propose Linear with the [Linear seed template](issue-tracker-linear.md): the team key and the project name, read from the connector. Never guess either or pick a different destination.

**Section B: Triage label vocabulary.**

> Do you want to keep the default triage labels? (recommended: **yes**)

The defaults are the five canonical roles, each label string equal to its name: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. On **yes**, write them as-is. Only if the user says no, usually because their tracker already uses other names (e.g. `bug:triage` for `needs-triage`), collect the overrides so `triage` applies existing labels instead of creating duplicates.

> Which tracker labels carry the category roles `bug` and `enhancement`? (recommended: the team's existing labels, e.g. Linear `Bug` and `Feature`)

Reuse an existing label when the team has one that fits; create one only when none exists. Keep the wayfinder labels in their own table: `harness update --label` replaces the other roles of the same table, so a map label must never sit in a table with a triage role.

**Section C: Domain docs.** Default to **single-context** (one `GLOSSARY.md` + `docs/adr/` at the repo root). This fits almost every repo; write it without asking.

Offer **multi-context** (a root `GLOSSARY-MAP.md` pointing to per-context `GLOSSARY.md` files) only when exploration found monorepo signals. Then confirm which layout they want.

Fill `## Document directories` of `domain.md` with the directories that hold, or the person chose to hold, Specs, ADRs or other documents, one `` - `path` `` bullet each. The CLI reads this list from the default branch to tell documents from code.

### 3. Confirm and edit

Show the user a draft of:

- The managed block (step 4) for whichever of `CLAUDE.md` / `AGENTS.md` is being edited
- The contents of `docs/agents/issue-tracker.md`, `docs/agents/triage-labels.md` and `docs/agents/domain.md`

**Refresh.** When this skill's prior output already exists, change only what is inside the `harness` markers and the template lines that are stale, and show the diff first. Name each differing line as stale (the template changed; replace it) or the user's own (keep it). Answers the person gave earlier, such as document directories and labels, are their own, even for a directory not created yet; you may propose additions. Write nothing before the user confirms.

**v1.1 leftovers.** An `## Agent skills` section without the markers: show how it differs from the managed block and replace it only after the user confirms; otherwise leave it. Offer to delete the old Harness policy JSON in `docs/agents/`, again only after confirmation.

**Competing routing.** List instructions that may take routing from the `guide` skill: another plugin's guide-like skill, and rules in `AGENTS.md` or `CLAUDE.md` that conflict with Harness. Report them; change none.

Let the user edit before writing.

### 4. Write

**Pick the file to edit:**

- If `CLAUDE.md` exists, edit it.
- Else if `AGENTS.md` exists, edit it.
- If neither exists, ask the user which one to create; don't pick for them.

Never create `AGENTS.md` when `CLAUDE.md` already exists (or vice versa); always edit the one that's already there.

Write this block verbatim, appended when absent; when present, replace only what is between the markers. Don't touch the surrounding text.

```markdown
<!-- BEGIN harness: managed by /setup; edits inside are replaced on refresh -->
## Agent skills
This repo uses Harness. Start from the `guide` skill to pick a route.
Run `harness claim <issue>` to start or continue tracked work.
<!-- END harness -->
```

Then write the docs files using the seed templates in this skill folder as a starting point:

- [issue-tracker-linear.md](./issue-tracker-linear.md): the Linear team and project, and how a PR is linked to its issue
- [triage-labels.md](./triage-labels.md): label mapping
- [domain.md](./domain.md): domain doc consumer rules, layout and document directories

Keep the `Linear team:` and `Linear project:` lines and the `## Document directories` bullets in the form the templates show; the CLI parses them. After writing, run `harness read setup`: it prints what the CLI read from each file and what it could not; fix every problem and tell the user each gap.

Create each configured label the Linear team lacks, only after the user confirmed it in step 3.

### 5. Credentials

Tell the user how to provide them; never ask for a secret in chat, store one, or search files for one:

- `LINEAR_API_KEY` in the environment, for the CLI's Linear writes; a key limited to the team is better than a full personal key.
- `GITHUB_TOKEN`, or `gh auth token` when it is unset.
- Codex passes these variables into its sandbox, but its workspace-write sandbox has no network: set `sandbox_workspace_write.network_access = true` in `~/.codex/config.toml`, or the CLI cannot reach Linear or GitHub.

### 6. Recommend

- Install Linear's GitHub integration (required): it links PRs to their issues, and the CLI finds a work's PRs only through those links. It may set Done when a PR merges; `harness complete` still evaluates the work.
- If the repo does not delete head branches automatically (`gh api repos/{owner}/{repo} --jq .delete_branch_on_merge`), recommend turning it on.

### 7. Done

Tell the user the setup is complete and which engineering skills will now read from these files. Mention they can edit `docs/agents/*.md` directly later; re-run this skill to refresh the block and templates.
