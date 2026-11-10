# Triage Labels

The skills speak in terms of five canonical state roles and two category roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Canonical role             | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

Every triaged issue also carries exactly one category role:

| Canonical role | Label in our tracker | Meaning                             |
| -------------- | -------------------- | ----------------------------------- |
| `bug`          | `Bug`                | Something is broken                 |
| `enhancement`  | `Feature`            | New feature or improvement          |

`/wayfinder` labels a map and its tickets. A separate table, so setting one never replaces a triage role:

| Canonical role         | Label in our tracker   | Meaning                             |
| ---------------------- | ---------------------- | ----------------------------------- |
| `wayfinder:map`        | `wayfinder:map`        | The map issue                       |
| `wayfinder:research`   | `wayfinder:research`   | Ticket: research                    |
| `wayfinder:prototype`  | `wayfinder:prototype`  | Ticket: prototype                   |
| `wayfinder:grilling`   | `wayfinder:grilling`   | Ticket: grilling                    |
| `wayfinder:task`       | `wayfinder:task`       | Ticket: task                        |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from these tables.

Edit the "Label in our tracker" column to match whatever vocabulary you actually use.
