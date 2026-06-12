import { ChangeDetectionStrategy, Component, LOCALE_ID, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { PostsService } from '../../core/posts';
import { homeContent } from './home-content.data';
import { AboutSectionComponent } from './sections/about-section.component';
import { ContactBarComponent } from './sections/contact-bar.component';
import { CtaSectionComponent } from './sections/cta-section.component';
import { HeroSectionComponent } from './sections/hero-section.component';
import { NewsSectionComponent } from './sections/news-section.component';
import { PartnersSectionComponent } from './sections/partners-section.component';
import { ProductsSectionComponent } from './sections/products-section.component';

// Container: hands the code-owned, locale-specific home content to each section.
// Homepage copy lives in home-content.data.ts by design; the only CMS round-trip is
// the latest posts for the news carousel (hidden until the Studio has posts).
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    ContactBarComponent,
    AboutSectionComponent,
    ProductsSectionComponent,
    PartnersSectionComponent,
    NewsSectionComponent,
    CtaSectionComponent,
  ],
  template: `
    <app-hero-section [content]="content.hero" />
    <app-contact-bar />
    <app-about-section [content]="content.about" />
    <app-products-section [content]="content.products" />
    <app-partners-section [content]="content.partners" />
    @if (posts().length) {
      <app-news-section [content]="content.news" [posts]="posts()" />
    }
    <app-cta-section [content]="content.cta" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly content = homeContent(inject(LOCALE_ID));

  protected readonly posts = toSignal(inject(PostsService).getLatest(), { initialValue: [] });
}
