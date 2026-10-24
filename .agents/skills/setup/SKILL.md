---
name: setup
description: "Configure this repo for Harness: its Linear issue tracker, triage label vocabulary, domain doc layout and Harness policy. Run once before first use of the other engineering skills."
disable-model-invocation: true
---

# Setup

Scaffold the per-repo configuration that the engineering skills assume:

- **Issue tracker**: Linear for work, GitHub for delivery
- **Harness policy**: `docs/agents/harness-policy.json`, the identifiers the `harness` CLI reads
- **Triage labels**: the strings used for the five canonical state roles and the two category roles
- **Domain docs**: where `GLOSSARY.md` and ADRs live, and the consumer rules for reading them

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

### 1. Explore

Look at the current repo to understand its starting state. Read whatever exists; don't assume:

- `git remote -v` and `.git/config`: is this a GitHub repo? Which one?
- `AGENTS.md` and `CLAUDE.md` at the repo root: does either exist? Is there already an `## Agent skills` section in either?
- `GLOSSARY.md` and `GLOSSARY-MAP.md` at the repo root
- `docs/adr/` and any `src/*/docs/adr/` directories
- `docs/agents/`: does this skill's prior output already exist?
- `.scratch/`: a sign that a local-markdown issue tracker convention is already in use
- Is the `triage` skill installed? (a `triage` skill folder alongside this one, or `triage` in your available skills.) This decides whether Section B runs at all.
- Monorepo signals: a `pnpm-workspace.yaml`, a `workspaces` field in `package.json`, or a populated `packages/*` with its own `src/`. These are present only in a genuinely large multi-package repo; their absence means single-context, which is almost every repo.

### 2. Present findings and ask

Summarise what's present and what's missing. Then take the sections in order. One section, one answer, then the next.

Lead each section with the recommended answer so the user can accept it in a word. Give a one-line explainer only when the choice genuinely branches; skip the section entirely when exploration already settled it (Section B when `triage` isn't installed, Section C when there's no monorepo).

**Section A: Issue tracker.**

> Explainer: Harness tracks work in Linear and delivers through GitHub. Skills like `to-tickets`, `triage` and `to-spec` read Linear through its connector and write it through the `harness` CLI.

Propose Linear with the [Linear seed template](issue-tracker-linear.md), filling its identifiers from connector reads. A missing GitHub remote or Linear project is a setup task: show the proposed name, team, visibility and exact creation step, wait for the user's choice and authority to create it, then create it and read back its identifiers. Never guess an identifier or pick a different destination.

**Section B: Triage label vocabulary.** Skip this section entirely if the `triage` skill isn't installed (exploration told you), since an uninstalled skill needs no labels.

If it is installed, ask these questions:

> Do you want to keep the default triage labels? (recommended: **yes**)

The defaults are the five canonical roles, each label string equal to its name: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. On **yes**, write them as-is. Only if the user says no, usually because their tracker already uses other names (e.g. `bug:triage` for `needs-triage`), collect the overrides so `triage` applies existing labels instead of creating duplicates.

> Which tracker labels carry the category roles `bug` and `enhancement`? (recommended: the tracker's existing labels, e.g. Linear `Bug` and `Feature`; otherwise labels named `bug` and `enhancement`)

Reuse an existing label when the tracker has one that fits; create one only when none exists. Record the label strings in `docs/agents/triage-labels.md` and their UUIDs in the policy's `categories` section: `harness issue categorize` is the only writer of category labels.

**Section C: Domain docs.** Default to **single-context** (one `GLOSSARY.md` + `docs/adr/` at the repo root). This fits almost every repo; write it without asking.

Offer **multi-context** (a root `GLOSSARY-MAP.md` pointing to per-context `GLOSSARY.md` files) only when exploration found monorepo signals. Then confirm which layout they want.

### 3. Confirm and edit

**Refresh.** When this skill's prior output already exists, render each file from the current templates with the facts those files hold (identifiers, label strings, tracker destination, the date they were verified), and show the diff against the existing files. Name each differing line as stale (the template changed; replace it) or the user's own (keep it), and let the user decide. Never keep a line setup once wrote as "preserved" when the template now says otherwise, and write nothing before the user confirms.

Show the user a draft of:

- The `## Agent skills` block to add to whichever of `CLAUDE.md` / `AGENTS.md` is being edited (see step 4 for selection rules)
- The contents of `docs/agents/issue-tracker.md`, `docs/agents/domain.md`, and `docs/agents/triage-labels.md` (the last only when `triage` is installed)

Let them edit before writing.

### 4. Write

**Pick the file to edit:**

- If `CLAUDE.md` exists, edit it.
- Else if `AGENTS.md` exists, edit it.
- If neither exists, ask the user which one to create; don't pick for them.

Never create `AGENTS.md` when `CLAUDE.md` already exists (or vice versa); always edit the one that's already there.

If an `## Agent skills` block already exists in the chosen file, update its contents in-place rather than appending a duplicate. Don't overwrite user edits to the surrounding sections.

The block:

```markdown
## Agent skills

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

### Triage labels

[one-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Domain docs

[one-line summary of layout: "single-context" or "multi-context"]. See `docs/agents/domain.md`.
```

Include the `### Triage labels` sub-block, and write `docs/agents/triage-labels.md`, only when `triage` is installed and Section B ran. When it isn't, both are omitted.

When Section B ran, create each configured label Linear lacks with the connector's label creation.

Then write the docs files using the seed templates in this skill folder as a starting point:

- [issue-tracker-linear.md](./issue-tracker-linear.md): Linear issue tracker
- [policy.md](./policy.md): the Harness policy
- [triage-labels.md](./triage-labels.md): label mapping (only if `triage` is installed)
- [domain.md](./domain.md): domain doc consumer rules + layout

**Harness policy.** Draft `docs/agents/harness-policy.json` among the files the user confirms: the GitHub repository from the `origin` remote, the Linear team and project, the five triage-label identifiers and the team's `canceled`, `ready`, `started` and `completed` states. For a team repository, recommend branch protection on the default branch: Harness is not a security boundary. Never change an existing policy implicitly. After writing it, run `harness policy validate`; fix and rerun until it passes, at most three times, then stop with the refusal.

Add to the `## Agent skills` block one line: "A request that changes this repository or moves tracked work (an issue or pull request) starts from the `guide` skill, which picks the playbook or method; Linear writes go through the `harness` CLI (`harness --help`) whenever it has the operation."

Credentials: `harness auth status` shows what the CLI can see; the user logs in with `harness auth login` or `harness auth import --stdin`. Never ask for a secret in chat or search files for one. Before relying on the plugin's hooks, use the runtime's own hook trust flow for them.

### 5. Done

Tell the user the setup is complete and which engineering skills will now read from these files. Mention they can edit `docs/agents/*.md` directly later; re-running this skill is only necessary if they want to switch issue trackers or restart from scratch.
