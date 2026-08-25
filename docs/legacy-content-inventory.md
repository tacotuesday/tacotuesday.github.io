# Legacy content inventory

Reviewed on 2026-08-25 before the first Astro deployment.

## What is on `main`

- There are no files under the old Jekyll `_posts/` collection, so the current `main` branch does not contain published blog articles.
- Four user-authored project writeups remain in `_projects/`. The Astro site preserves them as clearly labeled earlier learning work under `/archive/`, and their former public URLs remain usable.
- Gallery, video and older post files found in early theme commits are stock template material rather than portfolio articles. They remain recoverable from Git history but should not be migrated as Grafton-authored writing.

## Writing on another branch

The remote branch `origin/ts_traditional_methods` contains one unfinished manuscript:

- `_projects/mastering-classical-ts-methods.md` — “Mastering Classical Time Series Methods for Real-World Forecasting Challenges”

It is not present on `main` and will not be included in an Astro deployment from `main`. Before deleting that branch, copy and edit the manuscript as `src/content/writing/mastering-classical-time-series-methods.mdx` with `draft: true`. Its current draft contains notebook reminders, generic image markup and statements that need review before publication.

## Safe preservation sequence before deployment

1. Keep the current remote branches until every desired manuscript has been inventoried.
2. Copy user-authored articles into `src/content/writing/` with `draft: true`; draft content does not generate public routes, navigation, RSS or sitemap entries.
3. Preserve the last pre-Astro `main` commit with a clearly named archival branch or tag if desired.
4. Build locally and inspect `dist/` before approving any push.
5. Push archival refs and the Astro migration only with explicit approval.

Git history protects committed files, but a draft copy on `main` is easier to find, edit and eventually publish than content left only on an old branch.
