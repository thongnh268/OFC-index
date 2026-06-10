import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let appRef: ApplicationRef;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    appRef = TestBed.inject(ApplicationRef);
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  function trigger(key: 'about' | 'products'): HTMLButtonElement {
    const button = element.querySelector<HTMLButtonElement>(`#${key}-menu-trigger`);

    if (!button) {
      throw new Error(`Missing trigger for "${key}"`);
    }

    return button;
  }

  function dropdownItems(key: 'about' | 'products'): HTMLAnchorElement[] {
    return Array.from(
      element.querySelectorAll<HTMLAnchorElement>(`#${key}-dropdown [data-dropdown-item]`),
    );
  }

  function keydown(target: HTMLElement, key: string): void {
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    fixture.detectChanges();
    appRef.tick();
  }

  it('renders a trigger per configured dropdown', () => {
    expect(trigger('about')).toBeTruthy();
    expect(trigger('products')).toBeTruthy();
  });

  it('toggles a dropdown on trigger click', () => {
    trigger('about').click();
    fixture.detectChanges();
    expect(dropdownItems('about').length).toBeGreaterThan(0);
    expect(trigger('about').getAttribute('aria-expanded')).toBe('true');

    trigger('about').click();
    fixture.detectChanges();
    expect(dropdownItems('about').length).toBe(0);
    expect(trigger('about').getAttribute('aria-expanded')).toBe('false');
  });

  it('only keeps one dropdown open at a time', () => {
    trigger('about').click();
    fixture.detectChanges();
    trigger('products').click();
    fixture.detectChanges();

    expect(dropdownItems('about').length).toBe(0);
    expect(dropdownItems('products').length).toBeGreaterThan(0);
  });

  it('opens the dropdown and focuses the first item on ArrowDown', () => {
    keydown(trigger('about'), 'ArrowDown');

    const items = dropdownItems('about');
    expect(items.length).toBeGreaterThan(0);
    expect(document.activeElement).toBe(items[0]);
  });

  it('opens the dropdown and focuses the last item on ArrowUp', () => {
    keydown(trigger('about'), 'ArrowUp');

    const items = dropdownItems('about');
    expect(document.activeElement).toBe(items[items.length - 1]);
  });

  it('moves and wraps focus with ArrowDown/ArrowUp inside the dropdown', () => {
    keydown(trigger('about'), 'ArrowDown');
    const items = dropdownItems('about');

    keydown(items[0], 'ArrowDown');
    expect(document.activeElement).toBe(items[1]);

    keydown(items[1], 'ArrowUp');
    expect(document.activeElement).toBe(items[0]);

    keydown(items[0], 'ArrowUp');
    expect(document.activeElement).toBe(items[items.length - 1]);

    keydown(items[items.length - 1], 'ArrowDown');
    expect(document.activeElement).toBe(items[0]);
  });

  it('focuses first/last items with Home/End inside the dropdown', () => {
    keydown(trigger('about'), 'ArrowDown');
    const items = dropdownItems('about');

    keydown(items[0], 'End');
    expect(document.activeElement).toBe(items[items.length - 1]);

    keydown(items[items.length - 1], 'Home');
    expect(document.activeElement).toBe(items[0]);
  });

  it('closes the dropdown and restores trigger focus on Escape', () => {
    keydown(trigger('about'), 'ArrowDown');
    const items = dropdownItems('about');

    keydown(items[0], 'Escape');

    expect(dropdownItems('about').length).toBe(0);
    expect(document.activeElement).toBe(trigger('about'));
  });

  it('toggles the mobile drawer via the hamburger button', () => {
    const hamburger = element.querySelector<HTMLButtonElement>('.hamburger-btn');

    if (!hamburger) {
      throw new Error('Missing hamburger button');
    }

    hamburger.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.mobileMenuOpen()).toBeTrue();

    hamburger.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.mobileMenuOpen()).toBeFalse();
  });
});
