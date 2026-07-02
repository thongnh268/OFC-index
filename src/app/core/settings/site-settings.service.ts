import { Injectable, inject } from '@angular/core';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';

import { SETTINGS_QUERY, SanityService } from '../sanity';
import { OFC_COMPANY, SOCIAL_LABELS } from '../data';
import type { OfcCompany, SocialLink } from '../data';

// Raw shape SETTINGS_QUERY can return - every field is an optional CMS override.
interface SettingsDto {
  readonly siteTitle?: string | null;
  readonly heroImageUrl?: string | null;
  readonly partnerLogos?: readonly { name: string | null; imageUrl: string | null }[] | null;
  readonly brand?: string | null;
  readonly legalName?: string | null;
  readonly taxCode?: string | null;
  readonly shortAddress?: string | null;
  readonly logoUrl?: string | null;
  readonly offices?:
    | readonly { label: string | null; address: string | null; isMain?: boolean | null }[]
    | null;
  readonly hotline?: string | null;
  readonly opsName?: string | null;
  readonly opsPhone?: string | null;
  readonly email?: string | null;
  readonly website?: string | null;
  readonly socials?: readonly { platform: string | null; url: string | null }[] | null;
}

// A partner logo as the home logo wall needs it: name + ready-to-use CDN image URL.
export interface PartnerLogoData {
  readonly name: string;
  readonly imageUrl: string;
}

interface SiteSettings {
  readonly siteTitle: string;
  readonly company: OfcCompany;
  readonly heroImageUrl: string | null;
  readonly partnerLogos: readonly PartnerLogoData[];
}

@Injectable({ providedIn: 'root' })
export class SiteSettingsService {
  private readonly sanity = inject(SanityService);
  private settings$?: Observable<SiteSettings>;

  // CMS values overlay the minimal code-owned defaults field by field. Contact facts intentionally
  // stay empty unless the CMS provides them, so mock NAP data cannot be indexed in production.
  // Memoized + shareReplay: footer and contact-bar both consume this on one page -
  // they share a single fetch instead of each firing their own.
  getCompany(): Observable<OfcCompany> {
    return this.getSettings().pipe(map((settings) => settings.company));
  }

  // Optional CMS override for the home hero background. Null means use code-owned default.
  getHeroImageUrl(): Observable<string | null> {
    return this.getSettings().pipe(map((settings) => settings.heroImageUrl));
  }

  // Optional CMS-managed logo wall. Empty array means use the code-owned default set.
  getPartnerLogos(): Observable<readonly PartnerLogoData[]> {
    return this.getSettings().pipe(map((settings) => settings.partnerLogos));
  }

  // CMS-owned default document title. Missing values fall back to brand/default company name.
  getSiteTitle(): Observable<string> {
    return this.getSettings().pipe(map((settings) => settings.siteTitle));
  }

  private getSettings(): Observable<SiteSettings> {
    this.settings$ ??= this.sanity.fetch<SettingsDto | null>(SETTINGS_QUERY).pipe(
      map((dto) => this.merge(dto)),
      catchError(() => of(this.merge(null))),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

    return this.settings$;
  }

  private merge(dto: SettingsDto | null): SiteSettings {
    if (!dto) {
      return {
        siteTitle: OFC_COMPANY.brand,
        company: OFC_COMPANY,
        heroImageUrl: null,
        partnerLogos: [],
      };
    }

    // An office without an address has nothing to show - drop it; a missing label is
    // fine (the footer renders the address alone).
    const offices = (dto.offices ?? [])
      .filter((office) => office.address)
      .map((office) => ({
        label: office.label ?? '',
        address: office.address ?? '',
        isMain: office.isMain === true,
      }));

    const socials = (dto.socials ?? [])
      .filter(
        (social): social is { platform: SocialLink['name']; url: string } =>
          Boolean(social.url) && social.platform != null && social.platform in SOCIAL_LABELS,
      )
      .map((social) => ({
        name: social.platform,
        label: SOCIAL_LABELS[social.platform],
        href: social.url,
      }));

    const partnerLogos = (dto.partnerLogos ?? [])
      .filter((logo) => logo.name && logo.imageUrl)
      .map((logo) => ({ name: logo.name ?? '', imageUrl: logo.imageUrl ?? '' }));

    return {
      siteTitle: dto.siteTitle || dto.brand || OFC_COMPANY.brand,
      heroImageUrl: dto.heroImageUrl ?? null,
      partnerLogos,
      company: {
        brand: dto.brand ?? OFC_COMPANY.brand,
        legalName: dto.legalName ?? OFC_COMPANY.legalName,
        taxCode: dto.taxCode ?? OFC_COMPANY.taxCode,
        shortAddress: dto.shortAddress ?? OFC_COMPANY.shortAddress,
        logoUrl: dto.logoUrl ?? OFC_COMPANY.logoUrl,
        offices,
        contact: {
          hotline: dto.hotline ?? OFC_COMPANY.contact.hotline,
          ops: {
            name: dto.opsName ?? OFC_COMPANY.contact.ops.name,
            phone: dto.opsPhone ?? OFC_COMPANY.contact.ops.phone,
          },
          email: dto.email ?? OFC_COMPANY.contact.email,
          website: dto.website ?? OFC_COMPANY.contact.website,
        },
        socials,
      },
    };
  }
}
