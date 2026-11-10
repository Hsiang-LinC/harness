import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { access } from 'node:fs/promises';

const event = process.argv[2];
if (!['SessionStart', 'SubagentStart'].includes(event)) {
  throw new Error('Unsupported Harness hook event');
}
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const guide = join(root, '.agents/skills/guide/SKILL.md');
const cli = join(root, 'bin/harness');
await Promise.all([access(guide), access(cli)]);
const quote = value => process.platform === 'win32'
  ? `'${value.replaceAll("'", "''")}'`
  : `'${value.replaceAll("'", "'\\''")}'`;
const context = `This repo uses Harness. Use the \`guide\` skill to pick a route. The harness CLI is at ${quote(cli)}. Run \`harness claim <issue>\` to start or continue tracked work.`;
const output = JSON.stringify({ hookSpecificOutput: { hookEventName: event, additionalContext: context } });
if (Buffer.byteLength(output) > 16384) throw new Error('Harness installed entry context exceeds 16 KiB');
process.stdout.write(output + '\n');
