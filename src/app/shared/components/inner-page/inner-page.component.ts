import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { OFC_COMPANY } from '../../../core/data';
import { SiteSettingsService } from '../../../core/settings';
import { BreadcrumbComponent, type BreadcrumbItem } from '../breadcrumb/breadcrumb.component';
import {
  InnerSidebarComponent,
  type SidebarCta,
  type SidebarSectionGroup,
} from '../inner-sidebar/inner-sidebar.component';
import { PageBannerComponent } from '../page-banner/page-banner.component';
import { QuoteCtaComponent, type QuoteCtaConfig } from '../quote-cta/quote-cta.component';
import { SocialRowComponent } from '../social-row/social-row.component';

// Shared shell for inner content pages (About-section, Product-detail): breadcrumb bar (with
// right-aligned social links, reusing app-social-row) → optional banner → two-column body
// (projected <main> + sidebar) → Get-a-Quote CTA. Encapsulation stays Emulated for the
// shell's own chrome; projected <main> content typography lives in global styles.css under
// `.inner-page__main` (it must reach page-owned content, which a scoped stylesheet cannot).
@Component({
  selector: 'app-inner-page',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    PageBannerComponent,
    InnerSidebarComponent,
    QuoteCtaComponent,
    SocialRowComponent,
  ],
  templateUrl: './inner-page.component.html',
  styleUrl: './inner-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerPageComponent {
  private readonly settings = inject(SiteSettingsService);

  readonly breadcrumb = input.required<readonly BreadcrumbItem[]>();
  readonly bannerImage = input<string | null>(null);
  readonly bannerAlt = input<string>('');
  // Optional centred pill over the banner (e.g. the Subsidiaries Network title).
  readonly bannerLabel = input<string | null>(null);
  readonly bannerLabelRouterLink = input<string | unknown[] | null>(null);
  readonly bannerLabelFragment = input<string | null>(null);

  // Optional sidebar/CTA overrides, forwarded to the shared children; null keeps the defaults.
  readonly sidebarCta = input<SidebarCta | null>(null);
  readonly pageSections = input<SidebarSectionGroup | null>(null);
  readonly ctaConfig = input<QuoteCtaConfig | null>(null);

  protected readonly company = toSignal(this.settings.getCompany(), { initialValue: OFC_COMPANY });
}
