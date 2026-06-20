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
        @if (label()) {
          <span class="banner__label"
            >{{ label() }}<span class="banner__chevron" aria-hidden="true">›</span></span
          >
        }
      </div>
    }
  `,
  styles: [
    `
      .banner {
        height: clamp(220px, 33vw, 480px);
        overflow: hidden;
        position: relative;
        width: 100%;
      }

      .banner__img {
        display: block;
        height: 100%;
        object-fit: cover;
        width: 100%;
      }

      /* Optional centred pill (e.g. the Subsidiaries Network banner title). */
      .banner__label {
        align-items: center;
        background: var(--color-primary);
        border-radius: 999px;
        color: var(--color-white);
        display: inline-flex;
        font-size: clamp(1rem, 2vw, 1.25rem);
        font-weight: 700;
        gap: 10px;
        left: 50%;
        padding: 14px 32px;
        position: absolute;
        text-transform: uppercase;
        top: 50%;
        transform: translate(-50%, -50%);
        white-space: nowrap;
      }

      .banner__chevron {
        font-weight: 400;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageBannerComponent {
  readonly imageUrl = input<string | null>(null);
  readonly alt = input<string>('');
  readonly label = input<string | null>(null);
}
