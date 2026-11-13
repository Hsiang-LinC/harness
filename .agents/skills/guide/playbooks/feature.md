---
id: feature
mode: New or changed behavior
---

1. **Confirm the basis.** Entry: a work to build. Check that its Deliverable and Acceptance are clear. If not, use Shaping. Output: a clear definition.
2. **Design and break down.** Entry: the work is too big for one PR. Skills: codebase-design, to-tickets. Output: child works, with a breakdown review; the parent's `Deliverable:` becomes `breakdown`.
3. **Implement.** Entry: one work fits one PR. Skills: implement, tdd, pr. Output: committed code and a PR linked to the work (`Closes <issue>`). One work has one open PR at a time; a piece delivered separately becomes its own work.
4. **Code review.** Entry: the PR is open. Two axes; if the basis changed since a review, judge whether to review again. Output: reports saved with `review save`. Then return to the calling playbook's Exit.
5. **Deliver.** Entry: the review passed. Bring the PR to where it can merge, as you would for any PR: threads answered, checks run and green. With the person's authorization, `complete --merge`. Without it, `leave` and wait. Then return to the calling playbook's Exit.

**Exit:** the PR is merged and the work completed, or it waits for authorization.
