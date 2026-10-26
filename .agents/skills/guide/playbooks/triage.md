---
id: triage
mode: Raw issues you did not create (bug reports, incoming requests) to decide whether and how each is worked
---

**Triage decides; the role an agent works from comes only from binding a reviewed brief.**

1. `harness work read --issue <uuid>` for each issue in hand. A request the user wants worked now that is not yet an issue is first `harness issue intake --issue <new UUID> --file <request> --role none`.
2. `/triage` the issue. Before it writes a brief, rerun `harness work read` after its last edit to the issue and pass that `source.sourceDigest`. Once the maintainer agrees its category: `harness issue categorize --issue <uuid> --category bug|enhancement`, never through the connector.
3. For `ready-for-agent`, `/triage` returns a brief record, its verdict and report: [Prepare](../procedures/prepare.md) from step 5, which records the `triage` review and binds on `pass`. A `fail` leaves the issue `needs-triage`.
4. Any other role, or a close, as `/triage` and the issue tracker's paths say, confirming each change with the maintainer.

**Exit** when `harness work read` shows each issue in hand with the role triage chose (`ready-for-agent` with a bound record, or another role) or closed.

**Reply:** one line per issue: its link, its role, and what waits on whom.
