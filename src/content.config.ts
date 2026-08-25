import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { labSchema, projectSchema, writingSchema } from './content/schemas';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: projectSchema,
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: writingSchema,
});

const lab = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lab' }),
  schema: labSchema,
});

export const collections = { projects, writing, lab };
