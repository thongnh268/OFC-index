import { isPlatformBrowser } from '@angular/common';
import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

import { ABOUT_NAV, OFC_COMPANY, PRODUCT_NAV } from '../../../core/data';
import type { NavLink } from '../../../core/data';
import { SiteSettingsService } from '../../../core/settings';
import { ButtonDirective } from '../../directives/button.directive';
import { IconComponent } from '../icon/icon.component';

// Right-hand sidebar shared by every inner page (Figma 249px column): a green "Get a Quote"
// button, then one light panel holding the OFC Company contact card and the About-us and
// Products link lists, separated by dividers. Company facts come from SiteSettingsService
// (CMS overlaid on code-owned defaults); the nav arrays are code-owned.
@Component({
  selector: 'app-inner-sidebar',
  standalone: true,
  imports: [RouterLink, IconComponent, ButtonDirective],
  templateUrl: './inner-sidebar.component.html',
  styleUrl: './inner-sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerSidebarComponent implements AfterViewInit {
  private readonly settings = inject(SiteSettingsService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private spyLockUntil = 0;

  protected readonly company = toSignal(this.settings.getCompany(), { initialValue: OFC_COMPANY });
  protected readonly aboutLinks = ABOUT_NAV;
  protected readonly productLinks = PRODUCT_NAV;
  protected readonly activePath = signal(this.pathFromUrl(this.router.url));
  protected readonly activeSectionId = signal('');
  protected readonly activeSections = computed(() => this.activeLink()?.sections ?? []);

  protected readonly primaryOffice = computed(() => this.company().offices[0] ?? null);
  protected readonly phone = computed(
    () => this.company().contact.hotline ?? this.company().contact.ops.phone,
  );
  protected readonly email = computed(() => this.company().contact.email);
  protected readonly hasContactInfo = computed(
    () => this.primaryOffice() != null || this.phone() != null || this.email() != null,
  );
  protected readonly telHref = computed(() => {
    const phone = this.phone();
    return phone ? `tel:${phone.replace(/\s+/g, '')}` : null;
  });
  protected readonly mailHref = computed(() => {
    const email = this.email();
    return email ? `mailto:${email}` : null;
  });

  private readonly activeLink = computed(() => {
    const path = this.activePath();
    return [...this.aboutLinks, ...this.productLinks].find((link) => link.route === path) ?? null;
  });

  constructor() {
    const subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activePath.set(this.pathFromUrl(event.urlAfterRedirects));
        this.activeSectionId.set(this.activeSections()[0]?.id ?? '');
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    const update = () => this.updateActiveSection();
    window.addEventListener('scroll', update, { passive: true });
    update();
    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', update));
  }

  protected isActiveLink(link: NavLink): boolean {
    return this.activePath() === link.route;
  }

  protected selectSection(event: Event, id: string): void {
    event.preventDefault();

    if (!this.isBrowser) {
      return;
    }

    const el = document.getElementById(id);
    if (!el) {
      return;
    }

    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 16,
      behavior: 'smooth',
    });
    this.activeSectionId.set(id);
    this.spyLockUntil = performance.now() + 900;
  }

  private updateActiveSection(): void {
    if (performance.now() < this.spyLockUntil) {
      return;
    }

    const sections = this.activeSections();
    if (!sections.length) {
      this.activeSectionId.set('');
      return;
    }

    const line = 120;
    let current = sections[0]?.id ?? '';
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el && el.getBoundingClientRect().top - line <= 0) {
        current = section.id;
      }
    }

    this.activeSectionId.set(current);
  }

  private pathFromUrl(url: string): string {
    return url.split('#')[0]?.split('?')[0] || '/';
  }
}
