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

  it('renders the eyebrow and heading through the shared section head', () => {
    expect(host.querySelector('.section-eyebrow')?.textContent).toContain('About OFC');
    expect(host.querySelector('.section-heading')?.textContent).toContain('Sustainable products');
  });

  it('renders the intro body alongside the details column', () => {
    const body = host.querySelector('.about-intro')?.textContent?.replace(/\s+/g, ' ').trim();
    expect(body).toBe('OFC Company is an intro paragraph.');
  });

  it('emphasises body and value segments by tone', () => {
    const strong = host.querySelector('.about-intro .tone-strong');
    expect(strong?.textContent).toContain('OFC Company');

    const accents = Array.from(host.querySelectorAll('.about-value .tone-accent')).map((el) =>
      el.textContent?.trim(),
    );
    expect(accents).toEqual(['wood chips']);
  });

  it('renders the labelled block', () => {
    const labels = Array.from(host.querySelectorAll('.about-label')).map((el) => el.textContent);
    expect(labels.length).toBe(1);
    expect(labels[0]).toContain('Major business');
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
