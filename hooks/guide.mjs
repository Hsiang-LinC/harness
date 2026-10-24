import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { access } from 'node:fs/promises';

const event = process.argv[2];
if (!['SessionStart', 'UserPromptSubmit', 'SubagentStart'].includes(event)) {
  throw new Error('Unsupported Harness hook event');
}
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const guide = join(root, '.agents/skills/guide/SKILL.md');
const cli = join(root, 'bin/harness');
await Promise.all([access(guide), access(cli)]);
const quote = value => process.platform === 'win32'
  ? `'${value.replaceAll("'", "''")}'`
  : `'${value.replaceAll("'", "'\\''")}'`;
const context = `Harness: a request that changes this repository or moves tracked work (an issue or pull request) starts from the guide skill (${JSON.stringify(guide)}), which picks the playbook or method; Linear writes go through the Harness CLI whenever it has the operation, installed at node ${quote(cli)} (start with --help). Read-only questions do not need the guide.`;
const output = JSON.stringify({ hookSpecificOutput: { hookEventName: event, additionalContext: context } });
if (Buffer.byteLength(output) > 16384) throw new Error('Harness installed entry context exceeds 16 KiB');
process.stdout.write(output + '\n');
