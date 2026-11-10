---
name: implement-spec
description: "Implement the result of /to-spec and /to-tickets in code."
disable-model-invocation: false
---

You have been provided a spec. This spec should have tickets associated with it, describing how to implement the spec.

The issue tracker should have been provided to you. If not, tell the user to run `/setup`.

The goal is the entire spec delivered, every ticket completed with its own pull request back to main.

The tickets are not a list of steps. They are a **task graph** with blocking relationships between them. This means there is always a **frontier** of tickets which are ready to be grabbed.

This is the entry to the guide's Autonomous run playbook with this spec's tickets as its scope. Open that playbook and follow it, dispatching **implementer subagents** to the frontier in parallel; stop where it says a person must authorize or act.
