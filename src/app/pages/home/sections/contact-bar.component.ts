import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { OFC_COMPANY } from '../../../core/data';
import { SiteSettingsService } from '../../../core/settings';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ButtonDirective } from '../../../shared/directives/button.directive';

// Contact strip under the hero (Figma node 2:275): hotline + email on the left, a
// "Get a quote" CTA on the right. Company facts come from SiteSettingsService
// (CMS overlaid on code-owned defaults); the CTA label/route are code-owned.
@Component({
  selector: 'app-contact-bar',
  standalone: true,
  imports: [RouterLink, IconComponent, ButtonDirective],
  templateUrl: './contact-bar.component.html',
  styleUrl: './contact-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactBarComponent {
  private readonly settings = inject(SiteSettingsService);

  protected readonly company = toSignal(this.settings.getCompany(), { initialValue: OFC_COMPANY });

  protected readonly telHref = computed(
    () => `tel:${this.company().contact.ops.phone.replace(/\s+/g, '')}`,
  );
  protected readonly mailHref = computed(() => `mailto:${this.company().contact.email}`);
}
