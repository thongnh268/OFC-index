export interface NavLink {
  readonly label: string;
  readonly route: string;
}

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
  { label: $localize`:@@nav.board:Board of Directors`, route: '/about/board' },
  { label: $localize`:@@nav.milestones:Establishment Milestones`, route: '/about/milestones' },
  {
    label: $localize`:@@nav.quality:Quality Control and Certificates`,
    route: '/about/quality',
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
  { label: $localize`:@@nav.aboutUs:About us`, route: '/about' },
  {
    label: $localize`:@@nav.directorGreetings:Director Greetings`,
    route: '/about/director-greetings',
  },
  { label: $localize`:@@nav.companyProfile:Company Profile`, route: '/about/company-profile' },
  {
    label: $localize`:@@nav.visionMission:Vision and Mission`,
    route: '/about/vision-and-mission',
  },
  { label: $localize`:@@nav.history:History`, route: '/about/history' },
  {
    label: $localize`:@@nav.orgChart:Organizational chart`,
    route: '/about/organizational-chart',
  },
];
