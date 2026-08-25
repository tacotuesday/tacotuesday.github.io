import { describe, expect, it } from 'vitest';
import { byNewest, isPublishedAt } from '../../src/lib/content';

describe('content visibility', () => {
  const now = new Date('2026-08-25T12:00:00Z');

  it('publishes a non-draft entry on or before its publication date', () => {
    expect(isPublishedAt({ data: { draft: false, published: new Date('2026-08-24') } }, now)).toBe(
      true,
    );
  });

  it('hides drafts and future-dated entries', () => {
    expect(isPublishedAt({ data: { draft: true, published: new Date('2026-08-24') } }, now)).toBe(
      false,
    );
    expect(isPublishedAt({ data: { draft: false, published: new Date('2026-08-26') } }, now)).toBe(
      false,
    );
  });

  it('sorts entries newest first', () => {
    const entries = [
      { data: { published: new Date('2026-01-01') } },
      { data: { published: new Date('2026-03-01') } },
    ];
    expect(entries.sort(byNewest)[0]?.data.published.toISOString()).toContain('2026-03-01');
  });
});
