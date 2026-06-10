import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerX } from '@ng-icons/tabler-icons';
import {
  tablerBrandFacebookFill,
  tablerBrandLinkedinFill,
  tablerBrandYoutubeFill,
  tablerMailFill,
  tablerMapPinFill,
  tablerPhoneFill,
} from '@ng-icons/tabler-icons/fill';

export type IconName =
  | 'facebook'
  | 'linkedin'
  | 'youtube'
  | 'map-pin'
  | 'phone'
  | 'email'
  | 'close';

const ICON_KEY: Record<IconName, string> = {
  facebook: 'tablerBrandFacebookFill',
  linkedin: 'tablerBrandLinkedinFill',
  youtube: 'tablerBrandYoutubeFill',
  'map-pin': 'tablerMapPinFill',
  phone: 'tablerPhoneFill',
  email: 'tablerMailFill',
  close: 'tablerX',
};

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgIcon],
  template: `<ng-icon [name]="iconKey()" [size]="pxSize()" aria-hidden="true" />`,
  viewProviders: [
    provideIcons({
      tablerBrandFacebookFill,
      tablerBrandLinkedinFill,
      tablerBrandYoutubeFill,
      tablerMailFill,
      tablerMapPinFill,
      tablerPhoneFill,
      tablerX,
    }),
  ],
  styles: [
    `
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      :host ng-icon {
        color: currentColor;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input<number>(24);

  protected readonly iconKey = computed(() => ICON_KEY[this.name()]);
  protected readonly pxSize = computed(() => `${this.size()}px`);
}
