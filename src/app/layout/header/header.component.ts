import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ABOUT_NAV, MAIN_NAV, OFC_COMPANY, PRODUCT_NAV, SECONDARY_NAV } from '../../core/data';
import { BrandComponent } from '../../shared/components/brand/brand.component';
import { HamburgerComponent } from '../../shared/components/hamburger/hamburger.component';
import { MobileDrawerComponent } from '../../shared/components/mobile-drawer/mobile-drawer.component';
import type { NavLink } from '../../core/data';

type DropdownKey = 'about' | 'products';
type LanguagePref = 'vi' | 'en';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    BrandComponent,
    HamburgerComponent,
    MobileDrawerComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  host: {
    '(document:keydown.escape)': 'closeInteractive()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly router = inject(Router);

  readonly openDropdown = signal<DropdownKey | null>(null);
  readonly mobileMenuOpen = signal(false);
  readonly languagePref = signal<LanguagePref>('vi');

  readonly company = OFC_COMPANY;
  readonly topLinks: readonly NavLink[] = SECONDARY_NAV;
  readonly mainLinks: readonly NavLink[] = MAIN_NAV;
  readonly aboutLinks: readonly NavLink[] = ABOUT_NAV;
  readonly productLinks: readonly NavLink[] = PRODUCT_NAV;

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeInteractive();
      }
    });
  }

  showDropdown(dropdown: DropdownKey): void {
    this.openDropdown.set(dropdown);
  }

  toggleDropdown(dropdown: DropdownKey): void {
    this.openDropdown.update((current) => (current === dropdown ? null : dropdown));
  }

  closeDropdown(): void {
    this.openDropdown.set(null);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
    this.closeDropdown();
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  closeInteractive(): void {
    this.closeDropdown();
    this.closeMobileMenu();
  }

  setLanguage(lang: LanguagePref): void {
    this.languagePref.set(lang);
  }

  closeDropdownOnFocusOut(event: Event): void {
    const focusEvent = event as FocusEvent;
    const currentTarget = focusEvent.currentTarget as HTMLElement | null;
    const nextTarget = focusEvent.relatedTarget as Node | null;

    if (currentTarget && nextTarget && currentTarget.contains(nextTarget)) {
      return;
    }

    this.closeDropdown();
  }

  onDesktopTriggerKeydown(event: Event, dropdown: DropdownKey): void {
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.key === 'ArrowDown' || keyboardEvent.key === 'ArrowUp') {
      keyboardEvent.preventDefault();
      this.showDropdown(dropdown);
      this.focusDropdownItem(dropdown, keyboardEvent.key === 'ArrowUp' ? 'last' : 'first');
      return;
    }

    if (keyboardEvent.key === 'Escape') {
      keyboardEvent.preventDefault();
      this.closeDropdown();
    }
  }

  onDropdownKeydown(event: Event, dropdown: DropdownKey): void {
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.key === 'Escape') {
      keyboardEvent.preventDefault();
      this.closeDropdown();
      this.focusTrigger(dropdown);
      return;
    }

    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(keyboardEvent.key)) {
      return;
    }

    keyboardEvent.preventDefault();
    this.moveDropdownFocus(keyboardEvent);
  }

  private focusDropdownItem(dropdown: DropdownKey, position: 'first' | 'last'): void {
    queueMicrotask(() => {
      const panel = document.getElementById(`${dropdown}-dropdown`);
      const items = this.getDropdownItems(panel);
      const target = position === 'last' ? items[items.length - 1] : items[0];

      target?.focus();
    });
  }

  private focusTrigger(dropdown: DropdownKey): void {
    document.getElementById(`${dropdown}-menu-trigger`)?.focus();
  }

  private moveDropdownFocus(event: KeyboardEvent): void {
    const panel = event.currentTarget as HTMLElement | null;
    const items = this.getDropdownItems(panel);

    if (items.length === 0) {
      return;
    }

    if (event.key === 'Home') {
      items[0].focus();
      return;
    }

    if (event.key === 'End') {
      items[items.length - 1].focus();
      return;
    }

    const activeIndex = items.findIndex((item) => item === document.activeElement);
    const fallbackIndex = event.key === 'ArrowUp' ? items.length : -1;
    const currentIndex = activeIndex >= 0 ? activeIndex : fallbackIndex;
    const nextIndex =
      event.key === 'ArrowDown'
        ? (currentIndex + 1) % items.length
        : (currentIndex - 1 + items.length) % items.length;

    items[nextIndex].focus();
  }

  private getDropdownItems(panel: HTMLElement | null): HTMLAnchorElement[] {
    if (!panel) {
      return [];
    }

    return Array.from(panel.querySelectorAll<HTMLAnchorElement>('[data-dropdown-item]'));
  }
}
