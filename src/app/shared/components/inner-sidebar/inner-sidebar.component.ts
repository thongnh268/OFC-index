import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ABOUT_NAV, OFC_COMPANY, PRODUCT_NAV } from '../../../core/data';
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
  imports: [RouterLink, RouterLinkActive, IconComponent, ButtonDirective],
  templateUrl: './inner-sidebar.component.html',
  styleUrl: './inner-sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerSidebarComponent {
  private readonly settings = inject(SiteSettingsService);

  protected readonly company = toSignal(this.settings.getCompany(), { initialValue: OFC_COMPANY });
  protected readonly aboutLinks = ABOUT_NAV;
  protected readonly productLinks = PRODUCT_NAV;

  protected readonly telHref = computed(
    () => `tel:${this.company().contact.hotline.replace(/\s+/g, '')}`,
  );
  protected readonly mailHref = computed(() => `mailto:${this.company().contact.email}`);
}
