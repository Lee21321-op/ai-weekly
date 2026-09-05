# Design QA v4

- visual direction: premium black-and-white three-column layout
- content edition: 2026-09-04
- required source split: mainland China 4 / overseas 4
- source images: exact source-page images, original color
- overseas sources: OpenAI / Google / Microsoft / NVIDIA

## Required surfaces

- Left rail shows the edition date and an explicit `国内 4 / 海外 4` count.
- Domestic and overseas filters are real controls and each returns exactly four stories.
- Every row shows `09-04`; pages without an exact publication time display `未披露` rather than an invented time.
- Every detail panel separates background, content, source channels, original image, verification steps and limitations.
- The close button collapses the dossier; selecting a story reopens it.
- No history, preferences, favorites or decorative verification controls remain.

## Verification targets

- Build must emit `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
- Sites worker tests must pass.
- Eight local news images must load with non-zero file size.
- Every main source and original-image URL must return a successful response at final check.
