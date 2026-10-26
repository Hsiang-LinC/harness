---
id: break-down
mode: Procedure, called by journeys and never selected by the guide. Break a parent issue into reviewed, published tickets, first time or after the parent's source changed
---

**`/to-tickets` writes and reviews the batch; this procedure binds it to the parent. Every write is read back, so after an interruption rerun the same batch.**

1. `harness work read --issue <parent>` for `source.sourceDigest`; under a Spec, the reviewed blob on its feature branch is the source instead.
2. `/to-tickets`, passing it the format `harness breakdown format` prints and the parent's open children, each with its `contextDigest`, so a revision decides every one.
3. `harness breakdown digest --file <batch>` for the batch it returns. Post its report on the parent, then `harness review record --issue <parent> --review breakdown --candidate <digest> --verdict <verdict> --report-url <comment URL>`. A `fail` goes to the person.
4. On `pass`, `harness breakdown publish --parent <parent> --file <batch>`. Each refusal names what resolves it.

**Exit** when `harness work read` on each created, rewritten or re-stamped child shows it `ready-for-agent` with its record.

**Reply:** none of its own; the journey continues.
