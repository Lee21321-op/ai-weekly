# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

## Confirmed product direction

- Keep the selected three-column AI intelligence layout: left navigation, central feed, right verification dossier.
- Use a premium black-and-white interface, but preserve source-page news images in their original color.
- A displayed article image must be the exact image declared by the verified source page. Never substitute a generated or unrelated image; omit the image when it cannot be verified.
- Use a small number of purposeful emoji as friendly channel/status markers.
- Treat “latest” as the current calendar day in Asia/Shanghai; show the timezone and do not mix older items into the daily feed without a visible date group.
- Prefer mainland Chinese public sources for the primary link, then add first-party or research sources as a verification chain.
- Keep each selected edition at exactly eight items: four mainland Chinese sources and four overseas sources.
- Do not keep decorative controls. Every visible button must work; otherwise remove it. The detail close button must actually collapse the dossier and selecting a story must reopen it.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
