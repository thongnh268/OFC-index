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
  readonly isMain: boolean;
}

export interface CompanyContact {
  readonly hotline: string | null;
  readonly ops: {
    readonly name: string | null;
    readonly phone: string | null;
  };
  readonly email: string | null;
  readonly website: string | null;
}

export interface OfcCompany {
  readonly brand: string;
  readonly legalName: string | null;
  readonly taxCode: string | null;
  readonly shortAddress: string | null;
  /** CMS logo URL; null means components use the built-in default asset. */
  readonly logoUrl: string | null;
  readonly offices: readonly CompanyOffice[];
  readonly contact: CompanyContact;
  readonly socials: readonly SocialLink[];
}

export const OFC_COMPANY: OfcCompany = {
  brand: 'OFC Company',
  legalName: null,
  taxCode: null,
  shortAddress: null,
  logoUrl: null,
  offices: [],
  contact: {
    hotline: null,
    ops: {
      name: null,
      phone: null,
    },
    email: null,
    website: null,
  },
  socials: [],
};
