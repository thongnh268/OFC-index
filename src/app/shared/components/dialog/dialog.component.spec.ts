import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

@Component({
  standalone: true,
  imports: [DialogComponent],
  template: `
    <app-dialog dialogId="quote" heading="Get a quote" [open]="open()" (closed)="open.set(false)">
      <p>Dialog body</p>
    </app-dialog>
  `,
})
class HostComponent {
  readonly open = signal(false);
}

describe('DialogComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HTMLElement;

  const panel = (): HTMLElement => host.querySelector('.dialog-panel') as HTMLElement;
  const backdrop = (): HTMLButtonElement =>
    host.querySelector('.dialog-backdrop') as HTMLButtonElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement as HTMLElement;
  });

  it('is hidden and inert until opened', () => {
    expect(panel().getAttribute('aria-hidden')).toBe('true');
    expect(panel().hasAttribute('inert')).toBeTrue();
    expect(panel().getAttribute('aria-modal')).toBeNull();
  });

  it('opens as a labelled modal', () => {
    fixture.componentInstance.open.set(true);
    fixture.detectChanges();

    expect(panel().getAttribute('aria-modal')).toBe('true');
    expect(panel().hasAttribute('inert')).toBeFalse();
    expect(panel().getAttribute('aria-labelledby')).toBe('quote-title');
    expect(host.querySelector('#quote-title')?.textContent).toContain('Get a quote');
  });

  it('emits closed on Escape inside the panel', () => {
    fixture.componentInstance.open.set(true);
    fixture.detectChanges();

    panel().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.open()).toBeFalse();
  });

  it('emits closed when the backdrop is clicked', () => {
    fixture.componentInstance.open.set(true);
    fixture.detectChanges();

    backdrop().click();
    fixture.detectChanges();

    expect(fixture.componentInstance.open()).toBeFalse();
  });
});
