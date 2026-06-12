import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { OFC_COMPANY } from '../../../core/data';
import { SiteSettingsService } from '../../../core/settings';

const DEFAULT_LOGO = 'assets/logos/ofc-company.svg';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/" [attr.aria-label]="ariaLabel">
      <img
        [src]="company().logoUrl || defaultLogo"
        [alt]="company().brand"
        [class]="'w-auto ' + imageHeightClass()"
      />
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandComponent {
  private readonly settings = inject(SiteSettingsService);

  readonly imageHeightClass = input<string>('h-12');

  protected readonly defaultLogo = DEFAULT_LOGO;
  // Logo + brand come from the CMS (shared fetch via SiteSettingsService), falling back to
  // the code-owned defaults. The aria-label stays a build-time $localize string.
  protected readonly company = toSignal(this.settings.getCompany(), { initialValue: OFC_COMPANY });
  protected readonly ariaLabel = $localize`:@@brand.homeLink:${OFC_COMPANY.brand}:brand: home`;
}
