# Harness

Harness helps you take an idea or a Linear issue to a reviewed GitHub pull request with Claude Code or Codex. Describe the outcome to Guide. It picks a workflow, asks you about unresolved product decisions, and uses the bundled CLI to track work across sessions. You authorize the merge.

## Install and set up

Use Node.js 22.12+ on Linux or macOS, Git, and the GitHub CLI. Set `LINEAR_API_KEY` for your Linear workspace and authenticate GitHub with `gh auth login` or `GITHUB_TOKEN`. Keep credentials out of chat and repository files.

**Codex**

```sh
codex plugin marketplace add Hsiang-LinC/harness
codex plugin add harness@harness
```

**Claude Code**

```text
/plugin marketplace add Hsiang-LinC/harness
/plugin install harness@harness
```

Open your repository and run **`$setup`** in Codex or **`/harness:setup`** in Claude Code. Choose your Linear team and project. Setup shows its proposed changes to `docs/agents/` and the managed block in `AGENTS.md` or `CLAUDE.md` for your confirmation.

## Everyday workflows

Start a message with **`$guide`** in Codex or **`/harness:guide`** in Claude Code, followed by a request like one of these. Substitute your own issue ID for `APP-42`.

| Goal | What to say to Guide | What to expect |
| --- | --- | --- |
| Shape an idea | “I want a stock watchlist. Help me decide what I should see when I reopen it tomorrow.” | Discuss a concrete use case, try a prototype if useful, and capture the agreed behavior in a spec. |
| Build a feature | “Build APP-42. Show the source and publication time for each update.” | Claim the issue, implement against its acceptance criteria, and open a PR. Independent review and verification of the changed user path can proceed in parallel. |
| Fix a bug | “Refresh fails, but yesterday’s report gets marked as updated today.” | Reproduce the failure, find the cause, and repeat the same action after the fix. The PR records what changed. |
| Refactor | “Move report formatting out of the API handler. Keep the response fields and values unchanged.” | Establish the observable contract, make the change, and compare behavior before and after. |
| Resume work | “Continue APP-42. What passed review, and what is still blocking delivery?” | Recover the issue, linked PR, reviews and latest handoff from Linear and GitHub. |

For a parent issue with approved child issues, ask Guide to work through its ready children. It can move to another child when one needs your decision and reports what still needs attention.

## Verify a change

Guide uses the project’s verifier or an existing command to exercise the relevant UI, CLI or API. The PR records the version, action and observed result. An unreachable entry point leaves that criterion open.

| When you want to… | Codex | Claude Code |
| --- | --- | --- |
| Create a reusable verifier and feature map | `$create-verification-skill` | `/harness:create-verification-skill` |
| Audit an existing map against the running app | `$maintain-verification-skill` | `/harness:maintain-verification-skill` |

Invoke those two commands explicitly. Once a project verifier exists, Guide can use it during ordinary development. The separate `acceptance` skill checks an installed release candidate against journeys you specify.

## Reference

The CLI ships with the plugin. Session hooks help the agent locate it; its fallback is `bin/harness` in the installed plugin. Run `harness --help` to list commands or `harness complete --help` for delivery options. Optional cross-vendor review with `interrogate` requires the other vendor’s CLI installed and signed in.

<details>
<summary>Upgrading from v1.1</summary>

v2 changes the commands, the credentials and the setup files.

1. Set `LINEAR_API_KEY` in your environment. Saved credentials in the OS
   credential store are no longer used; delete them with your operating
   system's tool.
2. Rerun setup in each repository. It offers to replace the unmarked
   `## Agent skills` block with the marked one, showing the difference first,
   and to delete the old Harness policy JSON file in `docs/agents/`.
3. v1.1 records on Linear (bound records, claims, reviews) are not read or
   converted. They stay where they are. Move a work that is still in use by
   writing its `Deliverable:`, `## Goal` and `## Acceptance` into the issue
   body with `harness update`. A Spec on a feature branch needs a document PR
   and review before work relies on it, and reviews are saved again in the v2
   format.

</details>

See [release notes](https://github.com/Hsiang-LinC/harness/releases) or [report an issue](https://github.com/Hsiang-LinC/harness/issues). Harness and its bundled methods carry [Harness](LICENSE), [Matt Pocock](.agents/skills/LICENSE-matt-pocock) and [pstack](.agents/skills/LICENSE-pstack) MIT notices.
