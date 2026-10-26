---
name: implement-spec
description: "Implement the result of /to-spec and /to-tickets in code."
disable-model-invocation: false
---

You have been provided a spec. This spec should have tickets associated with it, describing how to implement the spec.

The issue tracker should have been provided to you. If not, tell the user to run `/setup`.

The goal is the entire spec delivered on its single **integration branch**, every ticket completed.

The tickets are not a list of steps. They are a **task graph** with blocking relationships between them. This means there is always a **frontier** of tickets which are ready to be grabbed.

This is the entry to the guide's Autonomous run journey with this spec's ticket graph as its scope, run in parallel by frontier. Open that journey and follow it: it states the predicate and the writes the user authorizes, dispatches **implementer subagents** to the frontier, and reports the final pull request and the spec issue's state.
