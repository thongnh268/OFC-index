// Subsidiaries network — types + the code-owned default set (Figma node 2142:638). This is the
// fallback the service uses when Sanity has no `subsidiary` documents, so the page is never empty
// (same philosophy as siteSettings). The CMS-managed copy in Sanity overrides this when present.
// Names/values are proper nouns + figures, identical in both locales, so plain strings.
export interface Subsidiary {
  readonly name: string;
  readonly location?: string;
  readonly capacity?: string;
  readonly distance?: string;
  readonly rawMaterial?: string;
}

export interface SubsidiaryPort {
  readonly name: string;
  readonly subsidiaries: readonly Subsidiary[];
}

// Ports with more than this many entries collapse behind a "View more" toggle.
export const SUBSIDIARY_COLLAPSE_LIMIT = 7;

export const SUBSIDIARY_PORTS: readonly SubsidiaryPort[] = [
  {
    name: 'Nghi Son Port',
    subsidiaries: [
      {
        name: 'THANH HOA MILL',
        location: 'Nghi Son Economic, Thanh Hoa',
        rawMaterial: 'Nghe An, Thanh Hoa (within 200km)',
      },
      {
        name: 'DAI DUONG MILL',
        location: 'Nghi Son Economic, Thanh Hoa',
        rawMaterial: 'Nghe An, Thanh Hoa (within 200km)',
      },
      {
        name: 'PTSC MILL',
        location: 'Nghi Son Economic, Thanh Hoa',
        rawMaterial: 'Nghe An, Thanh Hoa (within 200km)',
      },
      {
        name: 'TAN NHAT THANKS MILL',
        location: 'Nhu Thanh district, Thanh Hoa province',
        rawMaterial: 'Nghe An, Thanh Hoa (within 80km)',
      },
      {
        name: 'XUAN SON BAI TRANH MILL',
        location: 'Trieu Son district, Thanh Hoa province',
        rawMaterial: 'Nghe An, Thanh Hoa (within 50km)',
      },
      {
        name: 'DONG HOI MILL',
        location: 'Quy Chau district, Nghe An province',
        rawMaterial: 'Nghe An, Thanh Hoa (within 50km)',
      },
      {
        name: 'HOP LUC MILL',
        location: 'Quy Chau district, Nghe An province',
        rawMaterial: 'Nghe An, Thanh Hoa (within 50km)',
      },
    ],
  },
  {
    name: 'Vissai Port',
    subsidiaries: [
      {
        name: 'NGHE AN FOREST PRODUCTS COMPANY',
        capacity: '200,000 BDMT/year',
        rawMaterial: 'Nghe An (within 200km)',
      },
      {
        name: 'PHUONG DONG JSC',
        capacity: '80,000 BDMT/year',
        rawMaterial: 'Nghe An (within 100km)',
      },
      {
        name: 'TAY SON 1 LTD',
        capacity: '80,000 BDMT/year',
        rawMaterial: 'Nghe An (within 100km)',
      },
      {
        name: 'TAY SON 2 LTD',
        capacity: '80,000 BDMT/year',
        rawMaterial: 'Nghe An (within 100km)',
      },
      {
        name: 'SONG LAM YARD',
      },
    ],
  },
];
