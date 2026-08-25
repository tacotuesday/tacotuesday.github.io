import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { publishedWriting } from '../lib/content';
import { siteConfig } from '../site-config';

export async function GET(context: { site: URL }) {
  const entries = publishedWriting(await getCollection('writing'));
  return rss({
    title: 'Grafton Cook — Writing',
    description: siteConfig.description,
    site: context.site,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.published,
      link: `/writing/${entry.data.slug}/`,
      categories: entry.data.tags,
    })),
  });
}
