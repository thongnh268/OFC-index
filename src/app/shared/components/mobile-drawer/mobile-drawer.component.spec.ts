import { ApplicationRef, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';

import { MobileDrawerComponent } from './mobile-drawer.component';

@Component({
  standalone: true,
  imports: [MobileDrawerComponent],
  template: `
    <button id="outside" type="button">outside</button>
    <app-mobile-drawer
      titleId="drawer-title"
      [open]="open()"
      (closed)="closedCount = closedCount + 1"
    >
      <a id="first-link" href="/a">A</a>
      <a id="last-link" href="/b">B</a>
    </app-mobile-drawer>
  `,
})
class HostComponent {
  readonly open = signal(false);
  closedCount = 0;
}

describe('MobileDrawerComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  function setOpen(value: boolean): void {
    host.open.set(value);
    fixture.detectChanges();
    // Flush afterRenderEffect (focus management) hooks.
    TestBed.inject(ApplicationRef).tick();
  }

  function query<T extends HTMLElement>(selector: string): T {
    const found = element.querySelector<T>(selector);

    if (!found) {
      throw new Error(`Missing element: ${selector}`);
    }

    return found;
  }

  it('moves focus to the close button when opened', () => {
    query<HTMLButtonElement>('#outside').focus();

    setOpen(true);

    expect(document.activeElement).toBe(query('.drawer-close'));
  });

  it('restores focus to the previously focused element when closed', () => {
    const outside = query<HTMLButtonElement>('#outside');
    outside.focus();

    setOpen(true);
    setOpen(false);

    expect(document.activeElement).toBe(outside);
  });

  it('wraps Tab focus from the last focusable element back to the first', () => {
    setOpen(true);

    const lastLink = query<HTMLAnchorElement>('#last-link');
    lastLink.focus();
    lastLink.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));

    expect(document.activeElement).toBe(query('.drawer-close'));
  });

  it('wraps Shift+Tab focus from the first focusable element to the last', () => {
    setOpen(true);

    const closeButton = query<HTMLButtonElement>('.drawer-close');
    closeButton.focus();
    closeButton.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }),
    );

    expect(document.activeElement).toBe(query('#last-link'));
  });

  it('emits closed when the backdrop or close button is clicked', () => {
    setOpen(true);

    query<HTMLButtonElement>('.backdrop').click();
    query<HTMLButtonElement>('.drawer-close').click();

    expect(host.closedCount).toBe(2);
  });
});
