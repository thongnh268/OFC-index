import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.vi', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alternative text', type: 'localeString' })],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localeText',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'localeBlock',
    }),
    defineField({
      name: 'bodyHtml',
      title: 'Body HTML (aggregated)',
      type: 'text',
      rows: 12,
      description:
        'Raw article HTML for aggregated/cloned news; rendered sanitized. Original OFC posts use the rich-text Body above instead.',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'External source for aggregated news. Leave empty for original OFC posts.',
      options: {
        list: [
          { title: 'SBP', value: 'SBP' },
          { title: 'FSC', value: 'FSC' },
        ],
      },
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description:
        'Link to the original article (shown as "Read original"). Also the dedup key used by the daily aggregator.',
    }),
  ],
  orderings: [
    {
      title: 'Published date, newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title.vi', subtitle: 'author.name', media: 'mainImage' },
  },
});
