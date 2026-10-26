# Harness

Harness is a plugin for Claude Code and Codex. It gives your agent a set of
engineering methods (grilling, Specs, tickets, TDD, code review) and a small
CLI that records the work in Linear and delivers it through GitHub.

You describe what you want. The agent picks a route: shape an idea, fix a bug,
build a feature from a Spec, or a small change. It follows that route step by
step. Every step that writes Linear or GitHub goes through the `harness` CLI,
which checks the current facts first and refuses with the reason when a step
is not allowed yet: for example, merging before review has passed, or claiming
a ticket someone else holds. You keep the product decisions and the final
merge to your default branch.

## Requirements

- Node.js 22.12 or later
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

No `npm install` is needed. The CLI and its dependencies ship inside the
plugin.

## Set up a repository

Run setup once in each repository:

| Codex | Claude Code |
| --- | --- |
| `$setup` | `/harness:setup` |

Setup asks which Linear team and project to use, shows the files it will
write (tracker notes, triage labels, a policy file) and writes them only after
you confirm.

Then connect the two services:

- **Linear:** ask your agent to connect the Harness CLI to Linear. It runs
  `harness auth login` in the browser, or `harness auth import --stdin` for an
  API key. Type the key into your terminal, never into the chat.
- **GitHub:** run `gh auth login`.

## Use it

Start with the guide and say what you want:

| Codex | Claude Code |
| --- | --- |
| `$guide <goal>` | `/harness:guide <goal>` |

The guide picks a playbook, such as Shape, Bug fix, Feature or Small change,
and the agent copies its steps into the session's todo list, so you can see
what comes next. Run the guide with no goal to choose the next step from the
current conversation. A hook points the agent to the guide on its own for
requests that change the repository, but you can always call it yourself.

Some methods only you can start, because they need your answers. The grilling
in Shape is one. When a playbook reaches such a step, the agent asks you to run
it, for example `$grill-with-docs` in Codex.

## What's inside

- **Methods.** Matt Pocock's engineering skills under their original names,
  edited only where they meet the CLI. In Claude Code they sit under the
  plugin's namespace, for example `/harness:tdd`.
- **`interrogate`**, from Lauren Tan's pstack: a second review run on the other
  vendor's CLI (Codex from Claude Code, Claude Code from Codex). It needs that
  CLI installed and signed in, and stops with the fix if it is not.
- **The guide and its playbooks**, which choose and order the methods.
- **The `harness` CLI**, the only writer of tracked work. Run
  `node '<plugin-root>/bin/harness' --help`; every command has its own
  `--help`.

## Credentials

- Saved Linear credentials live in the OS credential store. Linux needs an
  unlocked Secret Service. There is no plaintext fallback.
- `harness auth status` shows what is configured without going online;
  `harness auth logout` removes it.
- In CI, set `LINEAR_API_KEY` or `LINEAR_ACCESS_TOKEN`. GitHub uses
  `GITHUB_TOKEN` or your `gh` login.
- Keep keys out of command-line arguments, chat and repository files.

## Hooks

The plugin adds one line of context at session start, on each prompt and when
a subagent starts. The line names the installed CLI path and says that changes
start from the guide. Your agent may ask you to trust the hooks first. Without
them, the plugin root is three directories above any loaded method's
`SKILL.md`, and the CLI is `bin/harness` there.

## Versions

Stable releases have plain tags such as `v1.0.0`. Tags ending in
`-dev.snapshot.N` are candidates under test, not releases. Every tag records
the source commit it was built from in a release metadata file at the root.

## License and feedback

Harness's own code is [MIT licensed](LICENSE). The methods keep their
[Matt Pocock MIT notice](.agents/skills/LICENSE-matt-pocock) and
`interrogate` keeps its [pstack MIT notice](.agents/skills/LICENSE-pstack).
Bundled native dependencies keep their own licenses.

Report bugs and requests in
[GitHub Issues](https://github.com/Hsiang-LinC/harness/issues).
