---
id: autonomous-run
mode: Run the child works of a parent without stopping
---

1. **Read and delegate.** Entry: a parent work. `harness read <parent>` for its children and dependencies. Write the delegated scope and the stopping points into `leave --handoff` on the parent. Output: the handoff.
2. **Pick the frontier.** Entry: children are ready. Choose the children with no open dependency. If one needs a human decision, record it in that child's handoff and do another. Output: the next child.
3. **Run each child.** Entry: a child is chosen. `harness claim` it and apply the playbook that fits its goal: Shaping, Feature, Bug fix or Refactoring. Output: that playbook's Exit.
4. **Stop for authorization.** Merging and a fourth review round need the person's authorization. Stop there, `leave`, and go on to other children.
5. **Report.** Entry: nothing more can proceed. Say what is complete, blocked and waiting for authorization.

**Exit:** all works in the authorized set are complete, or stopped where a person must act.
