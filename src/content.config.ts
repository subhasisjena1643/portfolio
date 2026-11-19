import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { resolveContentLink } from './data/links';
const link = z.string().transform(resolveContentLink).pipe(z.url());
const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '*.json' }),
  schema: ({ image }) => {
    const figure = z.discriminatedUnion('kind', [
      z.object({
        kind: z.literal('editorial'),
        motif: z.enum(['connections', 'classroom', 'classroom-detail', 'model-scene', 'model-detail', 'magnetic-assembly']),
        alt: z.string(),
        caption: z.string(),
        source: z.string(),
        permission: z.enum(['Local preview only', 'Original portfolio illustration']),
      }),
      z.object({
        kind: z.literal('project'),
        image: image(),
        alt: z.string(),
        caption: z.string(),
        source: z.string(),
        permission: z.string().min(1),
      }),
    ]);

    return z.object({
      slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
      order: z.number().int().positive(),
      title: z.string(),
      category: z.string(),
      question: z.string(),
      summary: z.string(),
      demo: link.optional(),
      repository: link.optional(),
      repositoryLabel: z.string().optional(),
      artifact: z.object({ label: z.string(), href: link }).optional(),
      role: z.string().nullable(),
      collaborators: z.array(z.string()).nullable(),
      date: z.iso.date().nullable(),
      version: z.string().nullable(),
      provenance: z.array(z.object({ source: link, scope: z.string() })),
      figure,
      caseStudy: z.object({
        layout: z.enum(['spread', 'comparison']).default('spread'),
        contribution: z.object({
          description: z.string(),
          date: z.iso.date(),
          source: link,
        }).optional(),
        scene: figure,
        detail: figure,
        decision: z.object({ title: z.string(), description: z.string() }),
        limitation: z.string(),
        learning: z.string().optional(),
        planned: z.string().optional(),
      }).optional(),
      draft: z.boolean(),
    }).refine(({ draft, figure, caseStudy }) =>
      draft || [figure, caseStudy?.scene, caseStudy?.detail].every((item) => item?.permission !== 'Local preview only'), {
      message: 'A published study cannot use figures limited to the local preview.',
    });
  },
});

export const collections = { work };
