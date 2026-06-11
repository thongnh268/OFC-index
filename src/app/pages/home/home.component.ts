import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { HOME_CONTENT_PLACEHOLDER } from './home-content.placeholder';
import { HomeContentService } from './home-content.service';
import { HeroSectionComponent } from './sections/hero-section.component';

// Container: resolves Home content (CMS → placeholder) once and feeds each section.
// initialValue keeps SSR/first paint non-null; the HTTP result is transfer-cached so
// the browser hydrates without a second fetch.
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSectionComponent],
  template: `
    <app-hero-section [content]="content().hero" />
    <!-- TODO(day-5 sections): about, products×5, partners+figures, news, cta -->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly homeContent = inject(HomeContentService);

  protected readonly content = toSignal(this.homeContent.getContent(), {
    initialValue: HOME_CONTENT_PLACEHOLDER,
  });
}
