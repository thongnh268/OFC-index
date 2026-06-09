import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OFC_COMPANY } from '../../../core/data';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/" [attr.aria-label]="ariaLabel">
      <img
        src="assets/logos/ofc-company.svg"
        [alt]="company.brand"
        [class]="'w-auto ' + imageHeightClass()"
      />
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandComponent {
  readonly imageHeightClass = input<string>('h-12');

  protected readonly company = OFC_COMPANY;
  protected readonly ariaLabel = OFC_COMPANY.brand + ' home';
}
