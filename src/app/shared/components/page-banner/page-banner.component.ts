import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Full-width inner-page banner (Figma: 480px hero image). Rendered ONLY when an image is
// supplied - pages without a banner in the design (e.g. Establishment Milestones) pass null
// and no banner block appears, so there is never an empty placeholder band.
@Component({
  selector: 'app-page-banner',
  standalone: true,
  template: `
    @if (imageUrl(); as src) {
      <div class="banner">
        <img class="banner__img" [src]="src" [alt]="alt()" />
      </div>
    }
  `,
  styles: [
    `
      .banner {
        height: clamp(220px, 33vw, 480px);
        overflow: hidden;
        width: 100%;
      }

      .banner__img {
        display: block;
        height: 100%;
        object-fit: cover;
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageBannerComponent {
  readonly imageUrl = input<string | null>(null);
  readonly alt = input<string>('');
}
