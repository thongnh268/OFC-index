import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INTRODUCTION_NAV, OFC_COMPANY, PRODUCT_NAV } from '../../core/data';
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
  readonly currentYear = new Date().getFullYear();
  readonly company = OFC_COMPANY;
  readonly introductionLinks: readonly NavLink[] = INTRODUCTION_NAV;
  readonly productLinks: readonly NavLink[] = PRODUCT_NAV;
  protected readonly contactRows: readonly ContactRow[] = [
    { icon: 'mapPin', text: this.company.shortAddress },
    { icon: 'phone', text: this.company.contact.ops.phone },
    { icon: 'email', text: this.company.contact.email },
  ];

  onSubscriptionSubmit(email: string): void {
    // TODO: wire to Resend in Sprint 2 Day 7.
    void email;
  }
}
