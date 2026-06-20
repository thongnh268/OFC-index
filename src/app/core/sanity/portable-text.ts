// Minimal Portable Text shapes the /news renderer needs. We model only what the curated
// blog toolbar can produce (see localeBlock in sanity/schemaTypes/objects/locale.ts):
// block styles normal/h2/h3/blockquote, bullet/number lists, strong/em marks, link
// annotations, and inline images. The renderer narrows on `_type` at each node.

export interface PortableTextSpan {
  readonly _type: 'span';
  readonly _key: string;
  readonly text: string;
  readonly marks?: readonly string[];
}

// Link annotation, referenced from a span's `marks` by `_key` via the block's markDefs.
export interface PortableTextLink {
  readonly _type: 'link';
  readonly _key: string;
  readonly href?: string;
}

export interface PortableTextBlock {
  readonly _type: 'block';
  readonly _key: string;
  readonly style?: string;
  readonly listItem?: 'bullet' | 'number';
  readonly level?: number;
  readonly children?: readonly PortableTextSpan[];
  readonly markDefs?: readonly PortableTextLink[];
}

// Inline figure; `url` is the CDN-resolved asset URL projected by POST_BY_SLUG_QUERY.
export interface PortableTextImage {
  readonly _type: 'image';
  readonly _key: string;
  readonly url: string | null;
  readonly alt?: string | null;
}

export type PortableTextNode = PortableTextBlock | PortableTextImage;
