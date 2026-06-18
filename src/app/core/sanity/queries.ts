// GROQ queries. `$locale` ('vi' | 'en') is bound automatically by SanityService.fetch();
// project localized objects with coalesce(field[$locale], field.vi) - vi is the site default.

// Latest posts for the home "News & updates" carousel (blog pages will use richer queries).
export const NEWS_QUERY = `*[_type == "post"] | order(publishedAt desc)[0...12] {
  "slug": slug.current,
  "title": coalesce(title[$locale], title.vi),
  "imageUrl": mainImage.asset->url,
  publishedAt
}`;

// Full blog index for the /news list page - every post, newest first, with card fields.
export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  "slug": slug.current,
  "title": coalesce(title[$locale], title.vi),
  "excerpt": coalesce(excerpt[$locale], excerpt.vi),
  "imageUrl": mainImage.asset->url + "?w=800&q=75&auto=format",
  publishedAt,
  "author": author->name
}`;

// One post by slug for /news/[slug]. body is the locale's Portable Text, with inline image
// assets resolved to CDN-optimized URLs so the renderer can <img> them without extra lookups.
export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  "slug": slug.current,
  "title": coalesce(title[$locale], title.vi),
  "excerpt": coalesce(excerpt[$locale], excerpt.vi),
  "imageUrl": mainImage.asset->url + "?w=1600&q=80&auto=format",
  "imageAlt": coalesce(mainImage.alt[$locale], mainImage.alt.vi),
  publishedAt,
  "author": author->name,
  "body": coalesce(body[$locale], body.vi)[]{
    ...,
    _type == "image" => { ..., "url": asset->url + "?w=1200&q=80&auto=format" }
  }
}`;

// Site settings singleton - company/contact facts + replaceable site media.
// Every field is an optional override;
// SiteSettingsService overlays whatever the CMS returns onto the code-owned company defaults.
// The hero URL carries image-pipeline params (cap width, modern format, sane quality) so the
// CDN never serves a multi-MB original; a missing image stays null (GROQ propagates null through +).
export const SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  "heroImageUrl": heroImage.asset->url + "?w=1920&q=75&auto=format&fit=max",
  "partnerLogos": partnerLogos[]{ name, "imageUrl": logo.asset->url + "?w=400&h=200&fit=max&auto=format" },
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
