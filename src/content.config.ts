import { defineCollection, z } from 'astro:content';

const about = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    date: z.string(),
    title: z.string(),
    company: z.string(),
    companyUrl: z.string().url().optional(),
    links: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url(),
        })
      )
      .optional(),
    tags: z.array(z.string()),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    image: z.string(),
    url: z.string().url(),
    tags: z.array(z.string()),
    stats: z.string().optional(),
  }),
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    image: z.string(),
    url: z.string().url(),
  }),
});

export const collections = { about, experience, projects, articles };
