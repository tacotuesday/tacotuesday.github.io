import type { APIContext } from 'astro';

export function GET({ site }: APIContext) {
  const sitemap = new URL('/sitemap-0.xml', site as URL);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${sitemap}</loc></sitemap>
</sitemapindex>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
