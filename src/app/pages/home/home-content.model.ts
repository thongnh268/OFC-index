// Editorial content of the Home page — the swappable boundary between code and CMS.
// Layout, section order and UI chrome strings live in code; only the words/numbers/images
// below are CMS-editable. Company facts (phone, address, socials) stay in core/data/company.ts
// and are NOT duplicated here. The model grows one section at a time after the Figma freeze.

// Heading is built from coloured segments so the CMS controls per-phrase colour
// (e.g. navy + green accent) from a fixed brand palette — no arbitrary colours.
export type HeadingTone = 'navy' | 'accent' | 'white';

export interface HeadingSegment {
  readonly tone: HeadingTone;
  readonly text: string;
}

// Icons are code-owned (brand-controlled): the CMS picks from this fixed list, the
// component maps each to <app-icon>. Extend here + register in icon.component.ts to add one.
export type HeroStatIcon = 'factory' | 'experience' | 'people' | 'globe';

// A cell is an icon + ordered text lines; each line picks ONE typographic style from this
// fixed set. Every cell (figures, callouts, anything future) is then pure data — no per-cell
// special-casing in the component. Add a new look = add a style here + one CSS rule.
//   value     — large bold navy number (1M+, 740+)
//   caption   — small navy supporting text (BDMT Annual Capacity)
//   lead      — medium navy lead-in (Export to)
//   highlight — medium bold green emphasis (Japan & China)
export type StatLineStyle = 'value' | 'caption' | 'lead' | 'highlight';

export interface StatLine {
  readonly text: string;
  readonly style: StatLineStyle;
}

export interface HeroStat {
  readonly icon: HeroStatIcon;
  readonly lines: readonly StatLine[];
}

export interface HeroContent {
  readonly heading: readonly HeadingSegment[];
  readonly subheading: string;
  /** Banner image; null → the component shows a token gradient fallback. */
  readonly imageUrl: string | null;
  readonly stats: readonly HeroStat[];
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
