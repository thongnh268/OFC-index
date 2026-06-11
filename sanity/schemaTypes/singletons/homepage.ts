import { defineArrayMember, defineField, defineType } from 'sanity';

// TODO: add the remaining sections (about, products, partners, cta) after the Figma freeze.
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
        defineField({
          name: 'heading',
          title: 'Heading',
          description:
            'Coloured segments rendered inline and joined by a space (no trailing spaces needed). Same segment order across languages; type each language inside the segment.',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'segment',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Text',
                  type: 'localeString',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'tone',
                  title: 'Colour',
                  type: 'string',
                  initialValue: 'navy',
                  options: {
                    layout: 'radio',
                    list: [
                      { title: 'Navy (default)', value: 'navy' },
                      { title: 'Accent (green)', value: 'accent' },
                      { title: 'White', value: 'white' },
                    ],
                  },
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: { select: { title: 'text.vi', subtitle: 'tone' } },
            }),
          ],
        }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'localeText' }),
        defineField({
          name: 'image',
          title: 'Background image',
          description: 'Photo only — no text. The headline, button and figures render over it.',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'stats',
          title: 'Key figures',
          description: 'Shown below the call-to-action. Icons are picked from a fixed list.',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Factory (capacity)', value: 'factory' },
                      { title: 'Award (experience)', value: 'experience' },
                      { title: 'People (employees)', value: 'people' },
                      { title: 'Globe (markets)', value: 'globe' },
                    ],
                  },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'lines',
                  title: 'Lines',
                  description: 'Stacked text lines. Each line picks a style — mix freely per cell.',
                  type: 'array',
                  of: [
                    defineArrayMember({
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'text',
                          title: 'Text',
                          type: 'localeString',
                          validation: (rule) => rule.required(),
                        }),
                        defineField({
                          name: 'style',
                          title: 'Style',
                          type: 'string',
                          initialValue: 'value',
                          options: {
                            layout: 'radio',
                            list: [
                              { title: 'Large value (1M+)', value: 'value' },
                              { title: 'Caption', value: 'caption' },
                              { title: 'Lead text (Export to)', value: 'lead' },
                              { title: 'Highlight – green (Japan & China)', value: 'highlight' },
                            ],
                          },
                          validation: (rule) => rule.required(),
                        }),
                      ],
                      preview: { select: { title: 'text.vi', subtitle: 'style' } },
                    }),
                  ],
                  validation: (rule) => rule.required().min(1),
                }),
              ],
              preview: {
                select: { title: 'lines.0.text.vi', subtitle: 'lines.1.text.vi' },
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
});
