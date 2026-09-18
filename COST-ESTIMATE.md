<!-- deft:template -->
<!-- This is the canonical body for a project's COST-ESTIMATE.md, produced -->
<!-- by skills/deft-directive-cost/SKILL.md after spec approval and before -->
<!-- build kickoff. Methodology: ../references/cost-models.md.            -->

# Cost & Budget Estimate

> All figures in **US dollars (USD)**. Loose ranges, not exact numbers.
> Built from the approved project spec. If the spec changes, redo this
> estimate before building.

## TL;DR

This small Node.js health endpoint is expected to cost about $0 - $25 per
month for light public use. The biggest factor is traffic beyond a host's
free tier.

## What you will need to sign up for

A short, plain-English list of accounts the project needs. One line
each. Mark `(free tier OK)` where the free tier covers the typical
usage we expect.

- Cloud host (free tier OK)
- Domain name (optional; typical: $10 - $20 / year)

## Hosting & infrastructure

The recurring monthly cost of running the app. Pick the rows that
match the spec; delete the rest.

- **Hosting / app server**: estimated $0 - $20 / month
- **Domain & TLS**: ~$0 - $2 / month (annual domain cost spread out; TLS may be free)

## API & third-party fees

Per-call or per-event fees that scale with usage. Pick rows that
match the spec; delete the rest. State the **assumption** so the
reader can scale up or down.

Assumption: about 100 health checks per day and no paid third-party APIs.

- **Third-party API fees**: $0 / month

## Monthly band

Pull the rows above into a single estimate.

- **Low** _(quiet month / demo / internal use)_: ~$0 / month
- **Typical** _(everyday use as described in the spec)_: ~$5 / month
- **High** _(busy month / launch spike / growth)_: ~$25 / month

If the **high** band is much bigger than **typical** (more than about
10x), call out _why_ in the next section.

## Scale considerations

What would push this project from typical into high? Plain language
only. Examples to delete or replace:

Traffic spikes or a hosting plan without a free tier could move the app
from the typical band toward the high band.

## Build & maintenance time

A rough sense of effort, not a quote.

- **Build**: about 2 - 4 hours of focused work
- **Maintenance**: about 0 - 2 hours / month after launch

## Decision point

Pick **one**. The build phase will refuse to start until this is
recorded.

1. **Build** -- proceed to build with this cost expectation.
2. **Rescope** -- keep building but reduce cost first. List the spec
   changes, then redo this estimate.
3. **No-build** -- stop here. Record the reason below.
4. **Skip** -- skip the cost phase. Record a short reason
   (e.g. "hobby project, cost is not a concern", or "cost already
   estimated as part of parent project X").

### Decision recorded

- **Decision**: build
- **Date**: 2026-09-18
- **Recorded by**: ZaenKai
- **Reason** (required for skip / no-build / rescope): Not required for a build decision.

---

_This estimate is a snapshot. Vendor pricing changes over time. Redo
this file before any major scope change. Methodology lives in
[references/cost-models.md](../references/cost-models.md)._
