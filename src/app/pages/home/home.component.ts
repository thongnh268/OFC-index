import { ChangeDetectionStrategy, Component, LOCALE_ID, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { PostsService } from '../../core/posts';
import { SiteSettingsService } from '../../core/settings';
import { QuoteCtaComponent } from '../../shared/components/quote-cta/quote-cta.component';
import { homeContent } from './home-content.data';
import { AboutSectionComponent } from './sections/about-section.component';
import { ContactBarComponent } from './sections/contact-bar.component';
import { HeroSectionComponent } from './sections/hero-section.component';
import { NewsSectionComponent } from './sections/news-section.component';
import { PartnersSectionComponent } from './sections/partners-section.component';
import { ProductsSectionComponent } from './sections/products-section.component';

// Container: hands the code-owned, locale-specific home content to each section.
// Homepage copy lives in home-content.data.ts by design; Sanity only supplies the latest
// posts and optional siteSettings media overrides such as the hero background and partner logos.
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
    QuoteCtaComponent,
  ],
  template: `
    <app-hero-section [content]="heroContent()" />
    <app-contact-bar />
    <app-about-section [content]="content.about" />
    <app-products-section [content]="content.products" />
    @if (partnersContent().logos.length) {
      <app-partners-section [content]="partnersContent()" />
    }
    @if (posts().length) {
      <app-news-section [content]="content.news" [posts]="posts()" />
    }
    <app-quote-cta />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly heroImageUrl = toSignal(inject(SiteSettingsService).getHeroImageUrl(), {
    initialValue: null,
  });

  private readonly partnerLogos = toSignal(inject(SiteSettingsService).getPartnerLogos(), {
    initialValue: [],
  });

  protected readonly content = homeContent(inject(LOCALE_ID));
  protected readonly heroContent = computed(() => ({
    ...this.content.hero,
    imageUrl: this.heroImageUrl() ?? this.content.hero.imageUrl,
  }));

  // Partner logos are CMS-owned. If Studio has none, the section stays hidden to avoid
  // making stale built-in logos look CMS-managed.
  protected readonly partnersContent = computed(() => ({
    ...this.content.partners,
    logos: this.partnerLogos(),
  }));

  protected readonly posts = toSignal(inject(PostsService).getLatest(), { initialValue: [] });
}
