import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { SanityService } from '../sanity';
import { OFC_COMPANY } from '../data';
import { SiteSettingsService } from './site-settings.service';
import type { OfcCompany } from '../data';

describe('SiteSettingsService', () => {
  let service: SiteSettingsService;
  let fetchSpy: jasmine.Spy;

  const setup = (): void => {
    fetchSpy = jasmine.createSpy('fetch');
    TestBed.configureTestingModule({
      providers: [{ provide: SanityService, useValue: { fetch: fetchSpy } }],
    });
    service = TestBed.inject(SiteSettingsService);
  };

  const latest = (): OfcCompany => {
    let value!: OfcCompany;
    service.getCompany().subscribe((company) => (value = company));
    return value;
  };

  const latestHeroImage = (): string | null => {
    let value!: string | null;
    service.getHeroImageUrl().subscribe((heroImageUrl) => (value = heroImageUrl));
    return value;
  };

  const latestPartnerLogos = (): readonly { name: string; imageUrl: string }[] => {
    let value!: readonly { name: string; imageUrl: string }[];
    service.getPartnerLogos().subscribe((logos) => (value = logos));
    return value;
  };

  beforeEach(setup);

  it('keeps all code-owned defaults when the document is missing (null)', () => {
    fetchSpy.and.returnValue(of(null));
    expect(latest()).toEqual(OFC_COMPANY);
    expect(latestHeroImage()).toBeNull();
    expect(latestPartnerLogos()).toEqual([]);
  });

  it('overlays only the fields the CMS provides, keeping defaults for the rest', () => {
    fetchSpy.and.returnValue(of({ email: 'sales@ofc.test', opsPhone: '+84 900 000 000' }));

    const company = latest();
    expect(company.contact.email).toBe('sales@ofc.test');
    expect(company.contact.ops.phone).toBe('+84 900 000 000');
    // untouched fields fall back to the defaults
    expect(company.contact.hotline).toBe(OFC_COMPANY.contact.hotline);
    expect(company.brand).toBe(OFC_COMPANY.brand);
  });

  it('uses CMS offices when present', () => {
    fetchSpy.and.returnValue(of({ offices: [{ label: 'HQ', address: '1 Test Street' }] }));
    expect(latest().offices).toEqual([{ label: 'HQ', address: '1 Test Street' }]);
  });

  it('keeps default offices when the CMS array is empty', () => {
    fetchSpy.and.returnValue(of({ offices: [] }));
    expect(latest().offices).toEqual(OFC_COMPANY.offices);
  });

  it('drops offices without an address; keeps defaults when none remain', () => {
    fetchSpy.and.returnValue(of({ offices: [{ label: 'HQ', address: null }] }));
    expect(latest().offices).toEqual(OFC_COMPANY.offices);
  });

  it('keeps a label-less office as long as it has an address', () => {
    fetchSpy.and.returnValue(of({ offices: [{ label: null, address: '1 Test Street' }] }));
    expect(latest().offices).toEqual([{ label: '', address: '1 Test Street' }]);
  });

  it('fetches the settings document once across multiple consumers', () => {
    fetchSpy.and.returnValue(of(null));
    service.getCompany().subscribe();
    service.getHeroImageUrl().subscribe();
    service.getPartnerLogos().subscribe();
    service.getCompany().subscribe();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('returns the CMS hero image URL when present', () => {
    fetchSpy.and.returnValue(of({ heroImageUrl: 'https://cdn.sanity.io/images/hero.webp' }));
    expect(latestHeroImage()).toBe('https://cdn.sanity.io/images/hero.webp');
  });

  it('returns the CMS partner logos when present', () => {
    fetchSpy.and.returnValue(
      of({ partnerLogos: [{ name: 'ACME', imageUrl: 'https://cdn.sanity.io/images/acme.png' }] }),
    );
    expect(latestPartnerLogos()).toEqual([
      { name: 'ACME', imageUrl: 'https://cdn.sanity.io/images/acme.png' },
    ]);
  });

  it('drops partner logos missing a name or image', () => {
    fetchSpy.and.returnValue(
      of({
        partnerLogos: [
          { name: 'ACME', imageUrl: 'https://cdn.sanity.io/images/acme.png' },
          { name: null, imageUrl: 'https://cdn.sanity.io/images/noname.png' },
          { name: 'No Logo', imageUrl: null },
        ],
      }),
    );
    expect(latestPartnerLogos()).toEqual([
      { name: 'ACME', imageUrl: 'https://cdn.sanity.io/images/acme.png' },
    ]);
  });

  it('keeps only valid socials (known platform + url) and labels them', () => {
    fetchSpy.and.returnValue(
      of({
        socials: [
          { platform: 'facebook', url: 'https://facebook.com/ofc' },
          { platform: 'bogus', url: 'https://x.test' },
          { platform: 'linkedin', url: null },
        ],
      }),
    );
    expect(latest().socials).toEqual([
      { name: 'facebook', label: 'Facebook', href: 'https://facebook.com/ofc' },
    ]);
  });

  it('falls back to the defaults when the query errors', () => {
    fetchSpy.and.returnValue(throwError(() => new Error('network')));
    expect(latest()).toEqual(OFC_COMPANY);
  });
});
