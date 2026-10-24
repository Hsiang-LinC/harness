# Harness

Engineering methods with tracked work in Linear and delivery in GitHub.
The public marketplace is [Hsiang-LinC/harness](https://github.com/Hsiang-LinC/harness).
This is a prerelease snapshot, not the stable 1.0 release. In Codex:

```sh
codex plugin marketplace add Hsiang-LinC/harness
codex plugin add harness@harness
```

Start with the `setup` skill to configure a consumer repository,
and use the `guide` skill to choose a method. Methods keep their original names
under the plugin's namespace (for example `harness:tdd` in Claude Code).

Invoke `/harness:guide <goal>` in Claude Code or `$guide <goal>` in Codex at
the start or during work. With no goal, it uses the current conversation to
choose the next playbook or method. You can invoke it yourself even when the
agent has not selected it automatically.

The methods are Matt Pocock's engineering skills, edited only where they meet
the `harness` CLI; they keep their [MIT notice](.agents/skills/LICENSE-matt-pocock).
`interrogate` is Lauren Tan's, from pstack, edited to run its second reviewer
on the other vendor's CLI; it keeps its [MIT notice](.agents/skills/LICENSE-pstack).
It needs that CLI installed and signed in (Codex from Claude Code, Claude Code
from Codex) and stops with the fix when it is not.

The CLI requires Node 22.12 or later and Git/gh for applicable GitHub operations.
Run `node '<installed-plugin-root>/bin/harness' --help`; each command has `--help`.
The product includes JavaScript and native credential-store dependencies; no
npm install is needed. Use `auth login` for configured browser PKCE, or explicitly import a Linear key with `auth import --stdin`,
inspect `auth status` or remove it with `auth logout`. Saved credentials use the
OS store; Linux needs an unlocked Secret Service. Native calls have deadlines
and fail without plaintext fallback. CI may explicitly set one of
`LINEAR_API_KEY` / `LINEAR_ACCESS_TOKEN`. GitHub uses `GITHUB_TOKEN` or `gh auth`.
Keep credentials out of argv, chat and repository files. Browser login requires the registered public client ID and exact loopback
callback; `auth login --help` shows overrides. Saved OAuth credentials refresh
under a crash-released per-credential native lock. Status stays offline; an
expired recovery window requires login again. If the app is not configured,
the CLI explains that prerequisite and retains explicit key import.

SessionStart, UserPromptSubmit and SubagentStart hooks add one line: a request
that changes the repository or moves tracked work starts from the guide, Linear
writes go through the CLI where it has the operation, and where it is installed. Installation
alone does not enable trusted hook execution. If hooks are unavailable, the
plugin root is three directories above a loaded method's `SKILL.md`; run
`node '<root>/bin/harness' --help` there. No shell PATH or development checkout
is required.

## License and feedback

Harness's own delivered code is [MIT licensed](LICENSE). The third-party notices
linked above and licenses alongside bundled native dependencies remain applicable.
Report bugs and requests in [GitHub Issues](https://github.com/Hsiang-LinC/harness/issues).
Maintainers triage actionable work into Linear; GitHub Issues is the public
conversation and Linear owns internal work management.
