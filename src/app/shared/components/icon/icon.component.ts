import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  Facebook,
  Linkedin,
  type LucideIconData,
  LucideAngularModule,
  Mail,
  MapPin,
  Phone,
  X,
  Youtube,
} from 'lucide-angular';

export type IconName =
  | 'facebook'
  | 'linkedin'
  | 'youtube'
  | 'map-pin'
  | 'phone'
  | 'email'
  | 'close';

const ICON_MAP: Record<IconName, LucideIconData> = {
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  'map-pin': MapPin,
  phone: Phone,
  email: Mail,
  close: X,
};

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [LucideAngularModule],
  template: `<lucide-angular [img]="icon()" [size]="size()" aria-hidden="true"></lucide-angular>`,
  styles: [
    `
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      :host lucide-angular {
        color: currentColor;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input<number>(24);

  protected readonly icon = computed(() => ICON_MAP[this.name()]);
}
