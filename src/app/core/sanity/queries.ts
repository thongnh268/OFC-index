// GROQ queries. `$locale` ('vi' | 'en') is bound automatically by SanityService.fetch();
// project localized objects with coalesce(field[$locale], field.vi) — vi is the site default.
export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  "slug": slug.current,
  "title": coalesce(title[$locale], title.vi),
  "excerpt": coalesce(excerpt[$locale], excerpt.vi),
  publishedAt,
  "author": author->name
}`;

// Site settings singleton — company/contact facts. Every field is an optional override;
// SiteSettingsService overlays whatever the CMS returns onto the code-owned company defaults.
export const SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  "brand": coalesce(brand[$locale], brand.vi),
  "legalName": coalesce(legalName[$locale], legalName.vi),
  "shortAddress": coalesce(shortAddress[$locale], shortAddress.vi),
  "logoUrl": logo.asset->url,
  "offices": offices[]{
    "label": coalesce(label[$locale], label.vi),
    "address": coalesce(address[$locale], address.vi)
  },
  hotline,
  opsName,
  opsPhone,
  email,
  website,
  "socials": socials[]{ platform, url }
}`;
