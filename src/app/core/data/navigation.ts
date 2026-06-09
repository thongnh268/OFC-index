export interface NavLink {
  readonly label: string;
  readonly route: string;
}

export const SECONDARY_NAV: readonly NavLink[] = [
  { label: 'News', route: '/news' },
  { label: 'Recruitment', route: '/recruitment' },
  { label: 'Social Activities', route: '/social-activities' },
] as const;

export const MAIN_NAV: readonly NavLink[] = [
  { label: 'Subsidiaries', route: '/subsidiaries' },
  { label: 'Contacts', route: '/contacts' },
] as const;

export const ABOUT_NAV: readonly NavLink[] = [
  { label: 'Board of Directors', route: '/about/board' },
  { label: 'Establishment Milestones', route: '/about/milestones' },
  { label: 'Quality Control and Certificates', route: '/about/quality' },
] as const;

// TODO: OFC sells both Pellets and Pallets — final IA pending; revisit before Sprint 2 Products routes.
export const PRODUCT_NAV: readonly NavLink[] = [
  { label: 'Wood Chips Export', route: '/products/wood-chips-export' },
  { label: 'Wood Pallets Export', route: '/products/wood-pallets-export' },
  { label: 'Timber Processing', route: '/products/timber-processing' },
  { label: 'Afforestation', route: '/products/afforestation' },
  { label: 'Transportation and Warehouses', route: '/products/transportation-and-warehouses' },
] as const;

export const INTRODUCTION_NAV: readonly NavLink[] = [
  { label: 'About us', route: '/about' },
  { label: 'Director Greetings', route: '/about/director-greetings' },
  { label: 'Company Profile', route: '/about/company-profile' },
  { label: 'Vision and Mission', route: '/about/vision-and-mission' },
  { label: 'History', route: '/about/history' },
  { label: 'Organizational chart', route: '/about/organizational-chart' },
] as const;
