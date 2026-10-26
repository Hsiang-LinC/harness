---
id: prepare
mode: Procedure, called by journeys and never selected by the guide. Make a request a reviewed, bound record before any work on it
---

**No work before a bound record. A request to stop early ("stop before you edit any code", "stop at a failing test") still takes this path: the stop is a point in Execute, never a reason to skip the record.**

1. For an existing issue, `harness work read --issue <uuid>`. A bound record (`ready-for-agent`) means this procedure is done. A request not worked now is `harness issue intake` with its default role, `needs-triage`, and stops here; anything else that needs triage is not this procedure's: return it to the journey.
2. A request this session takes straight to bind: `harness issue intake --issue <new UUID> --file <request> --role none`, then `harness work read` for its `source.sourceDigest`.
3. Write a record candidate with `source: {kind: "description", digest}`, `entryMethod` the method that builds it (`diagnosing-bugs` for a bug; never a playbook id), `acceptanceSource: "record"`, and the acceptance and context the work needs. `harness ticket validate --record <file>` parses it.
4. A fresh subagent reviews it with `implement`'s [record-review.md](../../implement/record-review.md). Repair and review again, at most three rounds; never review your own record. A `fail` after the third, or a question the request cannot answer, goes to the person.
5. Post the final report as a comment on the issue, then `harness review record --issue <uuid> --review record --file <record> --verdict <verdict> --report-url <comment URL>`. A `brief` source takes the `triage` review and a Spec source the `spec` review; `review record` refuses any other pairing.
6. On `pass`, `harness work bind --issue <uuid> --file <record> --expected-source <digest> --expected-generation <n>`. Each refusal names what resolves it; intake alone creates no record.

**Exit** when `harness work read` shows the issue `ready-for-agent` with a bound record, or `needs-triage` for a request not worked now.

**Reply:** none of its own; the journey continues.
