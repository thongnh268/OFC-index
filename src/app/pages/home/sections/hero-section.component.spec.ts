import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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
    heading: 'Heading text',
    subheading: 'Subheading text',
    imageUrl: null,
  });
}

describe('HeroSectionComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders heading and subheading from content', () => {
    expect(host.querySelector('.hero-heading')?.textContent).toContain('Heading text');
    expect(host.querySelector('.hero-subheading')?.textContent).toContain('Subheading text');
  });

  it('omits the banner image when imageUrl is null', () => {
    expect(host.querySelector('.hero-image')).toBeNull();
  });

  it('renders the banner image when imageUrl is set', () => {
    fixture.componentInstance.content.set({
      heading: 'h',
      subheading: 's',
      imageUrl: 'https://cdn/banner.jpg',
    });
    fixture.detectChanges();

    const image = host.querySelector<HTMLImageElement>('.hero-image');
    expect(image?.getAttribute('src')).toBe('https://cdn/banner.jpg');
    expect(image?.getAttribute('alt')).toBe('');
  });
});
