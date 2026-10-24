---
id: wayfinder
mode: Work still unclear that needs more than one session to decide
---

**Find the way through work too foggy for one session. Produce decisions, never deliverables, and hand over to Shape or `/to-spec`, never to implementation.**

1. `/wayfinder`, one session at a time: it charts the map, then claims and resolves one ticket per session. If charting finds no fog, stop and switch to Shape.
2. When a ticket wants the work done rather than decided, do not do it: that is the edge of the map. This holds even when the map's Notes ask for execution.
3. When the map has no open child ticket, hand over by its destination:
   1. A Spec: `/to-spec`.
   2. A decision with nothing to build: `/domain-modeling`, and commit it.
   3. Anything left to settle or build: Shape.

**Exit** when every sub-issue of the `wayfinder:map` issue is closed, each resolved one carrying the resolution comment `harness work resolve` posted. The handover counts as done by the next playbook's own exit facts.

**Reply:** one line naming the ticket resolved this session and the map's link, or, at exit, the map's link and where it was handed over.
