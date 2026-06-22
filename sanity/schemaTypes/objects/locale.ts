import { defineArrayMember, defineField, defineType } from 'sanity';

// Field-level localization - matches the build-time @angular/localize setup (vi default, en).
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
      of: [
        defineArrayMember({
          type: 'block',
          // Curated blog toolbar - authors only get formats the renderer styles.
          // H1 is omitted on purpose: the page title is the post's single <h1>.
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) => rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                  }),
                ],
              },
            ],
          },
        }),
        // Inline figure. alt is a plain string: the parent vi/en array is already
        // single-language, so it needs no further localization.
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alternative text', type: 'string' })],
        }),
      ],
    }),
  ),
});
