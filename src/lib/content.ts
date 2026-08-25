import type { CollectionEntry } from 'astro:content';

type Publishable = { data: { draft: boolean; published: Date } };

export function isPublishedAt<T extends Publishable>(entry: T, now: Date): boolean {
  return !entry.data.draft && entry.data.published.getTime() <= now.getTime();
}

export function isPublished<T extends Publishable>(entry: T): boolean {
  return isPublishedAt(entry, new Date());
}

export function byNewest<T extends { data: { published: Date } }>(left: T, right: T): number {
  return right.data.published.getTime() - left.data.published.getTime();
}

export function publishedProjects(entries: CollectionEntry<'projects'>[]) {
  return entries.filter((entry) => isPublished(entry)).sort(byNewest);
}

export function publishedWriting(entries: CollectionEntry<'writing'>[]) {
  return entries.filter((entry) => isPublished(entry)).sort(byNewest);
}

export function publishedLab(entries: CollectionEntry<'lab'>[]) {
  return entries.filter((entry) => isPublished(entry)).sort(byNewest);
}
