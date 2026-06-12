import { ChangeDetectionStrategy, Component, LOCALE_ID, inject } from '@angular/core';

import { homeContent } from './home-content.data';
import { AboutSectionComponent } from './sections/about-section.component';
import { ContactBarComponent } from './sections/contact-bar.component';
import { HeroSectionComponent } from './sections/hero-section.component';

// Container: hands the code-owned, locale-specific home content to each section.
// No CMS round-trip — homepage copy lives in home-content.data.ts by design.
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSectionComponent, ContactBarComponent, AboutSectionComponent],
  template: `
    <app-hero-section [content]="content.hero" />
    <app-contact-bar />
    <app-about-section [content]="content.about" />
    <!-- TODO(day-5 sections): products×5, partners+figures, news, cta -->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly content = homeContent(inject(LOCALE_ID));
}
