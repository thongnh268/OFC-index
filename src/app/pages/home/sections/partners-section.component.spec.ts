import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { ComponentFixture } from '@angular/core/testing';

import { PartnersSectionComponent } from './partners-section.component';
import type { PartnersContent } from '../home-content.model';

const PARTNERS: PartnersContent = {
  eyebrow: 'Partners & Certificates',
  heading: 'Trusted by organizations',
  viewAllLabel: 'View all partners',
  logos: [
    { name: 'Alpha Bank', imageUrl: 'assets/images/partners/alpha.png' },
    { name: 'Beta Cert', imageUrl: 'assets/images/partners/beta.png' },
  ],
  certificatesTitle: 'Our certificates',
  certificatesBody: 'Committed to standards.',
  certificates: [
    {
      imageUrl: 'assets/images/certificates/fsc.png',
      name: 'FSC FM',
      subtitle: 'Forest Management',
      codes: ['FSC-STD-50-001', 'FSC-STD-30-005'],
    },
    {
      imageUrl: 'assets/images/certificates/pefc.png',
      name: 'PEFC COC',
      subtitle: 'Chains of Custody',
      codes: ['PEFC ST 2002:2020'],
    },
  ],
  figures: [
    { value: '1M BDMT', label: 'Production capacity', sublabel: 'Annual production capacity BDMT' },
    { value: '16%', label: 'Growth', sublabel: 'Growth rate year over year' },
  ],
};

@Component({
  standalone: true,
  imports: [PartnersSectionComponent],
  template: `<app-partners-section [content]="content()" />`,
})
class HostComponent {
  readonly content = signal<PartnersContent>(PARTNERS);
}

describe('PartnersSectionComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders the section head and the view-all link to subsidiaries', () => {
    expect(host.querySelector('.section-eyebrow')?.textContent).toContain(
      'Partners & Certificates',
    );
    const viewAll = host.querySelector<HTMLAnchorElement>('.partners-viewall');
    expect(viewAll?.textContent).toContain('View all partners');
    expect(viewAll?.getAttribute('href')).toBe('/subsidiaries');
  });

  it('renders one logo card per partner with name as alt text', () => {
    const logos = host.querySelectorAll<HTMLImageElement>('.partner-card img');
    expect(logos.length).toBe(2);
    expect(logos[0].getAttribute('alt')).toBe('Alpha Bank');
  });

  it('renders certificate cards with subtitle and every code line', () => {
    const certs = host.querySelectorAll('.cert');
    expect(certs.length).toBe(2);
    expect(certs[0].querySelector('.cert-name')?.textContent).toContain('FSC FM');
    expect(certs[0].querySelector('.cert-subtitle')?.textContent).toContain('Forest Management');
    expect(certs[0].querySelectorAll('.cert-code').length).toBe(2);
  });

  it('renders figures with value, label and sublabel', () => {
    const figures = host.querySelectorAll('.figure');
    expect(figures.length).toBe(2);
    expect(figures[0].querySelector('.figure-value')?.textContent).toContain('1M BDMT');
    expect(figures[0].querySelector('.figure-label')?.textContent).toContain('Production capacity');
    expect(figures[0].querySelector('.figure-sublabel')?.textContent).toContain(
      'Annual production capacity BDMT',
    );
  });

  it('hides the carousel dots when all logos fit one page', () => {
    expect(host.querySelector('.carousel-dots')).toBeNull();
  });
});
