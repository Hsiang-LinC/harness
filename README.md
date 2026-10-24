# Harness

Requires Node.js 22.12+, Git, GitHub CLI (`gh`), and a Linear account.

## 1. Install

### Codex

```sh
codex plugin marketplace add Hsiang-LinC/harness
codex plugin add harness@harness
```

### Claude Code

```text
/plugin marketplace add Hsiang-LinC/harness
/plugin install harness@harness
```

## 2. Run setup

Open your project and run:

- **Codex:** `$setup`
- **Claude Code:** `/harness:setup`

Setup configures your Linear project and repository workflow. Connect the
Linear integration in your agent and provide the team and project to use.

## 3. Connect Linear and GitHub

Ask your agent to connect the Harness CLI to Linear using your Linear API
key. Enter the key locally; do not paste it into chat or commit it.

Sign in to GitHub:

```sh
gh auth login
```

Once configured, start work with `$guide <goal>` in Codex or
`/harness:guide <goal>` in Claude Code.
