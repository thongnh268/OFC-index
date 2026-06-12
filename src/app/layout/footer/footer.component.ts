import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { INTRODUCTION_NAV, OFC_COMPANY, PRODUCT_NAV } from '../../core/data';
import { SiteSettingsService } from '../../core/settings';
import { FooterColumnComponent } from '../../shared/components/footer-column/footer-column.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SocialRowComponent } from '../../shared/components/social-row/social-row.component';
import { SubscriptionFormComponent } from '../../shared/components/subscription-form/subscription-form.component';
import type { IconName } from '../../shared/components/icon/icon.component';
import type { NavLink } from '../../core/data';

interface ContactRow {
  readonly icon: IconName;
  readonly text: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    FooterColumnComponent,
    IconComponent,
    SocialRowComponent,
    SubscriptionFormComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly settings = inject(SiteSettingsService);

  readonly currentYear = new Date().getFullYear();
  // CMS-backed company facts overlaid on the code-owned defaults (transfer-cached for SSR).
  protected readonly company = toSignal(this.settings.getCompany(), { initialValue: OFC_COMPANY });
  readonly introductionLinks: readonly NavLink[] = INTRODUCTION_NAV;
  readonly productLinks: readonly NavLink[] = PRODUCT_NAV;
  protected readonly contactRows = computed<readonly ContactRow[]>(() => {
    const company = this.company();
    return [
      { icon: 'mapPin', text: company.shortAddress },
      { icon: 'phone', text: company.contact.ops.phone },
      { icon: 'email', text: company.contact.email },
    ];
  });

  onSubscriptionSubmit(email: string): void {
    // TODO: wire to Resend in Sprint 2 Day 7.
    void email;
  }
}
