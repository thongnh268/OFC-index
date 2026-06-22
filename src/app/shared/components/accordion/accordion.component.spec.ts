import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';

import { AccordionComponent, AccordionItemComponent } from './accordion.component';

@Component({
  standalone: true,
  imports: [AccordionComponent, AccordionItemComponent],
  template: `
    <app-accordion accordionId="faq" [multi]="multi()">
      <app-accordion-item heading="Question A"><p>Answer A</p></app-accordion-item>
      <app-accordion-item heading="Question B"><p>Answer B</p></app-accordion-item>
    </app-accordion>
  `,
})
class HostComponent {
  readonly multi = signal(false);
}

describe('AccordionComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HTMLElement;

  const triggers = (): HTMLButtonElement[] =>
    Array.from(host.querySelectorAll('.accordion-trigger'));
  const expanded = (index: number): string | null =>
    triggers()[index].getAttribute('aria-expanded');

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
  });

  it('renders items collapsed with ARIA wiring derived from the accordion id', () => {
    expect(expanded(0)).toBe('false');
    expect(triggers()[0].id).toBe('faq-0-trigger');
    expect(host.querySelector('#faq-0-panel')?.getAttribute('aria-labelledby')).toBe(
      'faq-0-trigger',
    );
  });

  it('expands on click and collapses on second click', () => {
    triggers()[0].click();
    fixture.detectChanges();
    expect(expanded(0)).toBe('true');

    triggers()[0].click();
    fixture.detectChanges();
    expect(expanded(0)).toBe('false');
  });

  it('closes the open sibling in single-open mode', () => {
    triggers()[0].click();
    fixture.detectChanges();
    triggers()[1].click();
    fixture.detectChanges();

    expect(expanded(0)).toBe('false');
    expect(expanded(1)).toBe('true');
  });

  it('keeps siblings open when multi is true', () => {
    fixture.componentInstance.multi.set(true);
    fixture.detectChanges();

    triggers()[0].click();
    triggers()[1].click();
    fixture.detectChanges();

    expect(expanded(0)).toBe('true');
    expect(expanded(1)).toBe('true');
  });
});
