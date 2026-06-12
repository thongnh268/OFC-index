import { ChangeDetectionStrategy, Component, LOCALE_ID, inject } from '@angular/core';

import { homeContent } from './home-content.data';
import { AboutSectionComponent } from './sections/about-section.component';
import { ContactBarComponent } from './sections/contact-bar.component';
import { HeroSectionComponent } from './sections/hero-section.component';
import { ProductsSectionComponent } from './sections/products-section.component';

// Container: hands the code-owned, locale-specific home content to each section.
// No CMS round-trip — homepage copy lives in home-content.data.ts by design.
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    ContactBarComponent,
    AboutSectionComponent,
    ProductsSectionComponent,
  ],
  template: `
    <app-hero-section [content]="content.hero" />
    <app-contact-bar />
    <app-about-section [content]="content.about" />
    <app-products-section [content]="content.products" />
    <!-- TODO(day-5 sections): partners+figures, news, cta -->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly content = homeContent(inject(LOCALE_ID));
}
