// Shape of the Home page's editorial content (code-owned — see home-content.data.ts).
// Layout, section order and UI chrome strings live in components; company facts
// (phone, address, socials) stay in core/data/company.ts and are NOT duplicated here.

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

import type { TextSegment } from '../../shared/components/text-segments/text-segments.component';

export interface AboutHighlight {
  readonly label: string;
  readonly value: readonly TextSegment[];
}

// One row of the "annual export volume" timeline (e.g. 2024 → 1,050,000 BDMT).
export interface ExportVolume {
  readonly year: string;
  readonly volume: string;
}

export interface AboutContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly body: readonly TextSegment[];
  /** YouTube embed URL; null → the component shows a neutral placeholder. */
  readonly videoUrl: string | null;
  readonly majorBusiness: AboutHighlight;
  readonly exportVolume: AboutHighlight;
  readonly exportVolumes: readonly ExportVolume[];
  readonly subsidiaries: AboutHighlight;
}

export interface ProductCard {
  readonly title: string;
  readonly description: string;
  /** Card photo; null → the component shows a neutral placeholder block. */
  readonly imageUrl: string | null;
  readonly route: string;
}

export interface ProductsContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly body: readonly TextSegment[];
  readonly items: readonly ProductCard[];
}

export interface PartnerLogo {
  readonly name: string;
  readonly imageUrl: string;
}

export interface CertificateItem {
  readonly imageUrl: string;
  readonly name: string;
  readonly subtitle: string;
  readonly codes: readonly string[];
}

export interface Figure {
  readonly value: string;
  readonly label: string;
  readonly sublabel: string;
}

export interface PartnersContent {
  readonly eyebrow: string;
  readonly heading: string;
  readonly viewAllLabel: string;
  readonly logos: readonly PartnerLogo[];
  readonly certificatesTitle: string;
  readonly certificatesBody: string;
  readonly certificates: readonly CertificateItem[];
  readonly figures: readonly Figure[];
}

// Section chrome for "News & updates" — the posts themselves come from Sanity.
export interface NewsContent {
  readonly eyebrow: string;
  readonly tagline: string;
  readonly featuredLabel: string;
  readonly viewAllLabel: string;
}

export interface HomeContent {
  readonly hero: HeroContent;
  readonly about: AboutContent;
  readonly products: ProductsContent;
  readonly partners: PartnersContent;
  readonly news: NewsContent;
}
