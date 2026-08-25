import { describe, expect, it } from 'vitest';
import {
  labSchema,
  projectSchema,
  publicUrlSchema,
  writingSchema,
} from '../../src/content/schemas';

const project = {
  title: 'System',
  slug: 'system',
  summary: 'A verified public-data system.',
  status: 'complete',
  published: '2026-01-01',
  updated: '2026-02-01',
  featured: true,
  draft: false,
  role: 'Independent developer',
  technologies: ['Python'],
  outcome: 'A measured outcome.',
  screenshot: {
    image: '/media/system/screenshot.webp',
    alt: 'Operator view with forecast evidence and status',
  },
  problem: 'A difficult operational problem.',
  constraints: ['Public data'],
  nonGoals: ['No automated decisions'],
  architecture: {
    image: '/media/system/architecture.svg',
    alt: 'Architecture from public input to reviewed output',
  },
  dataEngineering: 'Versioned inputs and quality contracts.',
  modeling: 'Baseline comparison with time-aware evaluation.',
  deployment: 'Static deployment with automated checks.',
  observability: 'Freshness, cost and failure checks.',
  verifiedMetrics: [
    {
      label: 'MAE',
      value: '1.2 units',
      method: 'Rolling-origin holdout',
      measuredAt: '2026-02-01',
    },
  ],
  failureModes: ['Regime change'],
  limitations: ['Public data scope'],
  nextDecisions: ['Review threshold'],
  cover: {
    image: '/media/system/cover.webp',
    alt: 'Forecast chart with observed and predicted demand',
  },
  dataSources: [{ name: 'Public source', description: 'Open operational records' }],
  links: { repository: 'https://github.com/tacotuesday/system' },
};

describe('content schemas', () => {
  it('accepts a complete project and coerces dates', () => {
    const parsed = projectSchema.parse(project);
    expect(parsed.published).toBeInstanceOf(Date);
  });

  it('rejects missing images and non-descriptive alt text', () => {
    expect(projectSchema.safeParse({ ...project, cover: undefined }).success).toBe(false);
    expect(
      projectSchema.safeParse({ ...project, cover: { image: '/cover.webp', alt: 'image' } })
        .success,
    ).toBe(false);
  });

  it('rejects blank and placeholder URLs', () => {
    expect(publicUrlSchema.safeParse('').success).toBe(false);
    expect(publicUrlSchema.safeParse('https://example.com/project').success).toBe(false);
  });

  it('accepts writing metadata and requires a valid slug', () => {
    expect(
      writingSchema.safeParse({
        title: 'Note',
        slug: 'good-note',
        description: 'A durable note.',
        published: '2026-01-01',
        tags: ['forecasting'],
        draft: false,
      }).success,
    ).toBe(true);
    expect(
      writingSchema.safeParse({
        title: 'Note',
        slug: 'Bad Note',
        description: 'A durable note.',
        published: '2026-01-01',
        tags: ['forecasting'],
        draft: false,
      }).success,
    ).toBe(false);
  });

  it('requires at least one Lab destination', () => {
    const base = {
      title: 'Tool',
      slug: 'tool',
      description: 'A small useful tool.',
      status: 'active',
      technologies: ['TypeScript'],
      published: '2026-01-01',
      draft: false,
    };
    expect(labSchema.safeParse(base).success).toBe(false);
    expect(
      labSchema.safeParse({
        ...base,
        appUrl: 'https://tacotuesday.github.io/tool/',
        cover: {
          image: '/media/lab/tool.jpg',
          alt: 'Interface preview showing the tool in use',
        },
      }).success,
    ).toBe(true);
    expect(
      labSchema.safeParse({
        ...base,
        appUrl: 'https://tacotuesday.github.io/tool/',
        cover: { image: '/media/lab/tool.jpg', alt: 'preview' },
      }).success,
    ).toBe(false);
  });
});
