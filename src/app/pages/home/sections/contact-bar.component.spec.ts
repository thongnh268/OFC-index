import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { SanityService } from '../../../core/sanity';
import { ContactBarComponent } from './contact-bar.component';

describe('ContactBarComponent', () => {
  let host: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: SanityService,
          useValue: {
            fetch: () =>
              of({
                email: 'sales@ofc.test',
                opsPhone: '+84 900 000 000',
              }),
          },
        },
      ],
    });
    const fixture = TestBed.createComponent(ContactBarComponent);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders the CMS phone with a tel: link', () => {
    const phone = host.querySelector<HTMLAnchorElement>('.contact-value');
    expect(phone?.textContent).toContain('+84 900 000 000');
    expect(phone?.getAttribute('href')).toBe('tel:+84900000000');
  });

  it('renders the CMS email with a mailto: link', () => {
    const email = host.querySelector<HTMLAnchorElement>('.contact-email');
    expect(email?.textContent).toContain('sales@ofc.test');
    expect(email?.getAttribute('href')).toBe('mailto:sales@ofc.test');
  });

  it('renders a "Get a quote" CTA linking to contacts', () => {
    const cta = host.querySelector<HTMLAnchorElement>('.contact-cta');
    expect(cta?.getAttribute('href')).toBe('/contacts');
    expect(cta?.className).toContain('btn-accent');
  });
});
