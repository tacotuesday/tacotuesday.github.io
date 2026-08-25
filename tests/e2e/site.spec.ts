import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const coreRoutes = [
  '/',
  '/work/',
  '/writing/',
  '/lab/',
  '/about/',
  '/archive/',
  '/showcase/',
  '/404.html',
  '/rss.xml',
  '/robots.txt',
  '/sitemap.xml',
];

test('all required routes render', async ({ page }) => {
  for (const route of coreRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
  }
});

test('navigation reflects the published collections', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Primary navigation' });
  await expect(nav.getByRole('link', { name: 'About' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Work' })).toHaveCount(0);
  await expect(nav.getByRole('link', { name: 'Writing' })).toHaveCount(0);
  await expect(nav.getByRole('link', { name: 'Lab' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Forecast Frontier/ })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Currently sharpening: ML engineering' }),
  ).toBeVisible();
});

test('showcase fixtures are visibly labeled and noindexed', async ({ page }) => {
  await page.goto('/showcase/');
  await expect(page.getByText('Example content / layout preview', { exact: true })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
});

test('legacy project routes remain usable', async ({ request }) => {
  for (const path of [
    '/projects/building-a-realtime-data-pipeline.html',
    '/projects/building-a-realtime-data-pipeline/',
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(await response.text()).toContain('/archive/building-a-realtime-data-pipeline/');
  }
});

for (const width of [375, 768, 1440]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      '/',
      '/about/',
      '/archive/',
      '/showcase/',
      '/showcase/work/regional-parts-demand-forecast/',
    ]) {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      expect(dimensions.scroll, `${route} at ${width}px`).toBeLessThanOrEqual(dimensions.client);
    }
  });
}

test('skip link is the first keyboard target', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
});

for (const route of ['/', '/about/', '/archive/', '/showcase/']) {
  test(`axe finds no accessibility violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test('dark mode has no accessibility violations', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('content pages do not load first-party JavaScript', async ({ page }) => {
  await page.goto('/archive/building-an-aws-batch-pipeline/');
  await expect(page.locator('script[src^="/"]')).toHaveCount(0);
});
