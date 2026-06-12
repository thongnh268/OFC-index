import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';

import { AboutSectionComponent } from './about-section.component';
import { parseEmphasis } from '../../../shared/components/text-segments/text-segments.component';
import type { AboutContent } from '../home-content.model';

const ABOUT: AboutContent = {
  eyebrow: 'About OFC',
  heading: 'Sustainable products',
  body: parseEmphasis('<b>OFC Company</b> is an intro paragraph.'),
  videoUrl: null,
  majorBusiness: {
    label: 'Major business',
    value: parseEmphasis('Manufacturing of <accent>wood chips</accent>'),
  },
  exportVolume: {
    label: 'Annual export volume',
    value: parseEmphasis('Exported to <accent>Japan</accent>'),
  },
  exportVolumes: [
    { year: '2023', volume: '900.000 BDMT' },
    { year: '2024', volume: '1.050.000 BDMT' },
  ],
  subsidiaries: {
    label: 'Subsidiaries network',
    value: parseEmphasis('16 at <accent>Nghi Son Port</accent>'),
  },
};

@Component({
  standalone: true,
  imports: [AboutSectionComponent],
  template: `<app-about-section [content]="content()" />`,
})
class HostComponent {
  readonly content = signal<AboutContent>(ABOUT);
}

describe('AboutSectionComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders the eyebrow, heading and body through the shared section head', () => {
    expect(host.querySelector('.section-eyebrow')?.textContent).toContain('About OFC');
    expect(host.querySelector('.section-heading')?.textContent).toContain('Sustainable products');
    const body = host.querySelector('.section-body')?.textContent?.replace(/\s+/g, ' ').trim();
    expect(body).toBe('OFC Company is an intro paragraph.');
  });

  it('emphasises body and value segments by tone', () => {
    const strong = host.querySelector('.section-body .tone-strong');
    expect(strong?.textContent).toContain('OFC Company');

    const accents = Array.from(host.querySelectorAll('.about-value .tone-accent')).map((el) =>
      el.textContent?.trim(),
    );
    expect(accents).toEqual(['wood chips', 'Japan', 'Nghi Son Port']);
  });

  it('renders the three labelled blocks', () => {
    const labels = Array.from(host.querySelectorAll('.about-label')).map((el) => el.textContent);
    expect(labels.length).toBe(3);
    expect(labels[0]).toContain('Major business');
    expect(labels[1]).toContain('Annual export volume');
    expect(labels[2]).toContain('Subsidiaries network');
  });

  it('lists every export volume row', () => {
    const rows = host.querySelectorAll('.about-volume');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('2023');
    expect(rows[0].textContent).toContain('900.000 BDMT');
  });

  it('shows the neutral placeholder when there is no video', () => {
    expect(host.querySelector('iframe.about-video')).toBeNull();
    expect(host.querySelector('.about-video-placeholder')).toBeTruthy();
  });

  it('renders the video iframe when a url is provided', () => {
    fixture.componentInstance.content.set({
      ...ABOUT,
      videoUrl: 'https://www.youtube.com/embed/abc123',
    });
    fixture.detectChanges();

    const iframe = host.querySelector<HTMLIFrameElement>('iframe.about-video');
    expect(iframe).toBeTruthy();
    expect(iframe?.getAttribute('src')).toContain('youtube.com/embed/abc123');
  });
});
