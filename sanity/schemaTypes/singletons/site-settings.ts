import { defineArrayMember, defineField, defineType } from 'sanity';

// Site-wide settings: SEO defaults + company/contact facts.
// Company fields are OPTIONAL overrides — when blank, the Angular app falls back to the
// code-owned defaults in src/app/core/data/company.ts (see SiteSettingsService). This lets
// editors update address/phone/email/socials without a code deploy.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO', default: true },
    { name: 'company', title: 'Company & contact' },
  ],
  fields: [
    defineField({ name: 'siteTitle', title: 'Site title', type: 'localeString', group: 'seo' }),
    defineField({
      name: 'siteDescription',
      title: 'Site description (SEO)',
      type: 'localeText',
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default social share image',
      type: 'image',
      group: 'seo',
    }),

    defineField({ name: 'brand', title: 'Brand name', type: 'localeString', group: 'company' }),
    defineField({ name: 'legalName', title: 'Legal name', type: 'localeString', group: 'company' }),
    defineField({
      name: 'shortAddress',
      title: 'Short address (footer heading)',
      type: 'localeText',
      group: 'company',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      description: 'Header/footer brand logo. Leave empty to use the built-in default.',
      type: 'image',
      group: 'company',
    }),
    defineField({
      name: 'offices',
      title: 'Offices',
      type: 'array',
      group: 'company',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'localeString' }),
            defineField({ name: 'address', title: 'Address', type: 'localeText' }),
          ],
          preview: { select: { title: 'label.vi', subtitle: 'address.vi' } },
        }),
      ],
    }),
    defineField({ name: 'hotline', title: 'Hotline', type: 'string', group: 'company' }),
    defineField({
      name: 'opsName',
      title: 'Operations director — name',
      type: 'string',
      group: 'company',
    }),
    defineField({
      name: 'opsPhone',
      title: 'Operations director — phone',
      type: 'string',
      group: 'company',
    }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'company' }),
    defineField({ name: 'website', title: 'Website', type: 'string', group: 'company' }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'company',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: { list: ['facebook', 'linkedin', 'youtube'] },
            }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site settings' }),
  },
});
