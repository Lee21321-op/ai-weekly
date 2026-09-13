---
name: news
description: "Collect, verify and publish AI news when asked to ‘收集AI咨询’, ‘收集AI资讯’, ‘整理AI新闻’, or create/update an AI briefing website. Follow search, verification, template-based webpage generation and deployment in order. Build once; reuse structured data, evidence and automation for subsequent editions."
---

# NEWS

Create a traceable AI-news edition without inventing facts, dates, sources, images, or deployment status. Build the site once; default subsequent editions to structured-data updates using the existing template.

## Reuse and cost control

- Inspect the existing data, source registry, evidence ledger and deployment configuration with targeted reads. Avoid repeatedly loading complete source files, pages or logs into context.
- Reuse existing tools and scripts for mechanical checks; the model selects stories, judges evidence and writes summaries. Implement missing reusable checks only when the actual project workflow requires them, and run new scripts before claiming they work.
- Batch independent reads and checks within a step. Keep the four steps sequential. Reuse checks for unchanged inputs within the run; repeat checks only after a relevant change, failure or new concern.
- Record stage elapsed time, candidates searched, stories selected, cache hits and build count when available. Report Token usage only from actual usage telemetry; do not invent measured savings.
- These instructions specify future execution. Do not claim the existing website already has data separation, scripts or caching without inspecting and implementing them. A request to edit this skill does not require migrating or publishing the website.

## Mandatory execution contract

Execute Step 1 through Step 4 in order. Do not begin a later step before the preceding step is complete. State the active step in concise commentary. If a required confirmation or credential is missing, pause at that step and request it; do not skip ahead.

Apply these defaults unless the user overrides them:

- Select exactly 8 stories: 4 mainland-China sources and 4 overseas sources.
- Cover major public channels such as OpenAI, Google, Microsoft, Anthropic, Baidu, Tencent, Zhihu, Weibo, WeChat official accounts, Bilibili, established Chinese technology media, and authoritative overseas media.
- Interpret dates and “latest” in Asia/Shanghai. Use the latest complete requested edition date and never disguise older material as current.
- Preserve source-page article images in their original color. Never replace them with generated, similar, or unrelated images.

## Step 1 — Search news

1. Determine the requested edition date, topic scope, source split, and output location from the request and existing project context. If the date is unspecified, use the current Asia/Shanghai calendar day and state the cutoff time.
2. Inspect the existing site and source ledger before changing anything.
3. Start with the project's fixed reliable source registry: RSS, first-party news/update pages and reputable mainland/overseas reporting. Aim initially for 12–16 candidates for an eight-story edition. This is a search target, not a reason to accept weak evidence. Supplement with targeted searches only for missing coverage or failed candidates; do not restart broad searches each time.
4. Record for every candidate: headline, publisher, region, canonical URL, publication timestamp and timezone, article-image URL, key claims, and supporting links.
5. Do not use search-result snippets as final evidence. Open the source page.

Complete Step 1 with a candidate shortlist for validation. If qualified material remains insufficient after targeted follow-up, report the shortfall instead of silently widening dates or filling quotas. Deduplicate by event as well as URL; a domestic and overseas retelling of the same event are not two distinct selected stories.

## Step 2 — Validate sources and timeliness

For each candidate:

1. Confirm that the canonical page loads and actually contains the claimed information.
2. Verify the publication date and time from page metadata, RSS/API data, or an equally direct record. Convert timestamps to Asia/Shanghai and retain the original timezone. Display “未披露” when exact time is unavailable.
3. Prefer first-party confirmation for product releases and corporate actions. Use an independent second source for important claims when available.
4. Separate confirmed facts from company claims, media reports, rumors, and interpretations. Use explicit labels such as “多源核验”, “一手核验”, “来源核验”, or “报道核验”.
5. Extract the exact source-page `og:image`, article image, or channel thumbnail. Download it without recoloring or regenerating it, and compare URL, dimensions, byte size, or hash when practical.
6. Reject stale, duplicated, inaccessible, incorrectly dated, weakly sourced, or image-mismatched candidates.
7. Create or update a source ledger containing URLs, timestamps, image origins, verification steps, and unresolved limitations.

Automate field completeness, date range, regional counts, duplicate detection, link status and image-format checks where existing scripts support them. HTTP 200 alone does not establish truth: inspect the article content and detect login pages or soft 404s. Reprints of one report are not independent confirmation.

Cache evidence by canonical URL with fetchedAt, publication evidence, content hash or ETag/Last-Modified, and image provenance. Reuse unchanged evidence within this run. Across editions, recheck selected sources and use conditional requests where supported; reread revised, disputed or consequential claims. Cached evidence is not permanent verification of new articles. Match image signatures, extensions and MIME types; verify decoding and preserve original bytes and color.

Write final content into the project's existing structured data format, or establish news.json during the first data-separation migration. Include edition ID, timezone, date range/cutoff and stories. Each story needs a stable ID, region, publisher, title, background, summary, canonical URL, original publication timestamp/date and precision, source/local image URLs, image MIME/hash, verification level, evidence links, checkedAt and limitations. Never invent midnight for date-only sources. Refreshing checkedAt must not change the article's publication date.

Complete Step 2 only when every selected story has a defensible date, source, summary, image provenance, and verification boundary. Never fill a quota with unverified material.

## Step 3 — Reuse the template and generate webpage

1. For routine editions, reuse the existing layout, style, interactions and data schema. Update only news.json or the equivalent data file and new images. Do not redesign pages, regenerate components or create visual alternatives unless the user requests a redesign.
2. For the first website or an explicitly requested redesign, independently choose the style and generate immediately without seeking style approval. Default to a premium black-and-white interface, original-color source images and purposeful emoji. Separate news data from presentation and build a reusable data-driven template. If a legacy site hardcodes news in components, perform the smallest necessary data-separation migration during the first actual update, verify behavior, and reuse it afterward.
3. For every story, organize time, background, content summary, source channel, source links, original image, verification record, and limitations.
4. Keep only functional interactions. Search, region filters, story selection, detail close/reopen, and external links must work; remove decorative or unfinished controls.
5. Ensure responsive layout, readable Chinese typography, meaningful alt text, keyboard access, and no broken assets.
6. After all edits, run one consolidated data check, production build and applicable tests. Preview the rendered edition and check dates, counts and image loading. Perform full interaction checks for first builds, data-separation migrations or interaction changes; routine data updates do not require repeating unrelated full regression checks. Diagnose failures and rerun only affected checks. Avoid a build per story or unnecessary server restarts.

Complete Step 3 only after the generated webpage builds successfully and the visible experience has been checked. Style confirmation is not a prerequisite for this step or for proceeding to Step 4.

## Step 4 — Deploy website

1. Confirm the authorized repository or hosting target. If none is provided, request it before making external changes.
2. Adapt the production base path and asset URLs for the hosting environment. For a GitHub project site, use the repository subpath for scripts, styles, and every image.
3. Reuse the existing automatic build/deploy workflow. Configure it once if missing, including data validation, production build and deployment. Reuse Step 3's successful local production checks for unchanged inputs rather than building again; the clean CI build remains required by the workflow.
4. Commit and push only the intended site files. Preserve unrelated user changes and never expose credentials.
5. Monitor deployment to a terminal state using a status-wait mechanism or progressively longer polling intervals, not rapid repeated polling. Push only necessary changes; do not create empty commits without a concrete deployment-recovery reason. If a one-time hosting setting is missing, report that precise blocker instead of repeatedly resubmitting.
6. Once deployment succeeds, perform one consolidated online acceptance check: page, current JavaScript/CSS and every displayed image, plus actual rendering of edition date, story counts, regional split and decodable images. Recheck only failures or newly changed items. Save results in the deployment record.
7. Report the public URL, repository commit, test results, and any remaining limitations. Do not claim deployment success while the workflow is queued, running, failed, or the public URL returns an error.

## Output standard

Keep an evidence trail in the project. Clearly distinguish verified, partially verified, blocked, and deployed states. If evidence conflicts, describe the conflict and choose the more conservative wording. Reduce cost through bounded search, cached evidence, data/template reuse and scripted checks, never by weakening source validation.
