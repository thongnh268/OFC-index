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

// Single source of truth: adding an entry here registers the icon and extends IconName.
const ICONS = {
  facebook: tablerBrandFacebookFill,
  linkedin: tablerBrandLinkedinFill,
  youtube: tablerBrandYoutubeFill,
  mapPin: tablerMapPinFill,
  phone: tablerPhoneFill,
  email: tablerMailFill,
  close: tablerX,
} as const;

export type IconName = keyof typeof ICONS;

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgIcon],
  template: `<ng-icon [name]="name()" [size]="pxSize()" aria-hidden="true" />`,
  viewProviders: [provideIcons(ICONS)],
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

  protected readonly pxSize = computed(() => `${this.size()}px`);
}
