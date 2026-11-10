# Harness

Harness is a plugin for Claude Code and Codex. It gives your agent a set of
engineering methods (grilling, Specs, tickets, TDD, code review) and a small
CLI that reads and records the work in Linear and delivers it through GitHub.

You describe what you want. The agent starts from the `guide` skill, which
picks a playbook: shape an idea, fix a bug, build a feature, refactor, or run
autonomously. The agent works through its steps. Every consequential write to
Linear or GitHub goes through the `harness` CLI. It reads the current facts,
checks the conditions, and refuses with the reason when a step is not allowed
yet, for example merging before review has passed. You keep the product
decisions and the authorization to merge.

## Requirements

- Node.js 22.12 or later, on Linux or macOS (Windows is not tested yet)
- Git and the GitHub CLI (`gh`)
- A Linear workspace with a team and a project for this work

## Install

Codex:

```sh
codex plugin marketplace add Hsiang-LinC/harness
codex plugin add harness@harness
```

Claude Code:

```text
/plugin marketplace add Hsiang-LinC/harness
/plugin install harness@harness
```

No `npm install` is needed. The CLI ships inside the plugin as one JavaScript
file with no native dependencies.

## Credentials

The CLI reads credentials from environment variables only. It stores nothing.

- Linear: `LINEAR_API_KEY`.
- GitHub: `GITHUB_TOKEN`, else your `gh auth login`.
- Keep keys out of command-line arguments, chat and repository files.

## Set up a repository

Run setup once in each repository:

| Codex | Claude Code |
| --- | --- |
| `$setup` | `/harness:setup` |

Setup asks which Linear team and project to use, shows the files it will
write (`docs/agents/` notes and a marked block in `AGENTS.md` or `CLAUDE.md`)
and writes them only after you confirm. It checks that the team, project and
labels exist and explains the credential variables.

## Use it

Start with the guide and say what you want:

| Codex | Claude Code |
| --- | --- |
| `$guide <goal>` | `/harness:guide <goal>` |

Run the guide with no goal to choose the next step from the conversation.
Start or continue tracked work with `harness claim <issue>`.

Some methods only you can start. Wayfinder is one. When a playbook reaches
such a step, the agent asks you to run it.

## What ships

- **Methods.** Matt Pocock's engineering skills under their original names,
  edited only where they meet the CLI. In Claude Code they sit under the
  plugin's namespace, for example `/harness:tdd`.
- **`interrogate`**, from Lauren Tan's pstack: a second review run on the other
  vendor's CLI. It needs that CLI installed and signed in, and stops with the
  fix if it is not.
- **The guide and its five playbooks**, which choose and order the methods.
- **`setup`**, which configures a repository.
- **The `harness` CLI**, with seven commands. Every command has `--help`; the
  [package README](https://github.com/Hsiang-LinC/agentic-dev-workflow/blob/main/packages/harness/README.md)
  has the usage.

## Finding the CLI

An agent finds `harness` in this order:

1. `harness` on `PATH`.
2. The path the hook injected at session start.
3. `bin/harness` three directories above a loaded skill's `SKILL.md`.

## Hooks

Two hooks add one line of context: at session start (start, resume, after
compaction) and when a subagent starts. The line says the repo uses Harness,
names the installed CLI path, and points to the `guide` skill and
`harness claim`. Your agent may ask you to trust the hooks first. Without
them, use the third lookup above.

## Upgrading from v1.1

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

## Versions

Releases have tags such as `v2.0.0` and a GitHub Release with notes that list
the changes and upgrade steps. Tags ending in `-dev.snapshot.N` or `-rc.N` are
candidates under test, not stable releases. Every tag records the source
commit it was built from.

## Verified so far

Codex PATH and hook events are verified in the installed acceptance run, not
yet here. Windows is not tested yet. Orchestra automation is deferred.

## License and feedback

Harness's own code is [MIT licensed](LICENSE). The methods keep their
[Matt Pocock MIT notice](.agents/skills/LICENSE-matt-pocock) and
`interrogate` keeps its [pstack MIT notice](.agents/skills/LICENSE-pstack).

Report bugs and requests in
[GitHub Issues](https://github.com/Hsiang-LinC/harness/issues).
