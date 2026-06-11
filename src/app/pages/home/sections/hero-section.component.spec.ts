import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { ComponentFixture } from '@angular/core/testing';

import { HeroSectionComponent } from './hero-section.component';
import type { HeroContent } from '../home-content.model';

@Component({
  standalone: true,
  imports: [HeroSectionComponent],
  template: `<app-hero-section [content]="content()" />`,
})
class HostComponent {
  readonly content = signal<HeroContent>({
    heading: [
      { tone: 'navy', text: 'Heading' },
      { tone: 'accent', text: 'text' },
    ],
    subheading: 'Subheading text',
    imageUrl: null,
    stats: [
      {
        icon: 'factory',
        lines: [
          { text: '1M+', style: 'value' },
          { text: 'Annual capacity', style: 'caption' },
        ],
      },
      {
        icon: 'globe',
        lines: [
          { text: 'Export to', style: 'lead' },
          { text: 'Japan & China', style: 'highlight' },
        ],
      },
    ],
  });
}

describe('HeroSectionComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders heading segments as tone-classed spans joined by a space, plus the subheading', () => {
    const spans = host.querySelectorAll('.hero-heading span');
    expect(spans.length).toBe(2);
    expect(spans[0].className).toContain('tone-navy');
    expect(spans[0].textContent?.trim()).toBe('Heading');
    expect(spans[1].className).toContain('tone-accent');
    expect(spans[1].textContent?.trim()).toBe('text');
    // a space sits between the segments (collapse repeated whitespace as the browser does)
    const headingText = host
      .querySelector('.hero-heading')
      ?.textContent?.replace(/\s+/g, ' ')
      .trim();
    expect(headingText).toBe('Heading text');
    expect(host.querySelector('.hero-subheading')?.textContent).toContain('Subheading text');
  });

  it('renders a CTA linking to contacts', () => {
    const cta = host.querySelector<HTMLAnchorElement>('.hero-cta');
    expect(cta?.getAttribute('href')).toBe('/contacts');
    expect(cta?.className).toContain('btn-accent');
  });

  it('renders each stat as icon + styled lines from data', () => {
    const stats = host.querySelectorAll('.hero-stat');
    expect(stats.length).toBe(2);

    const figureLines = stats[0].querySelectorAll('.stat-line');
    expect(figureLines[0].textContent).toContain('1M+');
    expect(figureLines[0].className).toContain('style-value');
    expect(figureLines[1].textContent).toContain('Annual capacity');
    expect(figureLines[1].className).toContain('style-caption');
  });

  it('renders a callout cell from the same structure (lead + green highlight)', () => {
    const calloutLines = host.querySelectorAll('.hero-stat')[1].querySelectorAll('.stat-line');
    expect(calloutLines[0].textContent).toContain('Export to');
    expect(calloutLines[0].className).toContain('style-lead');
    expect(calloutLines[1].textContent).toContain('Japan & China');
    expect(calloutLines[1].className).toContain('style-highlight');
  });

  it('omits the banner image when imageUrl is null', () => {
    expect(host.querySelector('.hero-image')).toBeNull();
  });

  it('renders the banner image when imageUrl is set', () => {
    fixture.componentInstance.content.set({
      heading: [{ tone: 'navy', text: 'h' }],
      subheading: 's',
      imageUrl: 'https://cdn/banner.jpg',
      stats: [],
    });
    fixture.detectChanges();

    const image = host.querySelector<HTMLImageElement>('.hero-image');
    expect(image?.getAttribute('src')).toBe('https://cdn/banner.jpg');
    expect(image?.getAttribute('alt')).toBe('');
  });

  it('omits the stats list when there are no stats', () => {
    fixture.componentInstance.content.set({
      heading: [{ tone: 'navy', text: 'h' }],
      subheading: 's',
      imageUrl: null,
      stats: [],
    });
    fixture.detectChanges();

    expect(host.querySelector('.hero-stats')).toBeNull();
  });
});
