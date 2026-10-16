# Detection Bench

Replay two thresholds against the same labeled events and inspect every false alert and miss.

**Field:** Security analytics & detection  
**Relevant roles:** Junior Detection Engineer · Security Data Analyst  
**Status:** working prototype, published on GitHub and Vercel.

[**Open the live interactive lab**](https://detection-bench.vercel.app/)

The hosted lab runs synthetic exercises in your browser. See the scope below for local integration exercises and limitations.

## Run

Requires Node.js 22 or newer. The core prototype has no npm dependencies.

```sh
npm test
npm run build
npm start
```

Open `http://127.0.0.1:8767`. Use `PORT=8770 npm start` for another port.
To run analysis without a browser:

```sh
npm run analyze
node run.mjs input.json
```

## Explore

1. Compare thresholds 3 and 5. Inspect the false-positive and missed-event tradeoff.
2. Change the time window and rerun the same labels.
3. Use the evidence view to find the exact events behind each TP, FP, FN, and TN. Null means a metric had no denominator.

## What is implemented

- A project-specific analysis engine shared by the browser and CLI.
- Guided controls plus editable/importable JSON input (maximum 1 MB).
- Computed decisions, supporting records, explicit empty/error states, and
  downloadable evidence containing the input and limitations.
- Individual visual identity: Amber signal instrument, with self-hosted Source Code Pro and IBM Plex Sans, a custom masthead, readable type, visible keyboard focus, and responsive data views.
- Independent boundary and regression tests in `tests/`.

## Scope and limitations

This is event-level replay on synthetic labels. It is not a production detection benchmark, an incident-level recall estimate, or a SIEM integration.

All bundled identities, documents, logs, and advisories are fictional. Browser
inputs are visitor-controlled; this public demo is not a trusted security
boundary. Do not use it with private production data. Local enforcement or
provider runners, where provided, have their own documented setup and limits.
Do not report fixture outcomes as production results or live-model findings.

## Publish independently

This directory is a complete, separate GitHub/Vercel project. After creating a
repository, push this directory as its root. Import that repository in Vercel:
framework **Other**, build command **npm run build**, output **public**.
There are no required secrets for the public demo. Do not include `public/`,
`.env`, provider credentials, or actual investigation evidence in Git.

## Structure

- `web/engine.js`: domain-specific analysis and validation
- `web/runtime.js`: input validation, canonicalization, and hashing utilities
- `web/app.js`: accessible controls, result views, imports, and exports
- `tests/`: independently asserted security and behavior tests
- `docs/THREAT-MODEL.md`: trust boundaries and claims
- `scripts/`: optional local integrations, if applicable

## Validation

Run `npm test` for current results. Browser viewport checks and performance
metrics must be measured separately; passing engine tests does not establish
visual accessibility or production readiness.

Font notices are included in `web/fonts/`. Source code is MIT licensed.

## Import labeled JSONL

`node scripts/import-events.mjs events.jsonl input.json` converts one event per
line into experiment input. Required fields: `id`, `actor`, numeric `time` in
seconds, `type` (`login_failure` or `login_success`), and an independently
supplied boolean `malicious` label. The importer never creates labels from the
rule output. Run `node run.mjs input.json` to evaluate the imported events.

## Visual identity

See [DESIGN.md](DESIGN.md) for this project’s typography, palette, header, and composition.
