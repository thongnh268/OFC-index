import { defineArrayMember, defineField, defineType } from 'sanity';

// Single "Subsidiaries Network" document (one Studio tab, like Site settings) holding every port
// and its mills - the whole page is managed in one place, not as scattered per-mill documents.
export const subsidiaries = defineType({
  name: 'subsidiaries',
  title: 'Subsidiaries Network',
  type: 'document',
  fields: [
    defineField({
      name: 'ports',
      title: 'Ports',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'port',
          title: 'Port',
          fields: [
            defineField({
              name: 'name',
              title: 'Port name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'subsidiaries',
              title: 'Subsidiaries',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'subsidiaryItem',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Name',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({ name: 'location', title: 'Location', type: 'string' }),
                    defineField({ name: 'capacity', title: 'Capacity', type: 'string' }),
                    defineField({ name: 'distance', title: 'Distance to Port', type: 'string' }),
                    defineField({ name: 'rawMaterial', title: 'Raw Material', type: 'string' }),
                  ],
                  preview: { select: { title: 'name', subtitle: 'location' } },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'name', subs: 'subsidiaries' },
            prepare: ({ title, subs }) => ({
              title: title ?? 'Port',
              subtitle: `${(subs ?? []).length} subsidiaries`,
            }),
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Subsidiaries Network' }) },
});
