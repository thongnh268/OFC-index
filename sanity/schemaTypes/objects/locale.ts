import { defineField, defineType } from 'sanity';

// Field-level localization — matches the build-time @angular/localize setup (vi default, en).
// Queries project one language with `coalesce(field[$locale], field.vi)`.
const LOCALES = [
  { id: 'vi', title: 'Tiếng Việt' },
  { id: 'en', title: 'English' },
] as const;

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fields: LOCALES.map((locale) =>
    defineField({ name: locale.id, title: locale.title, type: 'string' }),
  ),
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fields: LOCALES.map((locale) =>
    defineField({ name: locale.id, title: locale.title, type: 'text', rows: 3 }),
  ),
});

export const localeBlock = defineType({
  name: 'localeBlock',
  title: 'Localized rich text',
  type: 'object',
  fields: LOCALES.map((locale) =>
    defineField({
      name: locale.id,
      title: locale.title,
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
  ),
});
