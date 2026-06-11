import { defineField, defineType } from 'sanity';

// SEO defaults only. Company facts (offices, phone, email, socials) are code-owned in
// src/app/core/data/company.ts — do not duplicate them here.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'localeString',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site description (SEO)',
      type: 'localeText',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default social share image',
      type: 'image',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site settings' }),
  },
});
