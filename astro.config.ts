import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL ?? 'https://tacotuesday.github.io';

const excludedFromSitemap = [
  '/showcase/',
  '/projects/',
  '/blog/',
  '/gallery/',
  '/videos/',
  '/contact/',
  '/elements/',
  '/tags/',
];

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !excludedFromSitemap.some((route) => new URL(page).pathname.startsWith(route)),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
