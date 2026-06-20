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
export const SUBSIDIARY_COLLAPSE_LIMIT = 6;

export const SUBSIDIARY_PORTS: readonly SubsidiaryPort[] = [
  {
    name: 'Nghi Son Port',
    subsidiaries: [
      {
        name: 'THANH HOA MILL',
        location: 'Nghi Son Economic, Thanh Hoa',
        capacity: '250,000 BDMT/year; Chipmill: 5',
        distance: '15 km',
        rawMaterial: 'Nghe An, Thanh Hoa (within 200km)',
      },
      {
        name: 'DAI DUONG MILL',
        location: 'Nghi Son Economic, Thanh Hoa',
        capacity: '200,000 BDMT/year; Chipmill: 4',
        distance: '17 km',
        rawMaterial: 'Nghe An, Thanh Hoa (within 200km)',
      },
      {
        name: 'PTSC MILL',
        location: 'Nghi Son Economic, Thanh Hoa',
        capacity: '200,000 BDMT/year; Chipmill: 4',
        distance: '0.5 km',
        rawMaterial: 'Nghe An, Thanh Hoa (within 200km)',
      },
      {
        name: 'VINH NHAT MILL',
        location: 'Nghi Son Economic, Thanh Hoa',
        capacity: '100,000 BDMT/year; Chipmill: 3',
        distance: '20 km',
        rawMaterial: 'Nghe An (within 150km)',
      },
      {
        name: 'XUAN SON 1 MILL',
        location: 'Trieu Son district, Thanh Hoa province',
        capacity: '50,000 BDMT/year; Chipmill: 2',
        distance: '80 km',
        rawMaterial: 'Nghe An, Thanh Hoa (within 50km)',
      },
      {
        name: 'NHAT DUY MILL',
        location: 'Trieu Son district, Thanh Hoa province',
        capacity: '50,000 BDMT/year; Chipmill: 2',
        distance: '80 km',
        rawMaterial: 'Thanh Hoa (within 50km)',
      },
      {
        name: 'XUAN SON 2 MILL',
        location: 'Thach Thanh district, Thanh Hoa province',
        capacity: '50,000 BDMT/year; Chipmill: 2',
        distance: '100 km',
        rawMaterial: 'Thanh Hoa (within 50km)',
      },
      {
        name: 'XUAN PHU MILL',
        location: 'Trieu Son district, Thanh Hoa province',
        capacity: '50,000 BDMT/year; Chipmill: 2',
        distance: '80 km',
        rawMaterial: 'Thanh Hoa (within 50km)',
      },
      {
        name: 'TAN NHAT THANKS MILL',
        location: 'Nhu Thanh district, Thanh Hoa province',
        capacity: '80,000 BDMT/year; Chipmill: 2',
        distance: '30 km',
        rawMaterial: 'Nghe An, Thanh Hoa (within 80km)',
      },
      {
        name: 'HUYEN HONG MILL',
        location: 'Trieu Son district, Thanh Hoa province',
        capacity: '50,000 BDMT/year; Chipmill: 2',
        distance: '80 km',
        rawMaterial: 'Thanh Hoa (within 50km)',
      },
      {
        name: 'LAM NGHIEP THANG 5 MILL',
        location: 'Nghia Dan district, Nghe An province',
        capacity: '50,000 BDMT/year; Chipmill: 2',
        distance: '50 km',
        rawMaterial: 'Nghe An (within 50km)',
      },
      {
        name: 'GIA BAO MILL',
        location: 'Thach Thanh district, Thanh Hoa province',
        capacity: '50,000 BDMT/year; Chipmill: 2',
        distance: '80 km',
        rawMaterial: 'Thanh Hoa (within 50km)',
      },
      {
        name: 'THANH TIEN MILL',
        location: 'Nghi Son Economic',
        capacity: '50,000 BDMT/year; Chipmill: 2',
        distance: '2 km',
        rawMaterial: 'Nghe An, Thanh Hoa (within 100km)',
      },
      {
        name: 'PHUC VINH MILL',
        location: 'Nghia Dan district, Nghe An province',
        capacity: '50,000 BDMT/year; Chipmill: 2',
        distance: '50 km',
        rawMaterial: 'Nghe An (within 50km)',
      },
      {
        name: 'HOANG HUY MILL',
        location: 'Quy Hop district, Nghe An province',
        capacity: '50,000 BDMT/year; Chipmill: 2',
        distance: '80 km',
      },
      {
        name: 'HOP LUC MILL',
        location: 'Quy Chau district, Nghe An province',
        capacity: '100,000 BDMT/year; Chipmill: 2',
        distance: '110 km',
      },
    ],
  },
  {
    name: 'Song Lam Port',
    subsidiaries: [
      {
        name: 'NGHE AN FOREST PRODUCTS COMPANY',
        capacity: '200,000 BDMT/year',
        distance: '4 km',
        rawMaterial: 'Nghe An (within 200km)',
      },
      {
        name: 'PHUONG DONG JSC',
        capacity: '80,000 BDMT/year',
        distance: '4 km',
        rawMaterial: 'Nghe An (within 100km)',
      },
      {
        name: 'TAY SON 1 LTD',
        capacity: '80,000 BDMT/year',
        distance: '60 km',
        rawMaterial: 'Nghe An (within 100km)',
      },
      {
        name: 'TAY SON 2 LTD',
        capacity: '80,000 BDMT/year',
        distance: '60 km',
        rawMaterial: 'Nghe An (within 100km)',
      },
      {
        name: 'SONG LAM YARD',
      },
    ],
  },
];
