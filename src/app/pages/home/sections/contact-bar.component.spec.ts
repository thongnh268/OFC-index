import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { SanityService } from '../../../core/sanity';
import { OFC_COMPANY } from '../../../core/data';
import { ContactBarComponent } from './contact-bar.component';

describe('ContactBarComponent', () => {
  let host: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        // No CMS document → SiteSettingsService falls back to the code-owned defaults.
        { provide: SanityService, useValue: { fetch: () => of(null) } },
      ],
    });
    const fixture = TestBed.createComponent(ContactBarComponent);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders the hotline with a tel: link from company defaults', () => {
    const phone = host.querySelector<HTMLAnchorElement>('.contact-value');
    expect(phone?.textContent).toContain(OFC_COMPANY.contact.ops.phone);
    expect(phone?.getAttribute('href')).toBe('tel:+84981996789');
  });

  it('renders the email with a mailto: link', () => {
    const email = host.querySelector<HTMLAnchorElement>('.contact-email');
    expect(email?.textContent).toContain(OFC_COMPANY.contact.email);
    expect(email?.getAttribute('href')).toBe(`mailto:${OFC_COMPANY.contact.email}`);
  });

  it('renders a "Get a quote" CTA linking to contacts', () => {
    const cta = host.querySelector<HTMLAnchorElement>('.contact-cta');
    expect(cta?.getAttribute('href')).toBe('/contacts');
    expect(cta?.className).toContain('btn-accent');
  });
});
