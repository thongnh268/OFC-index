import { defineField, defineType } from 'sanity';

// TODO: add per-section fields after the Figma freeze (Sprint 2, Day 5).
export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'localeString' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'localeText' }),
        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
});
