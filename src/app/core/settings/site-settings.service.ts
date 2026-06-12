import { Injectable, inject } from '@angular/core';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';

import { SETTINGS_QUERY, SanityService } from '../sanity';
import { OFC_COMPANY, SOCIAL_LABELS } from '../data';
import type { OfcCompany, SocialLink } from '../data';

// Raw shape SETTINGS_QUERY can return — every field is an optional CMS override.
interface SettingsDto {
  readonly brand?: string | null;
  readonly legalName?: string | null;
  readonly shortAddress?: string | null;
  readonly logoUrl?: string | null;
  readonly offices?: readonly { label: string | null; address: string | null }[] | null;
  readonly hotline?: string | null;
  readonly opsName?: string | null;
  readonly opsPhone?: string | null;
  readonly email?: string | null;
  readonly website?: string | null;
  readonly socials?: readonly { platform: string | null; url: string | null }[] | null;
}

@Injectable({ providedIn: 'root' })
export class SiteSettingsService {
  private readonly sanity = inject(SanityService);
  private company$?: Observable<OfcCompany>;

  // CMS values overlay the code-owned company defaults field by field; anything the CMS
  // leaves blank keeps its default, so contact info never renders empty.
  // Memoized + shareReplay: footer and contact-bar both consume this on one page —
  // they share a single fetch instead of each firing their own.
  getCompany(): Observable<OfcCompany> {
    this.company$ ??= this.sanity.fetch<SettingsDto | null>(SETTINGS_QUERY).pipe(
      map((dto) => this.merge(dto)),
      catchError(() => of(OFC_COMPANY)),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

    return this.company$;
  }

  private merge(dto: SettingsDto | null): OfcCompany {
    if (!dto) {
      return OFC_COMPANY;
    }

    // An office without an address has nothing to show — drop it; a missing label is
    // fine (the footer renders the address alone).
    const offices = (dto.offices ?? [])
      .filter((office) => office.address)
      .map((office) => ({ label: office.label ?? '', address: office.address ?? '' }));

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

    return {
      brand: dto.brand ?? OFC_COMPANY.brand,
      legalName: dto.legalName ?? OFC_COMPANY.legalName,
      shortAddress: dto.shortAddress ?? OFC_COMPANY.shortAddress,
      logoUrl: dto.logoUrl ?? OFC_COMPANY.logoUrl,
      offices: offices.length ? offices : OFC_COMPANY.offices,
      contact: {
        hotline: dto.hotline ?? OFC_COMPANY.contact.hotline,
        ops: {
          name: dto.opsName ?? OFC_COMPANY.contact.ops.name,
          phone: dto.opsPhone ?? OFC_COMPANY.contact.ops.phone,
        },
        email: dto.email ?? OFC_COMPANY.contact.email,
        website: dto.website ?? OFC_COMPANY.contact.website,
      },
      socials: socials.length ? socials : OFC_COMPANY.socials,
    };
  }
}
