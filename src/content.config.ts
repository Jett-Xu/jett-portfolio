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

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    icon: z.string(), // Lucide icon name (e.g. globe, layers, bot)
    tags: z.array(z.string()),
  }),
});

const workflow = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    icon: z.string(), // Lucide icon name (e.g. message-circle, file-check)
  }),
});

export const collections = { about, experience, projects, articles, services, workflow };
