# Grafton Cook portfolio

Static Astro 6 portfolio for [tacotuesday.github.io](https://tacotuesday.github.io). The public site positions Grafton Cook as a data scientist and data engineer building forecasting and decision systems from messy operational data.

The default production build is intentionally honest while current work is being developed: it publishes positioning, the current ML-engineering practice focus, a clearly marked Forecasting Frontier Lab holder, focus areas, About, archive and infrastructure pages without pretending that unfinished case studies exist. `/showcase/` is a clearly labeled, noindex design demonstration populated with illustrative content. Showcase data is stored outside all production collections and is excluded from RSS and the sitemap.

## Stack

- Astro 6 static output with strict TypeScript
- `@astrojs/mdx` and typed content collections
- CSS custom properties; automatic light and dark modes
- No content-page client JavaScript
- Vitest, Playwright, axe, built-output validation and Lighthouse budgets
- GitHub Actions checks and GitHub Pages artifact deployment

## Local development

Requires Node 22.19 or newer.

```bash
npm install
npm run dev
```

The local URL is normally `http://127.0.0.1:4321/`.

Run the complete local quality suite:

```bash
npm run format:check
npm run lint
npm run check
npm run test:unit
npm run build
npm run test:e2e
npm run test:lighthouse
```

`npm run ci` runs those gates in sequence. Playwright uses an installed Chrome locally; CI installs Chromium.

## Site configuration

The production URL defaults to `https://tacotuesday.github.io`. Set `SITE_URL` at build time to change canonical, Open Graph, sitemap and structured-data origins for a future custom domain:

```bash
SITE_URL=https://data.example.org npm run build
```

The existing Google Analytics identifier is retained but disabled for local builds and checks. Set `PUBLIC_ENABLE_ANALYTICS=true` only for an intentional production build. The deployment workflow does this explicitly; no new tracker was added.

## Publishing a project

Projects live in `src/content/projects/` as `.md` or `.mdx`. Copy [`docs/content-templates/project.mdx`](docs/content-templates/project.mdx), then:

1. Rename it to the exact lowercase slug, such as `fleet-signals.mdx`; the filename and `slug` must match.
2. Put the real cover, screenshot and architecture image under `public/media/projects/<slug>/`. Use responsive AVIF/WebP for screenshots and a static SVG for architecture when appropriate.
3. Replace every template value. Describe public or synthetic data, limitations, failure modes and non-goals explicitly.
4. Add only measured results. Every metric requires a value, method and measurement date; add a public source URL when one exists.
5. Keep `draft: true` while editing. Run `npm run validate:content`, `npm run check` and `npm run build`.
6. Set `draft: false` only when images, alt text, links, repository evidence and the full case-study record are ready.

The project renderer fixes the case-study order: outcome, screenshot, problem, constraints/non-goals, architecture, data controls, modeling/evaluation, deployment, operations, verified results, limitations/next decisions and source links. The MDX body is optional and appears before the final links section.

Set `featured: true` to make a published project eligible for the homepage. A published project automatically adds Work to the primary navigation.

## Publishing an article

Writing lives in `src/content/writing/`. Copy [`docs/content-templates/writing.mdx`](docs/content-templates/writing.mdx), then:

1. Match the filename and `slug`.
2. Supply the title, description, publication date, tags and optional update/canonical URL.
3. Write the note in Markdown or MDX with a useful heading structure and descriptive image alt text.
4. Keep `draft: true` until review is complete; run the content validator, Astro check and build.
5. Set `draft: false` to publish.

Published writing appears at `/writing/<slug>/`, in reverse chronological order on `/writing/`, on the populated homepage and in `/rss.xml`. Publishing the first article automatically adds Writing to the primary navigation.

### Preserving writing without publishing it

Keep an article in `src/content/writing/` with `draft: true`. Draft entries remain versioned and schema-checked but are excluded from generated article routes, navigation, the homepage, RSS and the sitemap. Preserve an old slug before moving a previously public article; add a static redirect only when its replacement should be public.

The pre-revamp content inventory is documented in [`docs/legacy-content-inventory.md`](docs/legacy-content-inventory.md). One unfinished time-series manuscript currently exists only on `origin/ts_traditional_methods`; copy it into a draft writing entry before deleting that branch. Creating or pushing an archival branch or tag is a separate remote action and should be reviewed explicitly.

## Publishing a Lab app

Lab metadata lives in `src/content/lab/`. Copy [`docs/content-templates/lab.mdx`](docs/content-templates/lab.mdx), then:

1. Match the filename and `slug`.
2. Describe the small tool honestly and list its status and technology.
3. Add an optimized cover image under `public/media/lab/` with precise alt text when the app should have a visual preview.
4. Provide a real repository URL, app URL or both. Standalone static apps should be deployed from independent GitHub project repositories/sites; this portfolio links to them.
5. Keep `draft: true` until the linked destination exists and has been reviewed.
6. Set `draft: false`; use `featured: true` to include it in the homepage Lab selection.

Publishing the first Lab entry automatically adds Lab to the primary navigation. There is no empty “coming soon” state.

## Switching from placeholder to populated production

There is no presentation flag to remember. The production homepage and navigation derive their state from the three collections:

- With zero non-draft entries, the current practice presentation and Forecasting Frontier holder remain.
- Publishing projects, writing or Lab entries reveals the corresponding navigation and homepage sections automatically.
- Mark up to three projects and Lab entries `featured: true` for the populated homepage selections.
- Publishing the first featured Lab entry replaces the Forecasting Frontier holder automatically.
- `/showcase/` always remains an isolated, noindex preview. Do not move its example records into a production collection.

## Content safety gate

`npm run validate:content` fails a published entry that contains lorem ipsum, an example metric, template markers, placeholder or blank URLs, blank image alt text, a missing image, or a slug/filename mismatch. Astro schemas validate all required fields and URL shapes. `npm run check:dist` then scans the built site for broken internal links, broken images, missing canonicals, fixture leakage, missing showcase noindex tags and first-party content-page JavaScript.

## Archive and old URLs

The four previous projects are retained under `/archive/` as earlier learning work using fictional, supplied, generated or synthetic scenarios. Their old `/projects/...` and `.html` URLs redirect to the matching archive record. Previous blog, gallery, video, contact, tags and elements URLs also remain usable through static redirect pages.

The old Jekyll source remains in Git history and is not part of the Astro output. Audit and migration decisions are recorded in [`docs/revamp-notes.md`](docs/revamp-notes.md).

## Deployment

`.github/workflows/pages.yml` runs all checks, builds a Pages artifact and deploys only after a push to `main` or an explicitly dispatched workflow. No deployment, DNS, repository setting or remote profile change is performed by local development.

Publishing requires explicit approval to:

1. Commit and push these changes.
2. Select **GitHub Actions** as the Pages source if the repository is not already configured that way.
3. Configure a custom-domain DNS record and the optional `SITE_URL` repository variable if a custom domain is adopted later.
