---
id: shaping
mode: Settle a goal or decision and deliver it as a document
---

1. **Clarify.** Entry: a goal or open question. Skills: grilling, wayfinder. Output: decisions kept; a decision saved with `leave --output decision=...`.
2. **Explore.** Entry: a question needs facts. Skills: research, prototype. Output: findings saved with `leave --output research=...`.
3. **Synthesize.** Entry: the decisions are enough. Skills: to-spec, domain-modeling, or `update` to state the work definition. Output: the document.
4. **Open the document PR.** Entry: the document exists. Open it (draft allowed) with `Delivers: <issue>` in the body, before the review. One work has one open PR at a time. Output: the PR; the review report is saved on it.
5. **Evaluate.** Entry: the PR is open. An independent document review of the PR. Handles:
   - (doc, complete.reviewed, doc), (doc, merge.reviewed, doc), (doc, review.round-authorized, doc)
   - (pr, complete.reviewed, doc), (pr, merge.reviewed, doc), (pr, review.round-authorized, doc)
   - (doc, merge.reviewed, threads)

   Output: a saved `review save` report. Then return to the calling playbook's Exit.
6. **Deliver.** Entry: the review passed. With the person's authorization, `complete --merge`. Without it, `leave` and wait. Handles:
   - (doc, complete.delivered)
   - (doc, merge.authorized)
   - (doc, merge.integrated)

   Output: the merged document and a completion record.

**Exit:** the agreed Deliverable is delivered, or the decision not to continue is saved.
