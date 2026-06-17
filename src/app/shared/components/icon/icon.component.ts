import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerArmchair,
  tablerAward,
  tablerBolt,
  tablerBox,
  tablerBuildingFactory2,
  tablerBuildingWarehouse,
  tablerBulb,
  tablerCertificate,
  tablerChartBar,
  tablerChevronDown,
  tablerChevronLeft,
  tablerChevronRight,
  tablerCircleCheck,
  tablerClipboardText,
  tablerClock,
  tablerCurrencyDollar,
  tablerDroplet,
  tablerEdit,
  tablerFeather,
  tablerFileDollar,
  tablerFileText,
  tablerFlame,
  tablerHeadset,
  tablerHeartHandshake,
  tablerHome,
  tablerLeaf,
  tablerLungs,
  tablerMail,
  tablerMountain,
  tablerPackages,
  tablerPaw,
  tablerPlant2,
  tablerRecycle,
  tablerRoute,
  tablerRuler2,
  tablerSeedling,
  tablerSettings,
  tablerShieldCheck,
  tablerShip,
  tablerShoppingCart,
  tablerSun,
  tablerTools,
  tablerTree,
  tablerTrendingUp,
  tablerTruck,
  tablerUsersGroup,
  tablerWood,
  tablerWorld,
  tablerX,
} from '@ng-icons/tabler-icons';
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
  chevronDown: tablerChevronDown,
  chevronLeft: tablerChevronLeft,
  chevronRight: tablerChevronRight,
  edit: tablerEdit,
  factory: tablerBuildingFactory2,
  experience: tablerAward,
  people: tablerUsersGroup,
  globe: tablerWorld,
  chartBar: tablerChartBar,
  currencyDollar: tablerCurrencyDollar,
  sun: tablerSun,
  trendingUp: tablerTrendingUp,
  headset: tablerHeadset,
  bulb: tablerBulb,
  cart: tablerShoppingCart,
  settings: tablerSettings,
  fileDollar: tablerFileDollar,
  mail: tablerMail,
  clipboard: tablerClipboardText,
  handshake: tablerHeartHandshake,
  truck: tablerTruck,
  circleCheck: tablerCircleCheck,
  leaf: tablerLeaf,
  fileText: tablerFileText,
  flame: tablerFlame,
  feather: tablerFeather,
  plant: tablerPlant2,
  recycle: tablerRecycle,
  ship: tablerShip,
  certificate: tablerCertificate,
  home: tablerHome,
  bolt: tablerBolt,
  paw: tablerPaw,
  seedling: tablerSeedling,
  ruler: tablerRuler2,
  box: tablerBox,
  wood: tablerWood,
  tools: tablerTools,
  armchair: tablerArmchair,
  packages: tablerPackages,
  tree: tablerTree,
  shieldCheck: tablerShieldCheck,
  mountain: tablerMountain,
  lungs: tablerLungs,
  droplet: tablerDroplet,
  route: tablerRoute,
  warehouse: tablerBuildingWarehouse,
  clock: tablerClock,
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
