import { z } from 'astro/zod';

const forbiddenUrlHost = /(^|\.)(example\.(com|org|net)|localhost|invalid)$/i;

export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase, hyphenated slug.');

export const publicUrlSchema = z.url({ protocol: /^https?$/ }).refine(
  (value) => {
    try {
      return !forbiddenUrlHost.test(new URL(value).hostname);
    } catch {
      return false;
    }
  },
  { message: 'Replace placeholder URLs before publishing.' },
);

export const assetPathSchema = z
  .string()
  .trim()
  .min(1)
  .startsWith('/', 'Use a root-relative path to an asset in public/.');

export const descriptiveAltSchema = z
  .string()
  .trim()
  .min(12, 'Describe what the image communicates, not merely that it is an image.');

const imageSchema = z.object({
  image: assetPathSchema,
  alt: descriptiveAltSchema,
});

const verifiedMetricSchema = z.object({
  label: z.string().trim().min(1),
  value: z.string().trim().min(1),
  method: z.string().trim().min(1),
  measuredAt: z.coerce.date(),
  source: publicUrlSchema.optional(),
});

const dataSourceSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  url: publicUrlSchema.optional(),
});

export const projectSchema = z.object({
  title: z.string().trim().min(1),
  slug: slugSchema,
  summary: z.string().trim().min(1),
  status: z.enum(['active', 'complete', 'maintained', 'paused']),
  published: z.coerce.date(),
  updated: z.coerce.date(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(true),
  role: z.string().trim().min(1),
  technologies: z.array(z.string().trim().min(1)).min(1),
  outcome: z.string().trim().min(1),
  screenshot: imageSchema,
  problem: z.string().trim().min(1),
  constraints: z.array(z.string().trim().min(1)).min(1),
  nonGoals: z.array(z.string().trim().min(1)).min(1),
  architecture: imageSchema,
  dataEngineering: z.string().trim().min(1),
  modeling: z.string().trim().min(1),
  deployment: z.string().trim().min(1),
  observability: z.string().trim().min(1),
  verifiedMetrics: z.array(verifiedMetricSchema).min(1),
  failureModes: z.array(z.string().trim().min(1)).min(1),
  limitations: z.array(z.string().trim().min(1)).min(1),
  nextDecisions: z.array(z.string().trim().min(1)).min(1),
  cover: imageSchema,
  dataSources: z.array(dataSourceSchema).min(1),
  links: z.object({
    repository: publicUrlSchema,
    demo: publicUrlSchema.optional(),
    documentation: publicUrlSchema.optional(),
    release: publicUrlSchema.optional(),
  }),
});

export const writingSchema = z.object({
  title: z.string().trim().min(1),
  slug: slugSchema,
  description: z.string().trim().min(1),
  published: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string().trim().min(1)).min(1),
  draft: z.boolean().default(true),
  canonicalUrl: publicUrlSchema.optional(),
});

export const labSchema = z
  .object({
    title: z.string().trim().min(1),
    slug: slugSchema,
    description: z.string().trim().min(1),
    status: z.enum(['prototype', 'active', 'maintained', 'archived']),
    technologies: z.array(z.string().trim().min(1)).min(1),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    cover: imageSchema.optional(),
    repositoryUrl: publicUrlSchema.optional(),
    appUrl: publicUrlSchema.optional(),
  })
  .refine((entry) => entry.repositoryUrl || entry.appUrl, {
    message: 'A published Lab entry needs a repository URL, an app URL, or both.',
  });

export type ProjectData = z.infer<typeof projectSchema>;
export type WritingData = z.infer<typeof writingSchema>;
export type LabData = z.infer<typeof labSchema>;
