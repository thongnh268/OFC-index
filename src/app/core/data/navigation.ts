export interface NavLink {
  readonly label: string;
  readonly route: string;
  readonly fragment?: string;
}

const ABOUT_BOARD_ROUTE = '/about/board';
const ABOUT_MILESTONES_ROUTE = '/about/milestones';
const ABOUT_QUALITY_ROUTE = '/about/quality';
const BOARD_THANK_YOU_LETTER_FRAGMENT = 'thank-you-letter';

export const SECONDARY_NAV: readonly NavLink[] = [
  { label: $localize`:@@nav.news:News`, route: '/news' },
  { label: $localize`:@@nav.recruitment:Recruitment`, route: '/recruitment' },
  { label: $localize`:@@nav.socialActivities:Social Activities`, route: '/social-activities' },
];

export const MAIN_NAV: readonly NavLink[] = [
  { label: $localize`:@@nav.subsidiaries:Subsidiaries`, route: '/subsidiaries' },
  { label: $localize`:@@nav.contacts:Contacts`, route: '/contacts' },
];

export const ABOUT_NAV: readonly NavLink[] = [
  { label: $localize`:@@nav.board:Board of Directors`, route: ABOUT_BOARD_ROUTE },
  { label: $localize`:@@nav.milestones:Establishment Milestones`, route: ABOUT_MILESTONES_ROUTE },
  {
    label: $localize`:@@nav.quality:Quality Control and Certificates`,
    route: ABOUT_QUALITY_ROUTE,
  },
];

export const PRODUCT_NAV: readonly NavLink[] = [
  { label: $localize`:@@nav.woodChips:Wood Chips Export`, route: '/products/wood-chips-export' },
  {
    label: $localize`:@@nav.woodPellets:Wood Pellets Export`,
    route: '/products/wood-pellets-export',
  },
  { label: $localize`:@@nav.timber:Timber Processing`, route: '/products/timber-processing' },
  { label: $localize`:@@nav.afforestation:Afforestation`, route: '/products/afforestation' },
  {
    label: $localize`:@@nav.transportation:Transportation and Warehouses`,
    route: '/products/transportation-and-warehouses',
  },
];

export const INTRODUCTION_NAV: readonly NavLink[] = [
  { label: $localize`:@@nav.aboutUs:About us`, route: ABOUT_BOARD_ROUTE },
  {
    label: $localize`:@@nav.directorGreetings:Director Greetings`,
    route: ABOUT_BOARD_ROUTE,
    fragment: BOARD_THANK_YOU_LETTER_FRAGMENT,
  },
  { label: $localize`:@@nav.companyProfile:Company Profile`, route: ABOUT_MILESTONES_ROUTE },
  {
    label: $localize`:@@nav.visionMission:Vision and Mission`,
    route: '/about/vision-and-mission',
  },
  { label: $localize`:@@nav.history:History`, route: ABOUT_MILESTONES_ROUTE },
  {
    label: $localize`:@@nav.orgChart:Organizational chart`,
    route: ABOUT_BOARD_ROUTE,
  },
];
