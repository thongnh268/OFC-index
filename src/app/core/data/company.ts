// Social platforms must stay assignable to IconName (shared/components/icon).
export interface SocialLink {
  readonly name: 'facebook' | 'linkedin' | 'youtube';
  readonly label: string;
  readonly href: string;
}

// Display label per supported platform - extend together with SocialLink['name']
// (and the platform list in sanity/schemaTypes/singletons/site-settings.ts).
export const SOCIAL_LABELS: Record<SocialLink['name'], string> = {
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
};

export interface CompanyOffice {
  readonly label: string;
  readonly address: string;
}

export interface CompanyContact {
  readonly hotline: string;
  readonly ops: {
    readonly name: string;
    readonly phone: string;
  };
  readonly email: string;
  readonly website: string;
}

export interface OfcCompany {
  readonly brand: string;
  readonly legalName: string;
  readonly shortAddress: string;
  /** CMS logo URL; null → components use the built-in default asset. */
  readonly logoUrl: string | null;
  readonly offices: readonly CompanyOffice[];
  readonly contact: CompanyContact;
  readonly socials: readonly SocialLink[];
}

export const OFC_COMPANY: OfcCompany = {
  brand: 'OFC Company',
  legalName: 'BINH MINH HP CO., LTD.',
  shortAddress: 'Lot 11, Cai Lan Industrial Zone, Quang Ninh, Vietnam',
  logoUrl: null,
  offices: [
    {
      label: $localize`:@@company.headOffice:Head Office`,
      address:
        'Lot 11, Cai Lan Industrial Zone, Bai Chay Ward, Ha Long City, Quang Ninh Province, Vietnam',
    },
    {
      label: $localize`:@@company.hanoiOffice:Hanoi Office`,
      address: 'TSQ Millennium Tower, Ha Tay - No. 4, Quang Trung Street, Ha Dong District, Hanoi',
    },
  ],
  contact: {
    hotline: '0347 983 555',
    ops: {
      name: 'Mr. Cao Trung Hung (Mr. KAO)',
      phone: '+84 981 99 6789',
    },
    email: 'cco@binhminhhp.com',
    website: 'www.binhminhhp.com',
  },
  // TODO: replace '#' with real profile URLs once provided.
  socials: [
    { name: 'facebook', label: 'Facebook', href: '#' },
    { name: 'linkedin', label: 'LinkedIn', href: '#' },
    { name: 'youtube', label: 'YouTube', href: '#' },
  ],
};
