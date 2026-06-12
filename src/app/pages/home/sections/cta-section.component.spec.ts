import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { ComponentFixture } from '@angular/core/testing';

import { CtaSectionComponent } from './cta-section.component';
import type { CtaContent } from '../home-content.model';

const CTA: CtaContent = {
  heading: 'Looking for a reliable wood supply partner?',
  body: 'We are ready to support your business.',
};

@Component({
  standalone: true,
  imports: [CtaSectionComponent],
  template: `<app-cta-section [content]="content()" />`,
})
class HostComponent {
  readonly content = signal<CtaContent>(CTA);
}

describe('CtaSectionComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders the heading and body', () => {
    expect(host.querySelector('.cta-heading')?.textContent).toContain(
      'Looking for a reliable wood supply partner?',
    );
    expect(host.querySelector('.cta-body')?.textContent).toContain(
      'We are ready to support your business.',
    );
  });

  it('renders the get-in-touch button linking to contacts', () => {
    const button = host.querySelector<HTMLAnchorElement>('.cta-button');
    expect(button?.getAttribute('href')).toBe('/contacts');
    expect(button?.className).toContain('btn-accent');
    expect(button?.textContent).toContain('Get in touch');
  });
});
