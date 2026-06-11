// Editorial content of the Home page — the swappable boundary between code and CMS.
// Layout, section order and UI chrome strings live in code; only the words/numbers/images
// below are CMS-editable. Company facts (phone, address, socials) stay in core/data/company.ts
// and are NOT duplicated here. The model grows one section at a time after the Figma freeze.

export interface HeroContent {
  readonly heading: string;
  readonly subheading: string;
  /** Banner image; null → the component shows a token gradient fallback. */
  readonly imageUrl: string | null;
}

export interface AboutHighlight {
  readonly label: string;
  readonly value: string;
}

export interface AboutContent {
  readonly heading: string;
  readonly body: string;
  readonly highlights: readonly AboutHighlight[];
  readonly videoUrl: string | null;
}

export interface Figure {
  readonly value: string;
  readonly label: string;
}

export interface CtaContent {
  readonly heading: string;
}

export interface HomeContent {
  readonly hero: HeroContent;
  readonly about: AboutContent;
  readonly figures: readonly Figure[];
  readonly cta: CtaContent;
}
