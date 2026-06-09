interface CompanyOffice {
  readonly label: string;
  readonly address: string;
}

interface CompanyContact {
  readonly hotline: string;
  readonly ops: {
    readonly name: string;
    readonly phone: string;
  };
  readonly email: string;
  readonly website: string;
}

interface CompanySocial {
  readonly name: 'facebook' | 'linkedin' | 'youtube';
  readonly label: string;
  readonly href: string;
}

interface OfcCompany {
  readonly brand: string;
  readonly legalName: string;
  readonly shortAddress: string;
  readonly offices: readonly CompanyOffice[];
  readonly contact: CompanyContact;
  readonly socials: readonly CompanySocial[];
}

export const OFC_COMPANY: OfcCompany = {
  brand: 'OFC Company',
  legalName: 'BINH MINH HP CO., LTD.',
  shortAddress: 'Lot 11, Cai Lan Industrial Zone, Quang Ninh, Vietnam',
  offices: [
    {
      label: 'Head Office',
      address:
        'Lot 11, Cai Lan Industrial Zone, Bai Chay Ward, Ha Long City, Quang Ninh Province, Vietnam',
    },
    {
      label: 'Hanoi Office',
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
  socials: [
    { name: 'facebook', label: 'Facebook placeholder', href: '#' },
    { name: 'linkedin', label: 'LinkedIn placeholder', href: '#' },
    { name: 'youtube', label: 'YouTube placeholder', href: '#' },
  ],
} as const;
