import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  LOCALE_ID,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';

import { OFC_COMPANY } from '../../../core/data';
import { SiteSettingsService } from '../../../core/settings';
import { BreadcrumbComponent, type BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import { IconComponent } from '../icon/icon.component';
import { QuoteCtaComponent } from '../quote-cta/quote-cta.component';
import { SocialRowComponent } from '../social-row/social-row.component';
import { ProductBannerComponent } from './product-banner.component';
import {
  DEFAULT_PRODUCT_SECTION_ORDER,
  productChrome,
  videoEmbedUrl,
  type AnchorNavItem,
  type ProductContent,
  type ProductSectionId,
} from './product-content.model';
import { ProductFaqComponent } from './product-faq.component';
import { ProductGalleryComponent } from './product-gallery.component';
import { ProductLinesComponent } from './product-lines.component';
import { ProductProcessComponent } from './product-process.component';
import { ProductSidebarComponent } from './product-sidebar.component';
import { ProductSpecsComponent } from './product-specs.component';

// Shared, data-driven shell for every product-detail page (Wood Chips, Wood Pellets, Timber,
// Afforestation, Transportation). It owns the whole layout - breadcrumb bar, badge banner,
// overview + specs, applications, why-choose-us, video, FAQ and the right-hand anchor-nav +
// quote card - and renders it from one `ProductContent` input. Per-page copy is code-owned
// bilingual (in each page's *-content.data.ts); the structural chrome comes from
// productChrome(LOCALE_ID). The FAQ reuses the shared <app-accordion>, and the bottom CTA
// reuses <app-quote-cta>; nothing here is bespoke per page.
@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    IconComponent,
    ProductBannerComponent,
    ProductFaqComponent,
    ProductGalleryComponent,
    ProductLinesComponent,
    ProductProcessComponent,
    ProductSidebarComponent,
    ProductSpecsComponent,
    QuoteCtaComponent,
    SocialRowComponent,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements AfterViewInit {
  private readonly settings = inject(SiteSettingsService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  // While a click-scroll animates, the scroll-spy is paused (until this timestamp) so it does
  // not override the item the user just clicked.
  private spyLockUntil = 0;

  readonly content = input.required<ProductContent>();

  protected readonly chrome = productChrome(inject(LOCALE_ID));
  protected readonly company = toSignal(this.settings.getCompany(), { initialValue: OFC_COMPANY });

  protected readonly breadcrumb = computed<readonly BreadcrumbItem[]>(() => [
    { label: this.chrome.breadcrumbHome, route: '/' },
    { label: this.chrome.breadcrumbProducts },
    { label: this.content().name },
  ]);

  protected readonly anchorNav = computed<readonly AnchorNavItem[]>(() => {
    const content = this.content();
    const sectionOrder = content.sectionOrder ?? DEFAULT_PRODUCT_SECTION_ORDER;

    return sectionOrder.map((id) => ({
      id,
      label: content.sectionCopy?.[id]?.navigation ?? this.chrome.sectionLabels[id],
    }));
  });

  protected readonly showOverviewSpecs = computed(
    () => this.content().specsPlacement !== 'advantage',
  );

  // Sanitized embed URL for the <iframe>; null → the placeholder thumbnail is shown instead.
  protected readonly videoEmbed = computed<SafeResourceUrl | null>(() => {
    const embed = videoEmbedUrl(this.content().videoUrl);

    return embed ? this.sanitizer.bypassSecurityTrustResourceUrl(embed) : null;
  });

  // Active anchor-nav item, driven by scroll position (scroll-spy). Defaults to the first
  // section; the listener is attached only in the browser so SSR/prerender is unaffected.
  protected readonly activeId = signal<string>(DEFAULT_PRODUCT_SECTION_ORDER[0]);

  protected sectionHeading(id: ProductSectionId, fallback: string): string {
    return this.content().sectionCopy?.[id]?.heading ?? fallback;
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const ids = this.anchorNav().map((item) => item.id);
    const present = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!present.length) {
      return;
    }

    // #specifications sits inside #overview (same row), so scroll can't tell them apart;
    // drop such nested anchors from the spy and let the parent ("Product overview") win.
    // Clicking "Specifications" still scrolls to it (see scrollToSection).
    const nestedIds = new Set(
      present
        .filter((el) => present.some((other) => other !== el && other.contains(el)))
        .map((el) => el.id),
    );
    const spyIds = ids.filter((id) => !nestedIds.has(id));

    const LINE = 120;
    const update = () => {
      if (performance.now() < this.spyLockUntil) {
        return;
      }
      // Look the elements up fresh on every pass: after an SSR hydration / re-render, cached
      // references can become detached, report top 0, and wrongly pin the last section active
      // (the "stuck on FAQs" freeze). Fresh queries always reflect the live, scrolling DOM.
      let current = spyIds[0];
      for (const id of spyIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - LINE <= 0) {
          current = id;
        }
      }
      this.activeId.set(current);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', update));
  }

  // Smooth-scroll to a section on click. Handled in JS (not a bare "#id" href) because the
  // page has <base href="/">, which resolves "#id" against the site root - that would navigate
  // home instead of scrolling within this page.
  protected scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }

    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 16,
      behavior: 'smooth',
    });
    this.activeId.set(id);
    // Hold this selection while the smooth scroll settles so the spy doesn't snap it back.
    this.spyLockUntil = performance.now() + 900;
  }
}
