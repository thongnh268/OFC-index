import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { OFC_COMPANY } from '../../core/data';
import { SiteSettingsService } from '../../core/settings';
import { InnerPageComponent } from '../../shared/components/inner-page/inner-page.component';
import type { BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb.component';

// /contacts - company contact details inside the shared inner-page chrome. Company facts come
// from Sanity (siteSettings) overlaid on the code-owned defaults via SiteSettingsService.
@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [InnerPageComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
  protected readonly company = toSignal(inject(SiteSettingsService).getCompany(), {
    initialValue: OFC_COMPANY,
  });

  protected readonly breadcrumb: readonly BreadcrumbItem[] = [
    { label: $localize`:@@common.home:Home`, route: '/' },
    { label: $localize`:@@nav.contacts:Contacts` },
  ];
}
