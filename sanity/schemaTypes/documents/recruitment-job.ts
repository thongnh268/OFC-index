import { defineArrayMember, defineField, defineType } from 'sanity';

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
      type: 'array',
      of: [defineArrayMember({ type: 'localeString' })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [defineArrayMember({ type: 'localeString' })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'compensation',
      title: 'Compensation',
      type: 'localeText',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [defineArrayMember({ type: 'localeString' })],
      validation: (rule) => rule.required().min(1),
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
