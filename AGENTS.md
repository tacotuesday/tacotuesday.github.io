# Portfolio guidance

## Positioning and audience

This is Grafton Cook’s technical portfolio for engineering and data leaders evaluating forecasting, anomaly-detection, NLP and governed data-product work. The promise is reliable forecasting and decision systems built from messy operational data.

## Truth and privacy

- Never invent employers, clients, achievements, testimonials, publications, deployments or metrics.
- Never present example or unfinished work as complete. A metric is publishable only with a recorded method and date.
- Never infer a “currently building” claim from showcase content or an old plan. Current-activity copy must be explicitly confirmed by Grafton and removed when it becomes stale.
- Public projects use only public or synthetic data. Do not expose or imply details of government, employer or client systems.
- Keep showcase fixtures under `src/data/showcase.ts`; never move them into a production collection, RSS or the sitemap.

## Visual system

Use oyster/warm off-white, deep ink, one restrained teal accent, strong spacing and editorial rules. Body type is sans serif; monospace is limited to dates, status and technical metadata. Preserve excellent light/dark contrast.

Do not add stock code imagery, emoji headings/navigation, skill bars, logo clouds, percentage meters, gradient blobs, neon/cyber styling, glassmorphism, typewriter effects, parallax, decorative animation, giant headshots or excessive rounded cards/pills.

## Content and routes

- Projects: `src/content/projects/<slug>.mdx` using `projectSchema`.
- Writing: `src/content/writing/<slug>.mdx` using `writingSchema`.
- Lab: `src/content/lab/<slug>.mdx` using `labSchema`.
- Images for published projects: `public/media/projects/<slug>/` with descriptive alt text.
- Templates: `docs/content-templates/`.

Keep collection entries `draft: true` until evidence, images, links and limitations are complete. Preserve every existing inbound URL through a useful page or static redirect.

## Commands

```bash
npm run format:check
npm run lint
npm run check
npm run test:unit
npm run build
npm run test:e2e
npm run test:lighthouse
```

## Definition of done

Content changes are done when copy is factual, public/synthetic-data scope is explicit, links and images resolve, alt text is descriptive, metrics are verified, limits are stated and all gates pass. Code changes are done when required routes work at 320px and above, keyboard/focus behavior and WCAG AA contrast hold, there is no horizontal overflow or fixture leakage, content pages need no first-party JavaScript and old URLs still resolve.

If the same maintenance correction is needed more than once, add the durable rule or command here so future changes do not repeat it.
