import type { HomeContent } from './home-content.model';

// Fallback shown when the CMS has no homepage document yet, or is unreachable.
// Plain strings (NOT $localize) — this is editorial content the CMS owns per locale,
// not UI chrome. Copy/figures seeded from the real OFC profile so the page reads
// sensibly before marketing fills the CMS. Replace via Sanity, never hard-code in views.
export const HOME_CONTENT_PLACEHOLDER: HomeContent = {
  hero: {
    heading: [
      { tone: 'navy', text: 'Leading wood chip & pellet' },
      { tone: 'accent', text: 'exporter in Vietnam' },
    ],
    subheading: 'Sustainable sourcing. Reliable global supply chain.',
    imageUrl: null,
    stats: [
      {
        icon: 'factory',
        lines: [
          { text: '1M+', style: 'value' },
          { text: 'BDMT Annual Capacity', style: 'caption' },
        ],
      },
      {
        icon: 'experience',
        lines: [
          { text: '20+', style: 'value' },
          { text: 'Years Experience', style: 'caption' },
        ],
      },
      {
        icon: 'people',
        lines: [
          { text: '740+', style: 'value' },
          { text: 'Employees & Collaborators', style: 'caption' },
        ],
      },
      {
        icon: 'globe',
        lines: [
          { text: 'Export to', style: 'lead' },
          { text: 'Japan & China', style: 'highlight' },
        ],
      },
    ],
  },
  about: {
    heading: 'About OFC Company',
    body: 'OFC (BINH MINH HP CO., LTD.) produces and exports wood chips and pellets at scale, backed by a nationwide network of subsidiaries and certified sustainable forestry.',
    highlights: [
      { label: 'Major business', value: 'Wood chip & pellet export' },
      { label: 'Annual export volume', value: '1,000,000 BDMT / year' },
      { label: 'Subsidiaries network', value: 'Nationwide coverage' },
    ],
    videoUrl: null,
  },
  figures: [
    { value: '1M BDMT', label: 'Annual capacity' },
    { value: '740+', label: 'Employees' },
    { value: '16%', label: 'YoY growth' },
  ],
  cta: {
    heading: 'Looking for a reliable wood supply partner?',
  },
};
