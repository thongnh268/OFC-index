import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  LOCALE_ID,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OFC_COMPANY } from '../../../core/data';
import { SiteSettingsService } from '../../../core/settings';

const DEFAULT_LOGO = 'assets/logos/ofc-company.svg';

const DEFAULT_SLOGANS_EN = [
  'Creating value from green resources',
  'Partnering for sustainable development',
];

const DEFAULT_SLOGANS_VI = [
  'Kiến tạo giá trị từ nguồn tài nguyên xanh',
  'Đồng hành cùng phát triển bền vững',
];

@Component({
  selector: 'app-company-slogan',
  standalone: true,
  imports: [],
  template: `
    <div class="slogan-container">
      <img [src]="logoUrl()" [alt]="brandName()" class="slogan-logo" />
      @for (line of sloganLines(); track $index) {
        <p class="slogan-line">{{ line }}</p>
      }
    </div>
  `,
  styleUrl: './company-slogan.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanySloganComponent {
  private readonly settings = inject(SiteSettingsService);
  private readonly localeId = inject(LOCALE_ID);

  readonly lines = input<readonly string[] | null>(null);

  protected readonly defaultLogo = DEFAULT_LOGO;
  protected readonly company = toSignal(this.settings.getCompany(), { initialValue: OFC_COMPANY });

  protected readonly brandName = computed(() => this.company().brand || OFC_COMPANY.brand);
  protected readonly logoUrl = computed(() => this.company().logoUrl || this.defaultLogo);

  protected readonly sloganLines = computed(() => {
    const customLines = this.lines();
    if (customLines && customLines.length > 0) {
      return customLines;
    }
    return this.localeId.startsWith('vi') ? DEFAULT_SLOGANS_VI : DEFAULT_SLOGANS_EN;
  });
}
export type { CompanySloganComponent as SloganComponent };
