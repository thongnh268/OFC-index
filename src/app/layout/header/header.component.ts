import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  LOCALE_ID,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ABOUT_NAV, MAIN_NAV, PRODUCT_NAV, SECONDARY_NAV } from '../../core/data';
import { BrandComponent } from '../../shared/components/brand/brand.component';
import { HamburgerComponent } from '../../shared/components/hamburger/hamburger.component';
import { MobileDrawerComponent } from '../../shared/components/mobile-drawer/mobile-drawer.component';
import type { NavLink } from '../../core/data';

type DropdownKey = 'about' | 'products';
type LocaleCode = 'en' | 'vi';

interface HeaderDropdown {
  readonly key: DropdownKey;
  readonly label: string;
  readonly links: readonly NavLink[];
}

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
  private readonly injector = inject(Injector);

  readonly openDropdown = signal<DropdownKey | null>(null);
  readonly mobileMenuOpen = signal(false);

  // Locale is baked into each build by @angular/localize; switching is a full page load.
  readonly currentLocale: LocaleCode = inject(LOCALE_ID).startsWith('vi') ? 'vi' : 'en';

  readonly topLinks: readonly NavLink[] = SECONDARY_NAV;
  readonly mainLinks: readonly NavLink[] = MAIN_NAV;
  readonly dropdowns: readonly HeaderDropdown[] = [
    { key: 'about', label: $localize`:@@nav.aboutMenu:About Us`, links: ABOUT_NAV },
    { key: 'products', label: $localize`:@@nav.productsMenu:Products`, links: PRODUCT_NAV },
  ];

  // The single full-width sub-menu bar renders the links of whichever dropdown is open.
  readonly activeDropdown = computed(
    () => this.dropdowns.find((menu) => menu.key === this.openDropdown()) ?? null,
  );

  private readonly currentUrl = signal(this.router.url);
  private readonly dropdownTriggers =
    viewChildren<ElementRef<HTMLButtonElement>>('dropdownTrigger');
  private readonly dropdownPanels = viewChildren<ElementRef<HTMLElement>>('dropdownPanel');

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.set(event.urlAfterRedirects);
        this.closeInteractive();
      }
    });
  }

  // Locale URLs only resolve in localized builds (/en/, /vi/); `ng serve` hosts one locale at /.
  localeHref(locale: LocaleCode): string {
    return `/${locale}${this.currentUrl()}`;
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

  closeDropdownOnFocusOut(event: FocusEvent): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    const nextTarget = event.relatedTarget as Node | null;

    if (currentTarget && nextTarget && currentTarget.contains(nextTarget)) {
      return;
    }

    this.closeDropdown();
  }

  onDesktopTriggerKeydown(event: KeyboardEvent, dropdown: DropdownKey): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.showDropdown(dropdown);
      this.focusDropdownItem(event.key === 'ArrowUp' ? 'last' : 'first');
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeDropdown();
    }
  }

  onDropdownKeydown(event: KeyboardEvent, dropdown: DropdownKey): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeDropdown();
      this.focusTrigger(dropdown);
      return;
    }

    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    this.moveDropdownFocus(event);
  }

  private focusDropdownItem(position: 'first' | 'last'): void {
    // Wait for the just-opened panel to render before querying its items.
    afterNextRender(
      () => {
        const panel = this.dropdownPanels()[0]?.nativeElement ?? null;
        const items = this.getDropdownItems(panel);
        const target = position === 'last' ? items[items.length - 1] : items[0];

        target?.focus();
      },
      { injector: this.injector },
    );
  }

  private focusTrigger(dropdown: DropdownKey): void {
    const index = this.dropdowns.findIndex((menu) => menu.key === dropdown);

    this.dropdownTriggers()[index]?.nativeElement.focus();
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
