---
name: acceptance
description: "Check an installed candidate of a product against journeys a person wrote, and save the verdict. Use for \"accept this release\" or \"run the acceptance journeys\"."
disable-model-invocation: false
---

# Acceptance

Check one candidate against the journeys a person wrote. Change no product code: report findings, never fix them. Never write the journeys or expectations yourself; they are the person's intent.

The work (`harness read <issue>`) must name the candidate (a version, commit or package), how to install it fresh, and the journeys with each expectation observable from outside. Ask the person for what is missing.

1. **Install.** A fresh subagent, given only the work, installs the candidate in a new disposable clone outside every working tree and returns the clone's path, the identity the product reports, the CLI's path, its resources and every command with its output. A different identity is `FAIL`: go to step 4.
2. **Drive.** A second fresh subagent that did not install it drives each journey with the [verifier prompt](verifier.md) and returns a verdict per criterion with evidence.
3. **Judge.** Rerun step 2, at most twice, for a criterion without a verdict. `PASS`: every criterion holds. `PASS+NOTES`: all hold, but the verifier found a defect or doubt no criterion names. `FAIL`: a criterion fails or could not be checked.
4. **Report.** Save it with `harness review save --target <issue> --file <report>`: `kind: acceptance`, `verdict` (`pass` for both PASS forms, else `fail`), `reviewer`, `findings`, and in `text` the candidate, each criterion's verdict and evidence. Remove the clone and its resources.

The person who wrote the journeys decides on a `FAIL` or `PASS+NOTES`, never the verifier or you; their acceptance, in their words, goes in a report's `text`.
