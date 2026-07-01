import { defineField, defineType } from 'sanity';

// List fields are authored as one item per line in a single textarea (a leading "- " is
// optional and stripped by the frontend), so editors paste a whole list instead of adding
// array items one at a time. Requires at least one non-empty line in the Vietnamese text.
const LIST_HELP = 'One item per line. A leading "- " is optional.';

const requireLines = (value: { vi?: string } | undefined) =>
  (value?.vi ?? '').split('\n').some((line) => line.trim().length > 0)
    ? true
    : 'Add at least one line (one item per line).';

export const recruitmentJob = defineType({
  name: 'recruitmentJob',
  title: 'Recruitment Job',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Job number',
      type: 'string',
      description: 'Display and ordering number, for example 01, 02, 03.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Show on website',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'responsibilities',
      title: 'Job Responsibilities',
      type: 'localeText',
      description: LIST_HELP,
      validation: (rule) => rule.custom(requireLines),
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'localeText',
      description: LIST_HELP,
      validation: (rule) => rule.custom(requireLines),
    }),
    defineField({
      name: 'compensation',
      title: 'Compensation',
      type: 'localeText',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'localeText',
      description: LIST_HELP,
      validation: (rule) => rule.custom(requireLines),
    }),
  ],
  orderings: [
    {
      title: 'Job number, ascending',
      name: 'codeAsc',
      by: [{ field: 'code', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title.vi', subtitle: 'code' },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `No. ${subtitle}` : undefined,
      };
    },
  },
});
